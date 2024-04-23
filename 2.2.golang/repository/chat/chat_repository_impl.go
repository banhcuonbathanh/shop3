package repository

import (
	"errors"
	"fmt"
	model "golang-crud-gin/model/chat"

	"gorm.io/gorm"
)

type ChatRepositoryImpl struct {
    Db *gorm.DB
}

func NewChatRepositoryImpl(Db *gorm.DB) ChatRepository {
    return &ChatRepositoryImpl{Db: Db}
}

func (c *ChatRepositoryImpl) Save(messages model.ChatList) error {
    fmt.Printf("createChatRequest repository chat : %+v\n", messages)
    result := c.Db.Create(&messages)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (c *ChatRepositoryImpl) Update(messages model.ChatList) error {
    result := c.Db.Save(&messages)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (c *ChatRepositoryImpl) Delete(chatListId int) error {
    result := c.Db.Where("id = ?", chatListId).Delete(&model.ChatList{})
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (c *ChatRepositoryImpl) FindByID(chatListId int) (model.ChatList, error) {
    var chat model.ChatList
    result := c.Db.First(&chat, chatListId)
    if result.Error != nil {
        return chat, errors.New("chat is not found")
    }
    return chat, nil
}

func (c *ChatRepositoryImpl) FindAll() ([]model.ChatList, error) {
    var chats []model.ChatList
    result := c.Db.Find(&chats)
    if result.Error != nil {
        return nil, result.Error
    }
    return chats, nil
}

// Add any additional methods you need for chat repository here

// For example, you can add a method to find chats by client ID:
func (c *ChatRepositoryImpl) FindByClientID(clientID int) ([]model.ChatList, error) {
    var chats []model.ChatList
    result := c.Db.Where("client_id = ?", clientID).Find(&chats)
    if result.Error != nil {
        return nil, result.Error
    }
    return chats, nil
}

