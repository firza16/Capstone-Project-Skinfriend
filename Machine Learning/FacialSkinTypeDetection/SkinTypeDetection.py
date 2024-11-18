import numpy as np
from PIL import Image
from io import BytesIO
import tensorflow as tf
import argparse

class_names = ['dry', 'normal', 'oily', 'sensitive']

def predict_image(image, model):
    image = image.resize((224, 224))
    image_array = np.array(image)
    
    image_array = image_array / 255.0 
    
    image_array = np.expand_dims(image_array, axis=0) 
    
    predictions = model.predict(image_array)
    
    probabilities = predictions[0]
    
    class_probabilities = {class_names[i]: prob * 100 for i, prob in enumerate(probabilities)}
    
    predicted_class = np.argmax(probabilities)
    predicted_probability = np.max(probabilities) * 100
    
    return class_probabilities, class_names[predicted_class], predicted_probability

def main():
    image_path = "C:/Users/Hizkia/Skinfriend/Test_Images/Yohanes.jpg"

    try:
        model = tf.keras.models.load_model("FaceDetectionModel.keras")
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}")
        return

    try:
        with open(image_path, "rb") as f:
            image_data = f.read()

        image = Image.open(BytesIO(image_data))

        image.show()

        class_probabilities, predicted_class, probability = predict_image(image, model)

        print(f"Predicted Class: {predicted_class.capitalize()} | Probability: {probability:.2f}%")
        print("\nProbabilities for each class:")
        for class_name, prob in class_probabilities.items():
            print(f"- {class_name.capitalize()}: {prob:.2f}%")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    main()