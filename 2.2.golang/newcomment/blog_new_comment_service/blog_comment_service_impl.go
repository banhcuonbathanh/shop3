package newcomment

import (
	"fmt"
	data "golang-crud-gin/newcomment/data"

	"golang-crud-gin/helper"
	blog "golang-crud-gin/newcomment/model"

	repository "golang-crud-gin/newcomment/blog_new_comment_repository"

	"github.com/go-playground/validator/v10"
)

type BlogNewCommentServiceImpl struct {
    BlogNewCommentRepository repository.BlogNewCommentRepository
    Validate              *validator.Validate
}

func NewBlogCommentServiceImpl(blogCommentRepository repository.BlogNewCommentRepository, validate *validator.Validate) BlogNewCommentService {
    return &BlogNewCommentServiceImpl{
        BlogNewCommentRepository: blogCommentRepository,
        Validate:              validate,
    }
}

// Create implements BlogCommentService
func (s *BlogNewCommentServiceImpl) Create(value data.CreateBlogNewCommentRequest) error {
    fmt.Printf("2.2.golang/service/blog_comment/blog_comment_service_impl.go 11111 ",)
    err := s.Validate.Struct(value)
    if err != nil {

        fmt.Println("2.2.golang/service/blog_comment/blog_comment_service_impl.go 1212121 ",err)
        return  fmt.Errorf("failed to create blog category: invalid input information - %w", err)
    }


    commentModel := blog.BlogNewCommentModel{
        Desc:             value.Desc,
        UserEmail:        value.UserEmail,
        PostSlug:         value.PostSlug,
        UserID:           value.UserID,
        BlogPostID: value.BlogPostID,

        SourceType:       value.SourceType,
        CategoryComment:  value.CategoryComment,
        UserName:        value.CategoryComment,
        CommentText:   value.CommentText,
        IsRootNode: value.IsRootNode,
 
        LevelOfComment:  value.LevelOfComment,
 
 
        ParentID:        value.ParentID,
        ChildComment:    value.ChildComment,
    }
    fmt.Printf("2.2.golang/service/blog_comment/blog_comment_service_impl.go 2222 ",)
    err = s.BlogNewCommentRepository.Save(commentModel)
    fmt.Printf("2.2.golang/service/blog_comment/blog_comment_service_impl.go 3333 ",)
    if err != nil {
        return  fmt.Errorf("failed to create blog category: invalid input information - %w", err)
    }

    return nil
}

// Update implements BlogCommentService
func (s *BlogNewCommentServiceImpl) Update(comment data.UpdateBlogNewCommentRequest) error {
    commentData, err := s.BlogNewCommentRepository.FindByID(comment.ID)
    if err != nil {
        return  fmt.Errorf("failed to validate comment: %w", err)
    }
    commentData.Desc = comment.Desc
    commentData.UserName = comment.UserName
    commentData.UserEmail = comment.UserEmail
    commentData.PostSlug = comment.PostSlug
    commentData.UserID = comment.UserID
    commentData.BlogPostID = comment.BlogPostID
    commentData.SourceType = comment.SourceType
    commentData.CategoryComment = comment.CategoryComment
    commentData.CommentText = comment.CommentText
    commentData.IsRootNode = comment.IsRootNode

    commentData.LevelOfComment = comment.LevelOfComment
    commentData.ParentID = comment.ParentID
    commentData.ChildComment = comment.ChildComment
   

    err = s.BlogNewCommentRepository.Update(commentData)
    if err != nil {
        return  fmt.Errorf("failed to validate comment: %w", err)
    }

    return nil
}

// Delete implements BlogCommentService
func (s *BlogNewCommentServiceImpl) Delete(commentID int) {
    err := s.BlogNewCommentRepository.Delete(commentID)
    helper.ErrorPanic(err)
}

