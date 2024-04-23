package model

import (
	blog "golang-crud-gin/newcomment/model"

	"gorm.io/gorm"
)
type BlogComment struct {
	gorm.Model

    Desc       string
    UserEmail  string
    // User       User
    PostSlug   string
    UserID int // for   Orders    [] Order `gorm:"foreignKey:UserID"` establis relation ship with user
    // Post       Post
    BlogPostID int 
    SourceType string // New field to indicate the source of the comment
    CategoryComment string
    UserName string
    BlogNewCommentModel []blog.BlogNewCommentModel `gorm:"foreignKey:BlogCommentID"`
    
}
