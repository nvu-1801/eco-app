# Test Strategy
## Pyramid
- Unit: cartSlice reducers/selectors.
- Integration: productsApi RTK Query (msw giả lập nếu cần).
- E2E: Playwright (luồng list → search → detail → add to cart → cart).

## Data
- Sử dụng DummyJSON trực tiếp cho E2E, hoặc mock msw khi offline.

## Exit Criteria
- Tất cả AC có test case mapping.
- E2E “happy path” pass ✅.
