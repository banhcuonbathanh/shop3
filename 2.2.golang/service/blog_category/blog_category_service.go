package service

import (
	"golang-crud-gin/data/request"

	blog "golang-crud-gin/model"
)

type BlogCategoryService interface {
    Create(category request.CreateBlogCategoryRequest)  error
    Update(category request.UpdateBlogCategoryRequest)  error
    Delete(categoryID int) error
    FindByID(categoryID int) (blog.BlogCat, error) 
    FindAll() ([]blog.BlogCat, error)



    FindByName(name string) (blog.BlogCat, error) 
    // FindCategoriesByPage(pageNumber, pageSize int) ([]response.CategoryResponse, error)
}