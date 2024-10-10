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
```

## Requirements

- Python 3.12
- Django (rest framework)
- Postgres

## Environments

```bash
cd src
cp .env.example .env
```

## Add new package

```bash
pip install package_name

pip freeze > requirements.txt
```

## Formatter

```bash
pre-commit run --all-files
```

## Command

```bash
cd src

# create app
python manage.py startapp app

# create supper user
python manage.py createsuperuser

# make migrations
python manage.py makemigrations

# apply migrations
python manage.py migrate

# run server
python manage.py runserver
```
