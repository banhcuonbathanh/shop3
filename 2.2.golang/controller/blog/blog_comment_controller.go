package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	service "golang-crud-gin/service/blog_comment"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type BlogCommentController struct {
	blogCommentService service.BlogCommentService
}

func NewBlogCommentController(service service.BlogCommentService) *BlogCommentController {
	return &BlogCommentController{
		blogCommentService: service,
	}
}

func (controller *BlogCommentController) CreateComment(ctx *gin.Context) {
    fmt.Printf("2.2.golang/controller/blog/blog_comment_controller.go 1111122 ",)
	createCommentRequest := request.CreateBlogCommentRequest{}
	if err := ctx.ShouldBindJSON(&createCommentRequest); err != nil {

		fmt.Printf("create post controller createPostRequest err %v\n", err)
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }

	// fmt.Printf("createCommentRequest controller: %+v\n", createCommentRequest)

	controller.blogCommentService.Create(createCommentRequest)
	fmt.Printf("2.2.golang/controller/blog/blog_comment_controller.go 2222 ",)
	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *BlogCommentController) UpdateComment(ctx *gin.Context) {
	log.Info().Msg("update comment")
	commentID := ctx.Param("commentID")
	id, err := strconv.Atoi(commentID)
	helper.ErrorPanic(err)

	updateCommentRequest := request.UpdateBlogCommentRequest{}
	if err := ctx.ShouldBindJSON(&updateCommentRequest); err != nil {
		helper.ErrorPanic(err)
	}
	updateCommentRequest.ID = id

	controller.blogCommentService.Update(updateCommentRequest)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *BlogCommentController) DeleteComment(ctx *gin.Context) {
	log.Info().Msg("delete comment")
	commentID := ctx.Param("commentID")
	id, err := strconv.Atoi(commentID)
	helper.ErrorPanic(err)

	controller.blogCommentService.Delete(id)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *BlogCommentController) FindCommentByID(ctx *gin.Context) {
	log.Info().Msg("find comment by ID")
	commentID := ctx.Param("commentID")
	id, err := strconv.Atoi(commentID)
	helper.ErrorPanic(err)

	commentResponse, err := controller.blogCommentService.FindByID(id)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "Comment not found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   commentResponse,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

// Implement other functions like FindAllComments, FindCommentsByUserID, FindCommentsByPostID, FindCommentsByPage similarly
func (controller *BlogCommentController) FindAllCommentsByPostID(ctx *gin.Context) {
    log.Info().Msg("Find all comments by post ID controller")
    postID, err := strconv.Atoi(ctx.Param("postID"))
    if err != nil {
        fmt.Printf("FindAllCommentsByPostID controller postID err %v\n", err)
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusBadRequest, webResponse)
        return
    }

    fmt.Printf("FindAllCommentsByPostID controller: postID %d\n", postID)

    comments, err := controller.blogCommentService.FindAllCommentsByPostID(postID)
    if err != nil {
        fmt.Printf("FindAllCommentsByPostID controller err %v\n", err)
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
        Data:   comments,
    }
    ctx.JSON(http.StatusOK, webResponse)
}
