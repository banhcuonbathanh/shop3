package request

import (
	"golang-crud-gin/model"
)

// type CreateOrderItemRequest struct {
//     UserID int   `json:"customerID"`
//     ProductID  int   `json:"productID"`
//     Quantity   int   `json:"quantity"`
// 	Total int `json:"total"`
// }
type CreateOrderItemRequest struct {
  
    UserID int `json:"userID"`
    OrderItem []model.OrderItem `json:"orderItem"` 
}
type CreateOrderItemRequestFull struct {
    OrderID int `json:"orderID"`
    UserID int `json:"userID"`
    OrderItem []model.OrderItem `json:"orderItem"` 
}

type UpdateOrderItemRequest struct {
    ID        uint  `json:"id"`
    Quantity  int   `json:"quantity"`
    ProductID int   `json:"productID"`
	Total float32 `json:"total"`
}

type PaginationRequestOrderItem struct {
    Page       int   `json:"page"`
    PageSize   int   `json:"pageSize"`
    UserID int   `json:"userID"`
    ProductID  int   `json:"productID"`
    Quantities int   `json:"quantities"`
	Total float32 `json:"total"`
}
