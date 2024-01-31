const Tutorial = require("../models/tutorial.model.js");
console.log("기능구현 create/ findAll/ findOne / findAllPublished/ delete");
console.log("기능구현 프론트로 날리기");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log("기능구현_create 땡겨오기_create");
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    user_id : req.body.user_id || 3,
    board_id : req.body.board_id || 1,
    title: req.body.title,
    content: req.body.content,
    create_at : req.body.create_at
  });

  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  console.log("기능구현_findAll 땡겨오기_getAll");
  Tutorial.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// ID로 단일 게시물 찾기
exports.findOne = (req, res) => {
  console.log("기능구현_findOne 땡겨오기_findById");

  // URL에서 boardName과 id 값을 추출합니다.
  const boardName = req.params.boardName; // 이 예제에서는 사용되지 않습니다.
  const id = req.params.id.toString();
  Tutorial.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + id
        });
      }
    } else {
      res.send(data);
    }
  });
};


// findAllPublished 함수를 exports로 내보냅니다.
// 이 함수는 Express의 라우터에서 HTTP 요청을 처리하기 위해 사용됩니다.
exports.findAllPublished = (req, res) => {
  // 요청 URL에서 boardName 파라미터를 추출합니다.
  // 예: "/news" 요청에서 "news"를 boardName으로 가져옵니다.
  const boardName = req.params.boardName;

  // Tutorial.getAllPublished 함수를 호출하여
  // 특정 게시판(boardName)에 해당하는 게시글을 가져옵니다.
  Tutorial.getAllPublished(boardName, (err, data) => {
    if (err) {
      // 데이터베이스 쿼리 실행 중 오류가 발생한 경우,
      // HTTP 상태 코드 500과 함께 오류 메시지를 클라이언트에 전송합니다.
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    } else {
      // 오류가 없는 경우, 조회된 데이터를 클라이언트에 전송합니다.
      res.send(data);
    }
  });
};



// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  console.log("기능구현_update  땡겨오기_updateById");
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.id,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
