package helper

import (
    "math/rand"
    "golang-crud-gin/model"
    "github.com/golang-jwt/jwt"
)

func ErrorPanic(err error) {
    if err != nil {
        panic(err)
    }
}

func GenerateRandomString(length int) string {
    letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    b := make([]rune, length)
    for i := range b {
        b[i] = letters[rand.Intn(len(letters))]
    }
    return string(b)
}

// GenerateJWTToken is exported with an uppercase letter to be accessible from outside the package
func GenerateJWTToken(token model.Token) (string, error) {
    // Implement the logic for generating a JWT token based on the token model
    claims := jwt.MapClaims{
        "id":        token.ID,
        "token":     token.Token,
        "type":      token.Type,
        "user_id":   token.UserID,
        "expires_at": token.ExpiresAt.Unix(),
    }
    
    secretKey := "your_secret_key" // Replace with your actual secret key
    jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return jwtToken.SignedString([]byte(secretKey))
}
