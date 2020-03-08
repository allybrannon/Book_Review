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
      data: data
    },
    partials: {
      partial: "partial-index"
    }
  });
});

router.post("/", async function(req, res) {
  console.log("req body:", req.body);
  const { book_id, review_title, review_text } = req.body;
  const postData = await bookModel.addReview(
    book_id,
    review_title,
    review_text
  );
  console.log(postData);
  res.sendStatus(200);
});

module.exports = router;
