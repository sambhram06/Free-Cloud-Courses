import User_signup
import User_sync_course
import User_course_progress

def lambda_handler(event, context):
    print("Event keys:", event.keys())

    if 'triggerSource' in event:
        print("Routing to user_signup handler")
        return User_signup.handler(event, context)

    if event.get("httpMethod") == "GET":
        print("Routing to user_course_progress handler")
        return User_course_progress.handler(event, context)

    print("Routing to sync_course handler")
    return User_sync_course.handler(event, context)
