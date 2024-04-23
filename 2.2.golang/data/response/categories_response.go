package response

type CategoryResponse struct {
	ID   uint    `json:"id"`
	Name string `json:"name"`
}


type CategoryProductResponse struct {
	ID   uint    `json:"id"`
	Name string `json:"name"`
	Product   []ProductResponse `json:"product"`
}
