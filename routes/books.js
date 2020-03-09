const express = require("express"),
  router = express.Router();
bookModel = require("../models/bookModel");

router.get("/:entry_id?", async (req, res, next) => {
  const entryId = req.params.entry_id;
  const data = await bookModel.getById(entryId);
  const reviews = await bookModel.getAllReviewsByID(entryId);

  res.render("template", {
    locals: {
      title: data[0].book_name,
      data: data,
      reviews: reviews,
      is_logged_in: req.session.is_logged_in,
      users_id: req.session.users_id
    },
    partials: {
      partial: "partial-single-entry"
    }
  });
});

module.exports = router;
