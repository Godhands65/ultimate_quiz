#!/usr/bin/env bash
set -o errexit

echo "🔁 Applying database migrations..."
python manage.py migrate

echo "🎨 Collecting static files..."
python manage.py collectstatic --noinput

echo "👤 Checking for superuser..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username="Kader").exists():
    User.objects.create_superuser("Kader", "admin@example.com", "adminpass123")
    print("✅ Superuser 'Kader' created.")
else:
    print("ℹ️ Superuser 'Kader' already exists.")
EOF
