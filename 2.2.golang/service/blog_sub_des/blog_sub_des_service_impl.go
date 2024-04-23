package service

import (
	"fmt"
	"golang-crud-gin/data/request"

	blog "golang-crud-gin/model"

	repository "golang-crud-gin/repository/blog_sub_des" // Assuming the repository package is renamed

	"github.com/go-playground/validator/v10"
)

type BlogSubDesServiceImpl struct {
    BlogSubDesRepository repository.BlogSubDesRepository
    Validate              *validator.Validate
}

func NewBlogSubDesServiceImpl(blogSubDesRepository repository.BlogSubDesRepository, validate *validator.Validate) BlogSubDesService {
    return &BlogSubDesServiceImpl{
        BlogSubDesRepository: blogSubDesRepository,
        Validate:              validate,
    }
}
func (s *BlogSubDesServiceImpl) SaveList(request request.CreateListBlogSubDesRequest) ([]blog.BlogSubDes, error) {
    var savedSubDes []blog.BlogSubDes

    fmt.Printf("BlogSubDesServiceImpl SaveList request.BlogSubList %v", request.BlogSubList)
    for _, subDesItem := range request.BlogSubList {
        err := s.Validate.Struct(subDesItem) // Assuming a validation function is available
        if err != nil {
            return nil, fmt.Errorf("failed to validate blog sub des: %w", err)
        }

        subDesModel := blog.BlogSubDes{
            Title:      subDesItem.Title,
            Desc:       subDesItem.Desc,
            ImageUrls:  subDesItem.ImageUrls,

            BlogPostID: subDesItem.BlogPostID,

        }

        err = s.BlogSubDesRepository.Save(subDesModel)
        if err != nil {
            return nil, err
        }

        savedSubDes = append(savedSubDes, subDesModel)
    }

    return savedSubDes, nil
}

// Create implements BlogSubDesService
func (s *BlogSubDesServiceImpl) Create(subDes request.CreateBlogSubDesRequest) error {
    fmt.Printf("createBlogSubDesRequest service subDes: %+v\n", subDes)
    err := s.Validate.Struct(subDes)
    if err != nil {
        return fmt.Errorf("failed to create blog sub des: invalid input information - %w", err)
    }

    subDesModel := blog.BlogSubDes{
   
        Title:      subDes.Title,
        Desc:       subDes.Desc, // Mapping "Description" from request to "Desc" in model
        ImageUrls:  subDes.ImageUrls,  // Mapping "ImageURLs" from request to "ImageUrls" in model
    }

    fmt.Printf("createBlogSubDesRequest service subDesModel: %+v\n", subDesModel)

    err = s.BlogSubDesRepository.Save(subDesModel)
    if err != nil {
        return err
    }

    return nil
}


// Update implements BlogSubDesService
func (s *BlogSubDesServiceImpl) Update(subDes request.UpdateBlogSubDesRequest) error {
    fmt.Printf("updateBlogSubDesRequest service subDes: %+v\n", subDes)
    err := s.Validate.Struct(subDes)
    if err != nil {
        return fmt.Errorf("failed to update blog sub des: invalid input information - %w", err)
    }

    subDesData, err := s.BlogSubDesRepository.FindByID(subDes.ID)
    if err != nil {
        return err
    }

    // Update fields selectively, checking for non-nil values in the request
   


    fmt.Printf("updateBlogSubDesRequest service subDesData: %+v\n", subDesData)

    err = s.BlogSubDesRepository.Update(subDesData)
    if err != nil {
        return err
    }

    return nil
}


// Delete implements BlogSubDesService
func (s *BlogSubDesServiceImpl) Delete(subDesID int) error {
    err := s.BlogSubDesRepository.Delete(subDesID)
    if err != nil {
        return fmt.Errorf("failed to delete blog sub des: %w", err)
    }

    return nil
}

// FindAll implements BlogSubDesService
func (s *BlogSubDesServiceImpl) FindAll() ([]blog.BlogSubDes, error) {
    result, err := s.BlogSubDesRepository.FindAll()
    if err != nil {
        return nil, err
    }

    return result, nil
}

func (s *BlogSubDesServiceImpl) FindByID(subDesID int) (blog.BlogSubDes, error) {
    subDesData, err := s.BlogSubDesRepository.FindByID(subDesID)
    if err != nil {
        return subDesData, err
    }

    return subDesData, nil
}


// FindByName implements BlogSubDesService
func (s *BlogSubDesServiceImpl) FindByName(name string) (blog.BlogSubDes, error) {
    // Assuming you have a BlogSubDesRepository method for finding by name
    subDesData, err := s.BlogSubDesRepository.FindByName(name)
    if err != nil {
        return subDesData, err
    }

    return subDesData, nil
}

// Remove the commented-out FindCategoriesByPage function

