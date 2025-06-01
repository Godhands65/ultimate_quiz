from django.contrib import admin
from .models import Questions,Choix, Actualite, ContactMessage, CustomUser
# Register your models here.


class ChoiceInline(admin.TabularInline):
    model = Choix
    extra = 1
    
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ("text","matieres",)
    list_filter = ("matieres",)
    search_fields = ("text",)
    
class MessagesAdmin(admin.ModelAdmin):
    model = ContactMessage
    list_display = ("nom","email","message",)
    
    
class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ("username","email","whatsapp",)
    search_fields = ("username","email",)
    
    
admin.site.register(Questions,QuestionAdmin)
admin.site.register(Actualite)
admin.site.register(ContactMessage,MessagesAdmin)
admin.site.register(CustomUser,CustomUserAdmin)