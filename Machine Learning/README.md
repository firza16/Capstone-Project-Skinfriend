# Skin Type Detection Model and Skincare Recommendation

## Description
This project is a Machine Learning model designed to detect skin types from facial images and provide skincare recommendations based on a skincare dataset. The aim is to give personalized skincare advice to users based on their skin type detection results.

## Installation

### 1. Clone The Repositories
```bash
git clone https://github.com/firza16/Capstone-Project-Skinfriend.git
```

### 2. Setup Environment
Install Required Libraries: To install all necessary dependencies, you can use requirements.txt. Run the following command:

```bash
pip install -r requirements.txt
```

## Usage
Follow these steps to run the skin type detection model and use it to get personalized skincare recommendations:

### 1. Prepare Your Data
Before running the model, ensure you have the appropriate dataset:
- Skin Images: Download skin_type dataset to classify based on skin type (dry, oily, sensitive, or normal).
- Example: 

```plaintext
├── dry
│   └── dry1.jpg
│   └── dry2.jpg
├── oil
│   └── oil3.jpg
│   └── oil4.jpg
├── normal
│    └── normal5.jpg
│    └── normal6.jpg
├── sensitive
    └── sensitive5.jpg
    └── sensitive6.jpg
```
### 2. Run the Code
Step 1: Download the SkinTypeDetection.ipynb file and run all of the cells

Step 2: Download the SkincareRecommendation.ipynb file and run all of the cells

## Input and Output Description

#### Input:
Image files that will be preprocessed, including resizing, conversion to an array, addition of a batch dimension, and normalization of pixel values for model input.
#### Output:
- There are 4 predicted skin type class (e.g., "dry", "normal", "sensitive", "oily").
- The model will predict a probability between 0% and 100% for each class (e.g., 'Sensitive: 47.95%', 'Normal: 25.24%').

## Contributors

This project exists thanks to all the people who contribute.

<p align="center">
  <a href="https://github.com/Lasciarmi">
    <img src="https://avatars.githubusercontent.com/Lasciarmi" width="50" height="50" alt="username1"/>
  </a>
  <a href="https://github.com/alivianay">
    <img src="https://avatars.githubusercontent.com/alivianay" width="50" height="50" alt="username2"/>
  </a>
  <a href="https://github.com/hxzkia">
    <img src="https://avatars.githubusercontent.com/hxzkia" width="50" height="50" alt="username3"/>
  </a>
</p>


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Link Dataset

### ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
- [Skincare](https://github.com/Yunanouv/Skin-Care-Recommender-System/blob/main/export_skincare.csv)
### ![Kaggle](https://img.shields.io/badge/Kaggle-20BEFF?style=flat-square&logo=kaggle&logoColor=white)
- [SkinType](https://www.kaggle.com/datasets/muttaqin1113/face-skin-type)
