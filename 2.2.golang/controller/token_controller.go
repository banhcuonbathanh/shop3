package controller

import (
	"fmt"
	"net/http"
	"strconv"

	// "time"

	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	repository "golang-crud-gin/repository/token"
	service "golang-crud-gin/service/token"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type TokenController struct {
	tokenService service.TokenService
	tokenRepository repository.TokenRepository
}

func NewTokenController(service service.TokenService , repository repository.TokenRepository) *TokenController {
	return &TokenController{
		tokenService: service,
		tokenRepository: repository,
	}
}

func (controller *TokenController) CreateToken(ctx *gin.Context) {


	createTokenRequest := request.CreateTokenRequest{}

	err := ctx.ShouldBindJSON(&createTokenRequest);
	

		helper.ErrorPanic(err)
	
	
	tokenResponse, err := controller.tokenService.CreateToken(createTokenRequest)
	if (err != nil){
		webResponse := response.Response{
			Code:   http.StatusInternalServerError,
			Status: "Internal Server Error",
			Data:   "Internal Server Error",
		}
		ctx.JSON(http.StatusOK, webResponse)
	}
		
	refreshResponse, err := controller.tokenService.CreateRefreshToken(createTokenRequest)
if (err != nil){
	webResponse := response.Response{
		Code:   http.StatusInternalServerError,
		Status: "Internal Server Error",
		Data:   "Internal Server Error",
	}
	ctx.JSON(http.StatusOK, webResponse)
}
	

	// tokenData := tokenResponse.Data.(map[string]string);
	// tokenString := tokenData["token"] 
	// log.Info().Msg("CreateToken token controllerljahsdfalkvhsdlkfhaskldhflkajshd")

	// fmt.Println("The extracted token is:", tokenString)
	// if tokenData, ok := tokenResponse.Data.(map[string]string); ok {
	// 	tokenString := tokenData["token"] // No need for further assertion, it's already a string

	// 	// Use the extracted tokenString
	// 	fmt.Println("The extracted token is:")

	// 	webResponse := response.Response{
	// 		Code:   http.StatusOK,
	// 		Status: "Ok",
	// 		Data:   map[string]string{	
	// 		"AT": tokenString,
	// 			"RT": "value2",
	// 			// Add more key-value pairs as needed
	// 		},

			
	// 	}
	// 	ctx.JSON(http.StatusOK, webResponse)
	// 	return
	// } else {
	// 	// Handle the case where tokenResponse.Data is not a map
	
	// }
	


	// 	webResponse := response.Response{
	// 		Code:   http.StatusOK,
	// 		Status: "Ok",
	// 		Data:   map[string]string{	
	// 		"AT": tokenString,
	// 			"RT": "value2",
	// 			// Add more key-value pairs as needed
	// 		},

	log.Info().Msg("CreateToken token ")
	fmt.Println("The extracted token is:")
		webResponse := response.Response{
			Code:   http.StatusOK,
			Status: "Ok",
			Data:   map[string]string{	
			"AT": tokenResponse,
				"RT": refreshResponse,
				// Add more key-value pairs as needed
			},

			
		}
		ctx.JSON(http.StatusOK, webResponse)



}

func (controller *TokenController) GetToken(ctx *gin.Context) {
	token := ctx.Param("token")

	tokenResponse, err := controller.tokenService.GetToken(token)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "Token not found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	ctx.JSON(http.StatusOK, tokenResponse)
}


// ... (existing code remains unchanged)

func (controller *TokenController) GetTokensByUserID(ctx *gin.Context) {
	userIDStr := ctx.Param("userID")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "Invalid user ID",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	tokens, err := controller.tokenService.GetTokensByUserID(userID)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusInternalServerError,
			Status: "Internal Server Error",
			Data:   "Failed to get tokens for user",
		}
		ctx.JSON(http.StatusInternalServerError, webResponse)
		return
	}

	ctx.JSON(http.StatusOK, tokens)
}

func (controller *TokenController) UpdateToken(ctx *gin.Context) {
	updateTokenRequest := request.UpdateTokenRequest{}
	if err := ctx.ShouldBindJSON(&updateTokenRequest); err != nil {
		helper.ErrorPanic(err)
	}

	tokenResponse, err := controller.tokenService.UpdateToken(updateTokenRequest)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusInternalServerError,
			Status: "Internal Server Error",
			Data:   "Failed to update token",
		}
		ctx.JSON(http.StatusInternalServerError, webResponse)
		return
	}

	ctx.JSON(http.StatusOK, tokenResponse)
}

