pip install -r reauirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
python createsuperuser.py