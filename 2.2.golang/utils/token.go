package utils

import (
	"fmt"
	"golang-crud-gin/model"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

func GenerateToken(ttl time.Duration, payload interface{}, secretJWTKey string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	now := time.Now().UTC()
	claims := token.Claims.(jwt.MapClaims)

	claims["sub"] = payload
	claims["exp"] = now.Add(ttl).Unix()
	claims["iat"] = now.Unix()
	claims["nbf"] = now.Unix()

	tokenString, err := token.SignedString([]byte(secretJWTKey))

	if err != nil {
		return "", fmt.Errorf("generating JWT Token failed: %w", err)
	}

	return tokenString, nil
}

func ValidateToken(token string, signedJWTKey string) (interface{}, error) {
	tok, err := jwt.Parse(token, func(jwtToken *jwt.Token) (interface{}, error) {
		if _, ok := jwtToken.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected method: %s", jwtToken.Header["alg"])
		}

		return []byte(signedJWTKey), nil
	})
	if err != nil {
		return nil, fmt.Errorf("invalidate token: %w", err)
	}

	claims, ok := tok.Claims.(jwt.MapClaims)
	if !ok || !tok.Valid {
		return nil, fmt.Errorf("invalid token claim")
	}

	return claims["sub"], nil
}


// Generate a refresh token
func GenerateRefreshToken(ttl time.Duration, payload interface{}, secretJWTKey string) (string, error) {
    // Create a new token with a longer expiration time
    token := jwt.New(jwt.SigningMethodHS256)

    now := time.Now().UTC()
    claims := token.Claims.(jwt.MapClaims)

    claims["sub"] = payload
    claims["exp"] = now.Add(ttl).Unix()
    claims["iat"] = now.Unix()
    claims["nbf"] = now.Unix()

    tokenString, err := token.SignedString([]byte(secretJWTKey))

    if err != nil {
        return "", fmt.Errorf("generating JWT Refresh Token failed: %w", err)
    }

    return tokenString, nil
}

// Function to refresh an access token using a refresh token
func RefreshAccessToken(refreshToken string, secretJWTKey string) (string, error) {
    // Validate the refresh token
    payload, err := ValidateToken(refreshToken, secretJWTKey)
    if err != nil {
        return "", fmt.Errorf("invalid refresh token: %w", err)
    }

    // Generate a new access token with a shorter expiration time
    accessToken, err := GenerateToken(time.Minute * 15, payload, secretJWTKey)
    if err != nil {
        return "", fmt.Errorf("generating new access token failed: %w", err)
    }

    return accessToken, nil
}


var mySigningKey = []byte("secret")

func GenerateJWT(userData model.User) (string, model.Payload, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["client"] = "Elliot Forbes"
	claims["exp"] = time.Now().Add(time.Minute * 30).Unix()

	// Generate UUID
	id, err := uuid.NewRandom()
	if err != nil {
		return "", model.Payload{}, err
	}

	// Create payload
	payload := model.Payload{
		ID:        id,
		Username: userData.Name,
		Role:      userData.Role,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(time.Minute * 30),
	}

	tokenString, err := token.SignedString(mySigningKey)
	if err != nil {
		return "", model.Payload{}, err
	}

	return tokenString, payload, nil
}



// -----

func GenerateRefreshTokenJwt(userData model.User) (string, model.Payload, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["client"] = "Elliot Forbes"
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() 

	// Generate UUID
	id, err := uuid.NewRandom()
	if err != nil {
		return "", model.Payload{}, err
	}

	// Create payload
	payload := model.Payload{
		ID:        id,
		Username: userData.Name,
		Role:      userData.Role,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(time.Minute * 30),
	}

	tokenString, err := token.SignedString(mySigningKey)
	if err != nil {
		return "", model.Payload{}, err
	}

	return tokenString, payload, nil
}
