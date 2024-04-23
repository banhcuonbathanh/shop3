package model

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Billboard struct {
    gorm.Model

    Label     string   `gorm:"type:varchar(255)"`
    ImageUrl pq.StringArray `gorm:"type:text[]" json:"imageUrl"`
    CreatedAt string   `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
}


// type Billboard struct {
//     Id        int      `gorm:"type:int;primary_key"`
//     Label     string   `gorm:"type:varchar(255)"`
//     ImageUrl pq.StringArray `gorm:"type:text[]" json:"imageUrl"`
//     CreatedAt string   `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
// }
