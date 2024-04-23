package model

import (
	"gorm.io/gorm"
)

type Order struct {
   gorm.Model
   UserID    int `validate:"required"`
   IsPaid    bool `validate:"required"`
   Phone     string `validate:"required"`
   Address   string `validate:"required"`
   Status    OrderStatus `gorm:"type:varchar(20)"`
   // OrderItem []OrderItem `gorm:"foreignKey:OrderID"`
   OrderItem []OrderItem `gorm:"foreignKey:OrderID"`

}

type OrderStatus string

const (
   Pending  OrderStatus = "pending"
   Paid     OrderStatus = "paid"
   Shipped  OrderStatus = "shipped"
   Delivered OrderStatus = "delivered"
   Cancelled OrderStatus = "cancelled"
)


// type Order struct {
// 	Id        int `gorm:"type:uuid;primary_key"`
//     OrderItem []OrderItem 
//     IsPaid    bool
//     Phone     string
//     Address   string
//     CreatedAt string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
//     UpdatedAt string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
// }



// type Order struct {

// 	OrderItems []OrderItem `gorm:"foreignKey:OrderId"`
// 	IsPaid    bool
// 	Phone     string
// 	Address   string
// 	CreatedAt string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
// 	UpdatedAt   string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
// }