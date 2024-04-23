package repository

import blog "golang-crud-gin/model"

type BlogCommentRepository interface {
    Save(comment blog.BlogComment) error
    Update(comment blog.BlogComment) error
    Delete(commentID int) error
    FindByID(commentID int) (blog.BlogComment, error)
    FindAll() ([]blog.BlogComment, error)
    // Add any additional methods you need for blog comment repository here

    // For example, you can add a method to find comments by user ID or post ID:
    FindByUserID(userID int) ([]blog.BlogComment, error)
    FindByPostID(postID int) ([]blog.BlogComment, error)
    FindCommentsByPage(pageNumber, pageSize int) ([]blog.BlogComment, error)

    FindAllCommentsByPostID(blogPostID int) ([]blog.BlogComment, error)
}
