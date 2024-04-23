package service

import (
	// ... other imports
	"context"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/model"
)

type UserService interface {
    Create(userRequest request.CreateUserRequest)

    Delete(userID int)
    FindByID(userID int) (response.UserResponse, error)
    FindAll() ([]response.UserResponse, error)
    FindByEmail(email string) (*model.User, error)
    FindUsersByPage(pageNumber, pageSize int) ([]response.UserResponse, error)
    Update(userRequest request.UpdateUserRequest) (*model.User, error)
    // Newly added functions:
    Login(ctx context.Context, email, password string) (*model.User, error)
    Register(userRequest request.CreateUserRequest) (bool, error)

       // Additional considerations:
    // - Methods for password management (change, reset)
    // - Role-based access control (if applicable)
    // - Email verification and validation
    // - User activation and deactivation
    // - Audit logging
}