// FindAll implements BlogCommentService
func (s *BlogNewCommentServiceImpl) FindAll() ([]data.BlogNewCommentResponse, error) {
    result, err := s.BlogNewCommentRepository.FindAll()
    if err != nil {
        return nil, err
    }

    var comments []data.BlogNewCommentResponse
    for _, value := range result {
        comment := data.BlogNewCommentResponse{
            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            BlogPostID: value.BlogPostID,
    
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
            UserName:        value.CategoryComment,
    
            LevelOfComment : value.LevelOfComment,
            CommentText:   value.CommentText,
    
            IsRootNode: value.IsRootNode,
            ParentID:  value.ParentID,
            ChildComment: value.ChildComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}

// FindByID implements BlogCommentService
func (s *BlogNewCommentServiceImpl) FindByID(commentID int) (data.BlogNewCommentResponse, error) {
    commentData, err := s.BlogNewCommentRepository.FindByID(commentID)
    if err != nil {
        return data.BlogNewCommentResponse{}, err
    }

    commentResponse := data.BlogNewCommentResponse{
  

        Desc:             commentData.Desc,
        UserEmail:        commentData.UserEmail,
        PostSlug:         commentData.PostSlug,
        UserID:           commentData.UserID,
        BlogPostID: commentData.BlogPostID,

        SourceType:       commentData.SourceType,
        CategoryComment:  commentData.CategoryComment,
        UserName:        commentData.CategoryComment,

 
        CommentText:   commentData.CommentText,
    
        IsRootNode: commentData.IsRootNode,
        ParentID:  commentData.ParentNodeId,
        ChildComment: commentData.ChildComment,
        LevelOfComment : commentData.LevelOfComment,


    }
    return commentResponse, nil
}

// FindByUserID implements BlogCommentService
func (s *BlogNewCommentServiceImpl) FindByUserID(userID int) ([]data.BlogNewCommentResponse, error) {
    result, err := s.BlogNewCommentRepository.FindByUserID(userID)
    if err != nil {
        return nil, err
    }

    var comments []data.BlogNewCommentResponse
    for _, value := range result {
        comment := data.BlogNewCommentResponse{
            Desc:             value.Desc,
        UserEmail:        value.UserEmail,
        PostSlug:         value.PostSlug,
        UserID:           value.UserID,
        BlogPostID: value.BlogPostID,

        SourceType:       value.SourceType,
        CategoryComment:  value.CategoryComment,
        UserName:        value.CategoryComment,

 
        CommentText:   value.CommentText,

        IsRootNode: value.IsRootNode,
        ParentID:  value.ParentNodeId,
        ChildComment: value.ChildComment,
        LevelOfComment : value.LevelOfComment,
        
        }
        comments = append(comments, comment)
    }

    return comments, nil
}

// FindByPostID implements BlogCommentService
func (s *BlogNewCommentServiceImpl) FindByPostID(postID int) ([]data.BlogNewCommentResponse, error) {
    result, err := s.BlogNewCommentRepository.FindByPostID(postID)
    if err != nil {
        return nil, err
    }

    var comments []data.BlogNewCommentResponse
    for _, value := range result {
        comment := data.BlogNewCommentResponse{

            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            BlogPostID: value.BlogPostID,
    
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
            UserName:        value.CategoryComment,
    
     
            CommentText:   value.CommentText,

            IsRootNode: value.IsRootNode,
            ParentID:  value.ParentNodeId,
            ChildComment: value.ChildComment,
            LevelOfComment : value.LevelOfComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}

// FindAllWithPagination implements BlogCommentService with pagination
func (s *BlogNewCommentServiceImpl) FindAllWithPagination(pageNumber, pageSize int) ([]data.BlogNewCommentResponse, error) {
    result, err := s.BlogNewCommentRepository.FindCommentsByPage(pageNumber, pageSize)
    if err != nil {
        return nil, err
    }

    var comments []data.BlogNewCommentResponse
    for _, value := range result {
        comment := data.BlogNewCommentResponse{
            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            BlogPostID: value.BlogPostID,
    
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
            UserName:        value.CategoryComment,
    
     
            CommentText:   value.CommentText,
 
            IsRootNode: value.IsRootNode,
            ParentID:  value.ParentNodeId,
            ChildComment: value.ChildComment,
            LevelOfComment : value.LevelOfComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}


func (s *BlogNewCommentServiceImpl) FindAllCommentsByPostID(postID int) ([]data.BlogNewCommentResponse, error) {

    fmt.Printf("FindAllCommentsByPostID 2.2.golang/service/blog_comment/blog_comment_service_impl.go")
    result, err := s.BlogNewCommentRepository.FindAllCommentsByPostID(postID)
    if err != nil {
        return nil, err
    }
    fmt.Printf("FindAllCommentsByPostID 2.2.golang/service/blog_comment/blog_comment_service_impl.go %+v\n", result)
    var comments []data.BlogNewCommentResponse
    for _, value := range result {
        comment := data.BlogNewCommentResponse{
            Desc:             value.Desc,
            UserEmail:        value.UserEmail,
            PostSlug:         value.PostSlug,
            UserID:           value.UserID,
            BlogPostID: value.BlogPostID,
    
            SourceType:       value.SourceType,
            CategoryComment:  value.CategoryComment,
            UserName:        value.CategoryComment,
    
     
            CommentText:   value.CommentText,
   
            IsRootNode: value.IsRootNode,
            ParentID:  value.ParentNodeId,
            ChildComment: value.ChildComment,
            LevelOfComment : value.LevelOfComment,
        }
        comments = append(comments, comment)
    }

    return comments, nil
}



func (s *BlogNewCommentServiceImpl) AddBlogNewCommentModel(comment blog.BlogNewCommentModel, originalCommentId int) error {
    err := s.Validate.Struct(comment)
    if err != nil {

        fmt.Println("2.2.golang/service/blog_comment/blog_comment_service_impl.go 1212121 ",err)
        return  fmt.Errorf("failed to create blog category: invalid input information - %w", err)
    }
    result, err := s.BlogNewCommentRepository.FindCommentbyOriginalCommentID(originalCommentId)
    if err != nil {
        return err
    }

    result.ChildComment = append(result.ChildComment, &comment)

    err = s.BlogNewCommentRepository.Update(result)
    if err != nil {
        return err
    }

    return nil
}
