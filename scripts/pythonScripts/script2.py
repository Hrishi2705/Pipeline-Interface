import pymongo

# Initialize MongoDB connection
client = pymongo.MongoClient("mongodb+srv://hrishikesh:qwertyuiop@cluster0.lz0edaw.mongodb.net/")  # Replace with your MongoDB server URL
db = client["data"]

#code
print(f'Python Script completed')