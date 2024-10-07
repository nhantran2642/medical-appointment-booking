## Project structure

```shell
└── src
    ├── api                                 - app main
    |   |── constants
    |   |    ├── constant.py
    |   |    ├── error_code.py
    │   |    ├── message.py
    │   ├── asgi.py
    │   ├── wsgi.py
    │   ├── urls.py
    │   └── settings.py
    ├── authentication                      - app authentication
    │   ├── migrations
    │   ├── admin.py
    │   ├── models.py
    │   ├── serializers.py
    │   ├── urls.py
    │   └── views.py
    ├── {other_app}                         - other app
    ├── utilities
    ├── manage.py                           - manager project
├── README.md
├── requirements.txt                        - package