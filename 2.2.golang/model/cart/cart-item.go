package model

import (
	"golang-crud-gin/model"

	"gorm.io/gorm"
)


type CartItem struct {
    gorm.Model
    UserID int
    Total float32
    Quantity int
    Product  model.Product `gorm:"foreignKey:ProductID"`
   
    OrderID int
    ProductID int

}
