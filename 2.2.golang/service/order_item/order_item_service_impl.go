package service

import (
	// "fmt"
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	"golang-crud-gin/model"

	repository "golang-crud-gin/repository/order_item"
	serviceUser "golang-crud-gin/service/user"

	"github.com/go-playground/validator/v10"
)

type OrderItemServiceImpl struct {
	OrderItemRepository repository.OrderItemRepository
	Validate            *validator.Validate
	ServiceUser         serviceUser.UserService

}

func NewOrderItemServiceImpl(orderItemRepository repository.OrderItemRepository, validate *validator.Validate,
	ServiceUser         serviceUser.UserService,
	
	) OrderItemService {
	return &OrderItemServiceImpl{
		OrderItemRepository: orderItemRepository,
		Validate:            validate,

		ServiceUser: ServiceUser,
	

	}
}

func (s *OrderItemServiceImpl) Create(orderItem request.CreateOrderItemRequestFull) error {
	fmt.Printf("createOrderItemRequest service orderItemasdfasdfasdfadsfsadfasdfasdfads: %v\n", orderItem.OrderID)

	err := s.Validate.Struct(orderItem)
	if err != nil {
        return err
    }
 
	// Create a list of OrderItem models, including Total and Quantity
	orderItemModels := make([]model.OrderItem, len(orderItem.OrderItem))
	for i, item := range orderItem.OrderItem {
		orderItemModels[i] = model.OrderItem{
			UserID:     orderItem.UserID,
			ProductID:  item.ProductID,
			// Total: float32(item.Quantity),
			Quantity:   item.Quantity, // Assign Quantity from request
		    Total: float32(item.Quantity) * item.Product.Price,
			Product: item.Product,
			OrderID: orderItem.OrderID,
		
		}
	}
 // update user infomaion 
//  userRequest, err :=   s.ServiceUser.FindByID(orderItem.UserID)
// 	if err != nil {
// 		newErr := fmt.Errorf("%v: %s", err, "User data could not be retrieved for the given ID from ServiceUser")

// 		return newErr
//     }

// 	user.Name = userRequest.Name
//     user.Email = userRequest.Email
//     user.EmailVerified = userRequest.Email
//     user.Image = userRequest.Image
//     user.Password = userRequest.HashedPassword
//     user.FavoriteIds = userRequest.FavoriteIds
//     user.PhoneNumber = userRequest.PhoneNumber
//     user.StreetAddress = userRequest.StreetAddress
//     user.Role = userRequest.Role 
// 	s.ServiceUser.Update()

	// Save the list of order items
	err = s.OrderItemRepository.Save(orderItemModels)
	return err
 }
 

func (s *OrderItemServiceImpl) Update(orderItem request.UpdateOrderItemRequest) {
	orderItemData, err := s.OrderItemRepository.FindByID(orderItem.ID)
	helper.ErrorPanic(err)

	orderItemData.Quantity = orderItem.Quantity
	orderItemData.ProductID = orderItem.ProductID
	// Update other fields as needed

	err = s.OrderItemRepository.Update(orderItemData)
	helper.ErrorPanic(err)
}

func (s *OrderItemServiceImpl) Delete(orderItemID int) {
	err := s.OrderItemRepository.Delete(uint(orderItemID))
	helper.ErrorPanic(err)
}

func (s *OrderItemServiceImpl) FindAll() ([]response.OrderItemResponse, error) {
	result, err := s.OrderItemRepository.FindAll()
	if err != nil {
		return nil, err
	}

	var orderItems []response.OrderItemResponse
	for _, value := range result {
		orderItem := response.OrderItemResponse{
			ID:        value.ID,
			UserID: value.UserID,
			Total:     value.Total,
			Quantity:  value.Quantity,
			// Product: value.Product,
			OrderID:    value.OrderID,
			CreatedAt:  value.CreatedAt,
			UpdatedAt:  value.UpdatedAt,
			ProductID:  value.ProductID,
		}
		orderItems = append(orderItems, orderItem)
	}

	return orderItems, nil
}







func (s *OrderItemServiceImpl) FindByID(orderItemID int) (response.OrderItemResponse, error) {
	orderItemData, err := s.OrderItemRepository.FindByID(uint(orderItemID))
	if err != nil {
		return response.OrderItemResponse{}, err
	}

	orderItemResponse := response.OrderItemResponse{
		ID:        orderItemData.ID,
		UserID: orderItemData.UserID,
		Total:     orderItemData.Total,
		Quantity:  orderItemData.Quantity,
		// Assign other fields from the model to the response
	}
	return orderItemResponse, nil
}

func (s *OrderItemServiceImpl) FindByCustomerID(customerID int) ([]response.OrderItemResponse, error) {
    result, err := s.OrderItemRepository.FindByCustomerID(customerID)
    if err != nil {
        return nil, err
    }

	var orderItems []response.OrderItemResponse
	for _, value := range result {
		orderItem := response.OrderItemResponse{
			ID:        value.ID,
			UserID: value.UserID,
			Total:     value.Total,
			Quantity:  value.Quantity,
			// Product: value.Product,
			OrderID:    value.OrderID,
			CreatedAt:  value.CreatedAt,
			UpdatedAt:  value.UpdatedAt,
			ProductID:  value.ProductID,
		}
		orderItems = append(orderItems, orderItem)
	}

    return orderItems, nil
}


func (s *OrderItemServiceImpl) FindByProductID(productID int) ([]response.OrderItemResponse, error) {
    result, err := s.OrderItemRepository.FindByProductID(productID)
    if err != nil {
        return nil, err
    }

    var orderItems []response.OrderItemResponse
    for _, value := range result {
        orderItem := response.OrderItemResponse{
            ID:        value.ID,
            UserID: value.UserID,
            Total:     value.Total,
            Quantity:  value.Quantity,
            // Assign other fields from the model to the response
        }
        orderItems = append(orderItems, orderItem)
    }

    return orderItems, nil
}


func (s *OrderItemServiceImpl) FindAllWithPagination(pageNumber, pageSize int) ([]response.OrderItemResponse, error) {
    result, err := s.OrderItemRepository.FindOrderItemsByPage(pageNumber, pageSize)
    if err != nil {
        return nil, err
    }

    var orderItems []response.OrderItemResponse
    for _, value := range result {
        orderItem := response.OrderItemResponse{
            ID:        value.ID,
            UserID: value.UserID,
            Total:     value.Total,
            Quantity:  value.Quantity,
            // Assign other fields from the model to the response
        }
        orderItems = append(orderItems, orderItem)
    }

    return orderItems, nil
}
