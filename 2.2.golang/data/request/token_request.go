package request

import (
	"time"
)

type CreateTokenRequest struct {

	Type      string    `json:"type"`
	// ExpiresAt time.Time `json:"expiresAt"`
	UserID    int       `json:"userId"`
}

type UpdateTokenRequest struct {
	ID        uint      `json:"id"`
	Token     string    `json:"token"`
	Type      string    `json:"type"`
	ExpiresAt time.Time `json:"expiresAt"`
	UserID    int       `json:"userId"`
}
// type renewAccessTokenRequest struct {
// 	RefreshToken string `json:"refreshtoken1"`
// }

type RenewAccessTokenPasetoRequest struct {
	RefreshToken string `json:"refreshtoken"`
}