# FR-08 Phase A — UI observations

- Observed Admin UI: `http://localhost:5174`
- Browser: installed Microsoft Edge, headless
- Credentials and tokens are omitted.

## Observed locators and flow

- Admin login form rendered with heading `Admin Login`.
- Email input: placeholder `Email`, type `text`.
- Password input: placeholder `Password`, type `password`.
- Submit button accessible text: `Login`.
- Login succeeded; dashboard showed `EShop Admin`, menu text including `Đơn hàng`, and total order count `37` at that observation.

## DT-012 limitation

The menu label `Đơn hàng` appeared in rendered `body.innerText`, but it was not exposed as a separate `a`, `button`, exact DOM text node, or exact accessibility node in the attempted observations. DOM, accessibility-tree, and coordinate click attempts did not navigate away from Dashboard. On Dashboard:

- no XSS dialog opened;
- no `<script>` node containing `alert('xss')` was found;
- the literal payload was not visible.

This does not verify rendering on the Orders view. Therefore the UI portion of `DT-012` remains `Không xác định`; only API persistence was confirmed.

