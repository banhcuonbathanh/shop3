package response

type BillboardResponse struct {
    ID        uint    `json:"id"`
    Label     string `json:"label"`
    ImageUrl  []string `json:"imageUrl"`
    CreatedAt string `json:"created_at"`
}
