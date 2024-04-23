package service

import (
	"fmt"
	request "golang-crud-gin/data/request/chat"
	"golang-crud-gin/data/response/chat"

	chat "golang-crud-gin/model/chat"
	repository "golang-crud-gin/repository/chat"
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/websocket"
)

type ChatServiceImpl struct {
    ChatRepository repository.ChatRepository
    Validate        *validator.Validate
}

func NewChatServiceImpl(chatRepository repository.ChatRepository, validate *validator.Validate) ChatClientService {
    return &ChatServiceImpl{
        ChatRepository: chatRepository,
        Validate:        validate,
    }
}

// Implementations for ChatService interface methods
func (c *ChatServiceImpl)  writeMessage(cl *chat.Client) {
	defer func() {
		cl.Conn.Close()
	}()

	for {
		message, ok := <-cl.Message
		if !ok {
			return
		}

		cl.Conn.WriteJSON(message)
	}
}

func (c *ChatServiceImpl) readMessage(hub *chat.Hub, cl *chat.Client) {
	defer func() {
		hub.Unregister <- cl
		cl.Conn.Close()
	}()

	for {
		_, m, err := cl.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		msg := &chat.Message{
			Content:  string(m),
			RoomID:   cl.RoomID,
			Username: cl.Username,
		}

		hub.Broadcast <- msg
	}
}

func (c *ChatServiceImpl) CreateChat(request request.CreateChatRequest) (chat.ChatList, error) {
    err := c.Validate.Struct(request)
    if err != nil {
        return chat.ChatList{}, fmt.Errorf("failed to create chat: invalid input information - %w", err)
    }
 
    chatModel := chat.ChatList{
        Messages: request.Messages, // Map the Messages field from the request
        Client:   request.Client,   // Map the Client field from the request (assuming it's present in request)
    }
 
    err = c.ChatRepository.Save(chatModel)
    if err != nil {
        return chat.ChatList{}, fmt.Errorf("failed to create chat: error saving chat - %w", err)
    }
 
    return chatModel, nil // Return the saved chat data
 }
 

 func (c *ChatServiceImpl) UpdateChat(request request.UpdateChatRequest) error {
    chatData, err := c.ChatRepository.FindByID(int(request.Client.ID))
    if err != nil {
        return fmt.Errorf("failed to find chat: %w", err)
    }

    // Update chatData fields based on request
    // ... your update logic here ...

    err = c.ChatRepository.Update(chatData)
    if err !=  nil {
        return fmt.Errorf("failed to update chat: %w", err)
    }

    return nil // No error occurred, return nil
}


func (c *ChatServiceImpl) DeleteChat(chatID int) error {
    err := c.ChatRepository.Delete(chatID)
    if err != nil {
      // Handle deletion error
      return fmt.Errorf("failed to delete chat with ID %d: %w", chatID, err)
    }
    return nil // No error, deletion successful
  }
  

  func (c *ChatServiceImpl) FindChatByID(chatID int) (response.ChatResponse, error) {
    chatData, err := c.ChatRepository.FindByID(chatID)
    if err != nil {
        return response.ChatResponse{}, err
    }

    // Populate the ID field
    chatResponse := response.ChatResponse{
      
        Messages: chatData.Messages, // Assuming Messages field exists in chatData
        Client:   chatData.Client,   // Assuming Client field exists in chatData
    }
    return chatResponse, nil
}


func (c *ChatServiceImpl) FindAllChats() ([]response.ChatResponse, error) {
    result, err := c.ChatRepository.FindAll()
    if err != nil {
        return nil, err
    }

    var chats []response.ChatResponse
    for _, chatData := range result {
        chatResponse := response.ChatResponse{
     
            Messages: chatData.Messages, // Assuming Messages field exists in chatData
            Client:   chatData.Client,   // Assuming Client field exists in chatData
        }
        chats = append(chats, chatResponse)
    }

    return chats, nil
}


func (c *ChatServiceImpl) FindChatsByClientID(clientID int) ([]chat.ChatList, error) {
    result, err := c.ChatRepository.FindByClientID(clientID)
    if err != nil {
        return nil, err
    }
    return result, nil
}

