package config

import (
	"fmt"
	"golang-crud-gin/helper"
	"os"

	"github.com/rs/zerolog/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	// host     = "localhost"
	// host     = "postgres"
	port     = 5432
	user     = "myuser"
	password = "mypassword"
	dbName   = "mydatabase"
)
var host string

func init() {
	agrdockercompose, exists := os.LookupEnv("DB_HOST")
	if !exists {
		host = "localhost" // default value

		message := "2.2.golang/config/database.go " + host
		log.Info().Msg(message)
	
	} else {

		host = "shop-postgres"

		message := "2.2.golang/config/database.go agrdockercompose agrdockercompose" + agrdockercompose 
		log.Info().Msg(message)

		message2 := "2.2.golang/config/database.go agrdockercompose host" + host 
		log.Info().Msg(message2)
	}
}

func DatabaseConnection() *gorm.DB {
	sqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbName)
	db, err := gorm.Open(postgres.Open(sqlInfo), &gorm.Config{})
	helper.ErrorPanic(err)

	return db
}
