package response

import "time"

type CommentResponse struct {
    ID               uint   `json:"id"`

    Desc             string `json:"desc"`
    UserEmail        string `json:"user_email"`
    PostSlug         string `json:"post_slug"`
    UserID           int    `json:"user_id"`
    SourceType       string `json:"source_type"`
    CategoryComment  string `json:"category_comment"`
    PostID           int    `json:"post_id"`
    CreatedAt      time.Time        `json:"createdAt"` 

    UserName            string `validate:"required,min=2,max=255" json:"userName"` 
}
