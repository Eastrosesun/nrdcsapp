
#from .exceptions import CacheOpearationError
from django.conf import settings
from django.core.cache import caches
from io import StringIO

class CacheManager():
    """
    Manager class enables to place and retrieve object into and from cache
    """
    @staticmethod
    def setcache(key, value, timeout = settings.SESSION_VALIDITY):
        try:
            cache = caches['default']
            cache.set(key, value, timeout)
        except:
            output = StringIO()
            CacheManager.logger.error(output.getvalue())

    @staticmethod
    def getcache(key):
        try:
            cache = caches['default']
            return cache.get(key, None)
        except:
            output = StringIO()
            CacheManager.logger.error(output.getvalue())