pip3 install -r requirements.txt
python3.12 manage.py collectstatic --noinput
# Kiểm tra thư mục staticfiles
if [ ! -d "static" ]; then
    echo "Error: Directory 'static' was not created."
    exit 1
fi
