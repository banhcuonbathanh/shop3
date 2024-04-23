package response

import (
	"golang-crud-gin/model"
	"time"
)

type OrderItemResponse struct {
    ID         uint   `json:"id"`
    UserID int    `json:"customerID"`
    Total      float32    `json:"total"`
    Quantity   int    `json:"quantity"`
    Product   model.Product `json:"product"`
    OrderID    int   `json:"orderID"`
    CreatedAt  time.Time `json:"createdAt"`
    UpdatedAt time.Time    `json:"updatedAt"`
    ProductID int  `json:"ProductID"`
}
