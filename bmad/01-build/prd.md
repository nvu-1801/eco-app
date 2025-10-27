# PRD – E-Commerce Product App
## Problem
Cần ứng dụng duyệt sản phẩm, search, phân trang, xem chi tiết, quản lý giỏ.

## Goals & Non-Goals
- G: List/Search phân trang qua DummyJSON; Cart add/remove/update qty; total realtime.
- N: Auth/checkout thật (ngoại phạm vi).

## Personas & User Stories (ví dụ)
- As a shopper, I can search products so that I quickly find what I need.
- As a shopper, I can add/remove/update quantity in cart to estimate total.

## Acceptance Criteria (AC)
- AC-LIST-01: Khi gõ search, kết quả hiển thị kèm phân trang (limit/skip).
- AC-CART-02: Total price & item count cập nhật realtime khi thay đổi qty.
- AC-DETAIL-03: Detail hiển thị title/price/description/thumbnail.

## Metrics
- TTFF (time-to-first-fetch) trang list < 2s trên 4G trung bình.
- Scroll jank < 3% frame drop (DevTools FPS).
