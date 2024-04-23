package newcomment

import (
	"fmt"
	"net/http"
	"strconv"

	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	service "golang-crud-gin/newcomment/blog_new_comment_service"
	data "golang-crud-gin/newcomment/data"
	blog "golang-crud-gin/newcomment/model"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type BlogNewCommentController struct {
	blogNewCommentService service.BlogNewCommentService
}

func NewBlogNewCommentController(service service.BlogNewCommentService) *BlogNewCommentController {
	return &BlogNewCommentController{
		blogNewCommentService: service,
	}
}

func (controller *BlogNewCommentController) CreateComment(ctx *gin.Context) {
    fmt.Printf("2.2.golang/controller/blog/blog_comment_controller.go 1111122 ",)
	createCommentRequest := data.CreateBlogNewCommentRequest{}
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

	controller.blogNewCommentService.Create(createCommentRequest)
	fmt.Printf("2.2.golang/controller/blog/blog_comment_controller.go 2222 ",)
	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *BlogNewCommentController) UpdateComment(ctx *gin.Context) {
	log.Info().Msg("update comment")
	commentID := ctx.Param("commentID")
	id, err := strconv.Atoi(commentID)
	helper.ErrorPanic(err)

	updateCommentRequest := data.UpdateBlogNewCommentRequest{}
	if err := ctx.ShouldBindJSON(&updateCommentRequest); err != nil {
		helper.ErrorPanic(err)
	}
	updateCommentRequest.ID = id

	controller.blogNewCommentService.Update(updateCommentRequest)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *BlogNewCommentController) DeleteComment(ctx *gin.Context) {
	log.Info().Msg("delete comment")
	commentID := ctx.Param("commentID")
	id, err := strconv.Atoi(commentID)
	helper.ErrorPanic(err)

	controller.blogNewCommentService.Delete(id)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *BlogNewCommentController) FindCommentByID(ctx *gin.Context) {
	log.Info().Msg("find comment by ID")
	commentID := ctx.Param("commentID")
	id, err := strconv.Atoi(commentID)
	helper.ErrorPanic(err)

	commentResponse, err := controller.blogNewCommentService.FindByID(id)
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
func (controller *BlogNewCommentController) FindAllCommentsByPostID(ctx *gin.Context) {
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

    comments, err := controller.blogNewCommentService.FindAllCommentsByPostID(postID)
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


func (controller *BlogNewCommentController) AddBlogNewCommentModel(ctx *gin.Context) {
	fmt.Printf("2.2.golang/controller/blog/blog_comment_controller.go 1111122 ",)
	createCommentRequest := data.CreateBlogNewCommentRequest{}
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

    // Convert createCommentRequest to BlogNewCommentModel
    blogNewCommentModel := blog.BlogNewCommentModel{
        Desc:            createCommentRequest.Desc,
        UserEmail:       createCommentRequest.UserEmail,
        PostSlug:        createCommentRequest.PostSlug,
        UserID:          createCommentRequest.UserID,
        BlogPostID:      createCommentRequest.BlogPostID,
        SourceType:      createCommentRequest.SourceType,
        CategoryComment: createCommentRequest.CategoryComment,
        UserName:        createCommentRequest.UserName,
        CommentText:     createCommentRequest.CommentText,
        IsRootNode:      createCommentRequest.IsRootNode,
   
        LevelOfComment:  createCommentRequest.LevelOfComment,
        ParentID:        createCommentRequest.ParentID,
        ChildComment:    createCommentRequest.ChildComment,
    }

	 err :=  controller.blogNewCommentService.AddBlogNewCommentModel(blogNewCommentModel, createCommentRequest.ParentID)
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

	webResponse := response.Response{
        Code:   http.StatusOK,
        Status: "Ok",
        Data:   nil,
    }
	ctx.JSON(http.StatusOK, webResponse)
}
