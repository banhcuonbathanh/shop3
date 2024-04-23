package repository

import (
	"context"
	"golang-crud-gin/model"
)

type UserRepository interface {
    Save(user model.User) error
    Update(user model.User) error
    Delete(userID int) error
    FindByID(userID int) (model.User, error)
    FindAll() ([]model.User, error)
    FindByEmail(email string) (*model.User, error)
    FindUsersByPage(pageNumber, pageSize int) ([]model.User, error)

    // Newly added functions:
    Login(ctx context.Context, email, password string) (*model.User, error) 
    Register(user model.User) error
}
