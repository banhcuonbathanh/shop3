package request


type CreateBlogCategoryRequest struct {
    Slug        string `json:"slug"`
    Title       string `json:"title"`
    ImageUrl    string `json:"imageUrl"`


    
}

type UpdateBlogCategoryRequest struct {
    ID          int       `json:"id"`
    Slug        string    `json:"slug"` // Slug can be optional for updates
    Title       string    `json:"title"`
    ImageUrl    string `json:"imageUrl"`
}
