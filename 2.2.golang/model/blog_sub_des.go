package model

import (
	
	"gorm.io/gorm"
)
type BlogSubDes struct {
	gorm.Model


	BlogPostID int
    Title      string
    Desc       string
	ImageUrls  string

}
