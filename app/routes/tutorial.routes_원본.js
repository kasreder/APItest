module.exports = app => {
  console.log("라우팅");
  // 기능구현바라봄 가져옴
  const posts = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new post
  // 글작성
  router.post("/", posts.create);

  // Retrieve all posts
  // 모든 내용 검색
  router.get("/", posts.findAll);

  // Retrieve all published posts
  // 게시된 모든 내용 찾기
  router.get("/published", posts.findAllPublished);

  // Retrieve a single post with id
  // ID기준으로 찾기
  router.get("/:id", posts.findOne);

  // Update a post with id
  // ID기준 수정
  router.put("/:id", posts.update);

  // Delete a post with id
  // ID기준 삭제
  router.delete("/:id", posts.delete);

  // Delete all posts
  // 모두삭제
  router.delete("/", posts.deleteAll);

  // 모든 내용 검색
  app.use('/main', router);
};
