package model

import "gorm.io/gorm"

type ChatList struct {
    gorm.Model
    Messages [] string  `json:"messages"`
    Client   Client `json:"client"` // Reference to the sender client

}
