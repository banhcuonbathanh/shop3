package main

import (
	"golang-crud-gin/config"
	"golang-crud-gin/controller"

	blogcontroller "golang-crud-gin/controller/blog"

	"golang-crud-gin/controller/ws"
	_ "golang-crud-gin/docs"
	"golang-crud-gin/helper"
	"golang-crud-gin/model"

	blognewcommentcontroller "golang-crud-gin/newcomment"
	blognewcommentrepository "golang-crud-gin/newcomment/blog_new_comment_repository"
	blognewcommentservice "golang-crud-gin/newcomment/blog_new_comment_service"
	blognewcommentmodel "golang-crud-gin/newcomment/model"
	"golang-crud-gin/repository"

	//----------

	blogCategoryRepository "golang-crud-gin/repository/blog_category"
	blogSubDesRepository "golang-crud-gin/repository/blog_sub_des"
	blogCategoryService "golang-crud-gin/service/blog_category"
	blogSubDesService "golang-crud-gin/service/blog_sub_des"

	//-----------------
	order_repository "golang-crud-gin/repository/order"
	order_service "golang-crud-gin/service/order"

	//--------------

	token_repository "golang-crud-gin/repository/token" // Import user repository
	token_service "golang-crud-gin/service/token"

	//------------
	user_repository "golang-crud-gin/repository/user" // Import user repository
	user_service "golang-crud-gin/service/user"       // Import user service

	//-----------

	blogCommentRepository "golang-crud-gin/repository/blog_comment"
	blogCommentService "golang-crud-gin/service/blog_comment"

	//-----------

	postRepository "golang-crud-gin/repository/blog_post"
	postService "golang-crud-gin/service/blog_post"

	//-----------
	billboard_repository "golang-crud-gin/repository/bill_board"
	categories_repository "golang-crud-gin/repository/categories"
	color_repository "golang-crud-gin/repository/color"
	orderitem_repository "golang-crud-gin/repository/order_item"
	product_repository "golang-crud-gin/repository/product"
	size_repository "golang-crud-gin/repository/size" // Import size repository
	"golang-crud-gin/router"
	"golang-crud-gin/service"
	billboard_service "golang-crud-gin/service/bill_boad"
	categories_service "golang-crud-gin/service/categories"
	color_service "golang-crud-gin/service/color"
	orderitem_service "golang-crud-gin/service/order_item"
	product_service "golang-crud-gin/service/product"
	size_service "golang-crud-gin/service/size" // Import size service
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/rs/zerolog/log"
	// "golang.org/x/tools/blog"
)

// @title 	Tag Service API
// @version	1.0
// @description A Tag service API in Go using Gin framework

