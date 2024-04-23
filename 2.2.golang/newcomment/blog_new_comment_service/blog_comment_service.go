package newcomment

import (
	data "golang-crud-gin/newcomment/data"
	blog "golang-crud-gin/newcomment/model"
)

type BlogNewCommentService interface {
    Create(comment data.CreateBlogNewCommentRequest) error
    Update(comment data.UpdateBlogNewCommentRequest) error
    Delete(commentID int) 
    FindByID(commentID int) (data.BlogNewCommentResponse, error)
    FindAll() ([]data.BlogNewCommentResponse, error)
    // Add any additional methods you need for blog comment service here

    // For example, you can add methods to find comments by user ID or post ID:
    FindByUserID(userID int) ([]data.BlogNewCommentResponse, error)
    FindByPostID(postID int) ([]data.BlogNewCommentResponse, error)

    FindAllWithPagination(pageNumber, pageSize int) ([]data.BlogNewCommentResponse, error)

    FindAllCommentsByPostID(postID int) ([]data.BlogNewCommentResponse, error) 

    AddBlogNewCommentModel(comment blog.BlogNewCommentModel,  originalCommentId int) error
}
