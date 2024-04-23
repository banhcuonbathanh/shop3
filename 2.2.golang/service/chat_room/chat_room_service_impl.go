package service

import (
    chat "golang-crud-gin/model/chat"
)

type ChatRoomServiceImpl struct {
	hub *chat.Hub
}

func NewRoomService(hub *chat.Hub) *ChatRoomServiceImpl {
	return &ChatRoomServiceImpl{hub: hub}
}

func (rs *ChatRoomServiceImpl) RegisterClient(client *chat.Client) error {
	rs.hub.Register <- client
	return nil // return appropriate error if any
}

func (rs *ChatRoomServiceImpl) UnregisterClient(client *chat.Client) error {
	rs.hub.Unregister <- client
	return nil // return appropriate error if any
}

func (rs *ChatRoomServiceImpl) BroadcastMessage(message *chat.Message) error {
	rs.hub.Broadcast <- message
	return nil // return appropriate error if any
}

func (rs *ChatRoomServiceImpl) GetRoomByID(roomID string) (*chat.Room, bool) {
	room, ok := rs.hub.Rooms[roomID]
	return room, ok // return appropriate error if any
}

func (rs *ChatRoomServiceImpl) GetClientInRoom(roomID string, clientID string) (*chat.Client, bool, error) {
	room, ok := rs.GetRoomByID(roomID)
	if !ok {
		return nil, false, nil // return appropriate error if any
	}

	client, ok := room.Clients[clientID]
	return client, ok, nil // return appropriate error if any
}
