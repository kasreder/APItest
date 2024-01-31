SELECT 
    posts.id, 
    posts.title, 
    posts.content, 
    posts.created_at, 
    users.nickname 
FROM posts 
INNER JOIN users ON posts.user_id = users.id 
WHERE posts.id = ${id}`;

여기부터는 모든 테이블 정보야
-- express.posts definition

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `board_id` int NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- express.comments definition

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `post_id` int NOT NULL,
  `parent_comment_id` int unsigned DEFAULT NULL,
  `parent_comment_order` tinyint NOT NULL DEFAULT '0',
  `comment_content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `comments_chk_1` CHECK ((`parent_comment_order` in (0,1,2)))
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- express.users definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `grade` enum('Bronze','Silver','Gold','Platinum') DEFAULT NULL,
  `authority` enum('READ','WRITE','ADMIN') DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- express.boards definition

CREATE TABLE `boards` (
  `id` int NOT NULL,
  `bname` varchar(50) DEFAULT NULL,
  `category` enum('News','Announcement','Free','Experiment') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;