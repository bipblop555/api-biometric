FROM python:3.10-alpine

WORKDIR /app

COPY requirements/requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

COPY ./src /app

ENV FLASK_APP=app.py

CMD python app.py

