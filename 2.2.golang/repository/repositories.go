package repository

import (
	// "gorm.io/gorm"
	// "database/sql"
	blogCommentRepository "golang-crud-gin/repository/blog_comment"
	postRepository "golang-crud-gin/repository/blog_post"
	token_repository "golang-crud-gin/repository/token"
	user_repository "golang-crud-gin/repository/user"

	billboard_repository "golang-crud-gin/repository/bill_board"
	categories_repository "golang-crud-gin/repository/categories"
	color_repository "golang-crud-gin/repository/color"
	orderitem_repository "golang-crud-gin/repository/order_item"
	product_repository "golang-crud-gin/repository/product"
	size_repository "golang-crud-gin/repository/size" // Import size repository
)

type Repositories struct {
    Token        token_repository.TokenRepository
    OrderItem     orderitem_repository.OrderItemRepository
    Product       product_repository.ProductRepository

    Category      categories_repository.CategoryRepository
    Size          size_repository.SizeRepository
    Color         color_repository.ColorRepository
    Billboard     billboard_repository.BillboardRepository
    User          user_repository.UserRepository  // Duplicate name, consider renaming
    BlogComment   blogCommentRepository.BlogCommentRepository
    Post          postRepository.PostRepository
}


// func createRepositories(db *sql.DB, validate *validator.Validate) repository.Repositories {
//     return repository.Repositories{
   
//         Products:      product_repository.NewProductRepositoryImpl(db),
//         OrderItem:     orderitem_repository.NewOrderItemRepositoryImpl(db),
//         Category:      categories_repository.NewCategoryRepositoryImpl(db),
//         Size:          size_repository.NewSizeRepositoryImpl(db),
//         Color:         color_repository.NewColorRepositoryImpl(db),
//         Billboard:     billboard_repository.NewBillboardRepositoryImpl(db),
//         BlogComment:   blogCommentRepository.NewBlogCommentRepositoryImpl(db),
//         Post:          postRepository.NewPostRepositoryImpl(db),
//         Token:         token_repository.NewTokenRepositoryImpl(db),
//     }
// }
