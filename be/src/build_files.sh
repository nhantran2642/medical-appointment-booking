pip3 install -r requirements.txt
python3.12 manage.py collectstatic --noinput

if [ ! -d "staticfiles" ]; then
    echo "Error: Directory 'staticfiles' was not created."
    exit 1
fi
