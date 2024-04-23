package newcomment

import (
	blog "golang-crud-gin/newcomment/model"

	"gorm.io/gorm"
)

type CreateBlogNewCommentRequest struct {
	gorm.Model

	Desc            string
	UserEmail       string
	PostSlug        string
	UserID          int // Establish relationship with user: Orders []Order `gorm:"foreignKey:UserID"`
	BlogPostID      int
	SourceType      string // New field to indicate the source of the comment
	CategoryComment string
	UserName        string
	LevelOfComment int
	CommentText   string
	ChildComment []*blog.BlogNewCommentModel
	IsRootNode    bool
	ParentID  int
}

type UpdateBlogNewCommentRequest struct {
	gorm.Model
    ID              int    `validate:"required"`
	Desc            string
	UserEmail       string
	PostSlug        string
	UserID          int // Establish relationship with user: Orders []Order `gorm:"foreignKey:UserID"`
	BlogPostID      int
	SourceType      string // New field to indicate the source of the comment
	CategoryComment string
	UserName        string
	LevelOfComment int
	CommentText   string
	ChildComment []*blog.BlogNewCommentModel
	IsRootNode    bool
	ParentID  int
}

    // Desc            string `validate:"required,min=2,max=255" json:"desc"` 
    // UserEmail       string `validate:"required,email" json:"userEmail"`
    // PostSlug        string `validate:"required,min=2,max=255" json:"postSlug"`
    // UserID          int    `json:"userID"`
    // BlogPostID      int    `json:"blogPostID"`
    // SourceType      string `json:"sourceType"` // New field to indicate the source of the comment
    // CategoryComment string `json:"categoryComment"`

    // UserName            string `validate:"required,min=2,max=255" json:"userName"` 