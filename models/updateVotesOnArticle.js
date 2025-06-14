const db = require("../db/connection");

const updateVotesOnArticle = (votes = 0, articleId) => {
  return db
    .query(
      `UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *;`,
      [votes, articleId]
    )
    .then(({ rows: [article] }) => {
      return article;
    })
    .catch((err) => {
      if (err.code === "22P02") {
        err.message = `article_id must be an integer`;
      }
      throw err;
    });
};

module.exports = updateVotesOnArticle;
