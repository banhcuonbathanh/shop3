package ws

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn     *websocket.Conn
	Message  chan *Message
	ID       string `json:"id"`
	RoomID   string `json:"roomId"`
	Username string `json:"username"`
}

type Message struct {
	Content  string `json:"content"`
	RoomID   string `json:"roomId"`
	Username string `json:"username"`
}

func (c *Client) writeMessage() {

	log.Print("2.2.golang/controller/ws/client.go writeMessage" ,)
	defer func() {

		log.Print("2.2.golang/controller/ws/client.go writeMessage con close" ,)
		c.Conn.Close()
	}()

	fmt.Print("2.2.golang/controller/ws/client.go writeMessage con 1" ,)
	for {
		message, ok := <-c.Message
		if !ok {


			log.Print("2.2.golang/controller/ws/client.go writeMessage con 1 aaaaa not ok" ,)
			return
		}
		fmt.Print("2.2.golang/controller/ws/client.go writeMessage con 2" ,)
		fmt.Print("2.2.golang/controller/ws/client.go writeMessage 	c.Conn.WriteJSON(message)" ,	c.Conn.WriteJSON(message))
		c.Conn.WriteJSON(message)
	}
}

func (c *Client) readMessage(hub *Hub) {

	log.Print("2.2.golang/controller/ws/client.go readMessage" ,)
	defer func() {
		log.Print("2.2.golang/controller/ws/client.go readMessage Unregister" ,)
		hub.Unregister <- c
		c.Conn.Close()
	}()
	log.Print("2.2.golang/controller/ws/client.go readMessage11111" ,)
	for {
		_, m, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		msg := &Message{
			Content:  string(m),
			RoomID:   c.RoomID,
			Username: c.Username,
		}
		log.Print("2.2.golang/controller/ws/client.go readMessage 2222222" ,msg)
		hub.Broadcast <- msg
	}
}
