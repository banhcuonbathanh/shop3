package controller

import (
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	OrderService "golang-crud-gin/service/order"
	service "golang-crud-gin/service/order_item"

	// UserService "golang-crud-gin/service/user"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type OrderItemController struct {
	orderItemService service.OrderItemService // Updated service interface

    orderService OrderService.OrderService

    // userService UserService.UserService
}

func NewOrderItemController(service service.OrderItemService, orderService OrderService.OrderService) *OrderItemController {
	return &OrderItemController{
		orderItemService: service,
        orderService: orderService,

        // userService: userService,
	}
}

func (controller *OrderItemController) CreateOrderItem(ctx *gin.Context) {
	log.Info().Msg("create order item")


    createOrderItemRequest := request.CreateOrderItemRequest{}


    if err := ctx.ShouldBindJSON(&createOrderItemRequest); err != nil {
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

// create order --------------------


createOrderRequest := request.CreateOrderRequest{
UserID: createOrderItemRequest.UserID,
  
    Address: "asdfdsa",
    Phone:   "123412341234",
    IsPaid:  false,
    Status:  "pending", // Assuming "pending" is a valid status
}

order, err := controller.orderService.CreateOrder(createOrderRequest); 
log.Info().Msg("start of create order item 11111111111iuhksadhfkasdhkfjhs")

fmt.Printf("createOrderItemRequest orderorderorder : %+v\n", order)
if err != nil {
    // Error handling as you had it
    log.Error().Err(err).Msg("Failed to create order")
    webResponse := response.Response{
        Code:   http.StatusInternalServerError,
        Status: "Internal Server Error",
        Data:   "Failed to create order",
    }
    ctx.JSON(http.StatusInternalServerError, webResponse)
    return
}

// log.Info().Msg("start of create order item 44444444444")
//

createOrderItemRequestFull := request.CreateOrderItemRequestFull{
    OrderID:int(order.ID) , 
    UserID:  createOrderItemRequest.UserID,
    OrderItem: createOrderItemRequest.OrderItem,
}
	// Log the createOrderItemRequest for debugging
	// fmt.Printf("createOrderItemRequest controllersDFASDFASDFASDF : %+v\n", createOrderItemRequestFull)

	controller.orderItemService.Create(createOrderItemRequestFull)


//    if err != nil {
//     // Error handling as you had it
//     log.Error().Err(err).Msg("Failed to create order")
//     webResponse := response.Response{
//         Code:   http.StatusInternalServerError,
//         Status: "Internal Server Error",
//         Data:   "Failed to create order",
//     }
//     ctx.JSON(http.StatusInternalServerError, webResponse)
//     return
// }



	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *OrderItemController) UpdateOrderItem(ctx *gin.Context) {
	log.Info().Msg("update order item")
	orderItemID := ctx.Param("orderItemID")
	id, err := strconv.Atoi(orderItemID)
	helper.ErrorPanic(err)

	updateOrderItemRequest := request.UpdateOrderItemRequest{}
	if err := ctx.ShouldBindJSON(&updateOrderItemRequest); err != nil {
		helper.ErrorPanic(err)
	}
	updateOrderItemRequest.ID = uint(id)

	controller.orderItemService.Update(updateOrderItemRequest)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *OrderItemController) DeleteOrderItem(ctx *gin.Context) {
	log.Info().Msg("delete order item")
	orderItemID := ctx.Param("orderItemID")
	id, err := strconv.Atoi(orderItemID)
	helper.ErrorPanic(err)

	controller.orderItemService.Delete(id)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *OrderItemController) FindByID(ctx *gin.Context) {
    log.Info().Msg("find order item by ID")
    orderItemID := ctx.Param("orderItemID")
    id, err := strconv.Atoi(orderItemID)
    helper.ErrorPanic(err)

    orderItemResponse, err := controller.orderItemService.FindByID(id)
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "Order item not found",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   orderItemResponse,
    }
    ctx.JSON(http.StatusOK, webResponse)
}

func (controller *OrderItemController) FindAll(ctx *gin.Context) {
    log.Info().Msg("find all order items")
    orderItemResponses, err := controller.orderItemService.FindAll()
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "No order items found",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   orderItemResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}
func (controller *OrderItemController) FindByCustomerID(ctx *gin.Context) {
    log.Info().Msg("find order items by customer ID controller")
    customerID, _ := strconv.Atoi(ctx.Param("customerId"))

    fmt.Printf("FindByCustomerID order controller %+v\n", customerID)

    orderItemResponses, err := controller.orderItemService.FindByCustomerID(customerID)
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "No order items found for the specified customer",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   orderItemResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}



func (controller *OrderItemController) FindByProductID(ctx *gin.Context) {
    log.Info().Msg("find order items by product ID")
    productID, err := strconv.Atoi(ctx.Query("productID"))
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "Invalid product ID",
        }
        ctx.JSON(http.StatusBadRequest, webResponse)
        return
    }

    orderItemResponses, err := controller.orderItemService.FindByProductID(productID)
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "No order items found for the specified product",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   orderItemResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}


func (controller *OrderItemController) FindAllWithPagination(ctx *gin.Context) {
    log.Info().Msg("find order items with pagination")
    pageNumber, err := strconv.Atoi(ctx.DefaultQuery("page", "1"))
    if err != nil || pageNumber < 1 {
        pageNumber = 1
    }

    pageSize, err := strconv.Atoi(ctx.DefaultQuery("pageSize", "10"))
    if err != nil || pageSize < 1 {
        pageSize = 10
    }

    orderItemResponses, err := controller.orderItemService.FindAllWithPagination(pageNumber, pageSize)
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "No order items found for the specified page",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   orderItemResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}
