package model

import (


	"gorm.io/gorm"
)

type UserRole string

const (
    Super_admin_Role UserRole = "super_admin"
    Admin_Role UserRole = "admin"
    User_Role  UserRole = "user"
    ShopOwner_Role UserRole = "shop_owner"
  
)
type User struct {
	gorm.Model
    Name            string // Using a pointer to handle nullability
    Email           string
    EmailVerified   string // Using a pointer to handle nullability
    Image           string // Using a pointer to handle nullability
    Password  string // Using a pointer to handle nullability

	FavoriteIds     string `gorm:"type:text"`
    PhoneNumber     string
    Role     UserRole
    Orders    [] Order `gorm:"foreignKey:UserID"` // for   Orders    [] Order `gorm:"foreignKey:UserID"` establis relation ship with oserder
    OrderItem    [] OrderItem `gorm:"foreignKey:UserID"` 
    Accounts  [] Account `gorm:"foreignKey:UserID"`


    Posts     [] BlogPost `gorm:"foreignKey:UserID"`

    Comments  [] BlogComment `gorm:"foreignKey:UserID"`
    Tokens [] Token `gorm:"foreignKey:UserID"`
	// OrderID
    StreetAddress string
  
}
