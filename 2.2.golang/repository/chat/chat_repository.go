package repository

import (
	chat "golang-crud-gin/model/chat"
)
    


type ChatRepository interface {
    Save(messages chat.ChatList)  error
    Update(messages chat.ChatList)  error
    Delete(chatListId int) error
    FindByID(chatListId int) (chat.ChatList, error)
    FindAll() ([]chat.ChatList, error)
    FindByClientID(clientID int) ([]chat.ChatList, error)
}
