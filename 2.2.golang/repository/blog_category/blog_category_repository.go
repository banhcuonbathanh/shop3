package repository

import blog "golang-crud-gin/model"

type BlogCategoryRepository interface {
    Save(category blog.BlogCat) error
    Update(category blog.BlogCat) error
    Delete(categoryID int) error
    FindByID(categoryID int) (blog.BlogCat, error)
    FindAll() ([]blog.BlogCat, error)

    FindByName(name string) (blog.BlogCat, error)
    FindCategoriesByPage(pageNumber, pageSize int) ([]blog.BlogCat, error)
}
