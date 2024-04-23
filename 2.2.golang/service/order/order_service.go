package service

import (
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/model"
	"time"
)

type OrderService interface {
    CreateOrder(request request.CreateOrderRequest) (*model.Order, error)
    UpdateOrder(request request.UpdateOrderRequest) error
    DeleteOrder(id int) error
    FindOrderByID(id int) (response.OrderResponse, error)
    FindAllOrders() ([]response.OrderResponse, error)
    FindOrdersByCustomer(customerID int) ([]response.OrderResponse, error)
    FindOrdersByStatus(status string) ([]response.OrderResponse, error)
    FindOrdersByDateRange(startDate, endDate time.Time) ([]response.OrderResponse, error)
    FindOrdersByPage(pageNumber, pageSize int) ([]response.OrderResponse, error)
}
