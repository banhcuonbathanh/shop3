package middleware

import (
	"fmt"
	"golang-crud-gin/helper"
	"golang-crud-gin/model"
	"golang-crud-gin/repository"
	"golang-crud-gin/utils"
	"log"
	"net/http"
	"os"
	"reflect"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)








func DeserializeUser(userRepository repository.UsersRepository) gin.HandlerFunc {
		return func(ctx *gin.Context) {
			var token string
			authorizationHeader := ctx.Request.Header.Get("Authorization")
			fields := strings.Fields(authorizationHeader)
	
			if len(fields) != 0 && fields[0] == "Bearer" {
				token = fields[1]
			}
	
			if token == "" {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": "You are not logged in"})
				return
			}
			if err := godotenv.Load("app.env"); err != nil {
				log.Fatalf("Error loading .env file: %v", err)
			}
			tokenSecret := os.Getenv("TOKEN_SECRET")
		
			sub, err := utils.ValidateToken(token, tokenSecret)
			if err != nil {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": err.Error()})
				return
			}
	
			id, err_id := strconv.Atoi(fmt.Sprint(sub))
			helper.ErrorPanic(err_id)
			result, err := userRepository.FindById(id)
			if err != nil {
				ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "fail", "message": "the user belonging to this token no logger exists"})
				return
			}
	
			ctx.Set("currentUser", result.Username)
			ctx.Next()
	
		}
	}
	// more generic 

	
	type Repository interface {
		FindById(id int) (interface{}, error)
	}
	type modelHandler struct {
		modelType reflect.Type
		contextKey string
	}

	var modelHandlers = map[reflect.Type]modelHandler{
		reflect.TypeOf(model.User{}): {modelType: reflect.TypeOf(model.User{}), contextKey: "currentUser"},
		reflect.TypeOf(model.Billboard{}): {modelType: reflect.TypeOf(model.Billboard{}), contextKey: "currentBillboard"},
		
		// ... add more model types and context keys ...
	}
	func DeserializeEntity(repository Repository) gin.HandlerFunc {
		return func(ctx *gin.Context) {
			var token string
			authorizationHeader := ctx.Request.Header.Get("Authorization")
			fields := strings.Fields(authorizationHeader)
	
			if len(fields) != 0 && fields[0] == "Bearer" {
				token = fields[1]
			}
	
			if token == "" {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": "You are not logged in"})
				return
			}
	
			if err := godotenv.Load("app.env"); err != nil {
				log.Fatalf("Error loading .env file: %v", err)
			}
			tokenSecret := os.Getenv("TOKEN_SECRET")
	
			sub, err := utils.ValidateToken(token, tokenSecret) // Assuming utils.ValidateToken exists
			if err != nil {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": err.Error()})
				return
			}
	
			id, err := strconv.Atoi(fmt.Sprint(sub))
			helper.ErrorPanic(err)
	
			entity, err := repository.FindById(id)
			if err != nil {
				ctx.AbortWithStatusJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Entity not found"})
				return
			}
	
			// Set entity in context based on type (adjust as needed)
			handler, ok := modelHandlers[reflect.TypeOf(entity)]
			if ok {
				// Set the entity in the context using the appropriate key
				ctx.Set(handler.contextKey, entity)
			} else {
				// log.Warnf("Unknown entity type encountered: %T (ID: %v)", entity, id)

				// Optionally return a specific error status for unknown entity types
				ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Unknown entity type"})
				return
			}
	
	        // if user, ok := entity.(model.User); ok {
			// 	ctx.Set("currentUser", user.Name)
			// } else if billboard, ok := entity.(model.Billboard); ok {
			// 	ctx.Set("currentBillboard", billboard)

			// } else if category, ok := entity.(model.Category); ok {
			// 	ctx.Set("currentCategory", category)
			// } else if orderItem, ok := entity.(model.OrderItem); ok {
			// 	ctx.Set("currentOrderItem", orderItem)
			// } else if product, ok := entity.(model.Product); ok {
			// 	ctx.Set("currentProduct", product)
			// } else if size, ok := entity.(model.Size); ok {
			// 	ctx.Set("currentSize", size)
			// } else if color, ok := entity.(model.Color); ok {
			// 	ctx.Set("currentColor", color)
			// } else if account, ok := entity.(model.Account); ok {
			// 	ctx.Set("currentAccount", account)
			// } else if blogComment, ok := entity.(model.BlogComment); ok {
			// 	ctx.Set("currentBlogComment", blogComment)
			// } else if post, ok := entity.(model.Post); ok {
			// 	ctx.Set("currentPost", post)
			// } else if session, ok := entity.(model.Session); ok {
			// 	ctx.Set("currentSession", session)
			// } else if token, ok := entity.(model.Token); ok {
			// 	ctx.Set("currentToken", token)
			// } else if order, ok := entity.(model.Order); ok {
			// 	ctx.Set("currentOrder", order)
			// }
	
			ctx.Next()
		}
	}
	

	// 


	//

