const express = require("express"),
  router = express.Router();
bookModel = require("../models/bookModel");

router.get("/:entry_id?", async (req, res, next) => {
  const entryId = req.params.entry_id;
  const data = await bookModel.getById(entryId);
  const reviews = await bookModel.getAllReviewsByID(entryId);

  res.render("template", {
    locals: {
      title: data[0].name_book,
      data: data,
      reviews: reviews
    },
    partials: {
      partial: "partial-single-entry"
    }
  });
});

module.exports = router;
