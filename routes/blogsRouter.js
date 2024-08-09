const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');
const { connection } = require("../database/sql");

// Configure storage settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Route for handling the form submission
router.post('/', upload.single('featuredImg'), (req, res) => {
  const blogTitle = req.body.blogTitle;
  const blogShortDescription = req.body.blogShortDescription;
  const author = req.body.author;
  const category = req.body.category;
  const content = req.body.content;
  const currentDate = req.body.currentDate;
  const featuredImg = req.file ? req.file.filename : null;

  if (!featuredImg) {
    return res.status(400).send('Image upload failed');
  }

  const dataObj = {
    blogTitle: blogTitle,
    blogShortDescription: blogShortDescription,
    author: author,
    category: category,
    content: content,
    currentDate: currentDate,
    featuredImg: featuredImg,
  };

  connection.query("INSERT INTO blogs SET ?", dataObj, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("Data Stored in Database");
      res.redirect('http://localhost:3000/add-blog');
    }
  });

  // res.status(200).send('Blog saved successfully!');
});

module.exports = router;
