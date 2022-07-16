import os
from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')  # Path to .env file
load_dotenv(dotenv_path)

DEBUG = True
MONGO_URI = os.environ.get('MONGO_URI')
SECRET_KEY = os.environ.get('SECRET_KEY')
UPLOADS_FOLDER = os.path.join(os.path.dirname(__file__), '../uploads')
PROFILE_PICS_FOLDER = os.path.join(UPLOADS_FOLDER, 'profile_pics')
