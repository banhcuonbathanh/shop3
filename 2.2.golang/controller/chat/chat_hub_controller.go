package controller

import (
 chat "golang-crud-gin/model/chat"

)

type ChatHubController struct {
  *chat.Hub // Embed the chat.Hub type
}

func NewChatHubController() *ChatHubController {
  return &ChatHubController{
    Hub: &chat.Hub{
      Rooms:      make(map[string]*chat.Room),
      Register:   make(chan *chat.Client),
      Unregister: make(chan *chat.Client),
      Broadcast:  make(chan *chat.Message, 5),
    },
  }
}

func (h *ChatHubController) Run() {
  for {
    select {

    case cl := <-h.Register:
      h.registerClient(cl) // Call a more descriptive function for handling registration
    case cl := <-h.Unregister:
      h.unregisterClient(cl) // Call a more descriptive function for handling unregistration
    case m := <-h.Broadcast:
      h.broadcastMessage(m) // Call a more descriptive function for handling broadcasting
    }
  }
}

// Functions with slightly better names but still lacking clarity
func (h *ChatHubController) registerClient(cl *chat.Client) {
  // Implementation copied from the reference code
  if _, ok := h.Rooms[cl.RoomID]; ok {
    r := h.Rooms[cl.RoomID]

    if _, ok := r.Clients[string(rune(cl.ID))]; !ok {
      r.Clients[string(rune(cl.ID))] = cl
    }
  }
}

func (h *ChatHubController) unregisterClient(cl *chat.Client) {
  // Implementation copied from the reference code
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
}

func (h *ChatHubController) broadcastMessage(m *chat.Message) {
  // Implementation copied from the reference code
  if _, ok := h.Rooms[m.RoomID]; ok {
    for _, cl := range h.Rooms[m.RoomID].Clients {
      cl.Message <- m
    }
  }
}
