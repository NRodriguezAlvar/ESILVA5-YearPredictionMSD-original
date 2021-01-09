from flask import Flask, jsonify, request, render_template
import numpy as np
import pandas as pd
import pickle
import random
import sklearn


app = Flask(__name__)

# Load the model.
filename1 = "svmSVC.sav"
filename2 = "randomForestClassifier.sav"
filename3 = "randomForestRegressor.sav"
global model1
global model2
global model3
model1 = pickle.load(open(filename1, 'rb'))
model2 = pickle.load(open(filename2, 'rb'))
model3 = pickle.load(open(filename3, 'rb'))

x = random.random()
#result = loaded_model.score(X_test, Y_test)
#print(result)

@app.route("/", methods=["GET"])
def start():
    return render_template('index.html')

@app.route("/predict", methods=["GET", "POST"])
def prediction():
    if request.method == "POST":
        req = request.form
        keys = list()
        values = list()
        for k, v in req.items():
            values.append(v)
            keys.append(k)

        d = {}
        for index, elem  in enumerate(values) :
            d[keys[index]] = [elem]
        df = pd.DataFrame(data=d)

        ypred1 = np.round(model1.predict(df),-1)
        ypred2 = np.round(model2.predict(df),-1)
        ypred3 = np.round(model3.predict(df),-1)
        return render_template('predict.html', data1=int(ypred1[0]), data2=int(ypred2[0]), data3=int(ypred3[0]))


app.run(debug=True)