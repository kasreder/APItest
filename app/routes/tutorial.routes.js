module.exports = app => {
  console.log("라우팅");
  // 기능구현바라봄 가져옴
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  // 글작성
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  // 모든 내용 검색
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  // 게시된 모든 내용 찾기
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  // ID기준으로 찾기
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  // ID기준 수정
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  // ID기준 삭제
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  // 모두삭제
  router.delete("/", tutorials.deleteAll);

  // 모든 내용 검색
  app.use('/main', router);
};
