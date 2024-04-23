package service

import (
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	"golang-crud-gin/jwt"
	"golang-crud-gin/model"
	"time"

	repository "golang-crud-gin/repository/token"

	"github.com/go-playground/validator/v10"
)

type TokenServiceImpl struct {
    TokenRepository repository.TokenRepository
    Validate            *validator.Validate
}

func NewTokenServiceImpl(tokenRepository repository.TokenRepository, validate *validator.Validate) TokenService {
    return &TokenServiceImpl{
        TokenRepository: tokenRepository,
        Validate:            validate,
    }
}

// CreateToken implements the CreateToken method of TokenService
func (service *TokenServiceImpl) CreateToken(request request.CreateTokenRequest) (string, error) {
    // fmt.Printf("CreateToken  TokenServiceImpl")
    err := service.Validate.Struct(request)
    if err != nil {
        newErr := fmt.Errorf("%v: %s", err, "service.Validate.Struct CreateToken")

		return "can not validate service.Validate.Struct(request)",  newErr
    }

    // fmt.Printf("CreateToken  TokenServiceImpl 11111")
    // Generate a unique token string
    token := helper.GenerateRandomString(32)
    // fmt.Printf("CreateToken  TokenServiceImpl 2222222")
    // Create the token object
    newToken := model.Token{
        Token:    token,
        Type:     request.Type,
        UserID:   request.UserID,
        ExpiresAt: time.Now().Add(time.Hour * 24), // Set expiration for 24 hours
    }
    // fmt.Printf("CreateToken  TokenServiceImpl 3333333")
    // Save the token
    err = service.TokenRepository.Create(&newToken)
    if err != nil {
        newErr := fmt.Errorf("%v: %s", err, "service.TokenRepository.Create(&newToken)")

		return "service.TokenRepository.Create(&newToken)",  newErr
    }

    // Generate JWT token for client-side use
    jwtToken, err := jwt.GenerateJWTToken(newToken)
    if err != nil {
        newErr := fmt.Errorf("%v: %s", err, "service.TokenRepository.Create(&newToken) jwt.GenerateJWTToken(newToken)")

		return "service.TokenRepository.Create(&newToken) jwt.GenerateJWTToken(newToken)",  newErr
    }
    // jwtToken, err := jwt.



    // Prepare response
    return jwtToken, nil
}

func (service *TokenServiceImpl) CreateRefreshToken(request request.CreateTokenRequest) (string, error) {
    // Validate request data
    err := service.Validate.Struct(request)
    helper.ErrorPanic(err)

    // Generate a unique token string
    token := helper.GenerateRandomString(32)

    // Create the token object
    newToken := model.Token{
        Token:    token,
        Type:     request.Type,
        UserID:   request.UserID,
        ExpiresAt: time.Now().Add(time.Hour * 24), // Set expiration for 24 hours
    }

    // Save the token
    err = service.TokenRepository.Create(&newToken)
    helper.ErrorPanic(err)

    // Generate JWT token for client-side use
    jwtToken, err := jwt.GenerateJWTToken(newToken)
    helper.ErrorPanic(err)
    // jwtToken, err := jwt.


    helper.ErrorPanic(err)

    // Prepare response
    return jwtToken, nil
}



// GetTokensByUserID implements the GetTokensByUserID method of TokenService
func (s *TokenServiceImpl) GetTokensByUserID(userID int) ([]response.Response, error) {
    tokens, err := s.TokenRepository.GetByUserID(userID)
    if err != nil {
        return nil, err
    }

    var tokenResponses []response.Response
    for _, foundToken := range tokens {
        responseToken := response.TokenResponse{
            ID:        foundToken.ID,
            Token:     foundToken.Token,
            Type:      foundToken.Type,
            UserID:    foundToken.UserID,
            ExpiresAt: foundToken.ExpiresAt,
        }

        tokenResponses = append(tokenResponses, response.Response{
            Code:   200,
            Status: "OK",
            Data:   responseToken,
        })
    }

    return tokenResponses, nil
}

// UpdateToken implements the UpdateToken method of TokenService
func (s *TokenServiceImpl) UpdateToken(request request.UpdateTokenRequest) (*response.Response, error) {
    // Retrieve the token by its ID
    foundToken, err := s.TokenRepository.GetByID(request.ID)
    if err != nil {
        return nil, err
    }

    // Update token fields
    foundToken.Token = request.Token
    foundToken.Type = request.Type
    foundToken.ExpiresAt = request.ExpiresAt
    foundToken.UserID = request.UserID

    // Save the updated token
    if err := s.TokenRepository.Update(foundToken); err != nil {
        return nil, err
    }

    // Map the updated token to a response object
    updatedTokenResponse := response.TokenResponse{
        ID:        foundToken.ID,
        Token:     foundToken.Token,
        Type:      foundToken.Type,
        UserID:    foundToken.UserID,
        ExpiresAt: foundToken.ExpiresAt,
    }

    // Return the response
    return &response.Response{
        Code:   200,
        Status: "OK",
        Data:   updatedTokenResponse,
    }, nil
}


// DeleteToken implements the DeleteToken method of TokenService
func (s *TokenServiceImpl) DeleteToken(token string) error {
    // Delete the token by its token string
    foundToken, err := s.TokenRepository.GetByToken(token)
    if err != nil {
        return err // or handle as needed
    }
    
    if err := s.TokenRepository.Delete(foundToken); err != nil {
        return err // or handle as needed
    }
    
    return nil
}

