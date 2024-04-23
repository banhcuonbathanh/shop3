package response

import model "golang-crud-gin/model"

type PostResponse struct {
    ID        uint            `json:"id"`
    ImageUrl      string          `json:"slug"`
    Title     string          `json:"title"`
    Desc       [] model.BlogSubDes   `json:"desc"`

    Views     int             `json:"views"`
    // BlogCategory    model.BlogCategory   `json:"catSlug"`
    UserEmail string          `json:"userEmail"`
    CreatedAt string          `json:"created_at"`
    UserID    int             `json:"userID"`

    CategoryTitle string `json:"categoryTitle"`

    BlogCatID int `json:"blogCatID"`
}
