package service

import (
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	blog "golang-crud-gin/model"

	repository "golang-crud-gin/repository/blog_comment"

	"github.com/go-playground/validator/v10"
)

type BlogCommentServiceImpl struct {
    BlogCommentRepository repository.BlogCommentRepository
    Validate              *validator.Validate
}

func NewBlogCommentServiceImpl(blogCommentRepository repository.BlogCommentRepository, validate *validator.Validate) BlogCommentService {
    return &BlogCommentServiceImpl{
        BlogCommentRepository: blogCommentRepository,
        Validate:              validate,
    }
}

// Create implements BlogCommentService
func (s *BlogCommentServiceImpl) Create(comment request.CreateBlogCommentRequest) error {
    fmt.Printf("2.2.golang/service/blog_comment/blog_comment_service_impl.go 11111 ",)
    err := s.Validate.Struct(comment)
    if err != nil {

        fmt.Println("2.2.golang/service/blog_comment/blog_comment_service_impl.go 1212121 ",err)
        return  fmt.Errorf("failed to create blog category: invalid input information - %w", err)
    }


    commentModel := blog.BlogComment{
        UserName:            comment.UserName,
        Desc:             comment.Desc,
        UserEmail:        comment.UserEmail,
        PostSlug:         comment.PostSlug,
        UserID:           comment.UserID,
        // Assuming PostID, SourceType, CategoryComment are available in the request struct
        BlogPostID:           comment.BlogPostID,
        SourceType:       comment.SourceType,
        CategoryComment:  comment.CategoryComment,
    }
    fmt.Printf("2.2.golang/service/blog_comment/blog_comment_service_impl.go 2222 ",)
    err = s.BlogCommentRepository.Save(commentModel)
    fmt.Printf("2.2.golang/service/blog_comment/blog_comment_service_impl.go 3333 ",)
    if err != nil {
        return  fmt.Errorf("failed to create blog category: invalid input information - %w", err)
    }

    return nil
}

// Update implements BlogCommentService
func (s *BlogCommentServiceImpl) Update(comment request.UpdateBlogCommentRequest) error {
    commentData, err := s.BlogCommentRepository.FindByID(comment.ID)
    if err != nil {
        return  fmt.Errorf("failed to validate comment: %w", err)
    }
    commentData.UserName =          comment.UserName
    // Update the fields directly
    commentData.Desc = comment.Desc
    commentData.UserEmail = comment.UserEmail
    commentData.PostSlug = comment.PostSlug
    commentData.UserID = comment.UserID
    commentData.BlogPostID = comment.PostID
    commentData.SourceType = comment.SourceType
    commentData.CategoryComment = comment.CategoryComment

    err = s.BlogCommentRepository.Update(commentData)
    if err != nil {
        return  fmt.Errorf("failed to validate comment: %w", err)
    }

    return nil
}

// Delete implements BlogCommentService
func (s *BlogCommentServiceImpl) Delete(commentID int) {
    err := s.BlogCommentRepository.Delete(commentID)
    helper.ErrorPanic(err)
}

// FindAll implements BlogCommentService
func (s *BlogCommentServiceImpl) FindAll() ([]response.CommentResponse, error) {
    result, err := s.BlogCommentRepository.FindAll()
    if err != nil {
        return nil, err
    }

    var comments []response.CommentResponse
    for _, value := range result {
        comment := response.CommentResponse{
            ID:               value.ID,
            CreatedAt:        value.CreatedAt,
            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            PostID:           value.BlogPostID,
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}

// FindByID implements BlogCommentService
func (s *BlogCommentServiceImpl) FindByID(commentID int) (response.CommentResponse, error) {
    commentData, err := s.BlogCommentRepository.FindByID(commentID)
    if err != nil {
        return response.CommentResponse{}, err
    }

    commentResponse := response.CommentResponse{
        ID:               commentData.ID,
        CreatedAt:        commentData.CreatedAt,
        Desc:             commentData.Desc,
        UserEmail:        commentData.UserEmail,
        PostSlug:         commentData.PostSlug,
        UserID:           commentData.UserID,
        PostID:           commentData.BlogPostID,
        SourceType:       commentData.SourceType,
        CategoryComment:  commentData.CategoryComment,
    }
    return commentResponse, nil
}

// FindByUserID implements BlogCommentService
func (s *BlogCommentServiceImpl) FindByUserID(userID int) ([]response.CommentResponse, error) {
    result, err := s.BlogCommentRepository.FindByUserID(userID)
    if err != nil {
        return nil, err
    }

    var comments []response.CommentResponse
    for _, value := range result {
        comment := response.CommentResponse{
            ID:               value.ID,
            CreatedAt:        value.CreatedAt,
            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            PostID:           value.BlogPostID,
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}

// FindByPostID implements BlogCommentService
func (s *BlogCommentServiceImpl) FindByPostID(postID int) ([]response.CommentResponse, error) {
    result, err := s.BlogCommentRepository.FindByPostID(postID)
    if err != nil {
        return nil, err
    }

    var comments []response.CommentResponse
    for _, value := range result {
        comment := response.CommentResponse{
            ID:               value.ID,
            CreatedAt:        value.CreatedAt,
            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            PostID:           value.BlogPostID,
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}

// FindAllWithPagination implements BlogCommentService with pagination
func (s *BlogCommentServiceImpl) FindAllWithPagination(pageNumber, pageSize int) ([]response.CommentResponse, error) {
    result, err := s.BlogCommentRepository.FindCommentsByPage(pageNumber, pageSize)
    if err != nil {
        return nil, err
    }

    var comments []response.CommentResponse
    for _, value := range result {
        comment := response.CommentResponse{
            ID:               value.ID,
            CreatedAt:        value.CreatedAt,
            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            PostID:           value.BlogPostID,
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}


func (s *BlogCommentServiceImpl) FindAllCommentsByPostID(postID int) ([]response.CommentResponse, error) {

    fmt.Printf("FindAllCommentsByPostID 2.2.golang/service/blog_comment/blog_comment_service_impl.go")
    result, err := s.BlogCommentRepository.FindAllCommentsByPostID(postID)
    if err != nil {
        return nil, err
    }
    fmt.Printf("FindAllCommentsByPostID 2.2.golang/service/blog_comment/blog_comment_service_impl.go %+v\n", result)
    var comments []response.CommentResponse
    for _, value := range result {
        comment := response.CommentResponse{
            ID:               value.ID,
            CreatedAt:        value.CreatedAt,
            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            PostID:           value.BlogPostID,
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}
