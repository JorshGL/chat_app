from os.path import join, dirname
from dotenv import load_dotenv
dotenv_path = join(dirname(__file__), '.env')  # Path to .env file
load_dotenv(dotenv_path)

DEBUG = True
MONGO_URI = "mongodb+srv://Yorch:3156276006@cluster0.hx8o9.mongodb.net/chat?retryWrites=true&w=majority"
