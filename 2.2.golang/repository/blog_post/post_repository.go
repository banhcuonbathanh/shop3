package repository

import (
	"golang-crud-gin/model"

)

type PostRepository interface {
    // Create a new post
    Create(post model.BlogPost) (model.BlogPost, error)

    // Update an existing post
    Update(post model.BlogPost) error

    // Delete a post by ID
    Delete(id int) error

    // Find a post by its ID
    FindById(id int) (model.BlogPost, error)

    // Find all posts
    FindAll() ([]model.BlogPost, error)
    FindPostsByCatSlug(catSlug string) ([]model.BlogPost, error)

    // Find posts by user email
    FindPostsByUserEmail(email string) ([]model.BlogPost, error)

    // Find posts by user ID
    FindPostsByUserID(userID int) ([]model.BlogPost, error)
    // Pagination and filtering
    FindPostsByPage(pageNumber, pageSize int) ([]model.BlogPost, error)
}
