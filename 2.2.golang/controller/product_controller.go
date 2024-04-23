package controller

import (
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	"net/http"
	"strconv"

	service "golang-crud-gin/service/product"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type ProductController struct {
	productService service.ProductService
}

func NewProductController(service service.ProductService) *ProductController {
	return &ProductController{
		productService: service,
	}
}

func (controller *ProductController) CreateProduct(ctx *gin.Context) {
	log.Info().Msg("create product controller")
	createProductRequest := request.CreateProductRequest{}
	if err := ctx.ShouldBindJSON(&createProductRequest); err != nil {
		helper.ErrorPanic(err)
	}

	// Now you have the ImageUrls as a slice of strings
	// You can access them using createProductRequest.ImageUrls
	// and use it as needed in your service.
	controller.productService.CreateProduct(createProductRequest)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) UpdateProduct(ctx *gin.Context) {
	log.Info().Msg("update productasdfasdfasdfsadf")
	productID := ctx.Param("productId")
	id, err := strconv.Atoi(productID)
	helper.ErrorPanic(err)

	updateProductRequest := request.UpdateProductRequest{}
	if err := ctx.ShouldBindJSON(&updateProductRequest); err != nil {
		helper.ErrorPanic(err)
	}
	updateProductRequest.Id = id

	controller.productService.UpdateProduct(updateProductRequest)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) DeleteProduct(ctx *gin.Context) {
	log.Info().Msg("delete productasdfasdfasdfdsafasdf")
	productID := ctx.Param("productId")
	id, err := strconv.Atoi(productID)
	helper.ErrorPanic(err)

	controller.productService.DeleteProduct(id)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) FindProductByID(ctx *gin.Context) {
	log.Info().Msg("find product by ID controller adfgasdafsdfasfasdfsa")
	productID := ctx.Param("productId")
	id, err := strconv.Atoi(productID)
	helper.ErrorPanic(err)

	productResponse, err := controller.productService.FindProductByID(id)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "Product not found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   productResponse,
	}


	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) FindAllProducts(ctx *gin.Context) {
	// log.Info().Msg("find all productsasdfasdfasdfadsfasdfs")
	productResponses, err := controller.productService.FindAllProducts()
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No products found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   productResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) FindProductsByCategory(ctx *gin.Context) {
	log.Info().Msg("find products by category controller")
	categoryID, err := strconv.Atoi(ctx.Query("categoryID"))
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "Invalid category ID",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	productResponses, err := controller.productService.FindProductsByCategory(categoryID)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No products found for the specified category",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   productResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) FindProductsByColor(ctx *gin.Context) {
	log.Info().Msg("find products by color controller")
	colorID, err := strconv.Atoi(ctx.Query("colorID"))
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "Invalid color ID",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	productResponses, err := controller.productService.FindProductsByColor(colorID)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No products found for the specified color",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   productResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) FindProductsBySize(ctx *gin.Context) {
	log.Info().Msg("find products by size controller")
	sizeID, err := strconv.Atoi(ctx.Query("sizeID"))
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "Invalid size ID",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	productResponses, err := controller.productService.FindProductsBySize(sizeID)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No products found for the specified size",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   productResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) FindProductsByCharacteristic(ctx *gin.Context) {
	log.Info().Msg("find products by characteristic controller")
	characteristic := ctx.Query("characteristic")

	if characteristic == "" {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "Characteristic is required",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	productResponses, err := controller.productService.FindProductsByCharacteristic(characteristic)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No products found for the specified characteristic",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   productResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ProductController) FindProductsByPage(ctx *gin.Context) {
	log.Info().Msg("find products by page controller")

	page, err := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	if err != nil || page < 1 {
		page = 1
	}

	pageSize, err := strconv.Atoi(ctx.DefaultQuery("pageSize", "10"))
	if err != nil || pageSize < 1 {
		pageSize = 10
	}

	productResponses, err := controller.productService.FindProductsByPage(page, pageSize)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No products found for the specified page",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   productResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}
func (controller *ProductController) FindProductsByProductName(ctx *gin.Context) {

    productName := ctx.Query("name")
  

    if productName == "" {
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "Product name is required",
        }
        ctx.JSON(http.StatusBadRequest, webResponse)
        return
    }

    productResponses, err := controller.productService.FindProductsByProductName(productName)
    if err != nil {
        webResponse := response.Response{
            Code:   http.StatusNotFound,
            Status: "Not Found",
            Data:   "No products found for the specified name",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }
	fmt.Printf("createProductRequest 222222222222", )
    webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   productResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}
