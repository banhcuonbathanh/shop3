package service

import (
	"context"
	"errors"
	"fmt"
	"golang-crud-gin/data/request"
	"golang-crud-gin/data/response"
	"golang-crud-gin/helper"
	"golang-crud-gin/model"
	blog "golang-crud-gin/model"
	repository "golang-crud-gin/repository/user"

	"github.com/rs/zerolog/log"

	"github.com/go-playground/validator/v10"
	// "github.com/joho/godotenv"
)



type UserServiceImpl struct {
    UserRepository repository.UserRepository
    Validate        *validator.Validate

    // other dependencies or configurations needed
}

func NewUserServiceImpl(userRepository repository.UserRepository, validate *validator.Validate) UserService {
    return &UserServiceImpl{
        UserRepository: userRepository,
        Validate:       validate,
    }
}


func (s *UserServiceImpl) Create(userRequest request.CreateUserRequest) {
    log.Info().Msg("create user service")
    fmt.Printf("createUserRequest service user: %+v\n", userRequest)

    err := s.Validate.Struct(userRequest)
    helper.ErrorPanic(err)

    userModel := model.User{
        Name:            userRequest.Name,
        Email:           userRequest.Email,
        EmailVerified:   userRequest.Email,
        Image:           userRequest.Image,
        Password:  userRequest.HashedPassword,
        FavoriteIds:     "",
        PhoneNumber:     userRequest.PhoneNumber,
        StreetAddress:   userRequest.StreetAddress,
        // Initialize other fields accordingly
        Orders:          []model.Order{},
        Accounts:        []model.Account{},
    
        Posts:           []model.BlogPost{},
        Comments:        []blog.BlogComment{},
    }

    err = s.UserRepository.Save(userModel)
    helper.ErrorPanic(err)
}


func (s *UserServiceImpl) Update(userRequest request.UpdateUserRequest) (*model.User, error) {
    user, err := s.UserRepository.FindByID(userRequest.ID)
    if err != nil {
        newErr := fmt.Errorf("%v: %s", err, "User data could not be retrieved for the given ID from ServiceUser")

		return nil,  newErr
    }

    // Update the user object with new values from userRequest
    user.Name = userRequest.Name
    user.Email = userRequest.Email
    user.EmailVerified = userRequest.Email
    user.Image = userRequest.Image
    user.Password = userRequest.HashedPassword
    user.FavoriteIds = userRequest.FavoriteIds
    user.PhoneNumber = userRequest.PhoneNumber
    user.StreetAddress = userRequest.StreetAddress
    user.Role = userRequest.Role 
    // Update other fields accordingly

    // Save the updated user to the repository
    err = s.UserRepository.Update(user)
    if err != nil {
        // Handle error (e.g., return an error response)
        return nil, fmt.Errorf("failed to update user: %v", err)
    }

    return &user, nil
}


func (s *UserServiceImpl) Delete(userID int) {
    err := s.UserRepository.Delete(userID)
    helper.ErrorPanic(err)
}

func (s *UserServiceImpl) FindByID(userID int) (response.UserResponse, error) {
    userData, err := s.UserRepository.FindByID(userID)
    if err != nil {
        return response.UserResponse{}, err
    }

    userResponse := response.UserResponse{
        ID:             userData.ID,
        Name:           userData.Name,
        Email:          userData.Email,
        HashedPassword: userData.Password,
        EmailVerified:  userData.EmailVerified,
        Image:          userData.Image,
        FavoriteIds:    userData.FavoriteIds,
        PhoneNumber:    userData.PhoneNumber,
        StreetAddress:  userData.StreetAddress,
        Orders:         userData.Orders,
        Accounts:       userData.Accounts,

        Posts:          userData.Posts,
        Comments:       userData.Comments,
    }
    return userResponse, nil
}


func (s *UserServiceImpl) FindAll() ([]response.UserResponse, error) {
    result, err := s.UserRepository.FindAll()
    if err != nil {
        return nil, err
    }

    var users []response.UserResponse
    for _, value := range result {
        user := response.UserResponse{
            ID:             value.ID,
            Name:           value.Name,
            Email:          value.Email,
            HashedPassword: value.Password,
            EmailVerified:  value.EmailVerified,
            Image:          value.Image,
            FavoriteIds:    value.FavoriteIds,
            PhoneNumber:    value.PhoneNumber,
            StreetAddress:  value.StreetAddress,
            Orders:         value.Orders,
            Accounts:       value.Accounts,
     
            Posts:          value.Posts,
            Comments:       value.Comments,
        }
        users = append(users, user)
    }

    return users, nil
}


