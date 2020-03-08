const db = require("./conn");

class BookModel {
  constructor(id, book_name, book_author) {
    this.id = id;
    this.bookName = book_name;
    this.bookAuthor = book_author;
  }

  static async getAllBooks() {
    try {
      const response = await db.any(`SELECT * FROM books;`);
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }

  static async getById(id) {
    try {
      const response = await db.any(`SELECT * FROM books WHERE id = ${id} `);
      return response;
    } catch (error) {
      console.error("Error", error);
    }
  }

  static async addReview(r_id, review_title, review_text) {
    try {
      const response = await db.one(
        `INSERT INTO reviews (users_id, book_id, title, review, stars)
                VALUES ($1,$2,$3,$4,$5) RETURNING id`,
        [1, r_id, review_title, review_text, 5]
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error:", error);
      return error;
    }
  }

  static async getAllReviewsByID(bookID) {
    // get all the reviews for a given book given a specific book id.
    try {
      const response = await db.any(
        `SELECT books.book_name , reviews.title , reviews.stars, reviews.review, users.first_name
                from books   INNER JOIN  reviews ON books.id = reviews.book_id 
                INNER JOIN users on users.id = reviews.users_id WHERE reviews.book_id = ${bookID}`
      );
      return response;
    } catch (error) {
      console.error("ERROR:", error);
      return error;
    }
  }
}

module.exports = BookModel;
