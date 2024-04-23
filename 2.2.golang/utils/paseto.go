package utils

// "errors"
// "fmt"
// "time"

// "golang-crud-gin/model"

// "github.com/o1egl/paseto"
// "github.com/rs/zerolog/log"

// func VerifyTokenPaseto(token string, paseto       *paseto.V2, symmetricKey []byte) (*model.Payload, error) {
// 	payload := &model.Payload{}

// 	err := paseto.Decrypt(token, symmetricKey, payload, nil)
// 	if err != nil {
// 		return nil, errors.New("invalid token")
// 	}

// 	err = payload.Valid()
// 	if err != nil {
// 		return nil, err
// 	}

// 	return payload, nil
// }

// func CreateTokenPaseto(email string, role string, duration time.Duration, paseto       *paseto.V2, symmetricKey []byte) (string, *model.Payload, error) {
// 	log.Info().Msg("CreateTokenPaseto in utilits")
// 	payload, err := model.NewPayload(email, role, duration)
// 	if err != nil {
// 		return "", payload, err
// 	}

// 	fmt.Printf("CreateTokenPaseto payload %+v\n ", payload)
// 	log.Info().Msg("CreateTokenPaseto in utilits 1")
// 	token, err := paseto.Encrypt(symmetricKey, payload, nil)
// 	fmt.Printf("CreateTokenPaseto err %+v\n ", err)
// 	fmt.Printf("CreateTokenPaseto token %+v\n ", token)
// 	log.Info().Msg("CreateTokenPaseto in utilits 2" )

// 	if err != nil {
// 		return "", payload, err
// 	}
// 	log.Info().Msg("CreateTokenPaseto in utilits 3" )
// 	return token, payload, err
// }

// func CreateTokenPaseto(email string, role string, duration time.Duration, paseto       *paseto.V2, symmetricKey []byte) (string, *model.Payload, error) {
// 	log.Info().Msg("CreateTokenPaseto in utilits")
// 	payload, err := model.NewPayload(email, role, duration)
// 	if err != nil {
// 		return "", payload, err
// 	}

// 	fmt.Printf("CreateTokenPaseto payload %+v\n ", payload)
// 	log.Info().Msg("CreateTokenPaseto in utilits 1")
// 	token, err := paseto.Encrypt(symmetricKey, payload, nil)
// 	fmt.Printf("CreateTokenPaseto err %+v\n ", err)
// 	fmt.Printf("CreateTokenPaseto token %+v\n ", token)
// 	log.Info().Msg("CreateTokenPaseto in utilits 2" )

// 	if err != nil {
// 		return "", payload, err
// 	}
// 	log.Info().Msg("CreateTokenPaseto in utilits 3" )
// 	return token, payload, err
// }
