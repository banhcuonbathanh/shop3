package controller

import (
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	service "golang-crud-gin/service/blog_post" // Update service import to post service

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

type PostController struct {
	postService service.PostService // Updated service interface to handle posts
}

func NewPostController(service service.PostService) *PostController {
	return &PostController{
		postService: service,
	}
}

// Update function names and request/response types according to the post operations

func (controller *PostController) CreatePost(ctx *gin.Context) {
	log.Info().Msg("create post controller")
	createPostRequest := request.CreatePostRequest{}
	if err := ctx.ShouldBindJSON(&createPostRequest); err != nil {

		fmt.Printf("create post controller createPostRequest err %v\n", err)
        webResponse := response.Response{
            Code:   http.StatusBadRequest,
            Status: "Bad Request",
            Data:   "wrong input value",
        }
        ctx.JSON(http.StatusNotFound, webResponse)
        return
    }
	log.Info().Msg("create post controller 1")
	// Assuming createPostRequest.ImageUrls contains the image URLs for the post
	// Now you have the ImageUrls as a slice of strings
	// You can access them using createPostRequest.ImageUrls
	// and use it as needed in your service.
	createdPost,	err := controller.postService.CreatePost(createPostRequest)
	fmt.Printf("create post controller controller.postService.CreatePost createdPost %v\n", createdPost)
	if err != nil {
		fmt.Printf("create post controller controller.postService.CreatePost err %v\n", err)
        log.Error().Err(err).Msg("Failed to create order")
        webResponse := response.Response{
            Code:   http.StatusInternalServerError,
            Status: "Internal Server Error",
            Data:   err.Error(),
        }
        ctx.JSON(http.StatusInternalServerError, webResponse)
        return
    }
	log.Info().Msg("create post controller 2")
	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   createdPost,
	}
	ctx.JSON(http.StatusOK, webResponse)
}


func (controller *PostController) UpdatePost(ctx *gin.Context) {
	log.Info().Msg("update post")
	postID := ctx.Param("postId") // Assuming the parameter name is "postId"
	ID, err := strconv.Atoi(postID)
	helper.ErrorPanic(err)

	updatePostRequest := request.UpdatePostRequest{}
	if err := ctx.ShouldBindJSON(&updatePostRequest); err != nil {
		helper.ErrorPanic(err)
	}
	updatePostRequest.ID = ID

	controller.postService.UpdatePost(updatePostRequest)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *PostController) DeletePost(ctx *gin.Context) {
	log.Info().Msg("delete post")
	postID := ctx.Param("postId") // Assuming the parameter name is "postId"
	id, err := strconv.Atoi(postID)
	helper.ErrorPanic(err)

	controller.postService.DeletePost(id)

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *PostController) FindPostByID(ctx *gin.Context) {
	log.Info().Msg("find post by ID controller")
	postID := ctx.Param("postId") // Assuming the parameter name is "postId"
	id, err := strconv.Atoi(postID)
	helper.ErrorPanic(err)

	postResponse, err := controller.postService.FindPostByID(id)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "Post not found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   postResponse,
	}

	ctx.JSON(http.StatusOK, webResponse)
}


func (controller *PostController) FindAllPosts(ctx *gin.Context) {
	log.Info().Msg("find all posts")
	postResponses, err := controller.postService.FindAllPosts()
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "No posts found",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   postResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *PostController) FindPostsByCatSlug(ctx *gin.Context) {
	log.Info().Msg("find posts by category controller")
	category := ctx.Query("category") // Assuming category is queried similarly to label in FindBillboardByLabel

	if category == "" {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "Category is required",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	postResponses, err := controller.postService.FindPostsByCatSlug(category)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "Posts not found for this category",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   postResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *PostController) FindPostsByUserEmail(ctx *gin.Context) {
	log.Info().Msg("find posts by user email controller")
	userEmail := ctx.Query("email")

	if userEmail == "" {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "User email is required",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	postResponses, err := controller.postService.FindPostsByUserEmail(userEmail)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "Posts not found for this user email",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   postResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *PostController) FindPostsByUserID(ctx *gin.Context) {
	log.Info().Msg("find posts by user ID controller")
	userID := ctx.Query("userID") // Assuming user ID is passed as a query parameter

	if userID == "" {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "User ID is required",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	id, err := strconv.Atoi(userID)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "Bad Request",
			Data:   "Invalid user ID",
		}
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	postResponses, err := controller.postService.FindPostsByUserID(id)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusNotFound,
			Status: "Not Found",
			Data:   "Posts not found for this user ID",
		}
		ctx.JSON(http.StatusNotFound, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   postResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}


func (controller *PostController) FindPostsByPage(ctx *gin.Context) {
	log.Info().Msg("find posts by page controller")
	pageNumberStr := ctx.Query("pageNumber")
	pageSizeStr := ctx.Query("pageSize")

	pageNumber, err := strconv.Atoi(pageNumberStr)
	if err != nil {
		handleErrorResponse(ctx, http.StatusBadRequest, "Invalid page number")
		return
	}

	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil {
		handleErrorResponse(ctx, http.StatusBadRequest, "Invalid page size")
		return
	}

	postResponses, err := controller.postService.FindPostsByPage(pageNumber, pageSize)
	if err != nil {
		handleErrorResponse(ctx, http.StatusNotFound, "Posts not found for this page")
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   postResponses,
	}
	ctx.JSON(http.StatusOK, webResponse)
}
func handleErrorResponse(ctx *gin.Context, statusCode int, message string) {
	webResponse := response.Response{
		Code:   statusCode,
		Status: "Error",
		Data:   message,
	}
	ctx.JSON(statusCode, webResponse)
}