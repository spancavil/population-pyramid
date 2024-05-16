from django.urls import path
from . import views

urlpatterns = [
    path('country_years', views.get_country_years),
    path('range_years', views.range_years),
    path('population_data', views.population_data),
]
