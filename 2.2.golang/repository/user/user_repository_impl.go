package repository

import (
	"context"
	"errors"
	"fmt"

	"golang-crud-gin/model"

	"github.com/rs/zerolog/log"
	// "golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserRepositoryImpl struct {
    Db *gorm.DB
}

func NewUserRepositoryImpl(Db *gorm.DB) UserRepository {
    return &UserRepositoryImpl{Db: Db}
}

func (u *UserRepositoryImpl) Save(user model.User) error {
    result := u.Db.Create(&user)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (u *UserRepositoryImpl) Update(user model.User) error {
    result := u.Db.Save(&user)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (u *UserRepositoryImpl) Delete(userID int) error {
    result := u.Db.Where("id = ?", userID).Delete(&model.User{})
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func (u *UserRepositoryImpl) FindByID(userID int) (model.User, error) {
    var user model.User
    result := u.Db.Preload("Orders", "is_paid = ?", false).Preload("Orders.OrderItem").First(&user, userID)

    // result := u.Db.Preload("Orders", "is_paid = ?", false).Preload("Orders.OrderItem").First(&user, "email = ?", email)
    // result := u.Db.Preload("Orders").Preload("Accounts").Preload("Posts").Preload("Comments")First(&user, userID)
    if result.Error != nil {
        return user, errors.New("user not found")
    }
    return user, nil
}

func (u *UserRepositoryImpl) FindAll() ([]model.User, error) {
    var users []model.User
    result := u.Db.Find(&users)
    if result.Error != nil {
        return nil, result.Error
    }
    return users, nil
}

func (u *UserRepositoryImpl) FindByEmail(email string) (*model.User, error) {
    fmt.Printf("FindByEmail User dbdbaslkfdjalsdkjf")
    var user *model.User
    // err := u.Db.Where("email = ?", email).First(&user).Error
 

	result := u.Db.First(&user, "email = ?", email)


    log.Info().Msg("FindByEmail User RepositoryImpl ")
	fmt.Printf("FindByEmail User existingUser RepositoryImpl result.Error%+v\n ", result.Error)
    fmt.Printf("FindByEmail User existingUser RepositoryImpl result.%+v\n ", result)
    fmt.Printf("FindByEmail User existingUser RepositoryImpl .%+v\n", &user)
    fmt.Printf("FindByEmail User existingUser RepositoryImpl compareeeee%+v\n ", user == nil)

    if result.Error != nil {
        if result.Error.Error() == "record not found" {
            fmt.Printf("result.Error != nilasdfkashdfkahsdkfhasdhfkajsdhfk ")
            return nil, nil
        } else {
            fmt.Printf("result.Error != nilasdfkashdfkahsdkfhasdhfkajsdhfk ")
            return nil, result.Error
        }
    }
    return user, nil
    

}



func (u *UserRepositoryImpl) FindUsersByPage(pageNumber, pageSize int) ([]model.User, error) {
    var users []model.User
    offset := (pageNumber - 1) * pageSize
    result := u.Db.Offset(offset).Limit(pageSize).Find(&users)
    if result.Error != nil {
        return nil, result.Error
    }
    return users, nil
}
// func (u *UserRepositoryImpl) Login( session model.Session) (model.Session, error) {

//     log.Info().Msg("Login user repository")
//     result1 := u.Db.Create(&session)
//     log.Info().Msg("Login user repository 2")
//     fmt.Printf(" user repository login error: %+v\n", result1.Error)
//     if result1.Error != nil {
//         return session, errors.New("invalid email or password");
//     }


//     log.Info().Msg("Login user UserRepositoryImpl 2asfasdf")

//     return  session, nil;
// }
//
// Login attempts to authenticate a user with the given email and password
func (u *UserRepositoryImpl) Login(ctx context.Context, email, password string) (*model.User, error) {
    var user *model.User

    // Use First to retrieve a single user matching the email and password hash
    // result := u.Db.Preload("Orders", "is_paid = f", false).Preload("Orders.OrderItem").First(&user, "email = ?", email)
    result := u.Db.Preload("Orders", "is_paid = ?", false).Preload("Orders.OrderItem").First(&user, "email = ?", email)

    log.Info().Msg("Login User RepositoryImpl asdfasdfasdfsdafasdf")
	fmt.Printf("Login User existingUser RepositoryImpl result.Error%+v\n ", result.Error)
    fmt.Printf("Login User existingUser RepositoryImpl result.%+v\n ", result)
    fmt.Printf("Login User existingUser RepositoryImpl .%+v\n", &user)

    fmt.Println("User found:")
    fmt.Println("Email:", user.Email)
    fmt.Println("Name:", user.Name)
    fmt.Println("Orders:", user.Orders)
    // Handle potential errors
    if result.Error != nil {
        if result.Error.Error() == "record not found" {
            fmt.Printf("result.Error != nil nil nil")
            return nil, nil
        } else {
            fmt.Printf("result.Error != nil nil result.error ")
            return nil, result.Error
        }
    }
    return user, nil


}

//
func (u *UserRepositoryImpl) Register(user model.User) error {
    log.Info().Msg("create user Register repository")
    // Hash password before saving
    // hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    // if err != nil {
    //     return err
    // }
    // user.Password = string(hashedPassword)

    result := u.Db.Save(&user)
    if result.Error != nil {
        return result.Error
    }
    return nil
}