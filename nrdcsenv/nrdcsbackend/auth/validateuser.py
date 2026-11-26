
from functools import wraps
from auth.CacheManager import CacheManager
from django.utils.decorators import method_decorator
from django.http import HttpResponseForbidden

def validate_caller():
    """
    Decorator method to validate caller
    :return:
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            cache_session_token = CacheManager.getcache('session_token')
            print("cache_session_token")
            print(cache_session_token)
            if cache_session_token is not None:
                bearer_token = request.headers['Authorization'].split(' ')[1]
                if cache_session_token == bearer_token:
                    print("bearer_token")
                    print(bearer_token)
                    return view_func(request, *args, **kwargs)
                else:
                    return HttpResponseForbidden("Forbidden")
            else:
                return HttpResponseForbidden("Forbidden")
        return wrapper
    return decorator