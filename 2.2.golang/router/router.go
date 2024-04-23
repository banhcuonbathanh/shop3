package router

import (
	"fmt"
	"golang-crud-gin/controller"
	blog "golang-crud-gin/controller/blog"
	"golang-crud-gin/controller/ws"
	newblogcommentcontroller "golang-crud-gin/newcomment"

	// "golang-crud-gin/middleware"

	// "golang-crud-gin/middleware"
	// "golang-crud-gin/repository"
	"log"
	"time"

	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func NewRouter(
    tagsController *controller.TagsController,
    // userRepository repository.UsersRepository,
    authenticationController *controller.AuthenticationController,
    // usersController *controller.UserController,
    refreshTokenController gin.HandlerFunc,
    imageUploadController *controller.ImageUploadController,
    categoryController *controller.CategoryController,
    sizeController *controller.SizeController,
    // Add color controller here
    colorController *controller.ColorController,
	billboardController *controller.BillboardController,productController *controller.ProductController,orderItemController *controller.OrderItemController, userController *controller.UserController,
	blogCommentController *blog.BlogCommentController,  postController *blog.PostController,	tokenController *controller.TokenController,

	orderController *controller.OrderController,

	blogCategoryController *blog.BlogCategoryController,

	

	blogSubDesController *blog.BlogSubDesController,

	wsHandler *ws.Handler,

	blogNewCommentController *newblogcommentcontroller.BlogNewCommentController,
	
) *gin.Engine {




	// corsConfig.AllowOrigins = []string{"http://localhost:3000"}

	//-----cors -------------------------
	// corsConfig := cors.DefaultConfig()
	// corsConfig.AllowOrigins = []string{"*"} 
	// corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE"}
	// corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	// corsConfig.ExposeHeaders = []string{"Content-Length"}
	// corsConfig.AllowCredentials = true
	// corsConfig.MaxAge = 12 * time.Hour
	//-----cors ------------------------

	router := gin.Default()
//

router.Use(cors.New(cors.Config{
	AllowOrigins:     []string{"http://localhost:3001","http://localhost:3000","http://shop-golang:8888",  "http://next-app1:3000","http://next-app-admin:3001", "http://next-app-admin:3000",  },
	AllowMethods:     []string{"GET", "POST"},
	AllowHeaders:     []string{"Content-Type"},
	ExposeHeaders:    []string{"Content-Length"},
	AllowCredentials: true,
	// AllowOriginFunc: func(origin string) bool {
	// 	return origin == "http://localhost:3001"
	// },
	MaxAge: 12 * time.Hour,
}))



	// 
	log.Println("Setting up CORS")  // Debugging log
	// router.Use(cors.New(corsConfig))
	fmt.Println("after cors")
	// router.Use(cors.New(corsConfig))
	// add swagger
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	router.GET("", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "welcome home from golang")
	})
    fmt.Println("before cors")
		// Set CORS middleware

		// cors
	baseRouter := router.Group("/api")

	// Authentication routes
	authenticationRouter := baseRouter.Group("/authentication")
	authenticationRouter.POST("/register", authenticationController.Register)
	// authenticationRouter.POST("/login", authenticationController.Login)
	// User routes, check register, refresh token
	// usersRouter := router.Group("/users")

	log.Println("Setting up CORS") 
	// tags
	tagsRouter := baseRouter.Group("/tags")
	tagsRouter.GET("", tagsController.FindAll)
	tagsRouter.GET("/:tagId", tagsController.FindById)
	tagsRouter.POST("", tagsController.Create)
	tagsRouter.PATCH("/:tagId", tagsController.Update)
	tagsRouter.DELETE("/:tagId", tagsController.Delete)
    // Route for token refresh
    baseRouter.POST("/refresh-token", refreshTokenController)

	// image upload router

	router.POST("/upload",     imageUploadController.UploadImage)

	    // Add a route for serving the original image
		router.GET("/image", imageUploadController.ServeImage)

		// Add a route for serving a thumbnail
		router.GET("/thumbnail", imageUploadController.ServeThumbnail)
		router.Static("/uploads", "./uploads")
		router.DELETE("/deleteImage", imageUploadController.DeleteImage)
