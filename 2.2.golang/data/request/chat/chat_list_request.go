package request

type CreateChatListRequest struct {
    // SenderID (optional): Specify the sender's ID if desired for pre-population
    SenderID *uint        `json:"senderID,omitempty"`

    // Messages (optional): Provide initial messages for the chat list
    Messages []string      `json:"messages,omitempty"`
}