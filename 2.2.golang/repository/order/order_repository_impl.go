package repository

import (
	"fmt"
	"golang-crud-gin/model"
	"time"

	"gorm.io/gorm"
)

type OrderRepositoryImpl struct {
    Db *gorm.DB
}

func NewOrderRepositoryImpl(Db *gorm.DB) OrderRepository {
    return &OrderRepositoryImpl{Db: Db}
}


func (p *OrderRepositoryImpl) Create(order model.Order) (*model.Order, error) {
    fmt.Printf("createOrderRequest repository:\n")

    // Create the order in the database
    result := p.Db.Create(&order)
    if result.Error != nil {
        return nil, result.Error  // Return error if database creation fails
    }

    // Log the created order for debugging or monitoring
    // fmt.Printf("createOrderRequest repository: %+v\n", order)

    // Return the created order with its updated ID
    return &order, nil  // Return the created order with its updated ID
}

func (p *OrderRepositoryImpl) Update(order model.Order) error {
    result := p.Db.Save(&order)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (p *OrderRepositoryImpl) Delete(id int) error {
    result := p.Db.Where("id = ?", id).Delete(&model.Order{})
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (p *OrderRepositoryImpl) FindById(id int) (model.Order, error) {
    var order model.Order
    result := p.Db.Preload("OrderItem").First(&order, id)
    if result.Error != nil {
        return order, result.Error
    }
    return order, nil
}

func (p *OrderRepositoryImpl) FindAll() ([]model.Order, error) {
    fmt.Println("FindAll repository: Start fetching orders...")
    var orders []model.Order
    result := p.Db.Preload("OrderItem").Find(&orders)
    if result.Error != nil {
        return nil, result.Error
    }
    fmt.Printf("Orders retrieved from the database repository: %+v\n", orders)
    return orders, nil
}

func (p *OrderRepositoryImpl) FindByCustomer(customerId int) ([]model.Order, error) {
    var orders []model.Order
    result := p.Db.Where("user_id = ?", customerId).Find(&orders)
    if result.Error != nil {
        return nil, result.Error
    }
    return orders, nil
}

func (p *OrderRepositoryImpl) FindByStatus(status string) ([]model.Order, error) {
    var orders []model.Order
    result := p.Db.Where("is_paid = ?", status).Find(&orders)
    if result.Error != nil {
        return nil, result.Error
    }
    return orders, nil
}

func (p *OrderRepositoryImpl) FindByDateRange(startDate, endDate time.Time) ([]model.Order, error) {
    var orders []model.Order
    result := p.Db.Where("created_at BETWEEN ? AND ?", startDate, endDate).Find(&orders)
    if result.Error != nil {
        return nil, result.Error
    }
    return orders, nil
}

func (p *OrderRepositoryImpl) FindOrdersByPage(pageNumber, pageSize int) ([]model.Order, error) {
    var orders []model.Order
    offset := (pageNumber - 1) * pageSize
    result := p.Db.Offset(offset).Limit(pageSize).Find(&orders)
    if result.Error != nil {
        return nil, result.Error
    }
    return orders, nil
}
