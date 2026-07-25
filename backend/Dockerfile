FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install system dependencies (build-essential, postgres libraries for psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the project files
COPY . /app/

# Port exposes
EXPOSE 8000

# Gunicorn start
CMD sh -c "python manage.py flush --no-input && python manage.py loaddata db_backup.json && gunicorn --bind 0.0.0.0:8000 portfolio.wsgi:application"
