const express = require("express"),
  router = express.Router();
bookModel = require("../models/bookModel");

/* GET home page. */

router.get("/", async function(req, res, next) {
  const data = await bookModel.getAllBooks();
  console.log("data", data);

  res.render("template", {
    locals: {
      title: "Book Review",
      data: data,
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: "partial-index"
    }
  });
});

router.post("/", async function(req, res) {
  console.log("req body:", req.body);
  const user_id = req.session.user_id;
  const { book_id, reviews_title, review_review } = req.body;
  const postData = await bookModel.addReview(
    user_id,
    book_id,
    reviews_title,
    review_review
  );
  console.log(postData);
  res.sendStatus(200);
});

module.exports = router;
