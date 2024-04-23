package model

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)
type Product struct {
    gorm.Model
    Name        string
    Price       float32   
    IsFeatured  bool
    IsArchived  bool
    ImageUrl     pq.StringArray `gorm:"type:text[]" json:"imageUrl"`
    CreatedAt string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
    UpdatedAt   string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
	SizeID    int  
	ColorID    int 
    CategoryID    int  
    Category Category  `gorm:"foreignKey:CategoryID"`
    Color Color `gorm:"foreignKey:ColorID"`
    Size    Size `gorm:"foreignKey:SizeID"`
 
    OrderItemID uint
    Description string
    
}

   // Color      Color `gorm:"foreignKey:ColorID"`
    // Category   Category `gorm:"foreignKey:CategoryID"`
    // Size       Size `gorm:"foreignKey:SizeID"`
// type Product struct {
// 	Id          int    `gorm:"type:uuid;primary_key"`

// 	Name        string
// 	Price       float64   // Assuming Price is a float
// 	IsFeatured  bool
// 	IsArchived  bool
// 	ImageUrl     pq.StringArray `gorm:"type:text[]" json:"imageUrl"`
// 	OrderItem  []OrderItem `gorm:"foreignKey:OrderId"`
// 	CreatedAt string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
// 	UpdatedAt   string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
// 	CategoryId  int       // Assuming the Category ID is an integer
// 	Category    Category  `gorm:"foreignKey:CategoryId"`
// 	SizeId      int       // Assuming the Size ID is an integer
// 	Size        Size      `gorm:"foreignKey:SizeId"`
// 	ColorId     int       // Assuming the Color ID is an integer
// 	Color       Color     `gorm:"foreignKey:ColorId"`

// }



// package model

// type Product struct {
// 	ID          string `gorm:"type:uuid;primary_key"`
// 	Name        string
// 	Price       float64
// 	IsFeatured  bool
// 	IsArchived  bool
// 	ImageUrl    pq.StringArray `gorm:"type:text[]" json:"imageUrl"`
// 	OrderItems  []OrderItem // Slice to represent the one-to-many relationship
// 	CreatedAt   string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
// 	UpdatedAt   string `gorm:"type:varchar(19);default:to_char(now(), 'YYYY-MM-DD HH24:MI:SS')"`
// 	CategoryId  int // Assuming the Category ID is an integer
// 	Category    Category // Define the relationship
// 	SizeId      int // Assuming the Size ID is an integer
// 	Size        Size // Define the relationship
// 	ColorId     int // Assuming the Color ID is an integer
// 	Color       Color // Define the relationship
// }

