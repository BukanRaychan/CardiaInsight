from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np
import joblib as jb
from RandomForest import RandomForest

app = Flask(__name__)

@app.route('/train-model')
def train_model():
    try:
        # Read the dataset
        data = pd.read_excel('cardiovascular-data-set.xlsx')

        #Split the data into features and result
        X = data.drop(columns=['id', 'cardio']).values
        y = data['cardio'].values

        clf = RandomForest(n_trees=4)
        clf.fit(X, y)

        joblib_file = "random_forest_model.joblib"
        jb.dump(clf, joblib_file)

        return f'Model saved to {joblib_file}'
    except Exception as e:
        return f'Failed to make the train model, error: {e}'
    
    
@app.route('/get-prediction', methods=['POST'])
def get_prediction():
    try:
        data_values = [float(value) for value in request.form.values()]

        # Create a list of lists for the input data
        data = [data_values]

        loaded_clf = jb.load("random_forest_model.joblib")

        # Use the loaded model for predictions
        new_predictions = loaded_clf.predict(data).tolist()

        return jsonify({'result' : new_predictions[0]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/test')
def method_name():
    try:
        data = pd.read_excel('cardiovascular-data-set.xlsx')

        selected_data = data.iloc[:,:]  # Change the slicing range as needed
            
        X = selected_data.drop(columns=['id', 'cardio']).values
        y = selected_data['cardio'].values

        print(X, y)

        loaded_clf = jb.load("random_forest_model.joblib")

        predictions = loaded_clf.predict(X)

        acc =  np.sum(y == predictions) / len(y)

        return jsonify({
            'testing_data_X': X.tolist(),  # Convert X to list
            'testing_data_y': y.tolist(),  # Convert y to list
            'the_predictions': predictions.tolist(),  # Convert predictions to list
            'accuracy': str(acc),
            'data_test_size': len(selected_data)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug = True)