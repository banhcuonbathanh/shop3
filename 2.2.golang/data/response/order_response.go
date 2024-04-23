package response

import "time"

type OrderResponse struct {
    ID          uint      `json:"id"`
    UserID   int       `json:"customerID"`
    Items        []OrderItemResponse `json:"items"`
    Address      string    `json:"address"`
    Phone        string    `json:"phone"`
    IsPaid       bool      `json:"isPaid"`
    Status       string    `json:"status"` // Assuming a string status field in the model
    CreatedAt    time.Time    `json:"createdAt"`
    UpdatedAt    time.Time    `json:"updatedAt"`
}