package service

import (
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/model"
	repository "golang-crud-gin/repository/blog_post"

	"github.com/go-playground/validator/v10"
	"github.com/rs/zerolog/log"
)

type PostServiceImpl struct {
    postRepository    repository.PostRepository
    Validate          *validator.Validate
    // CategoryService   service.CategoryService
}

func NewPostServiceImpl(postRepository repository.PostRepository, validate *validator.Validate) PostService {
    return &PostServiceImpl{
        postRepository:    postRepository,
        Validate:          validate,
        // CategoryService:   categoryService,
    }
}

func (s *PostServiceImpl) CreatePost(request request.CreatePostRequest) (model.BlogPost, error) {
    fmt.Printf("CreatePost PostServiceImpl: 1111111111111")

    err := s.Validate.Struct(request)
    if err != nil {
        return model.BlogPost{}, err // Return empty BlogPost and the error
    }

    fmt.Printf("CreatePost PostServiceImpl: 22")

    // Create a new model.BlogPost from the request data
    post := model.BlogPost{
        ImageUrl:  request.ImageUrl,
        Title:     request.Title,
        BlogCatID: request.BlogCatID,
        Views:     request.Views,
        UserEmail: request.UserEmail,
        UserID:    request.UserID,
        CategoryTitle: request.CategoryTitle,
    }

    fmt.Printf("CreatePost PostServiceImpl: 33")

    // Call the repository to create the post and handle potential errors
    createdPost, err := s.postRepository.Create(post)
    fmt.Printf("CreatePost PostServiceImpl: 33 createdPost %v\n", createdPost)
    if err != nil {
        // Log or handle the error appropriately
        fmt.Printf("Error creating post: %v\n", err)
        return model.BlogPost{}, err // Return empty BlogPost and the error
    }

    return createdPost, nil // Return the created model.BlogPost upon success
}


func (s *PostServiceImpl) UpdatePost(request request.UpdatePostRequest) error {
    // Validation
    err := s.Validate.Struct(request)
    if err != nil {
        return err
    }

    // Creating a model.Post from the request data
    post := model.BlogPost{
        ImageUrl:       request.ImageUrl,
        Title:      request.Title,
    
        BlogCatID: request.BlogCatID,
        Views:      request.Views,
  
        UserEmail:  request.UserEmail,
        UserID:     request.UserID,

        CategoryTitle: request.CategoryTitle,



    }

    // Call the repository to update the post
    err = s.postRepository.Update(post)
    return err
}

// ...

func (s *PostServiceImpl) DeletePost(id int) error {
    // Call the repository to delete the post by ID
    err := s.postRepository.Delete(id)
    return err
}

func (s *PostServiceImpl) FindPostByID(id int) (response.PostResponse, error) {
    log.Info().Msg("find post by ID service")
    post, err := s.postRepository.FindById(id)
    if err != nil {
        return response.PostResponse{}, err
    }

    // Map the post model to a response model
    postResponse := mapPostToResponse(post)

    return postResponse, nil
}

func (s *PostServiceImpl) FindAllPosts() ([]response.PostResponse, error) {
    // Call the repository to find all posts
    posts, err := s.postRepository.FindAll()
    if err != nil {
        return nil, err
    }

    // Map the post models to response models
    postResponses := make([]response.PostResponse, len(posts))

    for i, post := range posts {
        postResponses[i] = mapPostToResponse(post)
    }

    return postResponses, nil
}

// Other methods like FindPostsByCategory, FindPostsByColor, FindPostsBySize, etc., remain the same as before

// Mapping function from model.Post to response.PostResponse
func mapPostToResponse(post model.BlogPost) response.PostResponse {
    return response.PostResponse{
        ID:         post.ID,
        ImageUrl:       post.ImageUrl,
        Title:      post.Title,
        Desc:       post.Desc,

        Views:      post.Views,

        UserEmail:  post.UserEmail,
        UserID:     post.UserID,

        CategoryTitle: post.CategoryTitle,

        BlogCatID:post.BlogCatID,

        // Add other fields as needed
    }
}


func (s *PostServiceImpl) FindPostsByCatSlug(catSlug string) ([]model.BlogPost, error) {
    // Call the repository to find posts by category slug
    posts, err := s.postRepository.FindPostsByCatSlug(catSlug)
    if err != nil {
        return nil, err
    }
    return posts, nil
}

func (s *PostServiceImpl) FindPostsByUserEmail(email string) ([]model.BlogPost, error) {
    // Call the repository to find posts by user email
    posts, err := s.postRepository.FindPostsByUserEmail(email)
    if err != nil {
        return nil, err
    }
    return posts, nil
}

func (s *PostServiceImpl) FindPostsByUserID(userID int) ([]model.BlogPost, error) {
    // Call the repository to find posts by user ID
    posts, err := s.postRepository.FindPostsByUserID(userID)
    if err != nil {
        return nil, err
    }
    return posts, nil
}

func (s *PostServiceImpl) FindPostsByPage(pageNumber, pageSize int) ([]model.BlogPost, error) {
    // Call the repository to find posts by page
    posts, err := s.postRepository.FindPostsByPage(pageNumber, pageSize)
    if err != nil {
        return nil, err
    }
    return posts, nil
}

// Other methods remain the same as before

// Implement the PostService interface
// func NewPostServiceImpl(postRepository repository.PostRepository, validate *validator.Validate, categoryService service.CategoryService) PostService {
//     return &PostServiceImpl{
//         postRepository: postRepository,
//         Validate:       validate,
//         CategoryService: categoryService,
//     }
// }

