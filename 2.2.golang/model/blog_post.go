package model

import (
	"gorm.io/gorm"
)
type BlogPost struct {
	gorm.Model


    ImageUrl       string
    Title      string
CategoryTitle string
    Desc  [] BlogSubDes `gorm:"foreignKey:BlogPostID"`


    BlogCatID int
    Views      int
    // BlogCategory    BlogCategory `gorm:"foreignKey:BlogPostID"`

    UserEmail  string
  
    Comments  [] BlogComment `gorm:"foreignKey:BlogPostID"`
    UserID int // for   Orders    [] Order `gorm:"foreignKey:UserID"` establis relation ship with user
   
  
}
// package model

// import (
// 	"golang-crud-gin/model"

// 	"gorm.io/gorm"
// )


// type CartItem struct {
//     gorm.Model
//     UserID int
//     Total float32
//     Quantity int
//     Product  model.Product `gorm:"foreignKey:ProductID"`
   
//     OrderID int
//     ProductID int

// }
