package model

import "gorm.io/gorm"

type Hub struct {
	gorm.Model
	Rooms      map[string]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan *Message
}
