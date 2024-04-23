package repository

import (
    "errors"
    "fmt"

    "gorm.io/gorm"

    blog "golang-crud-gin/model"
)

type BlogCategoryRepositoryImpl struct {
    Db *gorm.DB
}

func NewBlogCategoryRepositoryImpl(Db *gorm.DB) BlogCategoryRepository {
    return &BlogCategoryRepositoryImpl{Db: Db}
}

func (b *BlogCategoryRepositoryImpl) Save(category blog.BlogCat) error {
    fmt.Printf("createBlogCategoryRequest repository category: %+v\n", category)
    // You may need to transform or adjust the incoming 'category' data before saving it to the database
    result := b.Db.Create(&category)
    fmt.Printf("createBlogCategoryRequest repository result category: %+v\n", category)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogCategoryRepositoryImpl) Update(category blog.BlogCat) error {
    result := b.Db.Save(&category)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogCategoryRepositoryImpl) Delete(categoryID int) error {
    result := b.Db.Where("id = ?", categoryID).Delete(&blog.BlogCat{})
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogCategoryRepositoryImpl) FindByID(categoryID int) (blog.BlogCat, error) {
    var category blog.BlogCat
    result := b.Db.First(&category, categoryID)
    if result.Error != nil {
        return category, errors.New("category is not found")
    }
    return category, nil
}

func (b *BlogCategoryRepositoryImpl) FindAll() ([]blog.BlogCat, error) {
    var categories []blog.BlogCat
    result := b.Db.Find(&categories)
    if result.Error != nil {
        return nil, result.Error
    }
    return categories, nil
}

func (b *BlogCategoryRepositoryImpl) FindByName(name string) (blog.BlogCat, error) {
    var category blog.BlogCat
    result := b.Db.Where("name = ?", name).First(&category)
    if result.Error != nil {
        return category, errors.New("category is not found by name")
    }
    return category, nil
}

func (b *BlogCategoryRepositoryImpl) FindCategoriesByPage(pageNumber, pageSize int) ([]blog.BlogCat, error) {
    var categories []blog.BlogCat
    offset := (pageNumber - 1) * pageSize

    result := b.Db.Offset(offset).Limit(pageSize).Find(&categories)
    if result.Error != nil {
        return nil, result.Error
    }
    return categories, nil
}
