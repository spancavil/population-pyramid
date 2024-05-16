from rest_framework import serializers
from base.models import CountryYear, RangeYears, Data

class CountryYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryYear
        fields = '__all__'  # Include all fields

class RangeYearsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RangeYears
        fields = '__all__'  # Include all fields

class DataSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'  # Include all fields

class DataSerializer(serializers.ModelSerializer):
    fk_country = CountryYearSerializer(read_only=True)  # Nested serialization
    fk_range_years = RangeYearsSerializer(read_only=True)

    class Meta:
        model = Data
        fields = '__all__'  # Explicit field selection
