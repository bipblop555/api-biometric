
class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:password@db:3306/back?charset=utf8mb4&collation=utf8mb4_general_ci'
    SQLALCHEMY_TRACK_MODIFICATIONS = False