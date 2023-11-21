from sqlalchemy import Column, Integer, String, Text, DateTime, UniqueConstraint
from sqlalchemy.dialects.mysql import DATETIME
from sqlalchemy.ext.declarative import declarative_base
from src import db
from datetime import datetime

Base = declarative_base()


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    mail = db.Column(db.String())
    biometric_key = db.Column(db.Text())
    created_at = db.Column(DATETIME, default=datetime.utcnow, nullable=False)  # Ajout de la valeur par défaut

    def __init__(self, username, biometric_key):
        self.username = username
        self.mail = 'toto'
        self.biometric_key = biometric_key

    __table_args__ = (
        UniqueConstraint('username'),
    )
