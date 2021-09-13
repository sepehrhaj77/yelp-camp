const express = require('express')
const router = express.Router()

const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    //SHOW all campgrounds
    .get(catchAsync(campgrounds.index))
    //CREATE new campground to database - POST request
    //  upload.array('image') -> image corresponds to the html tag "name" of the input field
    .post(isLoggedIn, upload.array('image'), validateCampground,  catchAsync(campgrounds.createCampground))
    

//CREATE new campground - creation form
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    //SHOW one campground
    .get(catchAsync(campgrounds.showCampground))
    //UPDATE one campground - PUT request
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    //DELETE one campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

//UPDATE one campground - form page
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router
