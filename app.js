const express = require("express");
const app = express();
require("dotenv").config();
require("./db.connection");
const PORT = process.env.PORT || 9000;
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const categoryRouter = require("./routes/category");
var createError = require('http-errors');
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, 
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});

app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/", authRouter);
app.use("/posts", postRouter);
app.use("/", categoryRouter);

// For 404 errors
app.use(function (req, res, next) {
    if (!req.user) return next(createError(404, 'Page Not Found!!'))
    next()
})

// For other errors
app.use(function(err, req, res, next) {
    // response error page
    res.status(err.status || 500);
    res.send(err);
  });


app.listen(process.env.PORT || 9000, (err, succ) => {
    if(err){
        console.log("Error: ", err);
    } else {
        console.log(`Server is listening at ${PORT}`);
    }
})