// categories
    // category routes
// categories
// category routes
categoryRouter := baseRouter.Group("/categories")
categoryRouter.GET("", categoryController.FindAll)
categoryRouter.GET("/findbyname", categoryController.FindByCategoryName)
categoryRouter.GET("/findbyid/:categoryId", categoryController.FindById)
categoryRouter.POST("", categoryController.Create)
categoryRouter.PATCH("/:categoryId", categoryController.Update)
categoryRouter.DELETE("/:categoryId", categoryController.Delete)
categoryRouter.GET("/findbypage", categoryController.FindCategoriesByPage)
categoryRouter.GET("/findbycharacteristic", categoryController.FindCategoriesByCharacteristicName)
// size 

sizeRouter := baseRouter.Group("/sizes")
sizeRouter.POST("", sizeController.CreateSize)
sizeRouter.PATCH("/:sizeId", sizeController.UpdateSize)
sizeRouter.DELETE("/:sizeId", sizeController.DeleteSize)
sizeRouter.GET("/:sizeId", sizeController.FindSizeByID)
sizeRouter.GET("", sizeController.FindAllSizes)
sizeRouter.GET("/findbyname", sizeController.FindSizeByName)
sizeRouter.GET("/findbypage", sizeController.FindSizesByPage)

// color

colorRouter := baseRouter.Group("/colors")
colorRouter.POST("", colorController.CreateColor)
colorRouter.PATCH("/:colorId", colorController.UpdateColor)
colorRouter.DELETE("/:colorId", colorController.DeleteColor)
colorRouter.GET("/:colorId", colorController.FindColorByID)
colorRouter.GET("", colorController.FindAllColors)
colorRouter.GET("/findbyname", colorController.FindColorByName)
colorRouter.GET("/findbypage", colorController.FindColorsByPage)
// bill board

billboardRouter := baseRouter.Group("/billboards")
billboardRouter.GET("", billboardController.FindAllBillboards)
billboardRouter.GET("/:billboardId", billboardController.FindBillboardByID)
billboardRouter.POST("", billboardController.CreateBillboard)
billboardRouter.PATCH("/:billboardId", billboardController.UpdateBillboard)
billboardRouter.DELETE("/:billboardId", billboardController.DeleteBillboard)
billboardRouter.GET("/findbylabel", billboardController.FindBillboardByLabel)
billboardRouter.GET("/findbypage", billboardController.FindBillboardsByPage)

// product 


    productRouter := baseRouter.Group("/products")
    productRouter.POST("", productController.CreateProduct)
    productRouter.PATCH("/:productId", productController.UpdateProduct)
    productRouter.DELETE("/:productId", productController.DeleteProduct)
    productRouter.GET("/findbyId/:productId", productController.FindProductByID)
    productRouter.GET("", productController.FindAllProducts)
    productRouter.GET("/findbycategory", productController.FindProductsByCategory)
    productRouter.GET("/findbycolor", productController.FindProductsByColor)
    productRouter.GET("/findbysize", productController.FindProductsBySize)
    productRouter.GET("/findbycharacteristic", productController.FindProductsByCharacteristic)
    productRouter.GET("/findbypage", productController.FindProductsByPage)
	productRouter.GET("/findbyproductname", productController.FindProductsByProductName)

		orderItemRouter := baseRouter.Group("/order-items")
		orderItemRouter.GET("", orderItemController.FindAll)
		orderItemRouter.GET("/:orderItemID", orderItemController.FindByID)
		orderItemRouter.POST("", orderItemController.CreateOrderItem)
		orderItemRouter.PATCH("/:orderItemID", orderItemController.UpdateOrderItem)
		orderItemRouter.DELETE("/:orderItemID", orderItemController.DeleteOrderItem)
		orderItemRouter.GET("/findbycustomer/:customerId", orderItemController.FindByCustomerID)
		orderItemRouter.GET("/findbyproduct", orderItemController.FindByProductID)
		orderItemRouter.GET("/findbypage", orderItemController.FindAllWithPagination)
	
	// users
userRouter := baseRouter.Group("/users")


