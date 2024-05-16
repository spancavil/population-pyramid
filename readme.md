
# Population pyramid project

A fullstack project using Django REST Framework in backend and Vite with React And Typescript in the frontend.




## Demo

![App Screenshot](https://s10.gifyu.com/images/SfxbH.gif)


## Features

#### Backend
- Django REST Framework
- django-cors-headers for allowing different origins.

#### Frontend
- Vite framework with Typescript
- ChartJS library: horizontal barchart

## Installation and run

#### Backend installations:

a) Create virtual environment
```bash
  cd backend
  python -m venv .venv
  . .venv/bin/activate

```
b) Install modules
```bash
  pip install -r requirements.txt
```

c) Make migrations
```bash
  cd population_backend
  python manage.py makemigrations
  python manage.py migrate
```

d) Add fixture data
```bash
  python manage.py loaddata dataCountryYear.json dataRangeYears.json dataPopulation.json
```

e) Start server
```bash
  python manage.py runserver
```

#### Frontend

a) Install dependencies
```bash
  cd frontend-react-ts-vite
  pnpm i
```
b) Copy .env.example to .env file and uncomment VITE_API_URL

c) Run frontend server:
```bash
  npm run dev
```