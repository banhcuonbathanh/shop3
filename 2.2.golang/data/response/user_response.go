package response

import (
	"golang-crud-gin/model"

	"time"
)
type UserResponse struct {
	ID             uint    `json:"id"`
	Name           string `json:"name"`
	Email          string `json:"email"`
	HashedPassword string `json:"hashedPassword"`
	EmailVerified  string `json:"emailVerified"`
	Image          string `json:"image"`
	FavoriteIds    string `json:"favoriteIds"`
	PhoneNumber    string `json:"phoneNumber"`
	StreetAddress  string `json:"streetAddress"`

    Orders    []model.Order
    Accounts  []model.Account
 
    Posts     []model.BlogPost   
    Comments  []model.BlogComment
}

type LoginUserResponse struct {
	TokenType string `json:"token_type"`
	Token     string `json:"token"`
}



type LoginUserResponsePaseto struct {
    // User information
    User       model.User `json:"user"`

    // Session management
    SessionId  uint     `json:"session_id"`

    // Access and refresh tokens
    AccessToken           string        `json:"access_token"`
    RefreshToken          string        `json:"refresh_token"`
    AccessTokenExpiresAt  time.Time `json:"access_token_expires_at"`
    RefreshTokenExpiresAt time.Time `json:"refresh_token_expires_at"`
}