func (controller *TokenController) DeleteToken(ctx *gin.Context) {
	token := ctx.Param("token")

	err := controller.tokenService.DeleteToken(token)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusInternalServerError,
			Status: "Internal Server Error",
			Data:   "Failed to delete token",
		}
		ctx.JSON(http.StatusInternalServerError, webResponse)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Token deleted successfully"})
}

func (controller *TokenController) GetAllTokens(ctx *gin.Context) {
	tokens, err := controller.tokenService.GetAllTokens()
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusInternalServerError,
			Status: "Internal Server Error",
			Data:   "Failed to retrieve tokens",
		}
		ctx.JSON(http.StatusInternalServerError, webResponse)
		return
	}

	ctx.JSON(http.StatusOK, tokens)
}


// 


func(controller *TokenController) RefreshTokensController(ctx *gin.Context) {

	req := request.RenewAccessTokenPasetoRequest{}

	if err := ctx.ShouldBindJSON(&req);
	
	err != nil {
		webResponse := response.Response{
			Code:   http.StatusInternalServerError,
			Status: "Internal Server Error",
			Data:   "Failed to retrieve tokens",
		}
		ctx.JSON(http.StatusInternalServerError, webResponse)
		return
	}

	// refreshPayload, err := controller.tokenRepository.VerifyTokenPaseto(req.RefreshToken)
	// refreshPayload, err := server.tokenMaker.VerifyToken(req.RefreshToken)
	// if err != nil {
	// 	webResponse := response.Response{
	// 		Code:   http.StatusInternalServerError,
	// 		Status: "Internal Server Error",
	// 		Data:   "Failed to retrieve tokens",
	// 	}
	// 	ctx.JSON(http.StatusInternalServerError, webResponse)
	// 	return
	// }

	// idNumber, err := strconv.Atoi(id)
	// id := refreshPayload.ID.String()
	
	// idNumber, err := strconv.ParseUint(id, 10, 64) // Use ParseUint for correct conversion
	// if err != nil {
	
	// 	return  
	// }
	
	// session, err := controller.tokenRepository.GetByID(uint(idNumber)) 
	// if err != nil {
	// 	webResponse := response.Response{
	// 		Code:   http.StatusInternalServerError,
	// 		Status: "Internal Server Error",
	// 		Data:   "Failed to retrieve tokens",
	// 	}
	// 	ctx.JSON(http.StatusInternalServerError, webResponse)
	// 	return
	// }
	// if session.IsBlocked {
	// 	webResponse := response.Response{
	// 		Code:   http.StatusInternalServerError,
	// 		Status: "Internal Server Error",
	// 		Data:   "Failed to retrieve tokens",
	// 	}
	// 	ctx.JSON(http.StatusInternalServerError, webResponse)
	// 	return
	// }

	// if session.Username != refreshPayload.Username {
	// 	err := fmt.Errorf("incorrect session user")
	// 	ctx.JSON(http.StatusUnauthorized, errorResponse(err))
	// 	return
	// }

	// if session.RefreshToken != req.RefreshToken {
	// 	webResponse := response.Response{
	// 		Code:   http.StatusInternalServerError,
	// 		Status: "Internal Server Error",
	// 		Data:   "Failed to retrieve tokens",
	// 	}
	// 	ctx.JSON(http.StatusInternalServerError, webResponse)
	// 	return
	// }

	// if time.Now().After(session.ExpiresAt) {
	// 	// err := fmt.Errorf("expired session")
	// 	// ctx.JSON(http.StatusUnauthorized, errorResponse(err))
	// 	// return
	// }

	// accessToken, accessPayload, err := controller.tokenRepository.CreateTokenPaseto(
	// 	refreshPayload.Username,
	// 	refreshPayload.Role,
	// 	3600,
	// )
	// if err != nil {
	// 	webResponse := response.Response{
	// 		Code:   http.StatusInternalServerError,
	// 		Status: "Internal Server Error",
	// 		Data:   "Failed to retrieve tokens",
	// 	}
	// 	ctx.JSON(http.StatusInternalServerError, webResponse)
	// 	return
	// }

	// rsp := response.TokenRevewAccessResponsePaseto2{
	// 	AccessToken:          accessToken,
	// 	AccessTokenExpiresAt: accessPayload.ExpiredAt,
	// }
	// ctx.JSON(http.StatusOK, rsp)
}