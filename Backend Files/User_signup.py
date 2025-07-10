import json
from Database import get_connection

def create_user(username, email, cognito_sub):
    fcc_email = f"cloudthat-saml_{username}@freecloudcourses.com"
    print(f"username={username}, email={email}, fcc_email={fcc_email}, cognito_sub={cognito_sub}")

    try:
        with get_connection() as conn, conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO users (cognito_sub, username, email, fcc_email, created_at)
                VALUES (%s, %s, %s, %s, NOW())
                ON CONFLICT (fcc_email) DO NOTHING
                RETURNING username;
                """,
                (cognito_sub, username, email, fcc_email)
            )
            result = cursor.fetchone()
            print(f"User inserted: {result[0]}" if result else "User already exists, insertion skipped.")
            return result
    except Exception as e:
        print(f"create_user: {e}")
        raise

def get_user_by_email_or_sub(email, cognito_sub):
    try:
        with get_connection() as conn, conn.cursor() as cursor:
            cursor.execute(
                """
                SELECT fcc_email FROM users
                WHERE email = %s OR cognito_sub = %s
                LIMIT 1;
                """,
                (email, cognito_sub)
            )
            result = cursor.fetchone()
            print(f"Existing fcc_email: {result[0]}" if result else f"No user for email={email}, cognito_sub={cognito_sub}")
            return result
    except Exception as e:
        print(f"get_user_by_email_or_sub: {e}")
        return None

def handler(event, context):
    print("Received signup event:", json.dumps(event))

    try:
        user_attributes = event.get('request', {}).get('userAttributes') or {}
        username = user_attributes.get('name')
        email = user_attributes.get('email')
        cognito_sub = user_attributes.get('sub')

        print(f"Extracted: username={username}, email={email}, sub={cognito_sub}")

        if not all([username, email, cognito_sub]):
            raise ValueError(f"Missing fields: username={username}, email={email}, sub={cognito_sub}")

        if get_user_by_email_or_sub(email, cognito_sub):
            print("User already exists. Skipping creation.")
        else:
            create_user(username, email, cognito_sub)
            print("User created successfully")

    except Exception as e:
        print(e)

    return event
