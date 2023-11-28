const sql = require("./db.js");
console.log("쿼리");

// constructor
const Posts = function(post) {
  console.log("쿼리_디스");
  this.title = post.title;
  this.content = post.content;
  // this.published = post.published;
};

Posts.create = (newTutorial, result) => {
  console.log("쿼리_create");
  sql.query("INSERT INTO posts SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created posts: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Posts.findById = (id, result) => {
  console.log("쿼리_findById");
  // sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
    let query = `SELECT posts.id, posts.title, posts.content, posts.created_at, users.nickname FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.id = ${id}`;
  sql.query(query, (err, res) => {  
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found posts: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Posts.getAll = (title, result) => {
  console.log("쿼리_getAll");
  // let query = "SELECT * FROM posts";
    let query = "SELECT posts.id, posts.title, posts.content, posts.created_at, users.nickname FROM posts INNER JOIN users ON posts.user_id = users.id";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
};

Posts.getAllPublished = result => {
  console.log("쿼리_getAllPublished");
  // sql.query("SELECT * FROM posts WHERE published=true", (err, res) => {
  sql.query("SELECT * FROM posts WHERE", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
};

Posts.updateById = (id, post, result) => {
  console.log("쿼리_updateById");
  sql.query(
    // "UPDATE posts SET title = ?, content = ?, published = ? WHERE id = ?",
    // [post.title, post.content, post.published, id],
    "UPDATE posts SET title = ?, content = ?, WHERE id = ?",
    [post.title, post.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated posts: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

Posts.remove = (id, result) => {
  console.log("쿼리_remove");
  sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted posts with id: ", id);
    result(null, res);
  });
};

Posts.removeAll = result => {
  console.log("쿼리_removeAll");
  sql.query("DELETE FROM posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} posts`);
    result(null, res);
  });
};

module.exports = Posts;
