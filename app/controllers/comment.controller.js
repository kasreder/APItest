const Comment = require("../models/comment.model.js");
console.log("기능구현 create/ findAll/ findOne / findAllPublished/ delete");
console.log("기능구현 프론트로 날리기");

// Create and Save a new Tutorial
exports.commentcreate = (req, res) => {
  console.log("기능구현_create 땡겨오기_create");
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Tutorial
  const comment = new Comment({
    comment_id : req.body.comment_id,
    user_id : req.body.user_id || 9,
    post_id : req.body.post_id_id || 1020,
    comment_content: req.body.comment_content,
    parent_comment_id: req.body.parent_comment_id,
    parent_comment_order : req.body.parent_comment_order || 0,
    comment_created_at : req.body.comment_created_at
  });

  // Save Tutorial in the database
  Comment.commentcreate(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};
