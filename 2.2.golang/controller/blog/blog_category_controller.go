package controller

import (
	// "errors"
	// "fmt"
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	service "golang-crud-gin/service/blog_category" // Updated service import

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type BlogCategoryController struct {
    blogCategoryService service.BlogCategoryService // Updated service interface
}


func NewBlogCategoryController(service service.BlogCategoryService) *BlogCategoryController {
    return &BlogCategoryController{
        blogCategoryService: service,
    }
}

// ... other controller functions with the following adjustments:

// CreateBlogCategory calls the corresponding service method
func (controller *BlogCategoryController) CreateBlogCategory(ctx *gin.Context) {
    log.Info().Msg("create blog category controller ")

    createBlogCategoryRequest := request.CreateBlogCategoryRequest{}
	fmt.Printf("create blog category controller: %v\n", createBlogCategoryRequest)
    fmt.Printf("create blog category controller:ctx %v\n", ctx)
    if err := ctx.ShouldBindJSON(&createBlogCategoryRequest); 
   
    err != nil {

        log.Info().Msg("create blog category controller 1")
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusBadRequest, webResponse)
        return
    }
    log.Info().Msg("create blog category controller 2")
     err := controller.blogCategoryService.Create(createBlogCategoryRequest)
    if err != nil {
        log.Error().Err(err).Msg("Failed to create blog category")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }
    log.Info().Msg("create blog category controller 2")
    webResponse := response.Response{
        Code:   http.StatusCreated,
        Status: "Created",
        Data:   nil,
    }
    ctx.JSON(http.StatusCreated, webResponse)
}

func (controller *BlogCategoryController) UpdateBlogCategory(ctx *gin.Context) {
    log.Info().Msg("update blog category")
    blogCategoryID := ctx.Param("blogCategoryID")
    id, err := strconv.Atoi(blogCategoryID)
    helper.ErrorPanic(err)

    updateBlogCategoryRequest := request.UpdateBlogCategoryRequest{}
    if err := ctx.ShouldBindJSON(&updateBlogCategoryRequest); err != nil {
        helper.ErrorPanic(err)
    }
    updateBlogCategoryRequest.ID = id

    err = controller.blogCategoryService.Update(updateBlogCategoryRequest)
    if err != nil {
        log.Error().Err(err).Msg("Failed to update blog category")
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


func (controller *BlogCategoryController) DeleteBlogCategory(ctx *gin.Context) {
    log.Info().Msg("delete blog category controller")
    blogCategoryID := ctx.Param("blogCategoryID")
    id, err := strconv.Atoi(blogCategoryID)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete blog category")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    err = controller.blogCategoryService.Delete(id)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete blog category")
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



// ... existing functions

// FindBlogCategoryByID retrieves a blog category by its ID
func (controller *BlogCategoryController) FindBlogCategoryByID(ctx *gin.Context) {
    log.Info().Msg("find blog category by ID")
    blogCategoryID := ctx.Param("blogCategoryID")
    id, err := strconv.Atoi(blogCategoryID)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete blog category")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }


    blogCategoryResponse, err := controller.blogCategoryService.FindByID(id)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete blog category")
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
        Data:   blogCategoryResponse,
    }
    ctx.JSON(http.StatusOK, webResponse)
}

// FindAllBlogCategories retrieves all blog categories
func (controller *BlogCategoryController) FindAllBlogCategories(ctx *gin.Context) {
    log.Info().Msg("find all blog categories")

    blogCategoryResponses, err := controller.blogCategoryService.FindAll()
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete blog category")
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
        Data:   blogCategoryResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}

// FindBlogCategoriesByName retrieves blog categories by name
func (controller *BlogCategoryController) FindBlogCategoriesByName(ctx *gin.Context) {
    log.Info().Msg("find blog categories by name")
    name := ctx.Query("name") // Get name from query parameter

    blogCategoryResponses, err := controller.blogCategoryService.FindByName(name)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete blog category")
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
        Data:   blogCategoryResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}