func (s *TokenServiceImpl) GetAllTokens() ([]response.Response, error) {
    // Retrieve all tokens
    tokens, err := s.TokenRepository.GetAllTokens()
    if err != nil {
        return nil, err // or handle as needed
    }

    var tokenResponses []response.Response
    for _, foundToken := range tokens {
        responseToken := response.TokenResponse{
            ID:        foundToken.ID,
            Token:     foundToken.Token,
            Type:      foundToken.Type,
            UserID:    foundToken.UserID,
            ExpiresAt: foundToken.ExpiresAt,
        }

        tokenResponses = append(tokenResponses, response.Response{
            Code:   200,
            Status: "OK",
            Data:   responseToken,
        })
    }

    return tokenResponses, nil
}


// GetToken retrieves a token by its string value
func (service *TokenServiceImpl) GetToken(token string) (*response.Response, error) {
    foundToken, err := service.TokenRepository.GetByToken(token)
    helper.ErrorPanic(err)
  
    // Map to response object
    responseToken := response.TokenResponse{
        ID:        foundToken.ID,
        Token:     foundToken.Token,
        Type:      foundToken.Type,
        UserID:    foundToken.UserID,
        ExpiresAt: foundToken.ExpiresAt,
    }

    return &response.Response{
        Code:   200,
        Status: "OK",
        Data:   responseToken,
    }, nil
}


// package service

// import (
//     "fmt"
//     "golang-crud-gin/data/request"
//     "golang-crud-gin/data/response"
//     "golang-crud-gin/helper"
//     "golang-crud-gin/model"
//     "golang-crud-gin/repository"
//     "golang.org/x/crypto/bcrypt"
//     "time"
// 	repository "golang-crud-gin/repository/token"
//     "github.com/golang-jwt/jwt"
//     "github.com/go-playground/validator/v10"
// )

// type TokenServiceImpl struct {
//     tokenRepository repository.TokenRepository
//     Validate          *validator.Validate

// }

// func NewProductServiceImpl(tokenRepository repository.TokenRepository, validate *validator.Validate) TokenService {
//     return &TokenServiceImpl{
//         tokenRepository: tokenRepository,
//         Validate:          validate,
 
//     }
// }




// // GetTokensByUserID retrieves tokens associated with a user
// func (service *TokenServiceImpl) GetTokensByUserID(userID int) ([]response.Response, error) {
//     tokens, err := service.tokenRepository.GetByUserID(userID)
//     if err != nil {
//         return nil, helper.NewResponseError(500, "Failed to get tokens")
//     }

//     responseTokens := make([]response.TokenResponse, 0)
//     for _, token := range tokens {
//         responseTokens = append(responseTokens, response.TokenResponse{
//             ID:        token.ID,
//             Token:     token.Token,
//             Type:      token.Type,
//             UserID:    token.UserID,
//             ExpiresAt: token.ExpiresAt,
//         })
//     }

//     return responseTokens, nil
// }

// // UpdateToken updates an existing token
// func (service *TokenServiceImpl) UpdateToken(request request.UpdateTokenRequest) (*response.Response, error) {
//     // Validate request data
//     err := service.Validate.Struct(request)
//     if err != nil {
//         return nil, helper.NewResponseError(400, err.Error())
//     }

//     // Retrieve the token to update
//     foundToken, err := service.tokenRepository.GetByToken(request.Token)
//     if err != nil {
//         return nil, helper.NewResponseError(500, "Failed to get token")
//     }

//     if foundToken == nil {
//         return nil, helper.NewResponseError(404, "Token not found")
//     }

//     // Update the token fields (replace with actual field updates based on your model)
//     foundToken.Type = request.Type
//     foundToken.ExpiresAt = request.ExpiresAt // Example update

//     // Save the updated token
//     err = service.tokenRepository.Update(foundToken)
//     if err != nil {
//         return nil, helper.NewResponseError(500, "Failed to update token")
//     }

//     // Generate a new JWT token if needed (e.g., if expiration changed)
//     jwtToken, err := generateJWTToken(foundToken)
//     if err != nil {
//         return nil, helper.NewResponseError(500, "Failed to generate JWT token")
//     }

//     // Prepare response
//     return &response.Response{
//         Code:   200,
//         Status: "OK",
//         Data:   map[string]string{"token": jwtToken},
//     }, nil
// }

// // DeleteToken deletes a token
// func (service *TokenServiceImpl) DeleteToken(token string) error {
//     err := service.tokenRepository.DeleteByToken(token)
//     if err != nil {
//         return helper.NewResponseError(500, "Failed to delete token")
//     }

//     return nil
// }

// // GetAllTokens retrieves all tokens
// func (service *TokenServiceImpl) GetAllTokens() ([]response.Response, error) {
//     tokens, err := service.tokenRepository.GetAll()
//     if err != nil {
//         return nil, helper.NewResponseError(500, "Failed to get tokens")
//     }

//     responseTokens := make([]response.Response, 0)
//     for _, token := range tokens {
//         responseTokens = append(responseTokens, response.TokenResponse{
//             ID:        token.ID,
//             Token:     token.Token,
//             Type:      token.Type,
//             UserID:    token.UserID,
//             ExpiresAt: token.ExpiresAt,
//         })
//     }

//     return responseTokens, nil
// }
