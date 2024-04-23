package repository

import (
	"errors"
	"fmt"

	"gorm.io/gorm"

	blog "golang-crud-gin/model"
)

type BlogSubDesRepositoryImpl struct {  // Struct name changed
    Db *gorm.DB
}

func NewBlogSubDesRepositoryImpl(Db *gorm.DB) BlogSubDesRepository { // Function name changed
    return &BlogSubDesRepositoryImpl{Db: Db}
}
func (b *BlogSubDesRepositoryImpl) SaveList(subDes []blog.BlogSubDes) ([]blog.BlogSubDes, error) {
	fmt.Printf("createBlogSubDesRequest repository subDes: %+v\n", subDes)
	result := b.Db.Create(&subDes)
	fmt.Printf("createBlogSubDesRequest repository result subDes: %+v\n", subDes)
	if result.Error != nil {
		return nil, result.Error
	}
	return subDes, nil
}


func (b *BlogSubDesRepositoryImpl) Save(subDes blog.BlogSubDes) error { // Type and method name changed
    fmt.Printf("createBlogSubDesRequest repository subDes: %+v\n", subDes) // Print statement updated
    // You may need to transform or adjust the incoming 'subDes' data before saving it to the database
    result := b.Db.Create(&subDes)
    fmt.Printf("createBlogSubDesRequest repository result subDes: %+v\n", subDes) // Print statement updated
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogSubDesRepositoryImpl) Update(subDes blog.BlogSubDes) error { // Type and method name changed
    result := b.Db.Save(&subDes)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogSubDesRepositoryImpl) Delete(subDesID int) error { // Method name changed
    result := b.Db.Where("id = ?", subDesID).Delete(&blog.BlogSubDes{}) // Model name changed
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogSubDesRepositoryImpl) FindByID(subDesID int) (blog.BlogSubDes, error) { // Method name changed
    var subDes blog.BlogSubDes // Variable name changed
    result := b.Db.First(&subDes, subDesID)
    if result.Error != nil {
        return subDes, errors.New("subDes is not found") // Error message updated
    }
    return subDes, nil
}

func (b *BlogSubDesRepositoryImpl) FindAll() ([]blog.BlogSubDes, error) { // Return type changed
    var subDeses []blog.BlogSubDes // Variable name changed
    result := b.Db.Find(&subDeses)
    if result.Error != nil {
        return nil, result.Error
    }
    return subDeses, nil
}

func (b *BlogSubDesRepositoryImpl) FindByName(name string) (blog.BlogSubDes, error) {
    var subDes blog.BlogSubDes // Variable name changed
    result := b.Db.Where("name = ?", name).First(&subDes)
    if result.Error != nil {
        return subDes, errors.New("subDes is not found by name") // Error message updated
    }
    return subDes, nil
}

func (b *BlogSubDesRepositoryImpl) FindSubDesesByPage(pageNumber, pageSize int) ([]blog.BlogSubDes, error) { // Method name changed
    var subDeses []blog.BlogSubDes // Variable name changed
    offset := (pageNumber - 1) * pageSize

    result := b.Db.Offset(offset).Limit(pageSize).Find(&subDeses)
    if result.Error != nil {
        return nil, result.Error
    }
    return subDeses, nil
}
