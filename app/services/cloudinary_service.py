import os
import cloudinary
import cloudinary.uploader

cloudinary.config(

    cloud_name=os.getenv(
        "CLOUDINARY_CLOUD_NAME"
    ),

    api_key=os.getenv(
        "CLOUDINARY_API_KEY"
    ),

    api_secret=os.getenv(
        "CLOUDINARY_API_SECRET"
    ),

    secure=True
)

def upload_file(file):
    # Citim conținutul fișierului direct în memorie pentru a fi siguri că nu pleacă gol
    file_bytes = file.file.read()
    result = cloudinary.uploader.upload(file_bytes)
    return result["secure_url"]