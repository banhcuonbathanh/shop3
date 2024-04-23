package controller

import (
	// "errors"
	// "fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	service "golang-crud-gin/service/order" // Updated service import

	"net/http"
	"strconv"

	OrderItemService "golang-crud-gin/service/order_item"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type OrderController struct {
    orderService service.OrderService // Updated service interface
    orderItemService OrderItemService.OrderItemService

}

func NewOrderController(service service.OrderService,  orderItemService OrderItemService.OrderItemService) *OrderController {
    return &OrderController{
        orderService: service,
        orderItemService: orderItemService,

    }
}

// ... other controller functions with the following adjustments:

// CreateOrder calls the corresponding service method
func (controller *OrderController) CreateOrder(ctx *gin.Context) {
    log.Info().Msg("create order")

    createOrderRequest := request.CreateOrderRequest{}

    if err := ctx.ShouldBindJSON(&createOrderRequest); 
    
    err != nil {
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusBadRequest, webResponse)
        return
    }



    
    // Log the createOrderRequest for debugging
    // fmt.Printf("createOrderRequest controller: %+v\n", createOrderRequest)

    _, err := controller.orderService.CreateOrder(createOrderRequest)
    if err != nil {
        log.Error().Err(err).Msg("Failed to create order")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusCreated,
        Status: "Created",
        Data:   nil,
    }
    ctx.JSON(http.StatusCreated, webResponse)
}

func (controller *OrderController) UpdateOrder(ctx *gin.Context) {
    log.Info().Msg("update order")
    orderID := ctx.Param("orderID")
    id, err := strconv.Atoi(orderID)
    helper.ErrorPanic(err)

    updateOrderRequest := request.UpdateOrderRequest{}
    if err := ctx.ShouldBindJSON(&updateOrderRequest); err != nil {
        helper.ErrorPanic(err)
    }
    updateOrderRequest.ID = id

    err = controller.orderService.UpdateOrder(updateOrderRequest)
    if err != nil {
        log.Error().Err(err).Msg("Failed to update order")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   nil,
    }
    ctx.JSON(http.StatusOK, webResponse)
}


func (controller *OrderController) DeleteOrder(ctx *gin.Context) {
    log.Info().Msg("delete order controller")
    orderID := ctx.Param("orderID")
    id, err := strconv.Atoi(orderID)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete order")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    err = controller.orderService.DeleteOrder(id)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete order")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   nil,
    }
    ctx.JSON(http.StatusOK, webResponse)
}

func (controller *OrderController) FindOrderByID(ctx *gin.Context) {
    log.Info().Msg("find order by ID")
    orderID := ctx.Param("orderID")
    id, err := strconv.Atoi(orderID)
    helper.ErrorPanic(err)

    orderResponse, err := controller.orderService.FindOrderByID(id)
    if err != nil {
        // Use gorm.ErrRecordNotFound instead of sql.ErrNoRows
        // if errors.Is(err, ErrRecordNotFound) { // Check for GORM's specific error
        //     webResponse := response.Response{
        //         Code:   http.StatusNotFound,
        //         Status: "Not Found",
        //         Data:   "Order not found",
        //     }
        //     ctx.JSON(http.StatusNotFound, webResponse)
        //     return
        // }
        // log.Error().Err(err).Msg("Failed to find order")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   orderResponse,
    }
    ctx.JSON(http.StatusOK, webResponse)
}


func (controller *OrderController) FindAllOrders(ctx *gin.Context) {
    log.Info().Msg("find all orders")

    orderResponses, err := controller.orderService.FindAllOrders()
    if err != nil {
        log.Error().Err(err).Msg("Failed to find all orders")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   orderResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}
