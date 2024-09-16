from django.http import HttpResponse
from django.shortcuts import render




def home(request):
    # return HttpResponse(" home is here")
    return render(request, 'index.html')

def about(request):
    # return HttpResponse(" about is here")
    return render(request , 'about.html')


def alpha(request):
    # return HttpResponse(" alpha is here")
    return render(request,'alpha.html')