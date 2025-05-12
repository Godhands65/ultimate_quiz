import os 
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTING_MODULE','config.settings')
django.setup()
User = get_user_model()
if not User.objects.filter(username="Kader_admin").exists():
    User.objects.create_superuser("Kader_admin","Ka6570der@gmail.com","Ka65fan70")
    print("Super user cree")
else:
    print("Superuser exitant")