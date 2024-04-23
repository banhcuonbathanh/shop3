package model

import "gorm.io/gorm"


type Message struct {
	gorm.Model
	Content  string `json:"content"`
	RoomID   string `json:"roomId"`
	Username string `json:"username"`
	UserID string `json:"userID"`
}