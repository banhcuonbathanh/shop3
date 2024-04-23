package model

import "gorm.io/gorm"


type OrderItem struct {
    gorm.Model
    UserID int
    ProductID int
    Quantity int
    Total float32
 
    Product  Product `gorm:"foreignKey:ProductID"`

    OrderID int 


}





    // OrderID   string `gorm:"type:uuid"`
    // Order     Order `gorm:"foreignKey:OrderID"` 
    // ProductID string `gorm:"type:uuid"`
    // Product   Product `gorm:"foreignKey:ProductID"` 
// type OrderItem struct {
// 	Id        string `gorm:"type:uuid;primary_key"`
// 	OrderId   string `gorm:"type:uuid"`
// 	Order     Order  `gorm:"foreignKey:OrderID"`
// 	ProductId string `gorm:"type:uuid"`
// 	Product   Product
// }

// package model

// type OrderItem struct {
// 	ID        string `gorm:"type:uuid;primary_key"`
// 	OrderID   string `gorm:"type:uuid"`
// 	Order     Order // Define the relationship
// 	ProductID string `gorm:"type:uuid"`
// 	Product   Product // Define the relationship
// }