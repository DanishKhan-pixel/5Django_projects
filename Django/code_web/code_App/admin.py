from django.contrib import admin
from .models import*
# Register your models here.

class CodeReview(admin.TabularInline):
    model=CodeReview
    extra=2

class CodeAdmin(admin.ModelAdmin):
    list_display=('name','type','date_added')
    inlines=[CodeReview]

class compAdmin(admin.ModelAdmin):
    list_display=('name','location')
    # filter_horizontal=('code_varities')


class CertificateAdmin(admin.ModelAdmin):
    list_display=('code',)



admin.site.register(Code,CodeAdmin)
admin.site.register(CodeCertificates,CertificateAdmin)
admin.site.register(comp,compAdmin)

