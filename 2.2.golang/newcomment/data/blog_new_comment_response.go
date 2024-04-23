package newcomment

import (
	blog "golang-crud-gin/newcomment/model"

	"gorm.io/gorm"
)

type BlogNewCommentResponse struct {
	gorm.Model

	Desc            string
	UserEmail       string
	PostSlug        string
	UserID          int
	BlogPostID      int
	SourceType      string
	CategoryComment string
	UserName        string
	LevelOfComment	int
	CommentText   string
	ChildComments []blog.BlogNewCommentModel
	IsRootNode    bool
	ParentID  int
	ChildComment    []*blog.BlogNewCommentModel
}
