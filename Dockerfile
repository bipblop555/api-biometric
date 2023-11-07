FROM python:3.10-alpine

WORKDIR /app

COPY requirements/requirement.txt /app/requirement.txt

RUN pip install -r /app/requirement.txt

COPY ./src /app

ENV FLASK_APP=app.py

CMD python app.py