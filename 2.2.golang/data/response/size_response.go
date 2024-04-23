package response

type SizeResponse struct {
    ID        uint    `json:"id"`
    Name      string `json:"name"`
    Value     string `json:"value"`
    CreatedAt string `json:"created_at"`
}
