package response

import (
	"time"
)

type BlogCategoryResponse struct {
	ID          uint       `json:"id"`
	Slug        string     `json:"slug"`
	Title       string     `json:"title"`
	ImageUrl    []string   `json:"imageUrl"`
	CreatedAt  time.Time  `json:"createdAt"`
	UpdatedAt  time.Time  `json:"updatedAt"`
}
