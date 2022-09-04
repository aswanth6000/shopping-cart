var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products',{admin:true,products})

  })
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files&&req.files.Image);

  productHelpers.addProduct(req.body,(insertedId)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+insertedId+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }else {
          console.log(err);
        }

    })
  })

})
module.exports = router;
