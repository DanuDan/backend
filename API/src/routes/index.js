const express = require('express')

const router = express.Router()

//Controller
const {addUser, getUsers, getUser, updateUser, deleteUser, getProfile, updateProfile}  = require ('../controllers/user')
const {getProduct, addProduct, updateProduct, getUserProduct, getProducts, deleteProduct}  = require ('../controllers/product')
const {getCategory, addCategory, updateCategory, getCategories, getProductsCategories, deleteCategory}  = require ('../controllers/category')
const {register, login} = require('../controllers/auth')

//User-Profile-Login-Register Route
router.post('/user', addUser);
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.post("/register", register);
router.get("/login", login);
router.get('/profile', getProfile);
router.patch('/profile/:id', updateProfile)

//Product
router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.get('/products', getUserProduct)
router.post('/product', addProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

//Category
router.post('/category', addCategory);
router.patch('/category/:id', updateCategory)
router.get('/category', getCategories);
router.get('/category/:id', getCategory);
router.delete('/category/:id', deleteCategory);

router.get('/categoryProduct', getProductsCategories);

module.exports = router