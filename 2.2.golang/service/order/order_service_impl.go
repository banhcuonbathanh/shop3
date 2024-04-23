package service

import (
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/model"
	repository "golang-crud-gin/repository/order" // Assuming an order repository
	"time"

	"github.com/go-playground/validator/v10"
	// "github.com/rs/zerolog/log"
)


type OrderServiceImpl struct {
    OrderRepository repository.OrderRepository
    Validate          *validator.Validate
   
}
func NewOrderServiceImpl(orderRepository repository.OrderRepository, validate *validator.Validate) OrderService {
    return &OrderServiceImpl{
        OrderRepository: orderRepository,
        Validate:          validate,
      
    }
}

func (s *OrderServiceImpl) CreateOrder(request request.CreateOrderRequest) (*model.Order, error) {
    err := s.Validate.Struct(request)
    if err != nil {
        return nil, err
    }
 
    // Create a model.Order from the request data, ensuring compatibility with model fields
    order := model.Order{
        UserID:  request.UserID,
        Status:  model.Pending, // Using model.Pending for type consistency

        Address:  request.Address,
        Phone:    request.Phone,
        IsPaid:   request.IsPaid,
    }
 

 
    // Call the repository to create the order
    createdOrder, err := s.OrderRepository.Create(order)
    if err != nil {
        return nil, err
    }
 
    return createdOrder, nil
 }
 

// ... (rest of the methods with similar changes as in CreateOrder)

func (s *OrderServiceImpl) FindOrderByID(id int) (response.OrderResponse, error) {
    order, err := s.OrderRepository.FindById(id)
    if err != nil {
        return response.OrderResponse{}, err
    }

    // Map the order model to a response model
    orderResponse := mapOrderToResponse(order)

    return orderResponse, nil
}

// ... (other methods as needed, based on the OrderRepository interface)

func mapOrderToResponse(order model.Order) response.OrderResponse {
	return response.OrderResponse{
		ID:           order.ID,
		UserID:       order.UserID,
		Items:        mapOrderItemsToResponse(order.OrderItem),
		Address:      order.Address,
		Phone:        order.Phone,
		IsPaid:       order.IsPaid,
		Status:       string(order.Status), // Convert OrderStatus to string
		CreatedAt:    order.CreatedAt,
		UpdatedAt:    order.UpdatedAt,
	}
 }
 


 func (s *OrderServiceImpl) UpdateOrder(request request.UpdateOrderRequest) error {
    err := s.Validate.Struct(request)
    if err != nil {
        return err
    }

    // Retrieve the existing order
    order, err := s.OrderRepository.FindById(request.ID)
    if err != nil {
        return err
    }

    // Update the order fields based on the request
    order.Status = request.Status
    order.Address = request.Address
    order.Phone = request.Phone
    order.IsPaid = request.IsPaid

    // Handle items update (if applicable)
    if request.Items != nil {
        return err
    }

    // Call the repository to update the order
    err = s.OrderRepository.Update(order)
    return err
}

func (s *OrderServiceImpl) DeleteOrder(id int) error {
    // Call the repository to delete the order
    err := s.OrderRepository.Delete(id)
    return err
}

func (s *OrderServiceImpl) FindAllOrders() ([]response.OrderResponse, error) {
    orders, err := s.OrderRepository.FindAll()
    if err != nil {
        return nil, err
    }

    responseOrders := make([]response.OrderResponse, len(orders))
    for i, order := range orders {
        responseOrders[i] = mapOrderToResponse(order)
    }

    return responseOrders, nil
}







// ... (Implement other methods like FindOrdersByCustomer, FindOrdersByStatus, etc., using similar patterns)




 func mapOrderItemsToResponse(orderItems []model.OrderItem) []response.OrderItemResponse {
	var responseItems []response.OrderItemResponse
	for _, item := range orderItems {
		responseItem := response.OrderItemResponse{
			ID:          item.ID,
			OrderID:     item.OrderID,
			ProductID:   item.ProductID,
			UserID:      item.UserID, 
			// Total:       item.Product.Price * float32(item.Quantity), 
			Quantity:    item.Quantity,
			// Product:     item.Product, 
			CreatedAt:   item.CreatedAt,
			UpdatedAt:   item.UpdatedAt,
		}
		responseItems = append(responseItems, responseItem)
	}
	return responseItems
 }
 

 func (s *OrderServiceImpl) FindOrdersByCustomer(customerID int) ([]response.OrderResponse, error) {
	// 1. Retrieve orders from the repository using the customerID
	orders, err := s.OrderRepository.FindByCustomer(customerID)
	if err != nil {
		return nil, err
	}
 
	// 2. Map the retrieved orders to response model
	responseOrders := make([]response.OrderResponse, len(orders))
	for i, order := range orders {
		responseOrders[i] = mapOrderToResponse(order)
	}
 
	return responseOrders, nil
 }
 
 func (service *OrderServiceImpl) FindOrdersByStatus(status string) ([]response.OrderResponse, error) {
    // 1. Retrieve orders by status from the repository
    orders, err := service.OrderRepository.FindByStatus(status)
    if err != nil {
        return nil, err
    }

    // 2. Map the retrieved orders to response model
    responseOrders := make([]response.OrderResponse, len(orders))
    for i, order := range orders {
        responseOrders[i] = mapOrderToResponse(order)
    }

    return responseOrders, nil
}

func (service *OrderServiceImpl) FindOrdersByDateRange(startDate, endDate time.Time) ([]response.OrderResponse, error) {
    // 1. Retrieve orders within date range from the repository
    orders, err := service.OrderRepository.FindByDateRange(startDate, endDate)
    if err != nil {
        return nil, err
    }

    // 2. Map the retrieved orders to response model
    responseOrders := make([]response.OrderResponse, len(orders))
    for i, order := range orders {
        responseOrders[i] = mapOrderToResponse(order)
    }

    return responseOrders, nil
}

func (service *OrderServiceImpl) FindOrdersByPage(pageNumber, pageSize int) ([]response.OrderResponse, error) {
    // 1. Retrieve orders with pagination from the repository
    orders, err := service.OrderRepository.FindOrdersByPage(pageNumber, pageSize)
    if err != nil {
        return nil, err
    }

    // 2. Map the retrieved orders to response model
    responseOrders := make([]response.OrderResponse, len(orders))
    for i, order := range orders {
        responseOrders[i] = mapOrderToResponse(order)
    }

    return responseOrders, nil
}