// func DeserializeUser(userRepository repository.UsersRepository) gin.HandlerFunc {
// 	return func(ctx *gin.Context) {
// 		var token string
// 		authorizationHeader := ctx.Request.Header.Get("Authorization")
// 		fields := strings.Fields(authorizationHeader)

// 		if len(fields) != 2 || fields[0] != "Bearer" {
// 			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": "Invalid or missing Authorization header"})
// 			return
// 		}

// 		token = fields[1]

// 		if token == "" {
// 			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": "You are not logged in"})
// 			return
// 		}

// 		sub, err := utils.ValidateToken(token, token)
// 		if err != nil {
// 			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": err.Error()})
// 			return
// 		}

// 		id, err_id := strconv.Atoi(fmt.Sprint(sub))
// 		helper.ErrorPanic(err_id)
// 		result, err := userRepository.FindById(id)
// 		if err != nil {
// 			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "fail", "message": "the user belonging to this token no longer exists"})
// 			return
// 		}

// 		ctx.Set("currentUser", result.Username)
// 		ctx.Next()
// 	}
// }
// func DeserializeEntity(repository Repository) gin.HandlerFunc {
// 	return func(ctx *gin.Context) {
// 		var token string
// 		authorizationHeader := ctx.Request.Header.Get("Authorization")
// 		fields := strings.Fields(authorizationHeader)

// 		if len(fields) != 0 && fields[0] == "Bearer" {
// 			token = fields[1]
// 		}

// 		if token == "" {
// 			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": "You are not logged in"})
// 			return
// 		}

// 		if err := godotenv.Load("app.env"); err != nil {
// 			log.Fatalf("Error loading .env file: %v", err)
// 		}
// 		tokenSecret := os.Getenv("TOKEN_SECRET")

// 		sub, err := utils.ValidateToken(token, tokenSecret) // Assuming utils.ValidateToken exists
// 		if err != nil {
// 			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": err.Error()})
// 			return
// 		}

// 		id, err := strconv.Atoi(fmt.Sprint(sub))
// 		helper.ErrorPanic(err)

// 		entity, err := repository.FindById(id)
// 		if err != nil {
// 			ctx.AbortWithStatusJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Entity not found"})
// 			return
// 		}

// 		// Set entity in context based on type (adjust as needed)
// 		handler, ok := modelHandlers[reflect.TypeOf(entity)]
// 		if ok {
// 			// Set the entity in the context using the appropriate key
// 			ctx.Set(handler.contextKey, entity)
// 		} else {
// 			// log.Warnf("Unknown entity type encountered: %T (ID: %v)", entity, id)

// 			// Optionally return a specific error status for unknown entity types
// 			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Unknown entity type"})
// 			return
// 		}

// 		// if user, ok := entity.(model.User); ok {
// 		// 	ctx.Set("currentUser", user.Name)
// 		// } else if billboard, ok := entity.(model.Billboard); ok {
// 		// 	ctx.Set("currentBillboard", billboard)

// 		// } else if category, ok := entity.(model.Category); ok {
// 		// 	ctx.Set("currentCategory", category)
// 		// } else if orderItem, ok := entity.(model.OrderItem); ok {
// 		// 	ctx.Set("currentOrderItem", orderItem)
// 		// } else if product, ok := entity.(model.Product); ok {
// 		// 	ctx.Set("currentProduct", product)
// 		// } else if size, ok := entity.(model.Size); ok {
// 		// 	ctx.Set("currentSize", size)
// 		// } else if color, ok := entity.(model.Color); ok {
// 		// 	ctx.Set("currentColor", color)
// 		// } else if account, ok := entity.(model.Account); ok {
// 		// 	ctx.Set("currentAccount", account)
// 		// } else if blogComment, ok := entity.(model.BlogComment); ok {
// 		// 	ctx.Set("currentBlogComment", blogComment)
// 		// } else if post, ok := entity.(model.Post); ok {
// 		// 	ctx.Set("currentPost", post)
// 		// } else if session, ok := entity.(model.Session); ok {
// 		// 	ctx.Set("currentSession", session)
// 		// } else if token, ok := entity.(model.Token); ok {
// 		// 	ctx.Set("currentToken", token)
// 		// } else if order, ok := entity.(model.Order); ok {
// 		// 	ctx.Set("currentOrder", order)
// 		// }

// 		ctx.Next()
// 	}
// }