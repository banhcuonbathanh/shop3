package response

import (
	chat "golang-crud-gin/model/chat"
) 
type ChatResponse struct {
    Messages [] string  `json:"messages"`
    Client   chat.Client `json:"client"` // Reference to the sender client
}