// @host 	localhost:8888
// @BasePath /api
func main() {

// socket.io




    //
    log.Info().Msg("Started Server!")
    // Database
    db := config.DatabaseConnection()
    validate := validator.New()
  // db.Table("users").AutoMigrate(&model.Users{})
// 
    //  db.Table("products").AutoMigrate(&model.Product{})
    // db.Table("categories").AutoMigrate(&model.Category{})
    // db.Table("sizes").AutoMigrate(&model.Size{})
    // db.Table("colors").AutoMigrate(&model.Color{})
       // db.Migrator().CreateConstraint(&model.Category{}, "fk_categories_products")
    db.Table("tags").AutoMigrate(&model.Tags{})
  
    db.AutoMigrate(&model.Category{},&model.User{}, &model.OrderItem{}, &model.Product{}, &model.Size{},&model.BlogCat{} ,model.BlogPost{}, &model.Color{},&model.Account{} ,&model.BlogComment{}, &model.Token{}, &model.BlogSubDes{},
    
        &model.BlogSubDes{},    &blognewcommentmodel.BlogNewCommentModel{},
    )
    // 

 
    db.Table("billboards").AutoMigrate(&model.Billboard{})
  
    db.Table("orders").AutoMigrate(&model.Order{})


   
 // blog new comment

 blognewcommentrepository :=  blognewcommentrepository.NewBlogCommentRepositoryImpl(db)
blognewcommentservice := blognewcommentservice.NewBlogCommentServiceImpl(blognewcommentrepository, validate)

blognewcommentcontroller := blognewcommentcontroller.NewBlogNewCommentController(blognewcommentservice)
//
 orderRepository := order_repository.NewOrderRepositoryImpl(db)

 // Service
 orderService := order_service.NewOrderServiceImpl(orderRepository, validate)

    // Repository
    blogCategoryRepository := blogCategoryRepository.NewBlogCategoryRepositoryImpl(db) 
    blogSubDesRepository := blogSubDesRepository.NewBlogSubDesRepositoryImpl(db) 


    tokenRepository := token_repository.NewTokenRepositoryImpl(db) 
    orderitemRepository := orderitem_repository.NewOrderItemRepositoryImpl(db)
    productRepository := product_repository.NewProductRepositoryImpl(db)
    tagsRepository := repository.NewTagsREpositoryImpl(db)
    userRepository := repository.NewUsersRepositoryImpl(db)

    categoryRepository := categories_repository.NewCategoryRepositoryImpl(db)
    sizeRepository := size_repository.NewSizeRepositoryImpl(db)
    colorRepository := color_repository.NewColorRepositoryImpl(db)
    billboardRepository := billboard_repository.NewBillboardRepositoryImpl(db)

    userRepo := user_repository.NewUserRepositoryImpl(db)
    blogCommentRepository := blogCommentRepository.NewBlogCommentRepositoryImpl(db)
    postRepository := postRepository.NewPostRepositoryImpl(db)
    // Service

    blogCategoryService := blogCategoryService.NewBlogCategoryServiceImpl(blogCategoryRepository, validate)
blogSubDesService := blogSubDesService.NewBlogSubDesServiceImpl(blogSubDesRepository, validate)
    postService := postService.NewPostServiceImpl(postRepository, validate) 

    tagsService := service.NewTagsServiceImpl(tagsRepository, validate)
    authenticationService := service.NewAuthenticationServiceImpl(userRepository, validate)


    tokenService := token_service.NewTokenServiceImpl(tokenRepository, validate) 


    categoryService := categories_service.NewCategoryServiceImpl(categoryRepository, validate)





    sizeService := size_service.NewSizeServiceImpl(sizeRepository, validate)
    colorService := color_service.NewColorServiceImpl(colorRepository, validate)
    billboardService := billboard_service.NewBillboardServiceImpl(billboardRepository, validate)
    productService := product_service.NewProductServiceImpl(productRepository, validate, categoryService)
    userService := user_service.NewUserServiceImpl(userRepo, validate)
    blogCommentService := blogCommentService.NewBlogCommentServiceImpl(blogCommentRepository, validate)
    orderitemService := orderitem_service.NewOrderItemServiceImpl(orderitemRepository, validate, userService)
    // Controller

    blogCategoryController := blogcontroller.NewBlogCategoryController(blogCategoryService)
blogSubDesController := blogcontroller.NewBlogSubDesController(blogSubDesService)

    postController := blogcontroller.NewPostController(postService)
    orderitemController := controller.NewOrderItemController(orderitemService, orderService)
    productController := controller.NewProductController(productService)
    tagsController := controller.NewTagsController(tagsService)
    authenticationController := controller.NewAuthenticationController(authenticationService)

    tokenController := controller.NewTokenController(tokenService, tokenRepository) 
    categoryController := controller.NewCategoryController(categoryService)
    sizeController := controller.NewSizeController(sizeService)
    colorController := controller.NewColorController(colorService)
    billboardController := controller.NewBillboardController(billboardService)
    userController := controller.NewUserController(userService, orderService)
    blogCommentController := blogcontroller.NewBlogCommentController(blogCommentService)

    // Create the RefreshTokenController
    refreshTokenController := controller.RefreshTokenController

    orderController := controller.NewOrderController(orderService, orderitemService )
    // Image Upload Controller
    imageController := controller.NewImageUploadController()


    // ---------------------------- chat


    hub := ws.NewHub()
    wsHandler := ws.NewHandler(hub)
    go hub.Run()


    //------------------------------
    // Router
    routes := router.NewRouter(
        tagsController,
        // userRepository,
        authenticationController,
        // userController, // Add UserController here
        refreshTokenController,
        imageController,
        categoryController,
        sizeController,
        colorController,
        billboardController,
        productController,
        orderitemController,
        userController, // Add UserController again for the missing argument
        blogCommentController,postController,
        tokenController,
         orderController,
         blogCategoryController,
    
         blogSubDesController,

         wsHandler,

         blognewcommentcontroller,

    )
// socket .io




//
    // Server configuration
    server := &http.Server{
        Addr:    ":8888",
        Handler: routes,
    }

    err := server.ListenAndServe()
    helper.ErrorPanic(err)

//--------------------------

}



// func (server *Server) setupRouter() {
// 	router := gin.Default()

// 	router.POST("/users", server.createUser)
// 	router.POST("/users/login", server.loginUser)
// 	router.POST("/tokens/renew_access", server.renewAccessToken)

// 	authRoutes := router.Group("/").Use(authMiddleware(server.tokenMaker))
// 	authRoutes.POST("/accounts", server.createAccount)
// 	authRoutes.GET("/accounts/:id", server.getAccount)
// 	authRoutes.GET("/accounts", server.listAccounts)

// 	authRoutes.POST("/transfers", server.createTransfer)

// 	server.router = router
// }



