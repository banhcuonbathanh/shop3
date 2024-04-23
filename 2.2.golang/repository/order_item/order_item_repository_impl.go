package repository

import (
	"errors"
	"fmt"
	"golang-crud-gin/model"

	"gorm.io/gorm"
)



type OrderItemRepositoryImpl struct {
	Db *gorm.DB
}

func NewOrderItemRepositoryImpl(Db *gorm.DB) OrderItemRepository {
	return &OrderItemRepositoryImpl{Db: Db}
}

func (o *OrderItemRepositoryImpl) Save(orderItem []model.OrderItem) error {

	fmt.Printf("OrderItemRepositoryImpl repository result orderItem: SaveSaveSave",)
	// firstOrderItem := orderItem[0]

    // Print the first order item
    // fmt.Printf("First order item:order item repository1111 %+v\n", firstOrderItem)
	// orderItemModel := model.OrderItem{
	// 	UserID: orderItem.UserID,
	// 	Total:      orderItem.Total,
	// 	Quantity:   orderItem.Quantity,
    //     ProductID: orderItem.ProductID,
	// 	// Other assignments related to Product and OrderID or ProductID here
	// }

	for _, orderItem1 := range orderItem {
        // Print each order item for debugging
		fmt.Printf("Saving order item:orderItem1.UserID %+v\n", orderItem1.UserID )
		fmt.Printf("Saving order item:orderItem1.ProductID %+v\n", orderItem1.ProductID )
        fmt.Printf("Saving order item:orderItem1.Quantity %+v\n", orderItem1.Quantity )
		fmt.Printf("Saving order item:orderItem1.Total %+v\n", orderItem1.Total )
		fmt.Printf("Saving order item:orderItem1.OrderID %+v\n", orderItem1.OrderID )
		fmt.Printf("Saving order item:orderItem1.Product %+v\n", orderItem1.Product )
	
        // Handle any necessary assignments for Product, OrderID, or ProductID here

        // Save the individual order item
        result := o.Db.Save(&orderItem1)
        if result.Error != nil {
            return result.Error
        }
    }

    return nil
}

func (o *OrderItemRepositoryImpl) Update(orderItem model.OrderItem) error {
	result := o.Db.Save(&orderItem)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (o *OrderItemRepositoryImpl) Delete(orderItemID uint) error {
	result := o.Db.Where("id = ?", orderItemID).Delete(&model.OrderItem{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (o *OrderItemRepositoryImpl) FindByID(orderItemID uint) (model.OrderItem, error) {
	var orderItem model.OrderItem
	result := o.Db.First(&orderItem, orderItemID)
	if result.Error != nil {
		return orderItem, errors.New("order item not found")
	}
	return orderItem, nil
}

func (o *OrderItemRepositoryImpl) FindAll() ([]model.OrderItem, error) {
	var orderItems []model.OrderItem
	result := o.Db.Find(&orderItems)
	if result.Error != nil {
		return nil, result.Error
	}
	return orderItems, nil
}

func (o *OrderItemRepositoryImpl) FindByCustomerID(customerID int) ([]model.OrderItem, error) {
    fmt.Printf("FindByCustomerID order item repository  %+v\n", customerID)
    var orderItems []model.OrderItem
    result := o.Db.Where("customer_id = ?", customerID).Preload("Product").Preload("Product.Category").Preload("Product.Color").Preload("Product.Size").Find(&orderItems)
    if result.Error != nil {
        return nil, result.Error
    }
    fmt.Printf("FindByCustomerID order item repository orderItems %+v\n", orderItems)
    return orderItems, nil
}


func (o *OrderItemRepositoryImpl) FindByProductID(productID int) ([]model.OrderItem, error) {
	var orderItems []model.OrderItem
	result := o.Db.Where("product_id = ?", productID).Find(&orderItems)
	if result.Error != nil {
		return nil, result.Error
	}
	return orderItems, nil
}

func (o *OrderItemRepositoryImpl) FindOrderItemsByPage(pageNumber, pageSize int) ([]model.OrderItem, error) {
	var orderItems []model.OrderItem
	offset := (pageNumber - 1) * pageSize
	result := o.Db.Offset(offset).Limit(pageSize).Find(&orderItems)
	if result.Error != nil {
		return nil, result.Error
	}
	return orderItems, nil
}
