class _buildCommentListNewsState extends State<_buildCommentListNews> {
  final TextEditingController _commentController = TextEditingController();
  final TextEditingController _replyController = TextEditingController();
  final CommentService _commentService = CommentService();

  // 댓글 작성 메소드
  void _postComment() async {
    String userId = '사용자 ID'; // 사용자 ID
    String articleId = '게시글 ID'; // 게시글 ID
    String content = _commentController.text; // 댓글 내용

    bool result = await _commentService.postComment(
      userId: userId,
      articleId: articleId,
      content: content,
      // 대댓글이 아니므로 parentCommentId와 parentCommentOrder는 null
    );

    if (result) {
      print("댓글이 성공적으로 등록되었습니다.");
      // 추가적인 UI 업데이트 로직 (예: 댓글 목록 새로고침)
    } else {
      print("댓글 등록에 실패했습니다.");
    }

    _commentController.clear(); // 입력 필드 초기화
  }

  // 대댓글 작성 메소드
  void _postReply(int parentCommentId, int parentCommentOrder) async {
    String userId = '사용자 ID'; // 사용자 ID
    String articleId = '게시글 ID'; // 게시글 ID
    String content = _replyController.text; // 대댓글 내용

    bool result = await _commentService.postComment(
      userId: userId,
      articleId: articleId,
      content: content,
      parentCommentId: parentCommentId.toString(),
      parentCommentOrder: parentCommentOrder,
    );

    if (result) {
      print("대댓글이 성공적으로 등록되었습니다.");
      // 추가적인 UI 업데이트 로직 (예: 댓글 목록 새로고침)
    } else {
      print("대댓글 등록에 실패했습니다.");
    }

    _replyController.clear(); // 입력 필드 초기화
  }

  @override
  Widget build(BuildContext context) {
    // 기존의 위젯 빌드 로직
  }

  // 기존의 buildComment 및 buildIcon 메소드
}
