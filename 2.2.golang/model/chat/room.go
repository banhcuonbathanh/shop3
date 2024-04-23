
package model
import (

	"gorm.io/gorm"

)

type Room struct {
	gorm.Model

	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Clients map[string]*Client `json:"clients"`
}