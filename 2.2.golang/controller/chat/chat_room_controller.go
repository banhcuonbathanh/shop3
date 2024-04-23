package controller

import (
	"fmt"
	request "golang-crud-gin/data/request/chat"
	response "golang-crud-gin/data/response/chat"
	chat "golang-crud-gin/model/chat"

	util "golang-crud-gin/utils/chat"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type ChatRoomController struct {
	hub *chat.Hub
}

func NewChatRoomController(h *chat.Hub) *ChatRoomController {
	return &ChatRoomController{
		hub: h,
	}
}



func (h *ChatRoomController) CreateRoom(c *gin.Context) {
	fmt.Printf("controller/chat/chat_room_controller.go CreateRoom ",)
	var req request.CreateRoomRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Printf("controller/chat/chat_room_controller.go CreateRoom 2",)
	h.hub.Rooms[req.ID] = &chat.Room{
		ID:      req.ID,
		Name:    req.Name,
		Clients: make(map[string]*chat.Client),
	}

	numRooms := len(h.hub.Rooms)
    fmt.Printf("controller/chat/chat_room_controller.go CreateRoom 3 %+v\n", numRooms)
	fmt.Printf("controller/chat/chat_room_controller.go CreateRoom h.hub.Rooms %+v\n", h.hub)
	fmt.Printf("controller/chat/chat_room_controller.go CreateRoom 12 %+v\n",h.hub.Rooms["1"] )
	
	c.JSON(http.StatusOK, h)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *ChatRoomController) JoinRoom(c *gin.Context) {
	fmt.Printf("controller/chat/chat_room_controller.go JoinRoom ",)
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Printf("controller/chat/chat_room_controller.go JoinRoom 12341",)
	roomID := c.Param("roomId")
	clientID := c.Query("userId")
	username := c.Query("username")
	fmt.Printf("controller/chat/chat_room_controller.go JoinRoom 2",)
	cl := &chat.Client{
		Conn:     conn,
		Message:  make(chan *chat.Message, 10),
		UserID:       clientID,
		RoomID:   roomID,
		Username: username,
	}
	fmt.Printf("controller/chat/chat_room_controller.go JoinRoom 3",)
	m := &chat.Message{
		Content:  "A new user has joined the room",
		RoomID:   roomID,
		Username: username,
	}
	fmt.Printf("controller/chat/chat_room_controller.go JoinRoom 4",)
	h.hub.Register <- cl
	h.hub.Broadcast <- m
	fmt.Printf("controller/chat/chat_room_controller.go JoinRoom 5",)	
go util.WriteMessage(cl)
fmt.Printf("controller/chat/chat_room_controller.go JoinRoom 6",)
util.ReadMessage(h.hub, cl)
	// go cl.writeMessage()
	// cl.readMessage(h.hub)
}



func (h *ChatRoomController) GetRooms(c *gin.Context) {
	rooms := make([]response.RoomResponse, 0)

	for _, r := range h.hub.Rooms {
		rooms = append(rooms, response.RoomResponse{
			ID:   r.ID,
			Name: r.Name,
		})
	}

	c.JSON(http.StatusOK, rooms)
}



func (h *ChatRoomController) GetClients(c *gin.Context) {
	var clients []response.ClientRes
	roomId := c.Param("roomId")

	if _, ok := h.hub.Rooms[roomId]; !ok {
		clients = make([]response.ClientRes, 0)
		c.JSON(http.StatusOK, clients)
	}

	for _, c := range h.hub.Rooms[roomId].Clients {
		clients = append(clients, response.ClientRes{
			ID:       c.ID,
			Username: c.Username,
		})
	}

	c.JSON(http.StatusOK, clients)
}
