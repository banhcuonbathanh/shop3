package service

import (
	// categories_service "golang-crud-gin/service/categories"
	// categories_repository "golang-crud-gin/repository/categories"
	//
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/model"
	repository "golang-crud-gin/repository/product"
	service "golang-crud-gin/service/categories"

	"github.com/go-playground/validator/v10"
	"github.com/rs/zerolog/log"
)

type ProductServiceImpl struct {
    productRepository repository.ProductRepository
    Validate          *validator.Validate
    CategoryService   service.CategoryService
}

func NewProductServiceImpl(productRepository repository.ProductRepository, validate *validator.Validate, categoryService service.CategoryService) ProductService {
    return &ProductServiceImpl{
        productRepository: productRepository,
        Validate:          validate,
        CategoryService:   categoryService,
    }
}

func (s *ProductServiceImpl) CreateProduct(request request.CreateProductRequest,) error {
    err := s.Validate.Struct(request)
    if err != nil {
        return err
    }

    // Working with category
    // err = s.CategoryService.Update(request.CategoryRequest)
    // if err != nil {
    //     return err
    // }

    // Create a model.Product from the request data
    product := model.Product{
        Name:       request.Name,
        Price:      request.Price,
        IsFeatured: request.IsFeatured,
        IsArchived: request.IsArchived,
        ImageUrl:   request.ImageUrls,
        CategoryID: int(request.CategoryID) ,
        SizeID:     int(request.SizeID) ,
        ColorID:   int(request.ColorID) ,

		Description: request.Description,
    }

    // Call the repository to create the product
    err = s.productRepository.Create(product)
    return err
}









func (s *ProductServiceImpl) UpdateProduct(request request.UpdateProductRequest) error {
	err := s.Validate.Struct(request)
	if err != nil {
		return err
	}

	// Create a model.Product from the request data
	product := model.Product{

		Name:       request.Name,
		Price:      request.Price,
		IsFeatured: request.IsFeatured,
		IsArchived: request.IsArchived,
		ImageUrl:   request.ImageUrls,
		CategoryID:int(request.CategoryID) ,
		SizeID:   int( request.SizeID) ,
		ColorID:   int(request.ColorID) ,
		Description: request.Description,
	}

	// Call the repository to update the product
	err = s.productRepository.Update(product)
	return err
}

func (s *ProductServiceImpl) DeleteProduct(id int) error {
	// Call the repository to delete the product by ID
	err := s.productRepository.Delete(id)
	return err
}

func (s *ProductServiceImpl) FindProductByID(id int) (response.ProductResponse, error) {
	log.Info().Msg("find product by ID service")
	product, err := s.productRepository.FindById(id)
	if err != nil {
		return response.ProductResponse{}, err
	}

	// Map the product model to a response model
	productResponse := mapProductToResponse(product)

	return productResponse, nil
}

func (s *ProductServiceImpl) FindAllProducts() ([]response.ProductResponse, error) {
	// Call the repository to find all products
	products, err := s.productRepository.FindAll()
	if err != nil {
		return nil, err
	}

	// Map the product models to response models
	productResponses := make([]response.ProductResponse, len(products))

	for i, product := range products {
		productResponses[i] = mapProductToResponse(product)
	}

	return productResponses, nil
}

func (s *ProductServiceImpl) FindProductsByCategory(categoryID int) ([]response.ProductResponse, error) {
	// Call the repository to find products by category
	products, err := s.productRepository.FindByCategory(categoryID)
	if err != nil {
		return nil, err
	}

	// Map the product models to response models
	productResponses := make([]response.ProductResponse, len(products))
	for i, product := range products {
		productResponses[i] = mapProductToResponse(product)
	}

	return productResponses, nil
}

func (s *ProductServiceImpl) FindProductsByColor(colorID int) ([]response.ProductResponse, error) {
	// Call the repository to find products by color
	products, err := s.productRepository.FindByColor(colorID)
	if err != nil {
		return nil, err
	}

	// Map the product models to response models
	productResponses := make([]response.ProductResponse, len(products))
	for i, product := range products {
		productResponses[i] = mapProductToResponse(product)
	}

	return productResponses, nil
}

func (s *ProductServiceImpl) FindProductsBySize(sizeID int) ([]response.ProductResponse, error) {
	// Call the repository to find products by size
	products, err := s.productRepository.FindBySize(sizeID)
	if err != nil {
		return nil, err
	}

	// Map the product models to response models
	productResponses := make([]response.ProductResponse, len(products))
	for i, product := range products {
		productResponses[i] = mapProductToResponse(product)
	}

	return productResponses, nil
}

func (s *ProductServiceImpl) FindProductsByCharacteristic(characteristic string) ([]response.ProductResponse, error) {
	// Call the repository to find products by characteristic
	products, err := s.productRepository.FindByCharacteristic(characteristic)
	if err != nil {
		return nil, err
	}

	// Map the product models to response models
	productResponses := make([]response.ProductResponse, len(products))
	for i, product := range products {
		productResponses[i] = mapProductToResponse(product)
	}

	return productResponses, nil
}

func (s *ProductServiceImpl) FindProductsByPage(pageNumber, pageSize int) ([]response.ProductResponse, error) {
	// Call the repository to find products by page
	products, err := s.productRepository.FindProductsByPage(pageNumber, pageSize)
	if err != nil {
		return nil, err
	}

	// Map the product models to response models
	productResponses := make([]response.ProductResponse, len(products))
	for i, product := range products {
		productResponses[i] = mapProductToResponse(product)
	}

	return productResponses, nil
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
		Description: product.Description,
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


func (s *ProductServiceImpl) FindProductsByProductName(name string) ([]response.ProductResponse, error) {
    // Call the repository to find products by name


    products, err := s.productRepository.FindByProductName(name)
    if err != nil {
        return nil, err
    }

    // Map the product models to response models
    productResponses := make([]response.ProductResponse, len(products))
    for i, product := range products {
        productResponses[i] = mapProductToResponse(product)
    }

    return productResponses, nil
}
