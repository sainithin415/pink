const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, handleError } = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const googleRouter = require("./routes/googleRoutes");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const passportSetup = require("./utils/passpost");
const cors = require("cors");
const tutCatRouter = require("./routes/tutCatRoutes");
const tutorialRouter = require("./routes/tutorialRoutes");
const newsLetterRouter = require("./routes/newsLetterRoutes");
const reviewRouter = require("./routes/reviewsRoutes");
const contactRouter = require("./routes/contactRoutes");
const videoRouter = require("./routes/videoRoutes");
const docRouter = require("./routes/docRoutes");
const docCatRouter = require("./routes/docCatRoutes");
const blogCatRouter = require("./routes/blogCatRoutes");
const blogRouter = require("./routes/blogRoutes");
const videoCatRouter = require("./routes/videoCatRoutes");
const courseCatRouter = require("./routes/courseCatRoutes");
const courseRouter = require("./routes/courseRoutes");
const rateLimitter = require("./utils/reqLimit");
const workRouter = require("./routes/workRoutes");
const projectCatRouter = require("./routes/projectCatRoutes");
const projectRouter = require("./routes/projectRoutes");
const bookRouter = require("./routes/bookRoutes");
const qnaRouter = require("./routes/qnaRoutes");

dbConnect();
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 12 * 60 * 60,
    }),
  })
);

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`<a href="http://localhost:4000/google">login With Google</a>`);
});
app.set("trust proxy", 1);
/* app.use(
  "/api",
  rateLimitter(60 * 60 * 1000, "Secs", 50, "Only 50 Requests Allowed")
); */
app.use("/api/user", userRouter);
app.use("/", googleRouter);
app.use("/api/tutorial/category", tutCatRouter);
app.use("/api/tutorial", tutorialRouter);
app.use("/api/newsletter", newsLetterRouter);
app.use("/api/review", reviewRouter);
app.use("/api/contact", contactRouter);
app.use("/api/video", videoRouter);
app.use("/api/video-category", videoCatRouter);
app.use("/api/doc", docRouter);
app.use("/api/doc/category", docCatRouter);
app.use("/api/blog/category", blogCatRouter);
app.use("/api/blog", blogRouter);
app.use("/api/course/category", courseCatRouter);
app.use("/api/course", courseRouter);
app.use("/api/work", workRouter);
app.use("/api/project/category", projectCatRouter);
app.use("/api/project", projectRouter);
app.use("/api/book-session", bookRouter);
app.use("/api/qna", qnaRouter);

app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});