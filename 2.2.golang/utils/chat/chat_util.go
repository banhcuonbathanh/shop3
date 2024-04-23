package utils

import (
	chat "golang-crud-gin/model/chat"
	"log"

	"github.com/gorilla/websocket"
)

// WriteMessage writes messages to a chat client's connection
func WriteMessage(c *chat.Client) {
    defer func() {
        c.Conn.Close()
    }()

    for {
        message, ok := <-c.Message
        if !ok {
            return
        }

        c.Conn.WriteJSON(message)
    }
}

// ReadMessage reads messages from a chat client's connection and broadcasts them
func ReadMessage(hub *chat.Hub, c *chat.Client) {
    defer func() {
        hub.Unregister <- c
        c.Conn.Close()
    }()

    for {
        _, m, err := c.Conn.ReadMessage()
        if err != nil {
            if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
                log.Printf("error: %v", err)
            }
            break
        }

        msg := &chat.Message{
            Content:  string(m),
            RoomID:   c.RoomID,
            Username: c.Username,
        }

        hub.Broadcast <- msg
    }
}
func NewHub() *chat.Hub {
	return &chat.Hub{
		Rooms:      make(map[string]*chat.Room),
		Register:   make(chan *chat.Client),
		Unregister: make(chan *chat.Client),
		Broadcast:  make(chan *chat.Message, 5),
	}
}

func  Run(h *chat.Hub) {
	for {
		select {
		case cl := <-h.Register:
			if _, ok := h.Rooms[cl.RoomID]; ok {
				r := h.Rooms[cl.RoomID]

                if _, ok := r.Clients[string(rune(cl.ID))]; !ok {
                    r.Clients[string(rune(cl.ID))] = cl
                  }
			}
		case cl := <-h.Unregister:
			if _, ok := h.Rooms[cl.RoomID]; ok {
                if _, ok := h.Rooms[cl.RoomID].Clients[string(rune(cl.ID))]; ok {
					if len(h.Rooms[cl.RoomID].Clients) != 0 {
					    h.Broadcast <- &chat.Message{
                            Content:  "user left the chat",
                            RoomID:   cl.RoomID,
                            Username: cl.Username,
                          }
					}

                    delete(h.Rooms[cl.RoomID].Clients, string(rune(cl.ID)))
					close(cl.Message)
				}
			}

		case m := <-h.Broadcast:
			if _, ok := h.Rooms[m.RoomID]; ok {

				for _, cl := range h.Rooms[m.RoomID].Clients {
					cl.Message <- m
				}
			}
		}
	}
}