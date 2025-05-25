from django.contrib import admin
from .models import Questions,Choix, Actualite, ContactMessage, CustomUser
# Register your models here.


class ChoiceInline(admin.TabularInline):
    model = Choix
    extra = 1
    
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ("matieres",)
    list_filter = ("text","matieres")
    search_fields = ("text",)
    

admin.site.register(Questions,QuestionAdmin)
admin.site.register(Actualite)
admin.site.register(ContactMessage)
admin.site.register(CustomUser)