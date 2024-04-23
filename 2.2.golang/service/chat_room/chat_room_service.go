package service

import (
    chat "golang-crud-gin/model/chat"
)

type ChatRoomService interface {
    RegisterClient(client *chat.Client) error
    UnregisterClient(client *chat.Client) error
    BroadcastMessage(message *chat.Message) error
    GetRoomByID(roomID string) (*chat.Room, bool)
    GetClientInRoom(roomID string, clientID string) (*chat.Client, bool, error)
}
