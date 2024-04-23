package request

import (



     "golang-crud-gin/model"
)
type CreateUserRequest struct {
    Name            string `validate:"omitempty,min=2,max=100" json:"name"`
    Email    string `validate:"required,min=2,max=100" json:"email"`
    HashedPassword string `validate:"required,min=2,max=100" json:"password"`
    Image           string

   
    PhoneNumber     string
    StreetAddress string

  
}

type UpdateUserRequest struct {
    ID       int    `validate:"required"`
    Name     string `validate:"required,max=200,min=2" json:"name"`
    Email    string `validate:"required,min=2,max=100" json:"email"`
    HashedPassword string `validate:"required,min=2,max=100" json:"password"`
    Image           string
    FavoriteIds     string // empty for when createing user
    PhoneNumber     string
    StreetAddress string
    Orders    []model.Order
    Accounts  []model.Account

    Posts     []model.BlogPost   
    Comments  []model.BlogComment

    Role               model.UserRole
    // Add other fields as needed
}


type LoginRequest struct {
    Email    string `validate:"required,max=200,min=2" json:"email"`
    Password string `validate:"required,min=2,max=100" json:"password"`
}
