from celery import current_app as current_celery_app
from celery import Task

def make_celery(app):
    print("creating celery app", flush=True)
    celery = current_celery_app
    celery.conf.broker_url = app.config["REDIS_BROKER_URL"]
    celery.conf.result_backend = app.config["REDIS_BROKER_URL"]
    celery.conf.broker_pool_limit = app.config["BROKER_POOL_LIMIT"]
    celery.conf.broker_connection_retry = app.config["BROKER_CONNECTION_RETRY"]
    celery.conf.broker_connection_retry_on_startup = app.config["BROKER_CONNECTION_RETRY_ON_STARTUP"]
    
    class ContextTask(Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)
    
    celery.Task = ContextTask
    
    return celery