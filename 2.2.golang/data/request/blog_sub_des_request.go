package request

import "golang-crud-gin/model"

type CreateBlogSubDesRequest struct {
    BlogPostID int `json:"blogPostID"`
    Title      string `json:"title"`
    Desc       string `json:"desc"`
    ImageUrls  string `json:"imageUrls"`
}

type UpdateBlogSubDesRequest struct {
    ID         int   `json:"id"`
    BlogPostID int   `json:"blogPostID"` // Allow optional update for BlogPostID
    Title      string `json:"title"`
    Desc       string `json:"desc"`
    ImageUrls  string `json:"imageUrls"`
}


type CreateListBlogSubDesRequest struct {
    BlogSubList []model.BlogSubDes `json:"blogSubList"`
 
}