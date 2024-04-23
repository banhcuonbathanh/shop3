package model

import "gorm.io/gorm"

type Category struct {
	gorm.Model

	Name string `gorm:"type:varchar(255)"`


	Product [] Product
	ProductID uint
}


	// Product []Product 
	// Product []Product `gorm:"foreignKey:Name"`
	// Product []Product `gorm:"foreignKey:ProductID"`
	// ProductID int
	// CategoryID    int  