package service

import (
    "golang-crud-gin/data/request"
    "golang-crud-gin/data/response"
    "golang-crud-gin/model"
)

type PostService interface {
    CreatePost(request request.CreatePostRequest) (model.BlogPost, error)
    UpdatePost(request request.UpdatePostRequest) error
    DeletePost(id int) error
    FindPostByID(id int) (response.PostResponse, error)
    FindAllPosts() ([]response.PostResponse, error)
    FindPostsByCatSlug(catSlug string) ([]model.BlogPost, error)     // Updated return type
    FindPostsByUserEmail(email string) ([]model.BlogPost, error)    // Updated return type
    FindPostsByUserID(userID int) ([]model.BlogPost, error)          // Updated return type
    FindPostsByPage(pageNumber, pageSize int) ([]model.BlogPost, error) // Updated return type
}
