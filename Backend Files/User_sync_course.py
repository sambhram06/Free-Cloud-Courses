import os
import json
import requests
from datetime import datetime
from Database import get_connection

TOKEN_URL = 'https://api.raven360.com/gettoken'
PROGRESS_URL = 'https://api.raven360.com/administration/progress/learningobjects'

def get_env_var(name):
    value = os.getenv(name)
    if not value:
        raise EnvironmentError(f"Missing required environment variable: {name}")
    return value

def get_token():
    x_api_key = get_env_var('X_API_KEY')
    payload = {
        'client_id': get_env_var('CLIENT_ID'),
        'client_secret': get_env_var('CLIENT_SECRET'),
        'x-api-key': x_api_key
    }
    headers = {
        'x-api-key': x_api_key,
        'Content-Type': 'application/json'
    }
    response = requests.post(TOKEN_URL, headers=headers, json=payload)
    if not response.ok:
        raise Exception(f"Failed to get token: {response.status_code} {response.text}")
    return response.json()['data']['token']

def post_data(url, token, payload):
    headers = {
        'Authorization': token,
        'x-api-key': get_env_var('X_API_KEY'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    response = requests.post(url, headers=headers, json=payload)
    if not response.ok:
        raise Exception(f"Failed to fetch progress data: {response.status_code} {response.text}")
    return response.json().get('data', [])

def user_exists(cursor, fcc_email):
    cursor.execute("SELECT 1 FROM users WHERE fcc_email = %s", (fcc_email,))
    return cursor.fetchone() is not None

def upsert_progress(cursor, item):
    cursor.execute("""
        INSERT INTO user_progress (
            fcc_email, learningobject_id, learningobject_type,
            status, first_access_date, last_access_date, completed_date,
            completion_percentage, created_date, updated_date
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
        ON CONFLICT (fcc_email, learningobject_id)
        DO UPDATE SET
            status = EXCLUDED.status,
            last_access_date = EXCLUDED.last_access_date,
            completed_date = EXCLUDED.completed_date,
            completion_percentage = EXCLUDED.completion_percentage,
            updated_date = NOW();
    """, (
        item['fcc_email'],
        item['learningobject_id'],
        item['learningobject_type'],
        item['status'],
        item.get('first_access_date'),
        item.get('last_access_date'),
        item.get('completed_date'),
        item.get('completion_percentage', 0)
    ))

def sync_all_user_progress():
    print("Fetching API token...")
    token = get_token()

    payload = {
        "from_date": "01-01-2025",
        "to_date": datetime.now().strftime("%m-%d-%Y")
    }

    print("Fetching progress data from Raven360...")
    progress_data = post_data(PROGRESS_URL, token, payload)
    print(f"Retrieved {len(progress_data)} records.")

    with get_connection() as conn, conn.cursor() as cursor:
        for item in progress_data:
            fcc_email = item.get('email_id')
            if not fcc_email:
                print("Missing email_id in item:", item)
                continue

            if not user_exists(cursor, fcc_email):
                print(f"No matching user for fcc_email: {fcc_email}")
                continue

            mapped_item = {
                "fcc_email": fcc_email,
                "learningobject_id": item['learningobject_id'],
                "learningobject_type": item.get('learningobject_type', 'Content'),
                "status": item.get('status', 0),
                "first_access_date": item.get('first_access_date'),
                "last_access_date": item.get('last_access_date'),
                "completed_date": item.get('completed_date'),
                "completion_percentage": item.get('completion_percentage', 0)
            }

            upsert_progress(cursor, mapped_item)

        conn.commit()

    print("Progress sync completed.")
    return {"message": "Progress sync completed successfully."}

def handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }

    try:
        print("Triggered with event:", json.dumps(event))
        result = sync_all_user_progress()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(result)
        }

    except Exception as e:
        print("Progress sync failed:", str(e))
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({ "error": "Internal server error", "details": str(e) })
        }
