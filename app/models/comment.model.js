const sql = require("./db.js");
console.log("쿼리");

// constructor
const Comments = function (comment) {
  console.log("쿼리_디스");
  this.user_id = comment.user_id;
  this.post_id = comment.post_id;
  this.comment_content = comment.comment_content;
  this.parent_comment_id = comment.parent_comment_id;
  this.parent_comment_order = comment.parent_comment_order;
  this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ') //현재 시간을 MySQL 형식으로 변환
  // this.published = post.published;
};

Comments.commentcreate = (newComment, result) => {
  console.log("쿼리_create");
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created comments: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};
module.exports = Comments;
