const sql = require("./db.js");
console.log("쿼리");

// constructor
const Posts = function (post) {
  console.log("쿼리_디스");
  this.title = post.title;
  this.user_id = post.user_id;
  this.board_id = post.board_id;
  this.content = post.content;
  this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ') //현재 시간을 MySQL 형식으로 변환
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
  // 게시글만 불러오기
  let queryPost =`
  SELECT
    posts.id,
    posts.title,
    posts.content,
    posts.created_at,
    users.nickname
  FROM
    posts
  INNER JOIN
    users ON posts.user_id = users.id
  WHERE
    posts.id = ${id}`;

  //댓글도 같이 불러오기
  // let queryPost = `
  // SELECT 
  //   p.id AS post_id, 
  //   p.title, 
  //   p.content AS post_content, 
  //   p.created_at AS post_created_at, 
  //   u.nickname AS post_author_nickname, 
  //   c.id AS comment_id, 
  //   c.comment_content, 
  //   c.created_at AS comment_created_at, 
  //   cu.nickname AS comment_author_nickname
  // FROM 
  //   posts p
  // INNER JOIN 
  //   users u ON p.user_id = u.id
  // LEFT JOIN 
  //   comments c ON p.id = c.post_id
  // LEFT JOIN 
  //   users cu ON c.user_id = cu.id
  // WHERE 
  //   p.id = ${id}
  // ORDER BY 
  //   c.created_at ASC;
  //`;

  sql.query(queryPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // if (res.length) {
    //   console.log("found posts: ", res[0]);
    //   result(null, res[0]);
    //   return;
    // }

    // not found Tutorial with the id
    //     result({ kind: "not_found" }, null);
    //   });
    // };

    if (res.length) {
      // 게시글에 대한 댓글 불러오기
      let queryComments = `
      SELECT 
        c.id AS comment_id,
        c.comment_content,
        c.created_at AS comment_created_at,
        u.nickname AS comment_author_nickname
      FROM 
        comments c
      INNER JOIN 
        users u ON c.user_id = u.id
      WHERE 
        c.post_id = ${id}
      ORDER BY 
        c.created_at ASC;
      `;

      sql.query(queryComments, (err, resComments) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        // 게시글과 댓글을 결과에 추가
        let data = {
          post: res[0],
          comments: resComments,
        };

        result(null, data);
        console.log("found posts+comments: ", data);
      });
    } else {
      // 게시글을 찾을 수 없음
      result({ kind: "not_found" }, null);
    }
  });
};

Posts.getAll = (title, result) => {
  console.log("쿼리_getAll");
  // let query = "SELECT * FROM posts";
  let query =
    "SELECT posts.id, posts.title, posts.content, posts.created_at, users.nickname FROM posts INNER JOIN users ON posts.user_id = users.id";

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

Posts.getAllPublished = (result) => {
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

Posts.removeAll = (result) => {
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
