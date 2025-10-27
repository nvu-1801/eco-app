# API Contracts – DummyJSON
- List: GET /products?limit={n}&skip={k}
- Search: GET /products/search?q={q}&limit={n}&skip={k}
- Detail: GET /products/{id}

Response (rút gọn):
{
  "products":[{ "id":1,"title":"...","price":123,"thumbnail":"..." }],
  "total":100,"skip":0,"limit":12
}
