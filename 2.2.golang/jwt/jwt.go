// In jwt.go (or a similar file within the jwt package)
package jwt

import (
	"golang-crud-gin/model"

	"github.com/golang-jwt/jwt" // Assuming you're using this library
)

func GenerateJWTToken(token model.Token) (string, error) {
    // Implement the logic for generating a JWT token based on the token model
    // Example using the github.com/golang-jwt/jwt library:
    claims := jwt.MapClaims{
        "id":       token.ID,
        "token":    token.Token,
        "type":     token.Type,
        "user_id":  token.UserID,
        "expires_at": token.ExpiresAt.Unix(),
    }
    secretKey := "your_secret_key" // Replace with your actual secret key
    jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return jwtToken.SignedString([]byte(secretKey))
}
