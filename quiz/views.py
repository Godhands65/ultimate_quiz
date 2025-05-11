from rest_framework import viewsets
from .models import Questions,Reponses
from .serializers import QuestionSerializers,ReponseSerializers
from rest_framework import viewsets, permissions
from .models import ReponseUtilisateur,Actualite, ContactMessage
from .serializers import ReponseUtilisateurSerializer,ActualiteSerializer, ContactMessageSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Questions
from .serializers import QuestionSerializers
import random

# Create your views here.

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Questions.objects.all()
    serializer_class = QuestionSerializers




class ReponseViewSet(viewsets.ModelViewSet):
    queryset = Reponses.objects.all().order_by("-date")
    serializer_class = ReponseSerializers



class ReponseUtilisateurViewSet(viewsets.ModelViewSet):
    serializer_class = ReponseUtilisateurSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ReponseUtilisateur.objects.filter(utilisateur=self.request.user)

    def perform_create(self, serializer):
        serializer.save(utilisateur=self.request.user)
        
    
class ActualiteViewSet(viewsets.ModelViewSet):
    queryset = Actualite.objects.all().order_by('-date_pub')
    serializer_class = ActualiteSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-date_envoyee')
    serializer_class = ContactMessageSerializer


@api_view(['GET'])
# def random_questions(request):
#     niveau = request.GET.get('niveau', 'BAC')
#     limit = int(request.GET.get('limit', 40))
#     questions = Questions.objects.all()

#     # ❗ Tu peux filtrer par niveau si tu ajoutes un champ `niveau` à Questions
#     questions = list(questions)
#     selected = random.sample(questions, min(limit, len(questions)))

#     serializer = QuestionSerializers(selected, many=True)
#     return Response(serializer.data)
def random_questions(request):
    niveau = request.GET.get('niveau', 'BAC')
    limit = int(request.GET.get('limit', 40))

    questions = Questions.objects.all()
    # Si tu veux filtrer par niveau plus tard : .filter(niveau=niveau)

    questions_list = list(questions)
    if len(questions_list) == 0:
        return Response([])  # ✅ retourne une liste vide

    selected = random.sample(questions_list, min(limit, len(questions_list)))
    serializer = QuestionSerializers(selected, many=True)
    return Response(serializer.data)

