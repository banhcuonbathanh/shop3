package service

import (
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
)

type OrderItemService interface {
    Create(orderItem request.CreateOrderItemRequestFull) error
    Update(orderItem request.UpdateOrderItemRequest)
    Delete(orderItemID int)
    FindByID(orderItemID int) (response.OrderItemResponse, error)
    FindAll() ([]response.OrderItemResponse, error)
    FindByCustomerID(customerID int) ([]response.OrderItemResponse, error)
    FindByProductID(productID int) ([]response.OrderItemResponse, error)
    FindAllWithPagination(pageNumber, pageSize int) ([]response.OrderItemResponse, error)
}
