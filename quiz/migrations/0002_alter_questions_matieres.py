# Generated by Django 5.2 on 2025-05-20 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='matieres',
            field=models.CharField(choices=[('svt', 'Svt'), ('maths', 'Mathématiques'), ('francais', 'Français'), ('physique', 'Physique'), ('chimie', 'Chimie'), ('histoire', 'Histoire'), ('geo', 'Geographie'), ('psycho', 'Psychotecnique'), ('actu', 'Actualité'), ('Culture', 'Cultureeneral')], max_length=20),
        ),
    ]
