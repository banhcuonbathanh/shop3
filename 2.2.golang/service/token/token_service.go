package service

import (
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
)

type TokenService interface {
    CreateRefreshToken(request request.CreateTokenRequest) (string, error) 
    CreateToken(request request.CreateTokenRequest) (string, error) 
    GetToken(token string) (*response.Response, error)
    GetTokensByUserID(userID int) ([]response.Response, error)
    UpdateToken(request request.UpdateTokenRequest) (*response.Response, error)
    DeleteToken(token string) error
    GetAllTokens() ([]response.Response, error)
}
