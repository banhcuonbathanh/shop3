package repository

import (
	"golang-crud-gin/model"
	// "time"

)

type TokenRepository interface {
    Create(token *model.Token) error
    GetByID(id uint) (*model.Token, error)
    GetByToken(token string) (*model.Token, error)
    GetByUserID(userID int) ([]model.Token, error)
    Update(token *model.Token) error
    Delete(token *model.Token) error
    GetAllTokens() ([]*model.Token, error)

    // CreateTokenPaseto(username string, role string, duration time.Duration) (string, *model.Payload, error)
    // VerifyTokenPaseto(token string) (*model.Payload, error)

}

