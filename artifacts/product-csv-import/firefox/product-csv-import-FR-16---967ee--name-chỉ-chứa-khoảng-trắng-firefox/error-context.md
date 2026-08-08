# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-csv-import.spec.mjs >> FR-16 - Import sản phẩm từ CSV >> TC-CSV-007: Rollback khi name chỉ chứa khoảng trắng
- Location: tests/e2e/product-csv-import.spec.mjs:48:5

# Error details

```
Error: expect(received).toMatch(expected)

Expected pattern: /0\s*(?:\/|dòng thành công).*1/i
Received string:  "✅ Import hoàn tất: 1/2 sản phẩm được thêm·
Hàng 3: Thiếu tên sản phẩm"
```

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [{"category_id": 1, "description": "Hợp lệ", "id": 12, "imageUrl": "https://example.com/ok.png", "name": "FR16-1786194214223-82981-BeforeBlank", "price": 150000}]
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
        - button "Import 2 sản phẩm" [ref=e23] [cursor=pointer]
      - generic [ref=e24]:
        - paragraph [ref=e25]: "✅ Import hoàn tất: 1/2 sản phẩm được thêm"
        - list [ref=e26]:
          - listitem [ref=e27]: "Hàng 3: Thiếu tên sản phẩm"
    - generic [ref=e28]:
      - heading "Thêm sản phẩm mới" [level=3] [ref=e29]
      - generic [ref=e30]:
        - textbox "Tên sản phẩm" [ref=e31]
        - spinbutton "Giá tiền" [ref=e32]
        - textbox "URL Ảnh" [ref=e33]
        - textbox "Mô tả" [ref=e34]
        - combobox [ref=e35]:
          - option "Điện thoại" [selected]
          - option "Laptop"
          - option "Phụ kiện"
      - button "Lưu sản phẩm" [ref=e36] [cursor=pointer]
    - table [ref=e37]:
      - rowgroup [ref=e38]:
        - row [ref=e39]:
          - columnheader "Ảnh" [ref=e40]
          - columnheader "Tên SP" [ref=e41]
          - columnheader "Giá" [ref=e42]
          - columnheader "Hành động" [ref=e43]
      - rowgroup [ref=e44]:
        - row [ref=e45]:
          - cell [ref=e46]:
            - img "iPhone 15 Pro Max" [ref=e47]
          - cell "iPhone 15 Pro Max" [ref=e48]
          - cell "30000000 ₫" [ref=e49]
          - cell [ref=e50]:
            - button "Sửa" [ref=e51] [cursor=pointer]
            - button "Xóa" [ref=e52] [cursor=pointer]
        - row [ref=e53]:
          - cell [ref=e54]:
            - img "Samsung Galaxy S24 Ultra" [ref=e55]
          - cell "Samsung Galaxy S24 Ultra" [ref=e56]
          - cell "28000000 ₫" [ref=e57]
          - cell [ref=e58]:
            - button "Sửa" [ref=e59] [cursor=pointer]
            - button "Xóa" [ref=e60] [cursor=pointer]
        - row [ref=e61]:
          - cell [ref=e62]:
            - img "MacBook Pro M3" [ref=e63]
          - cell "MacBook Pro M3" [ref=e64]
          - cell "45000000 ₫" [ref=e65]
          - cell [ref=e66]:
            - button "Sửa" [ref=e67] [cursor=pointer]
            - button "Xóa" [ref=e68] [cursor=pointer]
        - row [ref=e69]:
          - cell [ref=e70]:
            - img "Tai nghe AirPods Pro 2" [ref=e71]
          - cell "Tai nghe AirPods Pro 2" [ref=e72]
          - cell "6000000 ₫" [ref=e73]
          - cell [ref=e74]:
            - button "Sửa" [ref=e75] [cursor=pointer]
            - button "Xóa" [ref=e76] [cursor=pointer]
        - row [ref=e77]:
          - cell [ref=e78]:
            - img "Bàn phím cơ Keychron Q1" [ref=e79]
          - cell "Bàn phím cơ Keychron Q1" [ref=e80]
          - cell "4000000 ₫" [ref=e81]
          - cell [ref=e82]:
            - button "Sửa" [ref=e83] [cursor=pointer]
            - button "Xóa" [ref=e84] [cursor=pointer]
        - row [ref=e85]:
          - cell [ref=e86]:
            - img "FR16-1786194214223-82981-BeforeBlank" [ref=e87]
          - cell "FR16-1786194214223-82981-BeforeBlank" [ref=e88]
          - cell "150000 ₫" [ref=e89]
          - cell [ref=e90]:
            - button "Sửa" [ref=e91] [cursor=pointer]
            - button "Xóa" [ref=e92] [cursor=pointer]
```

# Test source

```ts
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
  120 |         expect(outgoing.postDataJSON().products[0].description).toBe(testCase.expectedDescription);
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
> 142 |         expect.soft(await productsByNames(request, names)).toHaveLength(0);
      |                                                            ^ Error: expect(received).toHaveLength(expected)
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