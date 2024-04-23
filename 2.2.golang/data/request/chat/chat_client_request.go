package request

type CreateChatClientRequest struct {
    Username string `json:"username"` // Username for the chat client
    UserID   string `json:"userId"`   // User ID for the chat client (optional)
    RoomID   string `json:"roomId"`   // Room ID to join (optional)
}
