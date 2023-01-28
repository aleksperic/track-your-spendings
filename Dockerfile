FROM python:3.10-slim

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /api

COPY ./requirements.txt /api/requirements.txt

RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

COPY . /api/

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]