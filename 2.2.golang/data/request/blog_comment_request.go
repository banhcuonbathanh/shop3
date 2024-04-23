package request

type CreateBlogCommentRequest struct {
    Desc            string `validate:"required,min=2,max=255" json:"desc"` 
    UserEmail       string `validate:"required,email" json:"userEmail"`
    PostSlug        string `validate:"required,min=2,max=255" json:"postSlug"`
    UserID          int    `json:"userID"`
    BlogPostID      int    `json:"blogPostID"`
    SourceType      string `json:"sourceType"` // New field to indicate the source of the comment
    CategoryComment string `json:"categoryComment"`

    UserName            string `validate:"required,min=2,max=255" json:"userName"` 
}


type UpdateBlogCommentRequest struct {
    ID              int    `validate:"required"`
    Desc            string `validate:"omitempty"`
    UserEmail       string `validate:"omitempty,email"`
    PostSlug        string `validate:"omitempty"`
    UserID          int    `validate:"omitempty"`
    SourceType      string // New field added to indicate the source of the comment
    CategoryComment string
    PostID          int // Include PostID field

    UserName            string `validate:"required,min=2,max=255" json:"userName"` 
}