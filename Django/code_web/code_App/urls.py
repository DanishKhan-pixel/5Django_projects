from django.urls import path
from . import views

urlpatterns = [

    path('',views.code, name='code'),
    path('<int:code_id>', views.code_details, name='details'),
   


]
