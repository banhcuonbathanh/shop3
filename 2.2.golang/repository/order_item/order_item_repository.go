package repository

import "golang-crud-gin/model"


type OrderItemRepository interface {
    Save(orderItem []model.OrderItem) error
    Update(orderItem model.OrderItem) error
    Delete(orderItemID uint) error
    FindByID(orderItemID uint) (model.OrderItem, error)
    FindAll() ([]model.OrderItem, error)
    // Add any additional methods you need for the order item repository here

    // For example, you can add a method to find order items by customer ID or product ID:
    FindByCustomerID(customerID int) ([]model.OrderItem, error)
    FindByProductID(productID int) ([]model.OrderItem, error)

    FindOrderItemsByPage(pageNumber, pageSize int) ([]model.OrderItem, error)
}
