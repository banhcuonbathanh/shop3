package service

import (
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
)

type BlogCommentService interface {
    Create(comment request.CreateBlogCommentRequest) error
    Update(comment request.UpdateBlogCommentRequest) error
    Delete(commentID int) 
    FindByID(commentID int) (response.CommentResponse, error)
    FindAll() ([]response.CommentResponse, error)
    // Add any additional methods you need for blog comment service here

    // For example, you can add methods to find comments by user ID or post ID:
    FindByUserID(userID int) ([]response.CommentResponse, error)
    FindByPostID(postID int) ([]response.CommentResponse, error)

    FindAllWithPagination(pageNumber, pageSize int) ([]response.CommentResponse, error)

    FindAllCommentsByPostID(postID int) ([]response.CommentResponse, error) 
}
