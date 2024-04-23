package request



type CreateProductRequest struct {
    Name       string `validate:"required,min=2,max=255" json:"name"`
    Price      float32 `json:"price"`
    IsFeatured bool `json:"isFeatured"`
    IsArchived bool `json:"isArchived"`
    ImageUrls  []string `json:"imageUrls"`
    CategoryID uint `json:"categoryID"`
    SizeID     uint `json:"sizeID"`
    ColorID    uint `json:"colorID"`
    Description    string `json:"description"`
}

type UpdateProductRequest struct {
    Id        int `validate:"required"`
    Name       string `validate:"min=2,max=255" json:"name"`
    Price      float32 `json:"price"`
    IsFeatured bool `json:"isFeatured"`
    IsArchived bool `json:"isArchived"`
    ImageUrls  []string `json:"imageUrls"`
    CategoryID uint `json:"categoryID"`
    SizeID     uint `json:"sizeID"`
    ColorID   uint `json:"colorID"`
    Description    string `json:"description"`
}