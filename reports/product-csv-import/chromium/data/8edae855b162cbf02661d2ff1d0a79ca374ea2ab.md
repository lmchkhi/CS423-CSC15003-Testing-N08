# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-csv-import.spec.mjs >> FR-16 - Import sản phẩm từ CSV >> TC-CSV-003: Giữ nguyên trường có dấu phẩy theo RFC 4180
- Location: tests/e2e/product-csv-import.spec.mjs:48:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Mỏng, nhẹ và bền"
Received: "\"Mỏng"
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "EShop Admin" [level=1] [ref=e5]
    - list [ref=e6]:
      - listitem [ref=e7] [cursor=pointer]: Dashboard
      - listitem [ref=e8] [cursor=pointer]: Danh mục
      - listitem [ref=e9] [cursor=pointer]: Sản phẩm
      - listitem [ref=e10] [cursor=pointer]: Mã Giảm Giá
      - listitem [ref=e11] [cursor=pointer]: Đơn hàng
      - listitem [ref=e12] [cursor=pointer]: Người dùng
      - listitem [ref=e13] [cursor=pointer]: Đăng xuất
  - generic [ref=e15]:
    - heading "Quản lý Sản phẩm" [level=2] [ref=e16]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "📂 Import sản phẩm từ CSV" [level=3] [ref=e19]
        - link "Tải file mẫu (template.csv)" [ref=e20] [cursor=pointer]:
          - /url: data:text/csv;charset=utf-8,…
      - generic [ref=e21]:
        - button "Choose File" [ref=e22]
        - button "Import 1 sản phẩm" [ref=e23] [cursor=pointer]
      - paragraph [ref=e25]: "✅ Import hoàn tất: 1/1 sản phẩm được thêm"
    - generic [ref=e26]:
      - heading "Thêm sản phẩm mới" [level=3] [ref=e27]
      - generic [ref=e28]:
        - textbox "Tên sản phẩm" [ref=e29]
        - spinbutton "Giá tiền" [ref=e30]
        - textbox "URL Ảnh" [ref=e31]
        - textbox "Mô tả" [ref=e32]
        - combobox [ref=e33]:
          - option "Điện thoại" [selected]
          - option "Laptop"
          - option "Phụ kiện"
      - button "Lưu sản phẩm" [ref=e34] [cursor=pointer]
    - table [ref=e35]:
      - rowgroup [ref=e36]:
        - row [ref=e37]:
          - columnheader "Ảnh" [ref=e38]
          - columnheader "Tên SP" [ref=e39]
          - columnheader "Giá" [ref=e40]
          - columnheader "Hành động" [ref=e41]
      - rowgroup [ref=e42]:
        - row [ref=e43]:
          - cell [ref=e44]:
            - img "iPhone 15 Pro Max" [ref=e45]
          - cell "iPhone 15 Pro Max" [ref=e46]
          - cell "30000000 ₫" [ref=e47]
          - cell [ref=e48]:
            - button "Sửa" [ref=e49] [cursor=pointer]
            - button "Xóa" [ref=e50] [cursor=pointer]
        - row [ref=e51]:
          - cell [ref=e52]:
            - img "Samsung Galaxy S24 Ultra" [ref=e53]
          - cell "Samsung Galaxy S24 Ultra" [ref=e54]
          - cell "28000000 ₫" [ref=e55]
          - cell [ref=e56]:
            - button "Sửa" [ref=e57] [cursor=pointer]
            - button "Xóa" [ref=e58] [cursor=pointer]
        - row [ref=e59]:
          - cell [ref=e60]:
            - img "MacBook Pro M3" [ref=e61]
          - cell "MacBook Pro M3" [ref=e62]
          - cell "45000000 ₫" [ref=e63]
          - cell [ref=e64]:
            - button "Sửa" [ref=e65] [cursor=pointer]
            - button "Xóa" [ref=e66] [cursor=pointer]
        - row [ref=e67]:
          - cell [ref=e68]:
            - img "Tai nghe AirPods Pro 2" [ref=e69]
          - cell "Tai nghe AirPods Pro 2" [ref=e70]
          - cell "6000000 ₫" [ref=e71]
          - cell [ref=e72]:
            - button "Sửa" [ref=e73] [cursor=pointer]
            - button "Xóa" [ref=e74] [cursor=pointer]
        - row [ref=e75]:
          - cell [ref=e76]:
            - img "Bàn phím cơ Keychron Q1" [ref=e77]
          - cell "Bàn phím cơ Keychron Q1" [ref=e78]
          - cell "4000000 ₫" [ref=e79]
          - cell [ref=e80]:
            - button "Sửa" [ref=e81] [cursor=pointer]
            - button "Xóa" [ref=e82] [cursor=pointer]
        - row [ref=e83]:
          - cell [ref=e84]:
            - img "FR16-1786194185976-82397-Quoted" [ref=e85]
          - cell "FR16-1786194185976-82397-Quoted" [ref=e86]
          - cell "350000 ₫" [ref=e87]
          - cell [ref=e88]:
            - button "Sửa" [ref=e89] [cursor=pointer]
            - button "Xóa" [ref=e90] [cursor=pointer]
