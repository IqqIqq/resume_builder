from pymongo import MongoClient
import os

def get_database():
    client = MongoClient(os.getenv("MONGODB_URI"))
    return client.resume_builder