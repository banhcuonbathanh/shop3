package repository

import  "golang-crud-gin/model"

type BlogSubDesRepository interface { // Interface name changed

    SaveList(subDes []model.BlogSubDes) ([]model.BlogSubDes, error)   // Type and method name changed
    Save(subDes model.BlogSubDes) error   // Type and method name changed
    Update(subDes model.BlogSubDes) error // Type and method name changed
    Delete(subDesID int) error          // Method name changed
    FindByID(subDesID int) (model.BlogSubDes, error) // Type and method name changed
    FindAll() ([]model.BlogSubDes, error)
    FindByName(name string) (model.BlogSubDes, error)
    FindSubDesesByPage(pageNumber, pageSize int) ([]model.BlogSubDes, error)
       // Type and method name changed

    // Additional methods (if needed)
}
