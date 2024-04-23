package service

import (
	"fmt"
	"golang-crud-gin/data/request"


	blog "golang-crud-gin/model"

	repository "golang-crud-gin/repository/blog_category"

	"github.com/go-playground/validator/v10"
)

type BlogCategoryServiceImpl struct {
    BlogCategoryRepository repository.BlogCategoryRepository
    Validate              *validator.Validate
}

func NewBlogCategoryServiceImpl(blogCategoryRepository repository.BlogCategoryRepository, validate *validator.Validate) BlogCategoryService {
    return &BlogCategoryServiceImpl{
        BlogCategoryRepository: blogCategoryRepository,
        Validate:              validate,
    }
}

// Create implements BlogCategoryService
func (s *BlogCategoryServiceImpl) Create(category request.CreateBlogCategoryRequest) error {
    fmt.Printf("createBlogCategoryRequest service category: %+v\n", category)
    err := s.Validate.Struct(category)
    if err != nil {
        return  fmt.Errorf("failed to create blog category: invalid input information - %w", err)
    }

    categoryModel := blog.BlogCat{
   
        Slug:        category.Slug, // Assign directly from request
        Title:       category.Title, // Assign directly from request
        ImageUrl:    category.ImageUrl, // Assign directly from request
    }
    fmt.Printf("createBlogCategoryRequest service categoryModel: %+v\n", categoryModel)

    err = s.BlogCategoryRepository.Save(categoryModel)
    if err != nil {
        return  err
    }

    
    return nil
}


// Update implements BlogCategoryService
func (s *BlogCategoryServiceImpl) Update(category request.UpdateBlogCategoryRequest) error {
    fmt.Printf("updateBlogCategoryRequest service category: %+v\n", category)
    err := s.Validate.Struct(category)
    if err != nil {
        return  fmt.Errorf("failed to update blog category: invalid input information - %w", err)
    }

    categoryData, err := s.BlogCategoryRepository.FindByID(category.ID)
    if err != nil {
        return err
    }

    // Update the fields directly from request
    categoryData.Slug = category.Slug
    categoryData.Title = category.Title
    categoryData.ImageUrl = category.ImageUrl

    fmt.Printf("updateBlogCategoryRequest service categoryData: %+v\n", categoryData)

    err = s.BlogCategoryRepository.Update(categoryData)
    if err != nil {
        return err
    }

    return nil
}


// Delete implements BlogCategoryService
func (s *BlogCategoryServiceImpl)     Delete(categoryID int) error {
    err := s.BlogCategoryRepository.Delete(categoryID)
    if err != nil {
        return  fmt.Errorf("failed to update blog category: invalid input information - %w", err)
    }

    return nil
}

// FindAll implements BlogCategoryService
func (s *BlogCategoryServiceImpl) FindAll() ([]blog.BlogCat, error) {
    result, err := s.BlogCategoryRepository.FindAll()
    if err != nil {
        return nil, err
    }

   

    return result, nil
}

func (s *BlogCategoryServiceImpl) FindByID(categoryID int) (blog.BlogCat, error) {
    categoryData, err := s.BlogCategoryRepository.FindByID(categoryID)
    if err != nil {
        return categoryData, err
    }

    // Assuming categoryData is of type *model.BlogCategory


    return categoryData, nil
}


// FindByName implements BlogCategoryService
func (s *BlogCategoryServiceImpl) FindByName(name string) (blog.BlogCat, error) {
    // Assuming you have a BlogCategoryRepository method for finding by name
    categoryData, err := s.BlogCategoryRepository.FindByName(name)
    if err != nil {
        return categoryData, err
    }


    return categoryData, nil
}


// FindCategoriesByPage implements BlogCategoryService with pagination
// func (s *BlogCategoryServiceImpl) FindCategoriesByPage(pageNumber, pageSize int) ([]response.BlogCategoryResponse, error) {
//     categoriesData, err := s.BlogCategoryRepository.FindCategoriesByPage(pageNumber, pageSize)
//     if err != nil {
//         return nil, err // Return nil slice and error for consistency
//     }

//     var categories []response.BlogCategoryResponse
//     for _, categoryData := range categoriesData {
//         categoryResponse := response.BlogCategoryResponse{
//             ID:          categoryData.ID,
//             // Assuming there's a way to map BlogCategory.Name to BlogCategoryResponse.Slug
//             Slug:      ,  // Map BlogCategory.Name to Slug (implementation needed),
//             // Assuming BlogCategory doesn't have a Title field
//              Title:       "", // Consider adding Title field to BlogCategory if needed
//             // Assuming BlogCategory doesn't have ImageUrl field
//              ImageUrl:    nil, // Consider adding ImageUrl field to BlogCategory if needed
//             CreatedAt:  categoryData.CreatedAt,
//             UpdatedAt:  categoryData.UpdatedAt,
//         }
//         categories = append(categories, categoryResponse)
//     }

//     return categories, nil // Return the mapped slice of BlogCategoryResponse
// }
