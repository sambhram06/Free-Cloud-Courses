import json
from Database import get_connection

def handler(event, context):
    print("Received:", json.dumps(event))

    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
    }

    try:
        params = event.get("queryStringParameters") or {}
        email = params.get("email")
        cognito_sub = params.get("cognito_sub")

        if not email and not cognito_sub:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Query parameter 'email' or 'cognito_sub' is required."})
            }

        with get_connection() as conn, conn.cursor() as cursor:
            cursor.execute(
                """
                SELECT fcc_email, email, cognito_sub FROM users
                WHERE (%s IS NULL OR email = %s)
                  AND (%s IS NULL OR cognito_sub = %s)
                LIMIT 1;
                """,
                (email, email, cognito_sub, cognito_sub)
            )
            user = cursor.fetchone()
            print("User lookup result:", user)

            if not user:
                return {
                    "statusCode": 404,
                    "headers": headers,
                    "body": json.dumps({"error": "User not found"})
                }

            fcc_email, user_email, user_sub = user

            cursor.execute(
                """
                SELECT learningobject_id, completion_percentage
                FROM user_progress
                WHERE fcc_email = %s;
                """,
                (fcc_email,)
            )
            progress = cursor.fetchall()
            print(f"{len(progress)} progress rows fetched for {fcc_email}")

            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({
                    "fcc_email": fcc_email,
                    "email": user_email,
                    "cognito_sub": user_sub,
                    "progress": [
                        {"learningobject_id": lo_id, "completion_percentage": pct}
                        for lo_id, pct in progress
                    ]
                })
            }

    except Exception as e:
        print("Exception occurred:", str(e))
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Internal server error"})
        }
