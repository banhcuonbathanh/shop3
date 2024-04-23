package repository

import (
	"fmt"
	"golang-crud-gin/model"

	"gorm.io/gorm"
)

type PostRepositoryImpl struct {
    Db *gorm.DB
}

func NewPostRepositoryImpl(Db *gorm.DB) PostRepository {
    return &PostRepositoryImpl{Db: Db}
}

func (p *PostRepositoryImpl) Create(post model.BlogPost) (model.BlogPost, error) {
    fmt.Printf("createPostRequest repository: 1111111111111")
    fmt.Printf("createPostRequest PostRepositoryImpl post.BlogCatID: %+v\n", post.BlogCatID)

    // Perform database operation using Gorm or other database library
    result := p.Db.Create(&post)

    // Handle potential errors gracefully
    if result.Error != nil {
        fmt.Printf("createPostRequest PostRepositoryImpl error: %v\n", result.Error)
        return model.BlogPost{}, result.Error // Return empty BlogPost and the error for proper error propagation
    }

    // Return the created post upon success
    fmt.Printf("createPostRequest PostRepositoryImpl 2222222: %+v\n", post)
    return post, nil
}


func (p *PostRepositoryImpl) Update(post model.BlogPost) error {
    result := p.Db.Save(&post)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (p *PostRepositoryImpl) Delete(id int) error {
    result := p.Db.Where("id = ?", id).Delete(&model.BlogPost{})
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (p *PostRepositoryImpl) FindById(id int) (model.BlogPost, error) {
    var post model.BlogPost
    result := p.Db.Preload("Desc").Preload("Comments").First(&post, id)
    if result.Error != nil {
        return post, result.Error
    }
    return post, nil
}

func (p *PostRepositoryImpl) FindAll() ([]model.BlogPost, error) {
    fmt.Println("FindAll repository: Start fetching posts...")
    var posts []model.BlogPost
    result := p.Db.Preload("Desc").Preload("Comments").Find(&posts)
    if result.Error != nil {
        return nil, result.Error
    }
    fmt.Printf("Posts retrieved from the database repository: %+v\n", posts)
    return posts, nil
}

func (p *PostRepositoryImpl) FindPostsByCatSlug(catSlug string) ([]model.BlogPost, error) {
    var posts []model.BlogPost
    result := p.Db.Where("cat_slug = ?", catSlug).Find(&posts)
    if result.Error != nil {
        return nil, result.Error
    }
    return posts, nil
}

func (p *PostRepositoryImpl) FindPostsByUserEmail(email string) ([]model.BlogPost, error) {
    var posts []model.BlogPost
    result := p.Db.Where("user_email = ?", email).Find(&posts)
    if result.Error != nil {
        return nil, result.Error
    }
    return posts, nil
}

func (p *PostRepositoryImpl) FindPostsByUserID(userID int) ([]model.BlogPost, error) {
    var posts []model.BlogPost
    result := p.Db.Where("user_id = ?", userID).Find(&posts)
    if result.Error != nil {
        return nil, result.Error
    }
    return posts, nil
}

func (p *PostRepositoryImpl) FindPostsByPage(pageNumber, pageSize int) ([]model.BlogPost, error) {
    var posts []model.BlogPost
    offset := (pageNumber - 1) * pageSize
    result := p.Db.Offset(offset).Limit(pageSize).Find(&posts)
    if result.Error != nil {
        return nil, result.Error
    }
    return posts, nil
}

