package request



type CreatePostRequest struct {
    ImageUrl   string `validate:"required,min=2,max=255" json:"imageUrl"` 
    Title      string   `validate:"required,min=2,max=255" json:"title"`

    CategoryTitle      string   `validate:"required,min=2,max=255" json:"categoryTitle"`

    BlogCatID      int      `json:"blogCatID"`

    Views      int            `json:"views"`

    // CatSlug    model.BlogCategory   `json:"catSlug"`
    UserEmail  string   `json:"userEmail"`
    UserID     int      `json:"userID"`
}


type UpdatePostRequest struct {
    ID         int            `validate:"required"`
    ImageUrl   string `validate:"required,min=2,max=255" json:"imageUrl"`
    Title      string         `validate:"min=2,max=255" json:"title"`
    CategoryTitle      string   `validate:"required,min=2,max=255" json:"categoryTitle"`
    BlogCatID      int      `json:"blogCatID"`
    Views      int            `json:"views"`
    // CatSlug    model.BlogCategory   `json:"catSlug"`
    UserEmail  string         `json:"userEmail"`

    UserID     int            `json:"userID"`
}
