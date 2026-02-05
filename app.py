from flask import Flask,render_template,request,jsonify
from pymongo import MongoClient

app=Flask(__name__)

life=MongoClient("mongodb://localhost:27017/")
db=life["Product_Finder"]
collection=db["Details"]

@app.route('/')
def home():
    items=list(collection.find())
    return render_template('index.html',items=items)

@app.route('/api/collection',methods=['GET'])
def toget():
    query={}
    brand=request.args.get('brand')
    if brand and brand!='def':
        query["brand"]=brand
    
    models=request.args.get('models')
    if models and models!='def':
        query["models"]=models

    resolution=request.args.get('displayresolution')
    if resolution and resolution!='def':
        query["displayresolution"]=resolution
    
    os=request.args.get('os')
    if os and os!='def':
        query["os"]=os
    
    inches=request.args.get('inches')
    if inches and inches!='def':
        query["inches"]=inches
    
    minprice=request.args.get('minprice')
    maxprice=request.args.get('maxprice')
    if minprice and maxprice:
        query["price"]={
            "$gte":int(minprice),
            "$lte":int(maxprice)
        }
    

    result=list(collection.find(query,{"_id":0}))
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)