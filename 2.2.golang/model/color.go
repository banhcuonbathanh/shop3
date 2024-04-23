package model

import "gorm.io/gorm"

type Color struct {
    gorm.Model
  
    Name      string `gorm:"type:varchar(255)"`
    Value     string `gorm:"type:varchar(255)"`

    Product [] Product
	ProductID uint
}
