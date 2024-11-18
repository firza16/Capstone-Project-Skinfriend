import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import matplotlib.pyplot as plt

model = tf.keras.models.load_model("FaceDetectionModel.keras")

def recommend_skincare(skin_types, csv_file="Skincare.csv"):
    df = pd.read_csv(csv_file)
    
    recommended_products = df[df['skintype'].apply(lambda x: all(skin_type in x for skin_type in skin_types))]
    
    display_columns = ['product_name', 'brand', 'notable_effects', 'price', 'description', 'product_href']
    recommended_products = recommended_products[display_columns]
    
    if recommended_products.empty:
        print("No skincare products found for the selected skin types.\n")
        return

    recommendations = recommended_products.sample(n=5).reset_index(drop=True)
    
    print(f"Top 5 skincare recommendations for {', '.join(skin_types)} skin types:\n")
    num = 1
    for idx, row in recommendations.iterrows():
        print(f"{num}. {row['product_name']} by {row['brand']} - {row['price']}")
        print(f"   Effects: {row['notable_effects']}")
        print(f"   Links: {row['product_href']}\n")
        num += 1

def predict_and_recommend_skin_type(img_path, csv_file="Skincare.csv", threshold=65):
    img_array = prepare_image(img_path)
    predictions = model.predict(img_array)
    
    class_labels = ['Dry', 'Normal', 'Oily', 'Sensitive']
    predicted_probabilities = predictions[0]
    
    prediction_dict = {label: prob for label, prob in zip(class_labels, predicted_probabilities)}
    
    sorted_predictions = sorted(prediction_dict.items(), key=lambda x: x[1], reverse=True)
    
    combined_prob = 0
    selected_skin_types = []
    
    for label, prob in sorted_predictions:
        combined_prob += prob * 100
        selected_skin_types.append(f"{label}: {prob * 100:.2f}%")
        print(f"{label}: {prob * 100:.2f}%")
        if combined_prob >= threshold:
            break
    
    print(f"Selected Skin Types: {selected_skin_types}")
    print(f"Combined Probability: {combined_prob:.2f}%\n")

    img = load_img(img_path, target_size=(224, 224))
    plt.imshow(img)
    plt.title(f"Predicted: {' / '.join(selected_skin_types)}")
    plt.axis('off')
    plt.show()
    
    recommend_skincare([label.split(':')[0] for label in selected_skin_types], csv_file=csv_file)

def prepare_image(img_path, target_size=(224, 224)):
    img = load_img(img_path, target_size=target_size)
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

if __name__ == "__main__":
    img_path = 'Test_Images/Jonathan.jpg'
    csv_file = "Skincare.csv"
    
    predict_and_recommend_skin_type(img_path, csv_file)