var db=require('../config/connection')
var collection=require('../config/collections');
var objectID=require('mongodb').ObjectId
const { PRODUCT_COLLECTION } = require('../config/collections');
const { response } = require('express');
const { ObjectID } = require('bson');
module.exports={
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.insertedId)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products= await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectID(proId)}).then((response)=>{
               
                resolve(response)
            })
        })
    }
}