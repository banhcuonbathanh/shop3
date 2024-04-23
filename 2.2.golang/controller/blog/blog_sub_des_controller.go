package controller

import (
	// "errors"
	// "fmt"
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	service "golang-crud-gin/service/blog_sub_des" // Updated service import

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type BlogSubDesController struct {
    blogSubDesService service.BlogSubDesService // Updated service interface
}


func NewBlogSubDesController(service service.BlogSubDesService) *BlogSubDesController {
    return &BlogSubDesController{
        blogSubDesService: service,
    }
}

// ... other controller functions with the following adjustments:
func (controller *BlogSubDesController) CreateListBlogSubDes(ctx *gin.Context) {


    createBlogSubdesignationRequest := request.CreateListBlogSubDesRequest{}
 
    if err := ctx.ShouldBindJSON(&createBlogSubdesignationRequest); 
    
    err != nil {
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusBadRequest, webResponse)
        return
    }
    fmt.Printf("CreateListBlogSubDes controller 11111 BlogPostID %v", createBlogSubdesignationRequest.BlogSubList[0].BlogPostID)
    blogSubDeslist, err := controller.blogSubDesService.SaveList(createBlogSubdesignationRequest)
    if err != nil {
        log.Error().Err(err).Msg("Failed to create blog subdesignation")
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
        Data:   blogSubDeslist,
    }
    ctx.JSON(http.StatusCreated, webResponse)
}
// CreateBlogSubdesignation calls the corresponding service method
func (controller *BlogSubDesController) CreateBlogSubDes(ctx *gin.Context) {
    log.Info().Msg("create blog subdesignation")

    createBlogSubdesignationRequest := request.CreateBlogSubDesRequest{}

    if err := ctx.ShouldBindJSON(&createBlogSubdesignationRequest); err != nil {
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusBadRequest, webResponse)
        return
    }

     err := controller.blogSubDesService.Create(createBlogSubdesignationRequest)
    if err != nil {
        log.Error().Err(err).Msg("Failed to create blog subdesignation")
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

func (controller *BlogSubDesController) UpdateBlogSubDes(ctx *gin.Context) {
    log.Info().Msg("update blog subdesignation")
    blogSubdesignationID := ctx.Param("blogSubdesignationID")
    id, err := strconv.Atoi(blogSubdesignationID)
    helper.ErrorPanic(err)

    updateBlogSubDesRequest := request.UpdateBlogSubDesRequest{}
    if err := ctx.ShouldBindJSON(&updateBlogSubDesRequest); err != nil {
        helper.ErrorPanic(err)
    }
    updateBlogSubDesRequest.ID = id

    err = controller.blogSubDesService.Update(updateBlogSubDesRequest)
    if err != nil {
        log.Error().Err(err).Msg("Failed to update blog subdesignation")
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


func (controller *BlogSubDesController) DeleteBlogSubDes(ctx *gin.Context) {
    log.Info().Msg("delete blog subdesignation controller")
    blogSubdesignationID := ctx.Param("blogSubdesignationID")
    id, err := strconv.Atoi(blogSubdesignationID)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete blog subdesignation")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }

    err = controller.blogSubDesService.Delete(id)
    if err != nil {
        log.Error().Err(err).Msg("Failed to delete blog subdesignation")
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

// FindBlogSubdesignationByID retrieves a blog subdesignation by its ID
func (controller *BlogSubDesController) FindBlogSubDesByID(ctx *gin.Context) {
    log.Info().Msg("find blog subdesignation by ID")
    blogSubdesignationID := ctx.Param("blogSubdesignationID")
    id, err := strconv.Atoi(blogSubdesignationID)
    if err != nil {
        log.Error().Err(err).Msg("Failed to find blog subdesignation")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }


    blogSubdesignationResponse, err := controller.blogSubDesService.FindByID(id)
    if err != nil {
        log.Error().Err(err).Msg("Failed to find blog subdesignation")
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
        Data:   blogSubdesignationResponse,
    }
    ctx.JSON(http.StatusOK, webResponse)
}

// FindAllBlogSubdesignations retrieves all blog subdesignations
func (controller *BlogSubDesController) FindAllBlogSubDes(ctx *gin.Context) {
    log.Info().Msg("find all blog subdesignations")

    blogSubdesignationResponses, err := controller.blogSubDesService.FindAll()
    if err != nil {
        log.Error().Err(err).Msg("Failed to find blog subdesignations")
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
        Data:   blogSubdesignationResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}

// FindBlogSubdesignationsByName retrieves blog subdesignations by name
func (controller *BlogSubDesController) FindBlogSubDesByName(ctx *gin.Context) {
    log.Info().Msg("find blog subdesignations by name")
    name := ctx.Query("name") // Get name from query parameter

    blogSubdesignationResponses, err := controller.blogSubDesService.FindByName(name)
    if err != nil {
        log.Error().Err(err).Msg("Failed to find blog subdesignations by name")
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
        Data:   blogSubdesignationResponses,
    }
    ctx.JSON(http.StatusOK, webResponse)
}
