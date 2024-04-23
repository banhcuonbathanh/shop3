package service

import (
	chat "golang-crud-gin/model/chat"

	"golang-crud-gin/data/request/chat"

    "golang-crud-gin/data/response/chat"
	// response "golang-crud-gin/data/response/chat"
)

type ChatClientService interface {

    CreateChat(request request.CreateChatRequest) (chat.ChatList, error)  // Renamed for clarity
    UpdateChat(request request.UpdateChatRequest) error                  // Renamed for clarity
    DeleteChat(chatID int) error                                          // Renamed for clarity
    FindChatByID(chatID int) (response.ChatResponse, error)                // Renamed for clarity
    FindAllChats() ([]response.ChatResponse, error)                      // Renamed for clarity
    FindChatsByClientID(clientID int) ([]chat.ChatList, error)           // Consistent return type


   writeMessage(cl *chat.Client) 

   readMessage(hub *chat.Hub, cl *chat.Client)
}
