package model

import (
	"time"

	"gorm.io/gorm"
)
type Token struct {
	gorm.Model
    Token    string    `gorm:"type:varchar(255);uniqueIndex"` // Use string for token, add unique index
    Type     string    `gorm:"type:varchar(255)"`
    ExpiresAt time.Time
    IsBlocked    bool      `json:"is_blocked"`

	RefreshToken string    `json:"refresh_token"`
	UserAgent    string    `json:"user_agent"`
	ClientIp     string    `json:"client_ip"`
    UserID int // for   Orders    [] Order `gorm:"foreignKey:UserID"` establis relation ship with user
}
