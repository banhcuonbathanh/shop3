package repository

import (
	"errors"
	"fmt"
	blog "golang-crud-gin/model"

	"gorm.io/gorm"
)

type BlogCommentRepositoryImpl struct {
    Db *gorm.DB
}

func NewBlogCommentRepositoryImpl(Db *gorm.DB) BlogCommentRepository {
    return &BlogCommentRepositoryImpl{Db: Db}
}

func (b *BlogCommentRepositoryImpl) Save(comment blog.BlogComment) error {
    fmt.Printf("2.2.golang/repository/blog_comment/blog_comment_repository_impl.go 11111 %+v\n", comment)
    // You may need to transform or adjust the incoming 'comment' data before saving it to the database
    result := b.Db.Create(&comment)
    fmt.Printf("2.2.golang/repository/blog_comment/blog_comment_repository_impl.go 2222 %+v\n", comment)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogCommentRepositoryImpl) Update(comment blog.BlogComment) error {
    result := b.Db.Save(&comment)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogCommentRepositoryImpl) Delete(commentID int) error {
    result := b.Db.Where("id = ?", commentID).Delete(&blog.BlogComment{})
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (b *BlogCommentRepositoryImpl) FindByID(commentID int) (blog.BlogComment, error) {
    var comment blog.BlogComment
    result := b.Db.First(&comment, commentID)
    if result.Error != nil {
        return comment, errors.New("comment is not found")
    }
    return comment, nil
}

func (b *BlogCommentRepositoryImpl) FindAll() ([]blog.BlogComment, error) {
    var comments []blog.BlogComment
    result := b.Db.Find(&comments)
    if result.Error != nil {
        return nil, result.Error
    }
    return comments, nil
}

func (b *BlogCommentRepositoryImpl) FindByUserID(userID int) ([]blog.BlogComment, error) {
    var comments []blog.BlogComment
    result := b.Db.Where("user_id = ?", userID).Find(&comments)
    if result.Error != nil {
        return nil, result.Error
    }
    return comments, nil
}

func (b *BlogCommentRepositoryImpl) FindByPostID(postID int) ([]blog.BlogComment, error) {
    var comments []blog.BlogComment
    result := b.Db.Where("post_id = ?", postID).Find(&comments)
    if result.Error != nil {
        return nil, result.Error
    }
    return comments, nil
}
func (b *BlogCommentRepositoryImpl) FindCommentsByPage(pageNumber, pageSize int) ([]blog.BlogComment, error) {
    var comments []blog.BlogComment
    offset := (pageNumber - 1) * pageSize

    result := b.Db.Offset(offset).Limit(pageSize).Find(&comments)
    if result.Error != nil {
        return nil, result.Error
    }
    return comments, nil
}
func (b *BlogCommentRepositoryImpl) FindAllCommentsByPostID(blogPostID int) ([]blog.BlogComment, error) {
    var comments []blog.BlogComment
    result := b.Db.Where("blog_post_id = ?", blogPostID).Find(&comments)
    fmt.Printf("FindAllCommentsByPostID 2.2.golang/repository/blog_comment/blog_comment_repository_impl.go %+v\n", result)
    if result.Error != nil {
        return nil, result.Error
    }
    return comments, nil
}