```

# Test source

```ts
  20  |   const response = await request.post(`${apiBaseURL}/api/login`, {
  21  |     data: {
  22  |       email: process.env.ADMIN_EMAIL ?? 'admin@eshop.com',
  23  |       password: process.env.ADMIN_PASSWORD ?? 'Admin123!',
  24  |     },
  25  |   });
  26  |   expect(response.status()).toBe(200);
  27  |   const body = await response.json();
  28  |   expect(body.user.role).toBe('admin');
  29  |   return body.token;
  30  | }
  31  | 
  32  | async function productsByNames(request, names) {
  33  |   const response = await request.get(`${apiBaseURL}/api/products`);
  34  |   expect(response.ok()).toBe(true);
  35  |   const products = await response.json();
  36  |   return products.filter((product) => names.includes(product.name));
  37  | }
  38  | 
  39  | async function productIds(request) {
  40  |   const response = await request.get(`${apiBaseURL}/api/products`);
  41  |   expect(response.ok()).toBe(true);
  42  |   const products = await response.json();
  43  |   return products.map((product) => product.id).sort((a, b) => a - b);
  44  | }
  45  | 
  46  | test.describe('FR-16 - Import sản phẩm từ CSV', () => {
  47  |   for (const sourceCase of data.cases) {
  48  |     test(`${sourceCase.id}: ${sourceCase.title}`, async ({ page, request }) => {
  49  |       const testCase = resolveCase(sourceCase);
  50  |       const names = testCase.expectedNames ?? [];
  51  |       const token = await loginAsAdmin(request);
  52  |       const csvImport = new ProductCsvImportPage(page);
  53  |       const checksWholeDatabase = ['invalidExtension', 'invalidHeader'].includes(testCase.scenario);
  54  |       const productIdsBefore = checksWholeDatabase ? await productIds(request) : null;
  55  | 
  56  |       await test.step('Bảo đảm dữ liệu thử chưa tồn tại', async () => {
  57  |         expect(await productsByNames(request, names)).toHaveLength(0);
  58  |       });
  59  | 
  60  |       await csvImport.gotoWithAdminToken(token);
  61  |       await csvImport.upload(testCase);
  62  | 
  63  |       if (testCase.scenario === 'invalidExtension') {
  64  |         const extensionError = page.getByText(
  65  |           /chỉ.*(?:\.csv|csv)|file.*(?:không hợp lệ|sai định dạng)|(?:đuôi|định dạng).*csv/i,
  66  |         );
  67  |         const rejectionState = async () => {
  68  |           if (await csvImport.fileInput.inputValue() === '') return 'rejected';
  69  |           if (await extensionError.first().isVisible().catch(() => false)) return 'rejected';
  70  |           if (await csvImport.importButton.count() === 1 && await csvImport.importButton.isEnabled()) {
  71  |             return 'accepted';
  72  |           }
  73  |           return 'pending';
  74  |         };
  75  | 
  76  |         await expect.poll(rejectionState).not.toBe('pending');
  77  |         expect(await rejectionState()).toBe('rejected');
  78  |         expect(await productIds(request)).toEqual(productIdsBefore);
  79  |         return;
  80  |       }
  81  | 
  82  |       if (testCase.scenario === 'noRows') {
  83  |         await expect(csvImport.previewLabel).toHaveCount(testCase.expectedPreviewRows);
  84  |         await expect(csvImport.importButton).toBeDisabled();
  85  |         await expect(csvImport.importButton).toHaveText('Import 0 sản phẩm');
  86  |         return;
  87  |       }
  88  | 
  89  |       if (testCase.scenario === 'invalidHeader') {
  90  |         const errorPattern = new RegExp(testCase.expectedErrorPattern, 'i');
  91  |         const headerError = page
  92  |           .locator('[role="alert"], .bg-red-100, .text-red-600, .text-red-700')
  93  |           .filter({ hasText: errorPattern });
  94  |         const parsingState = async () => {
  95  |           if (await headerError.first().isVisible().catch(() => false)) return 'rejected';
  96  |           if (await csvImport.previewLabel.count() > 0) return 'parsed';
  97  |           return 'pending';
  98  |         };
  99  | 
  100 |         await expect.poll(parsingState).not.toBe('pending');
  101 | 
  102 |         if (await parsingState() === 'parsed') {
  103 |           await expect(csvImport.importButton).toBeEnabled();
  104 |           await csvImport.importButton.click();
  105 |           await expect(csvImport.result).toBeVisible();
  106 |           await expect(csvImport.result).toContainText(errorPattern);
  107 |         }
  108 | 
  109 |         expect(await productIds(request)).toEqual(productIdsBefore);
  110 |         return;
  111 |       }
  112 | 
  113 |       await expect(csvImport.previewLabel).toBeVisible();
  114 | 
  115 |       if (testCase.scenario === 'quotedComma') {
  116 |         const requestPromise = page.waitForRequest((outgoing) =>
  117 |           outgoing.url().endsWith('/api/admin/import-products') && outgoing.method() === 'POST');
  118 |         await csvImport.importButton.click();
  119 |         const outgoing = await requestPromise;
> 120 |         expect(outgoing.postDataJSON().products[0].description).toBe(testCase.expectedDescription);
      |                                                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  121 |         await expect(csvImport.result).toContainText(`${testCase.expectedInserted}/${testCase.expectedInserted}`);
  122 |         await expect(csvImport.productName(names[0])).toBeVisible();
  123 |         return;
  124 |       }
  125 | 
  126 |       await csvImport.importButton.click();
  127 |       await expect(csvImport.result).toBeVisible();
  128 | 
  129 |       if (testCase.scenario === 'success') {
  130 |         await expect(csvImport.result).toContainText(`${testCase.expectedInserted}/${testCase.expectedInserted}`);
  131 |         for (const name of names) {
  132 |           await expect(csvImport.productName(name)).toBeVisible();
  133 |         }
  134 |         expect(await productsByNames(request, names)).toHaveLength(testCase.expectedInserted);
  135 |         return;
  136 |       }
  137 | 
  138 |       if (testCase.scenario === 'validationRollback') {
  139 |         const resultText = await csvImport.result.innerText();
  140 |         expect.soft(resultText).toMatch(new RegExp(testCase.expectedErrorPattern, 'i'));
  141 |         expect.soft(resultText).toMatch(new RegExp(`0\\s*(?:/|dòng thành công).*${testCase.expectedErrorRows}`, 'i'));
  142 |         expect.soft(await productsByNames(request, names)).toHaveLength(0);
  143 |         return;
  144 |       }
  145 | 
  146 |       if (testCase.scenario === 'errorReport') {
  147 |         await expect(csvImport.result).toContainText(new RegExp(testCase.expectedErrorPattern, 'i'));
  148 |         await expect(csvImport.result).toContainText(`${testCase.expectedInserted}/1`);
  149 |         await expect(csvImport.result.locator('li')).toHaveCount(testCase.expectedErrorRows);
  150 |         expect(await productsByNames(request, names)).toHaveLength(0);
  151 |       }
  152 |     });
  153 | 
  154 |   }
  155 | 
  156 |   test.afterEach(async ({ request }) => {
  157 |     const response = await request.get(`${apiBaseURL}/api/products`);
  158 |     if (!response.ok()) return;
  159 |     const products = await response.json();
  160 |     for (const product of products.filter((item) => item.name?.startsWith(`FR16-${runId}`))) {
  161 |       await request.delete(`${apiBaseURL}/api/products/${product.id}`);
  162 |     }
  163 |   });
  164 | });
  165 | 
```