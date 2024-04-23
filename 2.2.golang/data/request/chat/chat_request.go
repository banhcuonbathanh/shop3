package request

import (chat  "golang-crud-gin/model/chat") 

type CreateChatRequest struct {
    Messages [] string  `json:"messages"`
    Client   chat.Client `json:"client"` // Reference to the sender client
}

type UpdateChatRequest struct {
    ID         int   `json:"id"`
    Messages [] string  `json:"messages"`
    Client   chat.Client `json:"client"` // Reference to the sender client
  }