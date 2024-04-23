package model

import "gorm.io/gorm"
type Cart struct {
gorm.Model
    // OrderItem []OrderItem `gorm:"foreignKey:OrderId"` 
    IsPaid    bool
    Phone     string
    Address   string
    CreatedAt string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
    UpdatedAt string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
    UserID int
    OrderItem []CartItem `gorm:"foreignKey:OrderID"`
}