from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ReponseViewSet,QuestionViewSet,ReponseUtilisateurViewSet,ActualiteViewSet, ContactMessageViewSet,random_questions


router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'answers', ReponseViewSet)
router.register(r'reponses', ReponseUtilisateurViewSet, basename='reponseutilisateur')
router.register(r'actualites', ActualiteViewSet)
router.register(r'contact', ContactMessageViewSet)


urlpatterns = [path("questions/random/", random_questions),]
urlpatterns += router.urls