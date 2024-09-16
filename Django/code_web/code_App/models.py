from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User 
# Create your models here.
class Code(models.Model):
    CODE_TYPE_CHOICES=[
    ('ML', 'MASALA'),
    ('GR', 'GINGER'),
    ('KL', 'KIWI'),
    ('PL', 'PLAIN'),
    ('EL', 'ELAICHI'),
    ]
    name=models.CharField(max_length=100)
    image=models.ImageField(upload_to='codes/')
    date_added=models.DateTimeField(default=timezone.now)
    type = models.CharField(max_length=2, choices=CODE_TYPE_CHOICES, default='ML')
    description=models.TextField(default="")

    def __str__(self):
     return self.name


# one to many

class CodeReview(models.Model):
   code=models.ForeignKey(Code, on_delete=models.CASCADE, related_name='review')
   user=models.ForeignKey(User,on_delete=models.CASCADE)
   rating=models.IntegerField()
   comment=models.TextField()
   date=models.DateTimeField(default=timezone.now)


   def __str__(self):
      return f"{self.user.username}review for {self.code.name} "
   





# Many to Many 

class comp(models.Model):
   name=models.CharField(max_length=100)
   location=models.CharField(max_length=100)
   code_varieties=models.ManyToManyField(Code,related_name='company')

   def __str__(self):
      return self.name
   

# one to one 
class CodeCertificates(models.Model):
   code=models.OneToOneField(Code,on_delete=models.CASCADE, related_name='certificate')
   certificate_number=models.CharField(max_length=100)
   issued_data=models.DateTimeField(default=timezone.now)
   valid_until= models.DateTimeField


def __str__(self):
      return f"Certificate for {self.name.code}"
   