package model

import (

	"gorm.io/gorm"
)
type Account struct {
	gorm.Model

    Type             string  `json:"type"`
    Provider         string  `json:"provider"`
    ProviderAccountID string `json:"providerAccountId"`
    RefreshToken     *string `json:"refresh_token,omitempty"`
    AccessToken      *string `json:"access_token,omitempty"`
    ExpiresAt        *int64  `json:"expires_at,omitempty"`
    TokenType        *string `json:"token_type,omitempty"`
    Scope            *string `json:"scope,omitempty"`
    IDToken          *string `json:"id_token,omitempty"`
    SessionState     *string `json:"session_state,omitempty"`

    UserID int // for   Orders    [] Order `gorm:"foreignKey:UserID"` establis relation ship with user
    // User             User    `json:"user"`
}
