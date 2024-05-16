from django.db import models


# Create your models here.
class CountryYear(models.Model):
    country = models.CharField(max_length=150)
    year = models.IntegerField()


class RangeYears(models.Model):
    range = models.CharField(max_length=15)


class Data(models.Model):
    fk_country = models.ForeignKey(CountryYear, related_name='data', on_delete=models.CASCADE)
    fk_range_years = models.ForeignKey(RangeYears, related_name='data', on_delete=models.CASCADE)
    gender = models.CharField(max_length=1)
    value = models.FloatField()
