package model

import "gorm.io/gorm"



type BlogCat struct {

	gorm.Model

	Slug string
	Title string
	ImageUrl string
	BlogPosts [] BlogPost `gorm:"foreignKey:BlogCatID"`
}