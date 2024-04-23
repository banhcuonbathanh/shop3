package newcomment

import blog "golang-crud-gin/newcomment/model"

type BlogNewCommentRepository interface {
    Save(comment blog.BlogNewCommentModel) error
    Update(comment blog.BlogNewCommentModel) error
    Delete(commentID int) error
    FindByID(commentID int) (blog.BlogNewCommentModel, error)
    FindAll() ([]blog.BlogNewCommentModel, error)
    // Add any additional methods you need for blog comment repository here

    // For example, you can add a method to find comments by user ID or post ID:
    FindByUserID(userID int) ([]blog.BlogNewCommentModel, error)
    FindByPostID(postID int) ([]blog.BlogNewCommentModel, error)
    FindCommentsByPage(pageNumber, pageSize int) ([]blog.BlogNewCommentModel, error)

    FindAllCommentsByPostID(blogPostID int) ([]blog.BlogNewCommentModel, error)


    AddBlogNewCommentModel(comment blog.BlogNewCommentModel) error

    FindCommentbyOriginalCommentID(originalCommentId int) (blog.BlogNewCommentModel, error)
}