userRouter.POST("", userController.CreateUser)
userRouter.PATCH("/:userID", userController.UpdateUser)
userRouter.DELETE("/:userID", userController.DeleteUser)
userRouter.GET("/:userID", userController.FindUserByID)
userRouter.GET("/findAll", userController.FindAllUsers)
userRouter.GET("/findbyemail", userController.FindUserByEmail)
userRouter.GET("/findbypage", userController.FindUsersByPage)
userRouter.POST("/login", userController.Login)
    // blog comments
    blogCommentRouter := baseRouter.Group("/blog-comments")
    blogCommentRouter.POST("", blogCommentController.CreateComment)

	blogCommentRouter.GET("FindAllCommentsByPostID/:postID", blogCommentController.FindAllCommentsByPostID)
    blogCommentRouter.PATCH("/:commentID", blogCommentController.UpdateComment)
    blogCommentRouter.DELETE("/:commentID", blogCommentController.DeleteComment)
    blogCommentRouter.GET("/:commentID", blogCommentController.FindCommentByID)

    //  postRouter
	postRouter := baseRouter.Group("/blog-posts")
postRouter.GET("", postController.FindAllPosts)
postRouter.GET("/:postId", postController.FindPostByID)
postRouter.POST("", postController.CreatePost)
postRouter.PATCH("/:postId", postController.UpdatePost)
postRouter.DELETE("/:postId", postController.DeletePost)
// Add other specific post routes as needed
tokenRouter := baseRouter.Group("/tokens")
tokenRouter.POST("", tokenController.CreateToken)
tokenRouter.GET("/:token", tokenController.GetToken)
tokenRouter.GET("/user/:userID", tokenController.GetTokensByUserID)
tokenRouter.PUT("", tokenController.UpdateToken)
tokenRouter.DELETE("/:token", tokenController.DeleteToken)
tokenRouter.GET("", tokenController.GetAllTokens)

    // Order routes
    orderRouter := baseRouter.Group("/orders")
    orderRouter.POST("", orderController.CreateOrder)
    orderRouter.GET("", orderController.FindAllOrders)
    orderRouter.GET("/:orderID", orderController.FindOrderByID)
    orderRouter.PATCH("/:orderID", orderController.UpdateOrder)
    orderRouter.DELETE("/:orderID", orderController.DeleteOrder)


	// Blog cateagoty

	blogCategoryRouter := baseRouter.Group("/blog-categories")


	blogCategoryRouter.POST("", blogCategoryController.CreateBlogCategory)
	

	blogCategoryRouter.PUT("/:categoryId", blogCategoryController.UpdateBlogCategory)
	

	blogCategoryRouter.DELETE("/:categoryId", blogCategoryController.DeleteBlogCategory)
	

	blogCategoryRouter.GET("/:categoryId", blogCategoryController.FindBlogCategoryByID)
	

	blogCategoryRouter.GET("", blogCategoryController.FindAllBlogCategories)
	

	blogCategoryRouter.GET("/search", blogCategoryController.FindBlogCategoriesByName)

	// Blog SubDes
	blogSubDesRouter := baseRouter.Group("/blog-sub-des")
	blogSubDesRouter.POST("saveList", blogSubDesController.CreateListBlogSubDes) 
blogSubDesRouter.POST("", blogSubDesController.CreateBlogSubDes) // Existing function, might need renaming

blogSubDesRouter.PUT("/:subdesId", blogSubDesController.UpdateBlogSubDes) // Existing function, might need renaming

blogSubDesRouter.DELETE("/:subdesId", blogSubDesController.DeleteBlogSubDes) // Existing function, might need renaming

blogSubDesRouter.GET("/:subdesId", blogSubDesController.FindBlogSubDesByID) // Existing function

blogSubDesRouter.GET("", blogSubDesController.FindAllBlogSubDes) // Existing function, might need renaming

blogSubDesRouter.GET("/search", blogSubDesController.FindBlogSubDesByName) // Existing function

// Note: 
// - Consider renaming the controller functions to reflect the change in resource name (e.g., CreateBlogSubDes, UpdateBlogSubDes, etc.).
// - Ensure the service layer implementation also uses the updated resource name ("BlogSubDes") for consistency.

