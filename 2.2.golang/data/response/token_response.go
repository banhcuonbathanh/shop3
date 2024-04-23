package response

import "time"

type TokenResponse struct {
    ID           uint      `json:"id"`
    Token        string    `json:"token"`
    TokenType    string    `json:"token_type"`
    ExpiresAt    time.Time `json:"expires_at"`
    UserID       int       `json:"user_id"`
    Type         string    `json:"type"`
}
// type renewAccessTokenResponse struct {
// 	AccessToken          string    `json:"access_token"`
// 	AccessTokenExpiresAt time.Time `json:"access_token_expires_at"`
// }

type TokenRevewAccessResponsePaseto2 struct {
	AccessToken          string    `json:"access_token"`
	AccessTokenExpiresAt time.Time `json:"access_token_expires_at"`
}