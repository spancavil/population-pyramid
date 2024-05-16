from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import CountryYear, RangeYears, Data
from .serializers import CountryYearSerializer, DataSerializer, RangeYearsSerializer, DataSerializerPost


@api_view(['GET'])
def get_country_years(request):
    #Query set
    countryYear = CountryYear.objects.all()
    #Serialize into JSON
    countryYearJson = CountryYearSerializer(countryYear, many=True)
    return Response(countryYearJson.data)


@api_view(['GET', 'POST'])
def range_years(request):
    if request.method == 'GET':
        #Query set
        rangeYears = RangeYears.objects.all()
        #Serialize into JSON
        rangeYearsJson = RangeYearsSerializer(rangeYears, many=True)
        return Response(rangeYearsJson.data)
    if request.method == 'POST':
        serializer = RangeYearsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def population_data(request):
    if request.method == 'POST':
        country_id = request.data.get('fk_country')
        if not CountryYear.objects.filter(pk=country_id).exists():
            return Response({'error': 'CountryYear with ID {} does not exist.'.format(country_id)}, status=400)
        range_years_id = request.data.get('fk_range_years')
        if not RangeYears.objects.filter(pk=range_years_id).exists():
            return Response({'error': 'RangeYears with ID {} does not exist.'.format(range_years_id)}, status=400)
        serializer = DataSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    if request.method == 'GET':
        year_filter_raw = request.query_params.get('year')
        year_filter = 2022
        if year_filter_raw !=None and year_filter_raw.isnumeric():
            year_filter = int(year_filter_raw)
        population = Data.objects.all().filter(fk_country__year__exact=year_filter) # Well played!
        populationJson = DataSerializer(data=population, many=True)
        if(populationJson.is_valid()):
            print("is valid")
        listFormatted = []
        for data in populationJson.data:
            dataformatted = {
                "country": data.get('fk_country').get('country'),
                "year": data.get('fk_country').get('year'),
                "range": data.get('fk_range_years').get('range'),
                "value": data.get('value'),
                "gender": data.get('gender'),
            }
            listFormatted.append(dataformatted)
        return Response(listFormatted)
