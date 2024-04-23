package utils

import (
	"errors"
	"fmt"

	"github.com/rs/zerolog/log"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", fmt.Errorf("could not hash password %w", err)
	}
	return string(hashedPassword), nil
}



func VerifyPassword(hashedPassword string, candidatePassword string)  (bool, error) {

	log.Info().Msg("Login user service 4 VerifyPassword")
    // Use the '==' operator to compare the strings
    if hashedPassword != candidatePassword {
        return false, errors.New("the passwords are not equal")
    }

    return true, nil
}

func VerifyPasswordharss(hashedPassword string, candidatePassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(candidatePassword))
}


