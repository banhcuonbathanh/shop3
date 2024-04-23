package request

import (
	"golang-crud-gin/model"
	"time"
)

type CreateOrderRequest struct {
    UserID           int      `validate:"required" json:"userID"`
    IsPaid           bool     `json:"isPaid"`
    Phone            string   `validate:"required,min=10" json:"phone"`
    Address          string   `validate:"required,min=5" json:"address"`

 
    Status           model.OrderStatus `json:"status" validate:"required,oneof=pending paid shipped delivered cancelled"` // Added Status field
}


type UpdateOrderRequest struct {
    ID               int      `validate:"required"`
    UserID           int      `json:"userID"`
    Items            []int    `json:"items"`
    Address          string   `json:"address"`
    Phone            string   `json:"phone"`
    IsPaid           bool     `json:"isPaid"`
    Status           model.OrderStatus `json:"status" validate:"omitempty,oneof=pending paid shipped delivered cancelled"` // Added Status field (optional for updates)
}


type PaginationRequestOrder struct {
    Page        int      `json:"page"`
    PageSize    int      `json:"pageSize"`
    UserID  int      `json:"userID"`
    Status      string   `json:"status"`  // Assuming a string status field in the model
    CreatedAtFrom   time.Time `json:"createdAtFrom"`
    CreatedAtTo     time.Time `json:"createdAtTo"`
}
