from django.shortcuts import render
from .models import*
from django.shortcuts import get_object_or_404
# Create your views here.


def code(request):
    code=Code.objects.all()
    return render(request,'code/code.html',{'code':code})


def code_details(request ,code_id):

    code_App=get_object_or_404(Code, pk=code_id)
    return render(request, 'code/code_details.html',{'code':code})