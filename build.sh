#!/usr/bin/env bash

# --- Activer le script en cas d'erreur ---
set -o errexit

# --- Appliquer les migrations Django ---
echo "Applying database migrations..."
python manage.py migrate --noinput

# --- Collecte des fichiers statiques ---
echo "Collecting static files..."
python manage.py collectstatic --noinput

python createsuperuser.py