func (s *UserServiceImpl) FindByEmail(email string) (*model.User, error) {
    // Delegate the actual database interaction to the UserRepositoryImpl
    user, err := s.UserRepository.FindByEmail(email)
    if err != nil {
        // Handle any errors returned by the repository
        return user, err
    }
 
    // Apply any additional service-level logic here, if needed
 
    return user, nil
 }
 

    // userResponse := &response.UserResponse{
    //     ID:             userData.ID,
    //     Name:           userData.Name,
    //     Email:          userData.Email,
    //     HashedPassword: userData.HashedPassword,
    //     EmailVerified:  userData.EmailVerified,
    //     Image:          userData.Image,
    //     FavoriteIds:    userData.FavoriteIds,
    //     PhoneNumber:    userData.PhoneNumber,
    //     StreetAddress:  userData.StreetAddress,
    //     Orders:         userData.Orders,
    //     Accounts:       userData.Accounts,
    //     Sessions:       userData.Sessions,
    //     Posts:          userData.Posts,
    //     Comments:       userData.Comments,
    // }
func (s *UserServiceImpl) FindUsersByPage(pageNumber, pageSize int) ([]response.UserResponse, error) {
    result, err := s.UserRepository.FindUsersByPage(pageNumber, pageSize)
    if err != nil {
        return nil, err
    }

    var users []response.UserResponse
    for _, value := range result {
        user := response.UserResponse{
            ID:             value.ID,
            Name:           value.Name,
            Email:          value.Email,
            HashedPassword: value.Password,
            EmailVerified:  value.EmailVerified,
            Image:          value.Image,
            FavoriteIds:    value.FavoriteIds,
            PhoneNumber:    value.PhoneNumber,
            StreetAddress:  value.StreetAddress,
            Orders:         value.Orders,
            Accounts:       value.Accounts,
    
            Posts:          value.Posts,
            Comments:       value.Comments,
        }
        users = append(users, user)
    }

    return users, nil
}


//



// Register function
func (s *UserServiceImpl) Register(user request.CreateUserRequest) ( bool, error) {
    // Validate user input
    err := s.Validate.Struct(user)
    if err != nil {
        return  false, err
    }
  
    // Check if user already exists
    data, err := s.UserRepository.FindByEmail(user.Email)
    fmt.Printf("Register user service data 3 %+v\n ", data)

	fmt.Printf("Register user service 3:err %+v\n ", err)
    if err != nil {
        fmt.Printf("Register user service err != nil false, err already exit ")
        return  false, errors.New("user already exists")
    }
    // Hash password
    // hashedPassword, err := utils.HashPassword(user.HashedPassword)
    // if err != nil {
    //     return nil, err
    // }

    // Create user
    newUser := model.User{
        // ... set other user fields
        Email:          user.Email,
        Password: user.HashedPassword,
        Name:           user.Name, // replace with actual value

        Image:         user.Image,
        FavoriteIds:    "",
        PhoneNumber:    user.PhoneNumber,
        Role:           "customer",
        Orders:         []model.Order{}, // replace with actual value
        Accounts:       []model.Account{}, // replace with actual value

        Posts:          []model.BlogPost{}, // replace with actual value
        Comments:       []blog.BlogComment{}, // replace with actual value
        Tokens:         []model.Token{}, // replace with actual value
        StreetAddress:  user.StreetAddress, // replace with actual value
    }
    
    err = s.UserRepository.Register(newUser)
    if err != nil {
        return  false, err
    }

    fmt.Printf("Register user service exists false, nil ")

    return  false, nil
}




//-----------------------


// func (s *UserServiceImpl) Login(user request.LoginRequest) (response.LoginUserResponsePaseto,bool ,error) {
// 	log.Info().Msg("Login user service 1")
//     // Find user in the database
//     userData, exists, err := s.UserRepository.FindByEmail(user.Email)
// 	log.Info().Msg("Login user service 2")
// 	fmt.Printf(" service loginRequest:userData %+v\n ", userData)
//     fmt.Printf(" service loginRequest:exists %+v\n ", exists)
//     fmt.Printf(" service loginRequest:err %+v\n ", err)
//     if err != nil {
//         return response.LoginUserResponsePaseto{},false, errors.New( "failed to find user") // Wrap for better error handling
//     }
//     if !exists {
//         return response.LoginUserResponsePaseto{},false, nil // Wrap for better error handling
//     }
// 	log.Info().Msg("Login user service 3")
//     fmt.Printf(" service loginRequest:userData.HashedPassword %+v\n ", userData.HashedPassword)
//     fmt.Printf(" service loginRequest:userData.HashedPassword %+v\n ", user.Password)
//     // Verify password securely

