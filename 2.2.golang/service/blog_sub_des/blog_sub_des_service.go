package service

import (
    "golang-crud-gin/data/request"

    blog "golang-crud-gin/model"
)

type BlogSubDesService interface {

    SaveList(request request.CreateListBlogSubDesRequest) ([]blog.BlogSubDes, error)
    Create(subDes request.CreateBlogSubDesRequest) error
    Update(subDes request.UpdateBlogSubDesRequest) error
    Delete(subDesID int) error
    FindByID(subDesID int) (blog.BlogSubDes, error)
    FindAll() ([]blog.BlogSubDes, error)

    // Add any additional methods you need for blog sub des service here

    FindByName(name string) (blog.BlogSubDes, error)
    // FindSubDesByPage(pageNumber, pageSize int) ([]response.SubDesResponse, error)
}
