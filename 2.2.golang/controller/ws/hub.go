package ws

import "log"

type Room struct {
	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Clients map[string]*Client `json:"clients"`
}

type Hub struct {
	Rooms      map[string]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan *Message
}

func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[string]*Room),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Broadcast:  make(chan *Message, 5),
	}
}

func (h *Hub) Run() {
	log.Print("2.2.golang/controller/ws/hub.go hub run" ,)

	for {
		select {

		case cl := <-h.Register:
			if _, ok := h.Rooms[cl.RoomID]; ok {
				log.Print("2.2.golang/controller/ws/hub.go hub run 11 " ,)
				r := h.Rooms[cl.RoomID]
				log.Print("2.2.golang/controller/ws/hub.go hub run 222 " ,)
				if _, ok := r.Clients[cl.ID]; !ok {
					r.Clients[cl.ID] = cl
				}
			}
			log.Print("2.2.golang/controller/ws/hub.go hub run 33333"  ,)
		case cl := <-h.Unregister:
			if _, ok := h.Rooms[cl.RoomID]; ok {
				log.Print("2.2.golang/controller/ws/hub.go hub run 4444" ,)
				if _, ok := h.Rooms[cl.RoomID].Clients[cl.ID]; ok {
					log.Print("2.2.golang/controller/ws/hub.go hub run 5555" ,)
					if len(h.Rooms[cl.RoomID].Clients) != 0 {
						h.Broadcast <- &Message{
							Content:  "user left the chat",
							RoomID:   cl.RoomID,
							Username: cl.Username,
						}
					}
					log.Print("2.2.golang/controller/ws/hub.go hub run 6666" ,)
					delete(h.Rooms[cl.RoomID].Clients, cl.ID)
					close(cl.Message)
				}
			}
	
		case m := <-h.Broadcast:
			if _, ok := h.Rooms[m.RoomID]; ok {
				log.Print("2.2.golang/controller/ws/hub.go hub run 7777" ,)

				for _, cl := range h.Rooms[m.RoomID].Clients {

					log.Print("2.2.golang/controller/ws/hub.go hub run 8888" ,)
					cl.Message <- m
				}
			}
		}
		
	}

	
}