//     log.Info().Msg("Login user service 31")
//     match, err := utils.VerifyPassword(userData.HashedPassword, user.Password);
//     log.Info().Msg("Login user service 32")
//     if err != nil {
//         return response.LoginUserResponsePaseto{},true, errors.New("intenal server problem")
//     }
//     if !match {
//         return response.LoginUserResponsePaseto{},true, errors.New("wrong password")
//     }
// 	log.Info().Msg("Login user service 4")
//     // // Load environment variables for token generation
//     // // tokenSecret := os.Getenv("TOKEN_SECRET")
//     // fmt.Printf(" service loginRequest:tokenSecret %+v\n ",tokenSecret)
//     // log.Info().Msg("Login user service 5")
//     // tokenExpiredIn := os.Getenv("TOKEN_EXPIRED_IN")
//     // fmt.Printf(" service loginRequest:tokenExpiredIn %+v\n ",tokenExpiredIn)
//     // log.Info().Msg("Login user service 6")
//     // if tokenSecret == "" || tokenExpiredIn == "" {
//     //     return response.LoginUserResponsePaseto{}, errors.New("internal server error: missing token configuration")
//     // }
// 	log.Info().Msg("Login user service 7")
//     // Generate access and refresh tokens
//     accessToken,accessPayload,  err := utils.GenerateJWT(*userData)
//     if err != nil {
//         return response.LoginUserResponsePaseto{},true, errors.New( "failed to create access token")
//     }
//     log.Info().Msg("Login user service 8")
//     refreshToken, refreshPayload, err := utils.GenerateRefreshTokenJwt(*userData)
//     if err != nil {
//         return response.LoginUserResponsePaseto{}, true, errors.New( "failed to create refresh token")
//     }
// 	log.Info().Msg("Login user service 9")
//     expires := time.Now().Add(time.Hour * 24)
// expiresString := expires.Format(time.RFC3339)
//     // Create session securely
//     // sessionToken := createSecureSessionToken() // Implement a secure token generation mechanism
//     loginResponse, err := s.UserRepository.Login(model.Session{
//         SessionToken: accessToken,
//         UserID:       userData.ID,  // Use the actual user ID
   

//         Expires:    expiresString, 
//     })
//     log.Info().Msg("Login user service 110")
//     fmt.Printf(" service loginResponse %+v\n ",loginResponse)
//     fmt.Printf(" service loginResponse err %+v\n ",err)
//     if err != nil {
//         return response.LoginUserResponsePaseto{},true, errors.New( "failed to create session")
//     }
// 	log.Info().Msg("Login user service 11")
//     // Create response
//     return response.LoginUserResponsePaseto{
//         SessionId:             loginResponse.ID,
//         AccessToken:           accessToken,
//         RefreshToken:          refreshToken,
//         AccessTokenExpiresAt:  accessPayload.ExpiredAt,
//         RefreshTokenExpiresAt: refreshPayload.ExpiredAt,
//     },true, nil
// }
// -----------------------
func (s *UserServiceImpl) Login(ctx context.Context, email, password string) (*model.User, error) {
    // Retrieve the user from the repository
    user, err := s.UserRepository.Login(ctx, email, password)
    // log.Info().Msg("Login User UserServiceImpl asdfasdfasdfsdafasdf")
	// fmt.Printf("Login User existingUser UserServiceImpl err  %+v\n ", err)
   
    // fmt.Printf("Login User existingUser UserServiceImpl user data.%+v\n", user)
    // fmt.Printf("Login User existingUser UserServiceImpl user data.pass %+v\n", user.Password)
    // fmt.Printf("Login User existingUser UserServiceImpl user password %+v\n", password)
    if err != nil {
        log.Info().Msg("Login User UserServiceImpl err != nil")
        return nil, err
    }
    if user == nil {
        log.Info().Msg("Login User UserServiceImpl user == nil")
        return nil, nil
    }
if(user.Password != password) {
    log.Info().Msg("Login User UserServiceImpl user.Password != password")
    return nil, errors.New("passwords not matched")
}
    // Generate a secure authentication token (replace with your preferred method)

    // Set the authentication token in a cookie or header (context-specific)
    // ...

    return user, nil
}
