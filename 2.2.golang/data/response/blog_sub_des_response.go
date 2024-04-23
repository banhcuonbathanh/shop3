package response

import (
	"time"
)

type BlogSubDesResponse struct {
    ID          uint      `json:"id"`
    BlogPostID  int       `json:"blogPostId"`
    Title       string    `json:"title"`
    Desc        string    `json:"desc"`
    ImageUrls   []string  `json:"imageUrls"` // Assuming a slice of string URLs for flexibility
    CreatedAt   time.Time `json:"createdAt"`
    UpdatedAt   time.Time `json:"updatedAt"`
}
