package controller

import (
    "fmt"
    "golang-crud-gin/data/request/chat"
    "golang-crud-gin/data/response"
    "golang-crud-gin/helper"
    service "golang-crud-gin/service/chat_client"  // Update service import

    "net/http"
    "strconv"
	chat "golang-crud-gin/model/chat"
    "github.com/gin-gonic/gin"
    "github.com/rs/zerolog/log"
)

type ChatClientController struct {
    chatClientService service.ChatClientService

	hub *chat.Hub
}

func NewChatClientController(service service.ChatClientService, h *chat.Hub) *ChatClientController {
    return &ChatClientController{
        chatClientService: service,

		hub: h,


    }
}

// Update function names and request/response types according to chat operations

func (controller *ChatClientController) CreateChat(ctx *gin.Context) {
    log.Info().Msg("create chat controller")
    createChatRequest := request.CreateChatRequest{}
    if err := ctx.ShouldBindJSON(&createChatRequest); err != nil {

        fmt.Printf("create chat controller createChatRequest err %v\n", err)
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }
    
    chatList, err := controller.chatClientService.CreateChat(createChatRequest)
    if err != nil {
        fmt.Printf("create chat controller chatClientService.CreateChat err %v\n", err)
        log.Error().Err(err).Msg("Failed to create chat")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }
    
    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   chatList,
    }
    ctx.JSON(http.StatusOK, webResponse)
}


func (controller *ChatClientController) UpdateChat(ctx *gin.Context) {
    log.Info().Msg("update chat")
    chatID := ctx.Param("chatID") // Assuming the parameter name is "chatID"
    ID, err := strconv.Atoi(chatID)
    helper.ErrorPanic(err)

    updateChatRequest := request.UpdateChatRequest{}
    if err := ctx.ShouldBindJSON(&updateChatRequest); err != nil {
        helper.ErrorPanic(err)
    }
    updateChatRequest.ID = ID

    err = controller.chatClientService.UpdateChat(updateChatRequest)
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   nil,
    }
    ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ChatClientController) DeleteChat(ctx *gin.Context) {
    log.Info().Msg("delete chat")
    chatID := ctx.Param("chatID") // Assuming the parameter name is "chatID"
    id, err := strconv.Atoi(chatID)
    helper.ErrorPanic(err)

    err = controller.chatClientService.DeleteChat(id)
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   nil,
    }
    ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ChatClientController) FindChatByID(ctx *gin.Context) {
    log.Info().Msg("find chat by ID controller")
    chatID := ctx.Param("chatID") // Assuming the parameter name is "chatID"
    id, err := strconv.Atoi(chatID)
    helper.ErrorPanic(err)

    chatResponse, err := controller.chatClientService.FindChatByID(id)
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "Chat not found",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   chatResponse,
    }

    ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ChatClientController) FindAllChats(ctx *gin.Context) {
    log.Info().Msg("find all chats")
    chatResponses, err := controller.chatClientService.FindAllChats()
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "No chats found",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   chatResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}
func (controller *ChatClientController) FindChatsByClientID(ctx *gin.Context) {
    log.Info().Msg("find chats by client ID controller")
    clientIDStr := ctx.Query("clientID") // Assuming client ID is passed as a query parameter

    clientID, err := strconv.Atoi(clientIDStr)
	if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "No chats found",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }
    chatList, err := controller.chatClientService.FindChatsByClientID(clientID)
	if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "No chats found",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   chatList,
    }
    ctx.JSON(http.StatusOK, webResponse)
}


