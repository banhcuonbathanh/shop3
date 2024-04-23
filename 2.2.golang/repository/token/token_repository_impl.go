package repository

import (
	"errors"
	"fmt"
	"golang-crud-gin/model"

	// "time"

	// "github.com/o1egl/paseto"
	// "github.com/rs/zerolog/log"
	"gorm.io/gorm"
)

type TokenRepositoryImpl struct {
	Db *gorm.DB
	// paseto  *model.PasetoMaker 
	// paseto       *paseto.V2
	// paseto       *paseto.V2
	// symmetricKey []byte
}

func NewTokenRepositoryImpl(Db *gorm.DB) TokenRepository {
	return &TokenRepositoryImpl{Db: Db}
}

func (r *TokenRepositoryImpl) Create(token *model.Token) error {

	// log.Info().Msg("create TokenRepositoryImpl")
	result := r.Db.Create(token)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *TokenRepositoryImpl) GetByID(id uint) (*model.Token, error) {
	var token model.Token

	result := r.Db.First(&token, id)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("token with ID %d not found", id)
	}
	if result.Error != nil {
		return nil, result.Error
	}
	return &token, nil
}

func (r *TokenRepositoryImpl) GetByToken(tokenString string) (*model.Token, error) {
	var token model.Token
	result := r.Db.Where("token = ?", tokenString).First(&token)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("token with value %s not found", tokenString)
	}
	if result.Error != nil {
		return nil, result.Error
	}
	return &token, nil
}

func (r *TokenRepositoryImpl) GetByUserID(userID int) ([]model.Token, error) {
	var tokens []model.Token
	result := r.Db.Where("user_id = ?", userID).Find(&tokens)
	if result.Error != nil {
		return nil, result.Error
	}
	return tokens, nil
}

func (r *TokenRepositoryImpl) Update(token *model.Token) error {
	result := r.Db.Save(token)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *TokenRepositoryImpl) Delete(token *model.Token) error {
	result := r.Db.Delete(token)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *TokenRepositoryImpl) GetAllTokens() ([]*model.Token, error) {
	var tokens []*model.Token
	result := r.Db.Find(&tokens)
	if result.Error != nil {
		return nil, result.Error
	}
	return tokens, nil
}




// func (r *TokenRepositoryImpl) CreateTokenPaseto(username string, role string, duration time.Duration) (string, *model.Payload, error) {
// 	payload, err := model.NewPayload(username, role, duration)
// 	if err != nil {
// 		return "", payload, err
// 	}
// 	token, err := r.paseto.Encrypt(r.symmetricKey, payload, nil)



// 	if err != nil {
// 		return "", payload, err
// 	}
// 	return token, payload, err
// }

// func (r *TokenRepositoryImpl) VerifyTokenPaseto(token string) (*model.Payload, error) {
// 	payload := &model.Payload{}

// 	err := r.paseto.Decrypt(token, r.symmetricKey, payload, nil)
// 	if err != nil {
// 		return nil, errors.New("invalid token")
// 	}

// 	err = payload.Valid()
// 	if err != nil {
// 		return nil, err
// 	}

// 	return payload, nil
// }
// func NewPasetoMaker(symmetricKey string) (Maker, error) {
// 	if len(symmetricKey) != chacha20poly1305.KeySize {
// 		return nil, fmt.Errorf("invalid key size: must be exactly %d characters", chacha20poly1305.KeySize)
// 	}

// 	maker := &PasetoMaker{
// 		paseto:       paseto.NewV2(),
// 		symmetricKey: []byte(symmetricKey),
// 	}

// 	return maker, nil
// }

