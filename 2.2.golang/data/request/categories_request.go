package request

type CreateCategoryRequest struct {
	Name string `validate:"required,min=2,max=255" json:"name"`
}

type UpdateCategoryRequest struct {
	ID   uint    `validate:"required"`
	Name string `validate:"required,min=2,max=255" json:"name"`
	ProductID uint 
}
type PaginationRequest struct {
    Page       int    `json:"page"`
    PageSize   int    `json:"pageSize"`
    CategoryName string `json:"categoryName"`
}