package controller

import (
	"fmt"
	"net/http"

	"strconv"

	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	service "golang-crud-gin/service/user"
	OrderService "golang-crud-gin/service/order"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type UserController struct {
	userService service.UserService

	orderService OrderService.OrderService
}

func NewUserController(service service.UserService,  orderService OrderService.OrderService) *UserController {
	return &UserController{
		userService: service,
		orderService: orderService,
	}
}
func (controller *UserController) CreateUser(ctx *gin.Context) {







    log.Info().Msg("create user controller")
	fmt.Printf("create user controller asdoiufhaisdhf ")
    // Parse the incoming JSON request into CreateUserRequest
    createUserRequest := request.CreateUserRequest{}
	if err := ctx.ShouldBindJSON(&createUserRequest); err != nil {
		log.Error().Msg("Error parsing JSON: " + err.Error())
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}
	
	log.Info().Msg("create user controller 1")
    // Check if the user with the provided email already exists
	existingUser, err := controller.userService.Register(createUserRequest)
	if err != nil {
		log.Error().Msg("Error finding user by email: " + err.Error())
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}
	
	log.Info().Msg("create user controller 3")
	fmt.Printf("create user controller 3 %+v\n existingUser", existingUser)

	fmt.Printf("create user controller 3: %+v\n err", err)
   




	if !existingUser {
		log.Info().Msg("create user controller 4")
		fmt.Printf("createUserRequest controller: %+v\n", createUserRequest)



		// controller.userService.Create(createUserRequest)
		webResponse := response.Response{
			Code:   http.StatusOK,
			Status: "Ok",
			Data:   map[string]string{"message": "user created"},
		}
		log.Info().Msg("create user controller 6")
		ctx.JSON(http.StatusOK, webResponse)
	} else {
		log.Info().Msg("create user controller 5")
		fmt.Printf("createUserRequest controller: %+v\n", createUserRequest)
		webResponse := response.Response{
			Code:   http.StatusOK,
			Status: "Ok",
			Data:   map[string]string{"message": "email already exists"},  // Corrected message
		}
		ctx.JSON(http.StatusOK, webResponse)  // Send response with appropriate status code
	}
	


    // If the user doesn't exist, proceed with creating the new user
 
    // controller.userService.Create(createUserRequest)
	// log.Info().Msg("create user controller 5")
    // Send a success response
    // webResponse := response.Response{
    //     Code:   http.StatusOK,
    //     Status: "Ok",
    //     Data:   nil,
    // }
	// log.Info().Msg("create user controller 6")
    // ctx.JSON(http.StatusOK, webResponse)
}


// func (controller *UserController) CreateUser(ctx *gin.Context) {
// 	log.Info().Msg("create user")
// 	createUserRequest := request.CreateUserRequest{}
// 	if err := ctx.ShouldBindJSON(&createUserRequest); err != nil {
// 		helper.ErrorPanic(err)
// 	}

// 	fmt.Printf("createUserRequest controller: %+v\n", createUserRequest)

// 	controller.userService.Create(createUserRequest)

// 	webResponse := response.Response{
// 		Code:   http.StatusOK,
// 		Status: "Ok",
// 		Data:   nil,
// 	}
// 	ctx.JSON(http.StatusOK, webResponse)
// }

func (controller *UserController) UpdateUser(ctx *gin.Context) {
	log.Info().Msg("update user")
	userID := ctx.Param("userID")
	id, err := strconv.Atoi(userID)
	helper.ErrorPanic(err)

	updateUserRequest := request.UpdateUserRequest{}
	if err := ctx.ShouldBindJSON(&updateUserRequest); err != nil {
		helper.ErrorPanic(err)
	}
	updateUserRequest.ID = id

	controller.userService.Update(updateUserRequest)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *UserController) DeleteUser(ctx *gin.Context) {
	log.Info().Msg("delete user")
	userID := ctx.Param("userID")
	id, err := strconv.Atoi(userID)
	helper.ErrorPanic(err)

	controller.userService.Delete(id)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *UserController) FindUserByID(ctx *gin.Context) {
	log.Info().Msg("find user by ID")
	userID := ctx.Param("userID")
	id, err := strconv.Atoi(userID)
	helper.ErrorPanic(err)

	userResponse, err := controller.userService.FindByID(id)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "User not found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *UserController) FindAllUsers(ctx *gin.Context) {
	log.Info().Msg("find all users")
	userResponses, err := controller.userService.FindAll()
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No users found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *UserController) FindUserByEmail(ctx *gin.Context) {
	log.Info().Msg("find user by email")
	email := ctx.Query("email")

	if email == "" {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "User email is required",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	userResponse, err := controller.userService.FindByEmail(email)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "User not found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *UserController) FindUsersByPage(ctx *gin.Context) {
	log.Info().Msg("find users by page")
	page, err := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	if err != nil || page < 1 {
		page = 1
	}

	pageSize, err := strconv.Atoi(ctx.DefaultQuery("pageSize", "10"))
	if err != nil || pageSize < 1 {
		pageSize = 10
	}

	userResponses, err := controller.userService.FindUsersByPage(page, pageSize)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No users found for the specified page",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}


func (controller *UserController) Login(ctx *gin.Context) {

	loginRequest := request.LoginRequest{}
	// log.Info().Msg("Login user controller")

	err := ctx.ShouldBindJSON(&loginRequest)
	helper.ErrorPanic(err)
	// log.Info().Msg("Login user controller 1")
	// fmt.Printf("createUserRequest controller loginRequest: %+v\n", loginRequest)
	token, err_token := controller.userService.Login( ctx, loginRequest.Email, loginRequest.Password )
	// log.Info().Msg("Login user controller 2")
	// fmt.Println(err_token)
	if token == nil {
		log.Info().Msg("Login user controller 1 token == nil token == nil")
		webResponse := response.Response{
			Code:    http.StatusBadRequest,
			Status:  "Bad Request",

			Data:   err_token.Error(),

		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}
	if err_token != nil {

		log.Info().Msg("Login user controller 1 err_token != nil err_token != nil")
		webResponse := response.Response{
			Code:    http.StatusBadRequest,
			Status:  "Bad Request",

			Data:   "User not found",

		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}
	log.Info().Msg("Login user controller 3")
	// if token != nil {
	// 	webResponse := response.Response{
	// 		Code:    http.StatusBadRequest,
	// 		Status:  "Bad Request",
	
	// 		Data:   "User not found",
	// 	}
	// 	ctx.JSON(http.StatusBadRequest, webResponse)
	// 	return
	// }
	// log.Info().Msg("Login user controller 4")
	// fmt.Printf("createUserRequest controller LoginUserResponsePaseto: %+v\n", token)
	webResponse := response.Response{
		Code:    200,
		Status:  "Ok",

		Data:    token,
	}
	log.Info().Msg("Login user controller 5")
	// ctx.SetCookie("token", token, config.TokenMaxAge*60, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, webResponse)
}