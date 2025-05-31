from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer

from .models import Questions,Choix,Reponses,ReponseUtilisateur,Actualite, ContactMessage, CustomUser


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choix
        fields = ['id','text','is_true']
        
        
class QuestionSerializers(serializers.ModelSerializer):
    choix = ChoiceSerializer(many=True,read_only=True)
    class Meta:
        model = Questions
        fields = ['id','text','matieres','choix']
        
    
class ReponseSerializers(serializers.ModelSerializer):
    question_text = serializers.CharField(source='question.text',read_only=True)
    reponse_text = serializers.CharField(source='response.text',read_only=True)
    class Meta:
        model = Reponses
        fields = ['id', 'question', 'question_text', 'reponse', 'reponse_text', 'is_correct', 'date']
        
    
class ReponseUtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReponseUtilisateur
        fields = '__all__'


class ActualiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actualite
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'niveau',"whatsapp")
        
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = CustomUser
        fields = ("id", "username","whatsapp", "email", "niveau")