// chatRouter := baseRouter.Group("/chat")

router.POST("/ws/createRoom", wsHandler.CreateRoom)
router.GET("/ws/joinRoom/:roomId", wsHandler.JoinRoom)
router.GET("/ws/getRooms", wsHandler.GetRooms)
router.GET("/ws/getClients/:roomId", wsHandler.GetClients)


   // blog new comments
   blogNewCommentRouter := baseRouter.Group("/blog-new-comments")
   blogNewCommentRouter.POST("", blogNewCommentController.CreateComment)

   blogNewCommentRouter.GET("FindAllCommentsByPostID/:postID", blogNewCommentController.FindAllCommentsByPostID)
   blogNewCommentRouter.PATCH("/:commentID", blogNewCommentController.UpdateComment)
   blogNewCommentRouter.DELETE("/:commentID", blogNewCommentController.DeleteComment)
   blogNewCommentRouter.GET("/:commentID", blogNewCommentController.FindCommentByID)

   blogNewCommentRouter.POST("/AddBlogNewCommentModel", blogNewCommentController.AddBlogNewCommentModel)
return router

}



// -----

// tagsRouter := baseRouter.Group("/tags", middleware.DeserializeEntity(tagsRepository))
// tagsRouter.GET("", tagsController.FindAll)
// // ... other tags routes ...

// // Categories routes, protected with DeserializeEntity middleware
// categoryRouter := baseRouter.Group("/categories", middleware.DeserializeEntity(categoryRepository))
// categoryRouter.GET("", categoryController.FindAll)
// // ... other category routes ...

// // Order items routes, protected with DeserializeEntity middleware
// orderItemRouter := baseRouter.Group("/order-items", middleware.DeserializeEntity(orderItemRepository))
// orderItemRouter.GET("", orderItemController.FindAll)
// // ... other order item routes ...

// // Products routes, protected with DeserializeEntity middleware
// productRouter := baseRouter.Group("/products", middleware.DeserializeEntity(productRepository))
// productRouter.GET("", productController.FindAllProducts)
// // ... other product routes ...

// // Sizes routes, protected with DeserializeEntity middleware
// sizeRouter := baseRouter.Group("/sizes", middleware.DeserializeEntity(sizeRepository))
// sizeRouter.GET("", sizeController.FindAllSizes)
// // ... other size routes ...

// // Colors routes, protected with DeserializeEntity middleware
// colorRouter := baseRouter.Group("/colors", middleware.DeserializeEntity(colorRepository))
// colorRouter.GET("", colorController.FindAllColors)
// // ... other color routes ...

// // Accounts routes, protected with DeserializeEntity middleware
// accountRouter := baseRouter.Group("/accounts", middleware.DeserializeEntity(accountRepository))
// accountRouter.GET("", accountController.FindAllAccounts)
// // ... other account routes ...

// // Blog comments routes, protected with DeserializeEntity middleware
// blogCommentRouter := baseRouter.Group("/blog-comments", middleware.DeserializeEntity(blogCommentRepository))
// blogCommentRouter.GET("", blogCommentController.FindAllBlogComments)
// // ... other blog comment routes ...

// // Posts routes, protected with DeserializeEntity middleware
// postRouter := baseRouter.Group("/posts", middleware.DeserializeEntity(postRepository))
// postRouter.GET("", postController.FindAllPosts)
// // ... other post routes ...

// // Sessions routes, protected with DeserializeEntity middleware
// sessionRouter := baseRouter.Group("/sessions", middleware.DeserializeEntity(sessionRepository))
// sessionRouter.GET("", sessionController.FindAllSessions)
// // ... other session routes ...

// // Tokens routes, protected with DeserializeEntity middleware
// tokenRouter := baseRouter.Group("/tokens", middleware.DeserializeEntity(tokenRepository))
// tokenRouter.GET("", tokenController.FindAllTokens)
// // ... other token routes ...

// // Orders routes, protected with DeserializeEntity middleware
// orderRouter := baseRouter.Group("/orders", middleware.DeserializeEntity(orderRepository))
// orderRouter.GET("", orderController.FindAllOrders)

//--------------