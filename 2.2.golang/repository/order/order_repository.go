package repository

import (
	"golang-crud-gin/model"
	"time"
)

type OrderRepository interface {
    // Create a new order
    Create(order model.Order)  (*model.Order, error)

    // Update an existing order
    Update(order model.Order) error

    // Delete an order by ID
    Delete(id int) error

    // Find an order by its ID
    FindById(id int) (model.Order, error)

    // Find all orders
    FindAll() ([]model.Order, error)

    // Find orders by customer
    FindByCustomer(customerId int) ([]model.Order, error)

    // Find orders by status
    FindByStatus(status string) ([]model.Order, error)

    // Find orders by date range
    FindByDateRange(startDate, endDate time.Time) ([]model.Order, error)

    // Pagination and filtering
    FindOrdersByPage(pageNumber, pageSize int) ([]model.Order, error)
}
