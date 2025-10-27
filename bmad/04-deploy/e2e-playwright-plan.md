# Playwright E2E Plan (web/Expo-web)
Scenarios:
1) List loads paginated → onEndReached fetch → footer loader biến mất.
2) Search "phone" → có kết quả, chuyển trang (skip tăng).
3) Open detail → Add to cart → Cart shows qty & total update.

Command:
- "test:e2e": "playwright test"
Artifacts:
- screenshots/, traces/
