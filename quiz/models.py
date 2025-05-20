from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Questions (models.Model):
    matieres = [
        ("svt","Svt"),
        ("maths","Mathématiques"),
        ("francais","Français"),
        ("physique","Physique"),
        ("chimie","Chimie"),
        ("histoire","Histoire"),
        ("geo","Geographie"),
        ("psycho","Psychotecnique"),
        ("actu","Actualité"),
        ("Culture","Cultureeneral")
    ]
    
    text = models.TextField()
    matieres = models.CharField(max_length=20,choices=matieres)
    created_date = models.DateField(auto_now_add=True,verbose_name='Date de création')
    
    def __str__(self):
        return self.text[:50]
    

class Choix(models.Model):
    text = models.CharField(300)
    question = models.ForeignKey(Questions,related_name='choix',on_delete=models.CASCADE)
    is_true = models.BooleanField(default=False)
    
    
    def __str__(self):
        return self.text
    

class Reponses(models.Model):
    question = models.ForeignKey(Questions,on_delete=models.CASCADE)
    reponse = models.ForeignKey(Choix,on_delete=models.CASCADE)
    is_correct = models.BooleanField()
    date = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f"{self.question.text}->{self.reponse.text} ({'✅' if self.is_correct else '❌'})"
    
    
class CustomUser(AbstractUser):
    NIVEAUX = (
    ('BEPC', 'BEPC'),
    ('BAC', 'BAC'),
    ('LICENCE', 'LICENCE'),)
    niveau = models.CharField(max_length=20, choices=NIVEAUX, default='BAC')    



class ReponseUtilisateur(models.Model):
    utilisateur = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)
    reponse_donnee = models.TextField()
    bonne_reponse = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.utilisateur.username} - {self.question.texte[:30]}"


    
    
class Actualite(models.Model):
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    date_pub = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titre
    
    
class ContactMessage(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    date_envoyee = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message de {self.nom}"