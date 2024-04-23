package newcomment

import (
	"gorm.io/gorm"
)

type BlogNewCommentModel struct {
	gorm.Model

	Desc            string
	UserEmail       string
	PostSlug        string
	UserID          int
	BlogPostID      int
	SourceType      string
	CategoryComment string
	UserName        string
	CommentText     string
	IsRootNode      bool
	ParentNodeId    int
    LevelOfComment int
	ParentID        int
	ChildComment    []*BlogNewCommentModel `gorm:"foreignKey:ParentID"`
	BlogCommentID int
}
