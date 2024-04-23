package service

import (
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	"golang-crud-gin/model"
	repository "golang-crud-gin/repository/categories"

	"github.com/go-playground/validator/v10"
)

type CategoryServiceImpl struct {
    CategoryRepository repository.CategoryRepository
    Validate           *validator.Validate
}

func NewCategoryServiceImpl(categoryRepository repository.CategoryRepository, validate *validator.Validate) CategoryService {
    return &CategoryServiceImpl{
        CategoryRepository: categoryRepository,
        Validate:           validate,
    }
}

// Create implements CategoryService
func (c *CategoryServiceImpl) Create(category request.CreateCategoryRequest) {
    err := c.Validate.Struct(category)
    helper.ErrorPanic(err)
    categoryModel := model.Category{
        Name: category.Name,
    }
    c.CategoryRepository.Save(categoryModel)
}

// Delete implements CategoryService
func (c *CategoryServiceImpl) Delete(categoryID int) {
    fmt.Printf("Deleting category CategoryServiceImpl with ID: %d\n", categoryID)
    c.CategoryRepository.Delete(categoryID)
}

// FindAll implements CategoryService


func (c *CategoryServiceImpl) FindAll() []response.CategoryProductResponse {
    result := c.CategoryRepository.FindAll()

    var categories []response.CategoryProductResponse
    for _, value := range result {
        var productResponses []response.ProductResponse

        for _, product := range value.Product {
            productResponse := mapProductToResponse(product)
            productResponses = append(productResponses, productResponse)
        }

        categoryProductResponse := response.CategoryProductResponse{
            ID:      value.ID,
            Name:    value.Name,
            Product: productResponses,
        }
        categories = append(categories, categoryProductResponse)
    }

    return categories
}



// func (c *CategoryServiceImpl) FindAll() []response.CategoryResponse {
//     result := c.CategoryRepository.FindAll()

//     var categories []response.CategoryResponse
//     for _, value := range result {
//         category := response.CategoryResponse{
//             ID:   value.ID,
//             Name: value.Name,
//         }
//         categories = append(categories, category)
//     }

//     return categories
// }

// FindById implements CategoryService
func (c *CategoryServiceImpl) FindById(categoryID int) response.CategoryResponse {
    categoryData, err := c.CategoryRepository.FindById(categoryID)
    helper.ErrorPanic(err)

    categoryResponse := response.CategoryResponse{
        ID:   categoryData.ID,
        Name: categoryData.Name,
    }
    return categoryResponse
}

// Update implements CategoryService

// func (c *CategoryServiceImpl) Update(category request.UpdateCategoryRequest) error {
//     categoryData, err := c.CategoryRepository.FindById(int(category.ID))
//     if err != nil {
//         return err
//     }

//     categoryData.Name = category.Name
//     err = c.CategoryRepository.Update(categoryData)
//     if err != nil {
//         return err
//     }

//     return nil
// }
func (c *CategoryServiceImpl) Update(category request.UpdateCategoryRequest) {
    categoryData, err := c.CategoryRepository.FindById(int(category.ID))
    helper.ErrorPanic(err)
    categoryData.Name = category.Name
    c.CategoryRepository.Update(categoryData)
}

// FindByName implements CategoryService
func (c *CategoryServiceImpl) FindByName(categoryName string) (response.CategoryResponse, error) {
    categoryData, err := c.CategoryRepository.FindByCategoryName(categoryName)
    if err != nil {
        return response.CategoryResponse{}, err
    }

    categoryResponse := response.CategoryResponse{
        ID:   categoryData.ID,
        Name: categoryData.Name,
    }
    return categoryResponse, nil
}


// FindByNameWithPagination implements CategoryService with pagination
// FindAllWithPagination implements CategoryService with pagination
func (c *CategoryServiceImpl) FindAllWithPagination(pageNumber, pageSize int) ([]response.CategoryResponse, error) {
    // Retrieve paginated categories from the repository
    categoryData, err := c.CategoryRepository.FindCategoriesByPage(pageNumber, pageSize)
    if err != nil {
        return []response.CategoryResponse{}, err
    }

    // Transform the category data into response objects
    var categoryResponses []response.CategoryResponse
    for _, category := range categoryData {
        categoryResponse := response.CategoryResponse{
            ID:   category.ID,
            Name: category.Name,
        }
        categoryResponses = append(categoryResponses, categoryResponse)
    }

    return categoryResponses, nil
}


func (c *CategoryServiceImpl) FindCategoriesByCharacteristicName(characteristic string, pageNumber, pageSize int) ([]response.CategoryResponse, error) {
    // Retrieve categories by characteristic from the repository
    categoryData, err := c.CategoryRepository.FindCategoriesByCharacteristicName(characteristic, pageNumber, pageSize)
    if err != nil {
        return []response.CategoryResponse{}, err
    }

    // Transform the category data into response objects
    var categoryResponses []response.CategoryResponse
    for _, category := range categoryData {
        categoryResponse := response.CategoryResponse{
            ID:   category.ID,
            Name: category.Name,
        }
        categoryResponses = append(categoryResponses, categoryResponse)
    }

    return categoryResponses, nil
}



func mapProductToResponse(product model.Product) response.ProductResponse {

	return response.ProductResponse{
		ID:         product.ID,
		Name:       product.Name,
		Price:      product.Price,
		IsFeatured: product.IsFeatured,
		IsArchived: product.IsArchived,
		ImageURLs:  product.ImageUrl, // Use the correct field name here

		Category:   mapCategoryToResponse(product.Category),
		Size:       mapSizeToResponse(product.Size),
		Color:      mapColorToResponse(product.Color),
	}
}
func mapCategoryToResponse(category model.Category) response.CategoryResponse {
	// Map the category model to a response model
	return response.CategoryResponse{
		ID:   category.ID,
		Name: category.Name,
		// Add other fields as needed
	}
}

func mapSizeToResponse(size model.Size) response.SizeResponse {
	// Map the size model to a response model
	return response.SizeResponse{
		ID:        size.ID,
		Name:      size.Name,
		Value:     size.Value, // Include the Value field here

	}
}


func mapColorToResponse(color model.Color) response.ColorResponse {
	// Map the color model to a response model
	return response.ColorResponse{
		ID:        color.ID,
		Name:      color.Name,
		Value:     color.Value, // Include the Value field here
	
	}
}