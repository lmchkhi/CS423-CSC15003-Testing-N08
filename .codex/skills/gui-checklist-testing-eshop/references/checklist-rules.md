# Checklist Rules For EShop GUI Blackbox Testing

Use this reference after reading the three root documents.

## Source Priority

1. `SystemRequirementsSpecification.md`: source of truth for correct business and GUI requirements.
2. `GUI_Testing.html`: category taxonomy, GUI checklist method, execution/status conventions, responsive/compatibility/accessibility guidance.
3. `api_specification.md`: observable feature/API capability map for authentication, product, cart, checkout, coupon, orders, and admin operations.

Never inspect implementation directories.

## Category Meanings

- `Visual`: layout, alignment, color, typography, money formatting, one `<h1>`, image ratio, product card presentation.
- `Functional`: navigation, buttons, forms, CRUD flows, cart operations, checkout, coupon application, order actions, role-based access.
- `Validation`: required fields, email/password/phone/quantity/price/category/coupon/CSV validation, confirm password, invalid state messaging.
- `Usability`: clear labels, Vietnamese wording, understandable actions, confirmation dialogs, easy recovery, no confusing totals or statuses.
- `Responsive`: desktop/tablet/mobile viewports, no horizontal overflow, readable tables/cards, visible menus and controls.
- `Compatibility`: same primary flows and layout behavior on supported browsers/devices/OS.
- `Accessibility`: keyboard tab order, focus indicator, input labels, password field type, image alt text, Enter/Space activation, contrast.
- `Feedback`: loading, empty, success, error, toast/badge, step indicator, friendly messages, status colors.

## Screen Map

Use these screen names when applicable:

- `Đăng ký`
- `Đăng nhập`
- `Quên mật khẩu`
- `Đặt lại mật khẩu`
- `Hồ sơ cá nhân`
- `Trang chủ / Danh sách sản phẩm`
- `Chi tiết sản phẩm`
- `Giỏ hàng`
- `Thanh toán`
- `Mã giảm giá`
- `Lịch sử đơn hàng`
- `Chi tiết đơn hàng`
- `Admin - Dashboard`
- `Admin - Quản lý danh mục`
- `Admin - Quản lý sản phẩm`
- `Admin - Import sản phẩm CSV`
- `Admin - Quản lý mã giảm giá`
- `Admin - Quản lý đơn hàng`
- `Admin - Quản lý người dùng`
- `Mobile - Giỏ hàng`
- `Mobile - Thanh toán`
- `Mobile - Mã giảm giá`
- `Mobile - Quên mật khẩu`
- `Mobile - Lịch sử đơn hàng`

## Requirement Anchors

- Authentication: registration needs name, email, strong password, confirm password, unique email, redirect to login; login locks after 3 wrong attempts for 30 seconds; email input uses email validation.
- Forgot/reset password: 2 steps, 6-digit OTP shown in demo, step indicator, return-to-login button, strong new password, confirm password match, OTP tied to requested email.
- Profile: logged-in user can update name, phone, shipping address; phone starts with 0 and has 10-11 digits; email and role are not editable.
- Product list: grid of all products; image, name, formatted VND price; safe search keyword rendering; loading and empty states; exactly one page `<h1>`.
- Product detail: image, name, price, description, category, positive integer quantity, add-to-cart visual feedback.
- Cart: product, unit price, quantity +/- controls, line total, action; duplicate add increases quantity; remove requires confirmation; continue shopping; total label must be "Tổng cộng"; empty cart has illustration and message.
- Checkout: login required; total is calculated automatically and not directly editable; order product list is visible; cart clears after successful checkout.
- Coupon: code exists and active, not expired, total meets minimum, user is logged in, usage count not exceeded; show discount and final amount; invalid cases show suitable errors.
- Orders: user sees only own orders; show order code, date, total, Vietnamese status text with distinct colors; order state machine constraints are visible through allowed/blocked actions.
- Admin: admin-only access; dashboard revenue counts delivered orders only; category/product/coupon CRUD; product import CSV requirements and all-or-nothing validation report; order state management follows state machine; user management does not expose passwords and cannot delete current admin.
- Mobile: cart, checkout, coupon, forgot/reset password, and order history mirror the corresponding web requirements with mobile-appropriate layout and messages.

## Row Writing Pattern

Use this style for `Expected result`:

- "When [actor/action/data/state], [observable UI result]."
- "The screen displays [required visible content/state] and [constraint]."
- "The user cannot [restricted action]; the UI shows [safe message/recovery]."

Good examples:

- `|VAL-001|Đăng ký|Validation|When the user enters a weak password, the form shows a password strength error and does not create the account.||Not Run|`
- `|FDB-001|Trang chủ / Danh sách sản phẩm|Feedback|When products are loading, the screen displays a clear loading state before the product grid appears.||Not Run|`
- `|ACC-001|Giỏ hàng|Accessibility|When navigating with Tab, focus moves from top to bottom and left to right with a visible focus indicator.||Not Run|`

Avoid vague rows such as "Check login works" or "UI looks good."
