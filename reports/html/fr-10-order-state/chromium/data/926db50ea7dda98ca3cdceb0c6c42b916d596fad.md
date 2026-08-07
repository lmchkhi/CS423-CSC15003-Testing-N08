# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr-10-order-state.spec.ts >> FR-10 — Trạng thái đơn hàng >> F10-TC-009 — Đơn đã hủy là trạng thái kết thúc
- Location: tests/fr-10-order-state.spec.ts:62:9

# Error details

```
Error: state `Đã hủy` must offer exactly the transitions §3 allows

expect(locator).toHaveText(expected) failed

Locator: getByRole('row').filter({ has: getByRole('cell', { name: '#107', exact: true }) }).getByRole('button')
Timeout: 10000ms
- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "Đánh dấu Đã giao",
+ ]

Call log:
  - state `Đã hủy` must offer exactly the transitions §3 allows with timeout 10000ms
  - waiting for getByRole('row').filter({ has: getByRole('cell', { name: '#107', exact: true }) }).getByRole('button')
    23 × locator resolved to 1 element

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic [ref=f1e4]:
    - heading "EShop Admin" [level=1] [ref=f1e5]
    - list [ref=f1e6]:
      - listitem [ref=f1e7] [cursor=pointer]: Dashboard
      - listitem [ref=f1e8] [cursor=pointer]: Danh mục
      - listitem [ref=f1e9] [cursor=pointer]: Sản phẩm
      - listitem [ref=f1e10] [cursor=pointer]: Mã Giảm Giá
      - listitem [ref=f1e11] [cursor=pointer]: Đơn hàng
      - listitem [ref=f1e12] [cursor=pointer]: Người dùng
      - listitem [ref=f1e13] [cursor=pointer]: Đăng xuất
  - generic [ref=f1e15]:
    - heading "Quản lý Đơn hàng" [level=2] [ref=f1e16]
    - table [ref=f1e17]:
      - rowgroup [ref=f1e18]:
        - row [ref=f1e19]:
          - columnheader "ID" [ref=f1e20]
          - columnheader "Người đặt" [ref=f1e21]
          - columnheader "Tổng tiền" [ref=f1e22]
          - columnheader "Địa chỉ" [ref=f1e23]
          - columnheader "Trạng thái" [ref=f1e24]
          - columnheader "Hành động" [ref=f1e25]
      - rowgroup [ref=f1e26]:
        - row [ref=f1e27]:
          - cell "#107" [ref=f1e28]
          - cell "HW04 Automation" [ref=f1e29]
          - cell "30,000,000 ₫" [ref=f1e30]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e31]
          - cell "Đã hủy" [ref=f1e32]
          - cell [ref=f1e33]:
            - button "Đánh dấu Đã giao" [ref=f1e35] [cursor=pointer]
        - row [ref=f1e36]:
          - cell "#106" [ref=f1e37]
          - cell "HW04 Automation" [ref=f1e38]
          - cell "30,000,000 ₫" [ref=f1e39]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e40]
          - cell "Đã giao" [ref=f1e41]
          - cell [ref=f1e42]
        - row [ref=f1e43]:
          - cell "#105" [ref=f1e44]
          - cell "HW04 Automation" [ref=f1e45]
          - cell "30,000,000 ₫" [ref=f1e46]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e47]
          - cell "Đã xác nhận" [ref=f1e48]
          - cell [ref=f1e49]:
            - generic [ref=f1e50]:
              - button "Giao hàng" [ref=f1e51] [cursor=pointer]
              - button "Hủy" [ref=f1e52] [cursor=pointer]
        - row [ref=f1e53]:
          - cell "#104" [ref=f1e54]
          - cell "HW04 Automation" [ref=f1e55]
          - cell "30,000,000 ₫" [ref=f1e56]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e57]
          - cell "Chờ xác nhận" [ref=f1e58]
          - cell [ref=f1e59]:
            - generic [ref=f1e60]:
              - button "Xác nhận" [ref=f1e61] [cursor=pointer]
              - button "Hủy" [ref=f1e62] [cursor=pointer]
        - row [ref=f1e63]:
          - cell "#103" [ref=f1e64]
          - cell "HW04 Automation" [ref=f1e65]
          - cell "30,000,000 ₫" [ref=f1e66]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e67]
          - cell "Đã hủy" [ref=f1e68]
          - cell [ref=f1e69]:
            - button "Đánh dấu Đã giao" [ref=f1e71] [cursor=pointer]
        - row [ref=f1e72]:
          - cell "#102" [ref=f1e73]
          - cell "HW04 Automation" [ref=f1e74]
          - cell "30,000,000 ₫" [ref=f1e75]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e76]
          - cell "Đã hủy" [ref=f1e77]
          - cell [ref=f1e78]:
            - button "Đánh dấu Đã giao" [ref=f1e80] [cursor=pointer]
        - row [ref=f1e81]:
          - cell "#101" [ref=f1e82]
          - cell "HW04 Automation" [ref=f1e83]
          - cell "30,000,000 ₫" [ref=f1e84]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e85]
          - cell "Đã giao" [ref=f1e86]
          - cell [ref=f1e87]
        - row [ref=f1e88]:
          - cell "#100" [ref=f1e89]
          - cell "HW04 Automation" [ref=f1e90]
          - cell "30,000,000 ₫" [ref=f1e91]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e92]
          - cell "Đang giao" [ref=f1e93]
          - cell [ref=f1e94]:
            - button "Hoàn thành" [ref=f1e96] [cursor=pointer]
        - row [ref=f1e97]:
          - cell "#99" [ref=f1e98]
          - cell "HW04 Automation" [ref=f1e99]
          - cell "30,000,000 ₫" [ref=f1e100]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e101]
          - cell "Đã xác nhận" [ref=f1e102]
          - cell [ref=f1e103]:
            - generic [ref=f1e104]:
              - button "Giao hàng" [ref=f1e105] [cursor=pointer]
              - button "Hủy" [ref=f1e106] [cursor=pointer]
        - row [ref=f1e107]:
          - cell "#98" [ref=f1e108]
          - cell "HW04 Automation" [ref=f1e109]
          - cell "30,000,000 ₫" [ref=f1e110]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e111]
          - cell "Chờ xác nhận" [ref=f1e112]
          - cell [ref=f1e113]:
            - generic [ref=f1e114]:
              - button "Xác nhận" [ref=f1e115] [cursor=pointer]
              - button "Hủy" [ref=f1e116] [cursor=pointer]
        - row [ref=f1e117]:
          - cell "#97" [ref=f1e118]
          - cell "HW04 Automation" [ref=f1e119]
          - cell "30,000,000 ₫" [ref=f1e120]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e121]
          - cell "Chờ xác nhận" [ref=f1e122]
          - cell [ref=f1e123]:
            - generic [ref=f1e124]:
              - button "Xác nhận" [ref=f1e125] [cursor=pointer]
              - button "Hủy" [ref=f1e126] [cursor=pointer]
        - row [ref=f1e127]:
          - cell "#96" [ref=f1e128]
          - cell "HW04 Automation" [ref=f1e129]
          - cell "30,000,000 ₫" [ref=f1e130]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e131]
          - cell "Chờ xác nhận" [ref=f1e132]
          - cell [ref=f1e133]:
            - generic [ref=f1e134]:
              - button "Xác nhận" [ref=f1e135] [cursor=pointer]
              - button "Hủy" [ref=f1e136] [cursor=pointer]
        - row [ref=f1e137]:
          - cell "#95" [ref=f1e138]
          - cell "HW04 Automation" [ref=f1e139]
          - cell "30,000,000 ₫" [ref=f1e140]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e141]
          - cell "Chờ xác nhận" [ref=f1e142]
          - cell [ref=f1e143]:
            - generic [ref=f1e144]:
              - button "Xác nhận" [ref=f1e145] [cursor=pointer]
              - button "Hủy" [ref=f1e146] [cursor=pointer]
        - row [ref=f1e147]:
          - cell "#94" [ref=f1e148]
          - cell "HW04 Automation" [ref=f1e149]
          - cell "30,000,000 ₫" [ref=f1e150]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e151]
          - cell "Đã xác nhận" [ref=f1e152]
          - cell [ref=f1e153]:
            - generic [ref=f1e154]:
              - button "Giao hàng" [ref=f1e155] [cursor=pointer]
              - button "Hủy" [ref=f1e156] [cursor=pointer]
        - row [ref=f1e157]:
          - cell "#93" [ref=f1e158]
          - cell "HW04 Automation" [ref=f1e159]
          - cell "30,000,000 ₫" [ref=f1e160]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e161]
          - cell "Đang giao" [ref=f1e162]
          - cell [ref=f1e163]:
            - button "Hoàn thành" [ref=f1e165] [cursor=pointer]
        - row [ref=f1e166]:
          - cell "#92" [ref=f1e167]
          - cell "HW04 Automation" [ref=f1e168]
          - cell "30,000,000 ₫" [ref=f1e169]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e170]
          - cell "Đã hủy" [ref=f1e171]
          - cell [ref=f1e172]:
            - button "Đánh dấu Đã giao" [ref=f1e174] [cursor=pointer]
        - row [ref=f1e175]:
          - cell "#91" [ref=f1e176]
          - cell "HW04 Automation" [ref=f1e177]
          - cell "30,000,000 ₫" [ref=f1e178]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e179]
          - cell "Đã giao" [ref=f1e180]
          - cell [ref=f1e181]
        - row [ref=f1e182]:
          - cell "#90" [ref=f1e183]
          - cell "HW04 Automation" [ref=f1e184]
          - cell "30,000,000 ₫" [ref=f1e185]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e186]
          - cell "Đã xác nhận" [ref=f1e187]
          - cell [ref=f1e188]:
            - generic [ref=f1e189]:
              - button "Giao hàng" [ref=f1e190] [cursor=pointer]
              - button "Hủy" [ref=f1e191] [cursor=pointer]
        - row [ref=f1e192]:
          - cell "#89" [ref=f1e193]
          - cell "HW04 Automation" [ref=f1e194]
          - cell "30,000,000 ₫" [ref=f1e195]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e196]
          - cell "Chờ xác nhận" [ref=f1e197]
          - cell [ref=f1e198]:
            - generic [ref=f1e199]:
              - button "Xác nhận" [ref=f1e200] [cursor=pointer]
              - button "Hủy" [ref=f1e201] [cursor=pointer]
        - row [ref=f1e202]:
          - cell "#88" [ref=f1e203]
          - cell "HW04 Automation" [ref=f1e204]
          - cell "30,000,000 ₫" [ref=f1e205]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e206]
          - cell "Đã hủy" [ref=f1e207]
          - cell [ref=f1e208]:
            - button "Đánh dấu Đã giao" [ref=f1e210] [cursor=pointer]
        - row [ref=f1e211]:
          - cell "#87" [ref=f1e212]
          - cell "HW04 Automation" [ref=f1e213]
          - cell "30,000,000 ₫" [ref=f1e214]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e215]
          - cell "Đã hủy" [ref=f1e216]
          - cell [ref=f1e217]:
            - button "Đánh dấu Đã giao" [ref=f1e219] [cursor=pointer]
        - row [ref=f1e220]:
          - cell "#86" [ref=f1e221]
          - cell "HW04 Automation" [ref=f1e222]
          - cell "30,000,000 ₫" [ref=f1e223]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e224]
          - cell "Đã giao" [ref=f1e225]
          - cell [ref=f1e226]
        - row [ref=f1e227]:
          - cell "#85" [ref=f1e228]
          - cell "HW04 Automation" [ref=f1e229]
          - cell "30,000,000 ₫" [ref=f1e230]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e231]
          - cell "Đang giao" [ref=f1e232]
          - cell [ref=f1e233]:
            - button "Hoàn thành" [ref=f1e235] [cursor=pointer]
        - row [ref=f1e236]:
          - cell "#84" [ref=f1e237]
          - cell "HW04 Automation" [ref=f1e238]
          - cell "30,000,000 ₫" [ref=f1e239]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e240]
          - cell "Đã xác nhận" [ref=f1e241]
          - cell [ref=f1e242]:
            - generic [ref=f1e243]:
              - button "Giao hàng" [ref=f1e244] [cursor=pointer]
              - button "Hủy" [ref=f1e245] [cursor=pointer]
        - row [ref=f1e246]:
          - cell "#83" [ref=f1e247]
          - cell "HW04 Automation" [ref=f1e248]
          - cell "30,000,000 ₫" [ref=f1e249]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e250]
          - cell "Chờ xác nhận" [ref=f1e251]
          - cell [ref=f1e252]:
            - generic [ref=f1e253]:
              - button "Xác nhận" [ref=f1e254] [cursor=pointer]
              - button "Hủy" [ref=f1e255] [cursor=pointer]
        - row [ref=f1e256]:
          - cell "#82" [ref=f1e257]
          - cell "HW04 Automation" [ref=f1e258]
          - cell "30,000,000 ₫" [ref=f1e259]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e260]
          - cell "Chờ xác nhận" [ref=f1e261]
          - cell [ref=f1e262]:
            - generic [ref=f1e263]:
              - button "Xác nhận" [ref=f1e264] [cursor=pointer]
              - button "Hủy" [ref=f1e265] [cursor=pointer]
        - row [ref=f1e266]:
          - cell "#81" [ref=f1e267]
          - cell "HW04 Automation" [ref=f1e268]
          - cell "30,000,000 ₫" [ref=f1e269]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e270]
          - cell "Chờ xác nhận" [ref=f1e271]
          - cell [ref=f1e272]:
            - generic [ref=f1e273]:
              - button "Xác nhận" [ref=f1e274] [cursor=pointer]
              - button "Hủy" [ref=f1e275] [cursor=pointer]
        - row [ref=f1e276]:
          - cell "#80" [ref=f1e277]
          - cell "HW04 Automation" [ref=f1e278]
          - cell "30,000,000 ₫" [ref=f1e279]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e280]
          - cell "Chờ xác nhận" [ref=f1e281]
          - cell [ref=f1e282]:
            - generic [ref=f1e283]:
              - button "Xác nhận" [ref=f1e284] [cursor=pointer]
              - button "Hủy" [ref=f1e285] [cursor=pointer]
        - row [ref=f1e286]:
          - cell "#79" [ref=f1e287]
          - cell "HW04 Automation" [ref=f1e288]
          - cell "30,000,000 ₫" [ref=f1e289]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e290]
          - cell "Chờ xác nhận" [ref=f1e291]
          - cell [ref=f1e292]:
            - generic [ref=f1e293]:
              - button "Xác nhận" [ref=f1e294] [cursor=pointer]
              - button "Hủy" [ref=f1e295] [cursor=pointer]
        - row [ref=f1e296]:
          - cell "#78" [ref=f1e297]
          - cell "HW04 Automation" [ref=f1e298]
          - cell "30,000,000 ₫" [ref=f1e299]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e300]
          - cell "Chờ xác nhận" [ref=f1e301]
          - cell [ref=f1e302]:
            - generic [ref=f1e303]:
              - button "Xác nhận" [ref=f1e304] [cursor=pointer]
              - button "Hủy" [ref=f1e305] [cursor=pointer]
        - row [ref=f1e306]:
          - cell "#77" [ref=f1e307]
          - cell "HW04 Automation" [ref=f1e308]
          - cell "30,000,000 ₫" [ref=f1e309]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e310]
          - cell "Chờ xác nhận" [ref=f1e311]
          - cell [ref=f1e312]:
            - generic [ref=f1e313]:
              - button "Xác nhận" [ref=f1e314] [cursor=pointer]
              - button "Hủy" [ref=f1e315] [cursor=pointer]
        - row [ref=f1e316]:
          - cell "#76" [ref=f1e317]
          - cell "HW04 Automation" [ref=f1e318]
          - cell "30,000,000 ₫" [ref=f1e319]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e320]
          - cell "Chờ xác nhận" [ref=f1e321]
          - cell [ref=f1e322]:
            - generic [ref=f1e323]:
              - button "Xác nhận" [ref=f1e324] [cursor=pointer]
              - button "Hủy" [ref=f1e325] [cursor=pointer]
        - row [ref=f1e326]:
          - cell "#75" [ref=f1e327]
          - cell "HW04 Automation" [ref=f1e328]
          - cell "30,000,000 ₫" [ref=f1e329]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e330]
          - cell "Chờ xác nhận" [ref=f1e331]
          - cell [ref=f1e332]:
            - generic [ref=f1e333]:
              - button "Xác nhận" [ref=f1e334] [cursor=pointer]
              - button "Hủy" [ref=f1e335] [cursor=pointer]
        - row [ref=f1e336]:
          - cell "#74" [ref=f1e337]
          - cell "HW04 Automation" [ref=f1e338]
          - cell "30,000,000 ₫" [ref=f1e339]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e340]
          - cell "Chờ xác nhận" [ref=f1e341]
          - cell [ref=f1e342]:
            - generic [ref=f1e343]:
              - button "Xác nhận" [ref=f1e344] [cursor=pointer]
              - button "Hủy" [ref=f1e345] [cursor=pointer]
        - row [ref=f1e346]:
          - cell "#73" [ref=f1e347]
          - cell "HW04 Automation" [ref=f1e348]
          - cell "30,000,000 ₫" [ref=f1e349]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e350]
          - cell "Chờ xác nhận" [ref=f1e351]
          - cell [ref=f1e352]:
            - generic [ref=f1e353]:
              - button "Xác nhận" [ref=f1e354] [cursor=pointer]
              - button "Hủy" [ref=f1e355] [cursor=pointer]
        - row [ref=f1e356]:
          - cell "#72" [ref=f1e357]
          - cell "HW04 Automation" [ref=f1e358]
          - cell "30,000,000 ₫" [ref=f1e359]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e360]
          - cell "Đã xác nhận" [ref=f1e361]
          - cell [ref=f1e362]:
            - generic [ref=f1e363]:
              - button "Giao hàng" [ref=f1e364] [cursor=pointer]
              - button "Hủy" [ref=f1e365] [cursor=pointer]
        - row [ref=f1e366]:
          - cell "#71" [ref=f1e367]
          - cell "HW04 Automation" [ref=f1e368]
          - cell "30,000,000 ₫" [ref=f1e369]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e370]
          - cell "Đang giao" [ref=f1e371]
          - cell [ref=f1e372]:
            - button "Hoàn thành" [ref=f1e374] [cursor=pointer]
        - row [ref=f1e375]:
          - cell "#70" [ref=f1e376]
          - cell "HW04 Automation" [ref=f1e377]
          - cell "30,000,000 ₫" [ref=f1e378]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e379]
          - cell "Đã hủy" [ref=f1e380]
          - cell [ref=f1e381]:
            - button "Đánh dấu Đã giao" [ref=f1e383] [cursor=pointer]
        - row [ref=f1e384]:
          - cell "#69" [ref=f1e385]
          - cell "HW04 Automation" [ref=f1e386]
          - cell "30,000,000 ₫" [ref=f1e387]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e388]
          - cell "Đã giao" [ref=f1e389]
          - cell [ref=f1e390]
        - row [ref=f1e391]:
          - cell "#68" [ref=f1e392]
          - cell "HW04 Automation" [ref=f1e393]
          - cell "30,000,000 ₫" [ref=f1e394]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e395]
          - cell "Đã xác nhận" [ref=f1e396]
          - cell [ref=f1e397]:
            - generic [ref=f1e398]:
              - button "Giao hàng" [ref=f1e399] [cursor=pointer]
              - button "Hủy" [ref=f1e400] [cursor=pointer]
        - row [ref=f1e401]:
          - cell "#67" [ref=f1e402]
          - cell "HW04 Automation" [ref=f1e403]
          - cell "30,000,000 ₫" [ref=f1e404]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e405]
          - cell "Chờ xác nhận" [ref=f1e406]
          - cell [ref=f1e407]:
            - generic [ref=f1e408]:
              - button "Xác nhận" [ref=f1e409] [cursor=pointer]
              - button "Hủy" [ref=f1e410] [cursor=pointer]
        - row [ref=f1e411]:
          - cell "#66" [ref=f1e412]
          - cell "HW04 Automation" [ref=f1e413]
          - cell "30,000,000 ₫" [ref=f1e414]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e415]
          - cell "Đã hủy" [ref=f1e416]
          - cell [ref=f1e417]:
            - button "Đánh dấu Đã giao" [ref=f1e419] [cursor=pointer]
        - row [ref=f1e420]:
          - cell "#65" [ref=f1e421]
          - cell "HW04 Automation" [ref=f1e422]
          - cell "30,000,000 ₫" [ref=f1e423]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e424]
          - cell "Đã hủy" [ref=f1e425]
          - cell [ref=f1e426]:
            - button "Đánh dấu Đã giao" [ref=f1e428] [cursor=pointer]
        - row [ref=f1e429]:
          - cell "#64" [ref=f1e430]
          - cell "HW04 Automation" [ref=f1e431]
          - cell "30,000,000 ₫" [ref=f1e432]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e433]
          - cell "Đã giao" [ref=f1e434]
          - cell [ref=f1e435]
        - row [ref=f1e436]:
          - cell "#63" [ref=f1e437]
          - cell "HW04 Automation" [ref=f1e438]
          - cell "30,000,000 ₫" [ref=f1e439]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e440]
          - cell "Đang giao" [ref=f1e441]
          - cell [ref=f1e442]:
            - button "Hoàn thành" [ref=f1e444] [cursor=pointer]
        - row [ref=f1e445]:
          - cell "#62" [ref=f1e446]
          - cell "HW04 Automation" [ref=f1e447]
          - cell "30,000,000 ₫" [ref=f1e448]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e449]
          - cell "Đã xác nhận" [ref=f1e450]
          - cell [ref=f1e451]:
            - generic [ref=f1e452]:
              - button "Giao hàng" [ref=f1e453] [cursor=pointer]
              - button "Hủy" [ref=f1e454] [cursor=pointer]
        - row [ref=f1e455]:
          - cell "#61" [ref=f1e456]
          - cell "HW04 Automation" [ref=f1e457]
          - cell "30,000,000 ₫" [ref=f1e458]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e459]
          - cell "Chờ xác nhận" [ref=f1e460]
          - cell [ref=f1e461]:
            - generic [ref=f1e462]:
              - button "Xác nhận" [ref=f1e463] [cursor=pointer]
              - button "Hủy" [ref=f1e464] [cursor=pointer]
        - row [ref=f1e465]:
          - cell "#60" [ref=f1e466]
          - cell "HW04 Automation" [ref=f1e467]
          - cell "30,000,000 ₫" [ref=f1e468]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e469]
          - cell "Chờ xác nhận" [ref=f1e470]
          - cell [ref=f1e471]:
            - generic [ref=f1e472]:
              - button "Xác nhận" [ref=f1e473] [cursor=pointer]
              - button "Hủy" [ref=f1e474] [cursor=pointer]
        - row [ref=f1e475]:
          - cell "#59" [ref=f1e476]
          - cell "HW04 Automation" [ref=f1e477]
          - cell "30,000,000 ₫" [ref=f1e478]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e479]
          - cell "Chờ xác nhận" [ref=f1e480]
          - cell [ref=f1e481]:
            - generic [ref=f1e482]:
              - button "Xác nhận" [ref=f1e483] [cursor=pointer]
              - button "Hủy" [ref=f1e484] [cursor=pointer]
        - row [ref=f1e485]:
          - cell "#58" [ref=f1e486]
          - cell "HW04 Automation" [ref=f1e487]
          - cell "30,000,000 ₫" [ref=f1e488]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e489]
          - cell "Chờ xác nhận" [ref=f1e490]
          - cell [ref=f1e491]:
            - generic [ref=f1e492]:
              - button "Xác nhận" [ref=f1e493] [cursor=pointer]
              - button "Hủy" [ref=f1e494] [cursor=pointer]
        - row [ref=f1e495]:
          - cell "#57" [ref=f1e496]
          - cell "HW04 Automation" [ref=f1e497]
          - cell "30,000,000 ₫" [ref=f1e498]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e499]
          - cell "Đã xác nhận" [ref=f1e500]
          - cell [ref=f1e501]:
            - generic [ref=f1e502]:
              - button "Giao hàng" [ref=f1e503] [cursor=pointer]
              - button "Hủy" [ref=f1e504] [cursor=pointer]
        - row [ref=f1e505]:
          - cell "#56" [ref=f1e506]
          - cell "HW04 Automation" [ref=f1e507]
          - cell "30,000,000 ₫" [ref=f1e508]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e509]
          - cell "Đang giao" [ref=f1e510]
          - cell [ref=f1e511]:
            - button "Hoàn thành" [ref=f1e513] [cursor=pointer]
        - row [ref=f1e514]:
          - cell "#55" [ref=f1e515]
          - cell "HW04 Automation" [ref=f1e516]
          - cell "30,000,000 ₫" [ref=f1e517]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e518]
          - cell "Đã hủy" [ref=f1e519]
          - cell [ref=f1e520]:
            - button "Đánh dấu Đã giao" [ref=f1e522] [cursor=pointer]
        - row [ref=f1e523]:
          - cell "#54" [ref=f1e524]
          - cell "HW04 Automation" [ref=f1e525]
          - cell "30,000,000 ₫" [ref=f1e526]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e527]
          - cell "Đã giao" [ref=f1e528]
          - cell [ref=f1e529]
        - row [ref=f1e530]:
          - cell "#53" [ref=f1e531]
          - cell "HW04 Automation" [ref=f1e532]
          - cell "30,000,000 ₫" [ref=f1e533]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e534]
          - cell "Đã xác nhận" [ref=f1e535]
          - cell [ref=f1e536]:
            - generic [ref=f1e537]:
              - button "Giao hàng" [ref=f1e538] [cursor=pointer]
              - button "Hủy" [ref=f1e539] [cursor=pointer]
        - row [ref=f1e540]:
          - cell "#52" [ref=f1e541]
          - cell "HW04 Automation" [ref=f1e542]
          - cell "30,000,000 ₫" [ref=f1e543]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e544]
          - cell "Chờ xác nhận" [ref=f1e545]
          - cell [ref=f1e546]:
            - generic [ref=f1e547]:
              - button "Xác nhận" [ref=f1e548] [cursor=pointer]
              - button "Hủy" [ref=f1e549] [cursor=pointer]
        - row [ref=f1e550]:
          - cell "#51" [ref=f1e551]
          - cell "HW04 Automation" [ref=f1e552]
          - cell "30,000,000 ₫" [ref=f1e553]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e554]
          - cell "Đã hủy" [ref=f1e555]
          - cell [ref=f1e556]:
            - button "Đánh dấu Đã giao" [ref=f1e558] [cursor=pointer]
        - row [ref=f1e559]:
          - cell "#50" [ref=f1e560]
          - cell "HW04 Automation" [ref=f1e561]
          - cell "30,000,000 ₫" [ref=f1e562]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e563]
          - cell "Đã hủy" [ref=f1e564]
          - cell [ref=f1e565]:
            - button "Đánh dấu Đã giao" [ref=f1e567] [cursor=pointer]
        - row [ref=f1e568]:
          - cell "#49" [ref=f1e569]
          - cell "HW04 Automation" [ref=f1e570]
          - cell "30,000,000 ₫" [ref=f1e571]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e572]
          - cell "Đã giao" [ref=f1e573]
          - cell [ref=f1e574]
        - row [ref=f1e575]:
          - cell "#48" [ref=f1e576]
          - cell "HW04 Automation" [ref=f1e577]
          - cell "30,000,000 ₫" [ref=f1e578]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e579]
          - cell "Đang giao" [ref=f1e580]
          - cell [ref=f1e581]:
            - button "Hoàn thành" [ref=f1e583] [cursor=pointer]
        - row [ref=f1e584]:
          - cell "#47" [ref=f1e585]
          - cell "HW04 Automation" [ref=f1e586]
          - cell "30,000,000 ₫" [ref=f1e587]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e588]
          - cell "Đã xác nhận" [ref=f1e589]
          - cell [ref=f1e590]:
            - generic [ref=f1e591]:
              - button "Giao hàng" [ref=f1e592] [cursor=pointer]
              - button "Hủy" [ref=f1e593] [cursor=pointer]
        - row [ref=f1e594]:
          - cell "#46" [ref=f1e595]
          - cell "HW04 Automation" [ref=f1e596]
          - cell "30,000,000 ₫" [ref=f1e597]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e598]
          - cell "Chờ xác nhận" [ref=f1e599]
          - cell [ref=f1e600]:
            - generic [ref=f1e601]:
              - button "Xác nhận" [ref=f1e602] [cursor=pointer]
              - button "Hủy" [ref=f1e603] [cursor=pointer]
        - row [ref=f1e604]:
          - cell "#45" [ref=f1e605]
          - cell "HW04 Automation" [ref=f1e606]
          - cell "30,000,000 ₫" [ref=f1e607]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e608]
          - cell "Chờ xác nhận" [ref=f1e609]
          - cell [ref=f1e610]:
            - generic [ref=f1e611]:
              - button "Xác nhận" [ref=f1e612] [cursor=pointer]
              - button "Hủy" [ref=f1e613] [cursor=pointer]
        - row [ref=f1e614]:
          - cell "#44" [ref=f1e615]
          - cell "HW04 Automation" [ref=f1e616]
          - cell "30,000,000 ₫" [ref=f1e617]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e618]
          - cell "Chờ xác nhận" [ref=f1e619]
          - cell [ref=f1e620]:
            - generic [ref=f1e621]:
              - button "Xác nhận" [ref=f1e622] [cursor=pointer]
              - button "Hủy" [ref=f1e623] [cursor=pointer]
        - row [ref=f1e624]:
          - cell "#43" [ref=f1e625]
          - cell "HW04 Automation" [ref=f1e626]
          - cell "30,000,000 ₫" [ref=f1e627]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e628]
          - cell "Chờ xác nhận" [ref=f1e629]
          - cell [ref=f1e630]:
            - generic [ref=f1e631]:
              - button "Xác nhận" [ref=f1e632] [cursor=pointer]
              - button "Hủy" [ref=f1e633] [cursor=pointer]
        - row [ref=f1e634]:
          - cell "#42" [ref=f1e635]
          - cell "HW04 Automation" [ref=f1e636]
          - cell "30,000,000 ₫" [ref=f1e637]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e638]
          - cell "Đã xác nhận" [ref=f1e639]
          - cell [ref=f1e640]:
            - generic [ref=f1e641]:
              - button "Giao hàng" [ref=f1e642] [cursor=pointer]
              - button "Hủy" [ref=f1e643] [cursor=pointer]
        - row [ref=f1e644]:
          - cell "#41" [ref=f1e645]
          - cell "HW04 Automation" [ref=f1e646]
          - cell "30,000,000 ₫" [ref=f1e647]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e648]
          - cell "Đang giao" [ref=f1e649]
          - cell [ref=f1e650]:
            - button "Hoàn thành" [ref=f1e652] [cursor=pointer]
        - row [ref=f1e653]:
          - cell "#40" [ref=f1e654]
          - cell "HW04 Automation" [ref=f1e655]
          - cell "30,000,000 ₫" [ref=f1e656]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e657]
          - cell "Đã hủy" [ref=f1e658]
          - cell [ref=f1e659]:
            - button "Đánh dấu Đã giao" [ref=f1e661] [cursor=pointer]
        - row [ref=f1e662]:
          - cell "#39" [ref=f1e663]
          - cell "HW04 Automation" [ref=f1e664]
          - cell "30,000,000 ₫" [ref=f1e665]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e666]
          - cell "Đã giao" [ref=f1e667]
          - cell [ref=f1e668]
        - row [ref=f1e669]:
          - cell "#38" [ref=f1e670]
          - cell "HW04 Automation" [ref=f1e671]
          - cell "30,000,000 ₫" [ref=f1e672]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e673]
          - cell "Đã xác nhận" [ref=f1e674]
          - cell [ref=f1e675]:
            - generic [ref=f1e676]:
              - button "Giao hàng" [ref=f1e677] [cursor=pointer]
              - button "Hủy" [ref=f1e678] [cursor=pointer]
        - row [ref=f1e679]:
          - cell "#37" [ref=f1e680]
          - cell "HW04 Automation" [ref=f1e681]
          - cell "30,000,000 ₫" [ref=f1e682]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e683]
          - cell "Chờ xác nhận" [ref=f1e684]
          - cell [ref=f1e685]:
            - generic [ref=f1e686]:
              - button "Xác nhận" [ref=f1e687] [cursor=pointer]
              - button "Hủy" [ref=f1e688] [cursor=pointer]
        - row [ref=f1e689]:
          - cell "#36" [ref=f1e690]
          - cell "HW04 Automation" [ref=f1e691]
          - cell "30,000,000 ₫" [ref=f1e692]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e693]
          - cell "Đã hủy" [ref=f1e694]
          - cell [ref=f1e695]:
            - button "Đánh dấu Đã giao" [ref=f1e697] [cursor=pointer]
        - row [ref=f1e698]:
          - cell "#35" [ref=f1e699]
          - cell "HW04 Automation" [ref=f1e700]
          - cell "30,000,000 ₫" [ref=f1e701]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e702]
          - cell "Đã hủy" [ref=f1e703]
          - cell [ref=f1e704]:
            - button "Đánh dấu Đã giao" [ref=f1e706] [cursor=pointer]
        - row [ref=f1e707]:
          - cell "#34" [ref=f1e708]
          - cell "HW04 Automation" [ref=f1e709]
          - cell "30,000,000 ₫" [ref=f1e710]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e711]
          - cell "Đã giao" [ref=f1e712]
          - cell [ref=f1e713]
        - row [ref=f1e714]:
          - cell "#33" [ref=f1e715]
          - cell "HW04 Automation" [ref=f1e716]
          - cell "30,000,000 ₫" [ref=f1e717]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e718]
          - cell "Đang giao" [ref=f1e719]
          - cell [ref=f1e720]:
            - button "Hoàn thành" [ref=f1e722] [cursor=pointer]
        - row [ref=f1e723]:
          - cell "#32" [ref=f1e724]
          - cell "HW04 Automation" [ref=f1e725]
          - cell "30,000,000 ₫" [ref=f1e726]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e727]
          - cell "Đã xác nhận" [ref=f1e728]
          - cell [ref=f1e729]:
            - generic [ref=f1e730]:
              - button "Giao hàng" [ref=f1e731] [cursor=pointer]
              - button "Hủy" [ref=f1e732] [cursor=pointer]
        - row [ref=f1e733]:
          - cell "#31" [ref=f1e734]
          - cell "HW04 Automation" [ref=f1e735]
          - cell "30,000,000 ₫" [ref=f1e736]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e737]
          - cell "Đang giao" [ref=f1e738]
          - cell [ref=f1e739]:
            - button "Hoàn thành" [ref=f1e741] [cursor=pointer]
        - row [ref=f1e742]:
          - cell "#30" [ref=f1e743]
          - cell "HW04 Automation" [ref=f1e744]
          - cell "30,000,000 ₫" [ref=f1e745]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e746]
          - cell "Đã hủy" [ref=f1e747]
          - cell [ref=f1e748]:
            - button "Đánh dấu Đã giao" [ref=f1e750] [cursor=pointer]
        - row [ref=f1e751]:
          - cell "#29" [ref=f1e752]
          - cell "HW04 Automation" [ref=f1e753]
          - cell "30,000,000 ₫" [ref=f1e754]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e755]
          - cell "Chờ xác nhận" [ref=f1e756]
          - cell [ref=f1e757]:
            - generic [ref=f1e758]:
              - button "Xác nhận" [ref=f1e759] [cursor=pointer]
              - button "Hủy" [ref=f1e760] [cursor=pointer]
        - row [ref=f1e761]:
          - cell "#28" [ref=f1e762]
          - cell "HW04 Automation" [ref=f1e763]
          - cell "30,000,000 ₫" [ref=f1e764]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e765]
          - cell "Chờ xác nhận" [ref=f1e766]
          - cell [ref=f1e767]:
            - generic [ref=f1e768]:
              - button "Xác nhận" [ref=f1e769] [cursor=pointer]
              - button "Hủy" [ref=f1e770] [cursor=pointer]
        - row [ref=f1e771]:
          - cell "#27" [ref=f1e772]
          - cell "HW04 Automation" [ref=f1e773]
          - cell "30,000,000 ₫" [ref=f1e774]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e775]
          - cell "Chờ xác nhận" [ref=f1e776]
          - cell [ref=f1e777]:
            - generic [ref=f1e778]:
              - button "Xác nhận" [ref=f1e779] [cursor=pointer]
              - button "Hủy" [ref=f1e780] [cursor=pointer]
        - row [ref=f1e781]:
          - cell "#26" [ref=f1e782]
          - cell "HW04 Automation" [ref=f1e783]
          - cell "30,000,000 ₫" [ref=f1e784]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e785]
          - cell "Chờ xác nhận" [ref=f1e786]
          - cell [ref=f1e787]:
            - generic [ref=f1e788]:
              - button "Xác nhận" [ref=f1e789] [cursor=pointer]
              - button "Hủy" [ref=f1e790] [cursor=pointer]
        - row [ref=f1e791]:
          - cell "#25" [ref=f1e792]
          - cell "HW04 Automation" [ref=f1e793]
          - cell "30,000,000 ₫" [ref=f1e794]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e795]
          - cell "Đã xác nhận" [ref=f1e796]
          - cell [ref=f1e797]:
            - generic [ref=f1e798]:
              - button "Giao hàng" [ref=f1e799] [cursor=pointer]
              - button "Hủy" [ref=f1e800] [cursor=pointer]
        - row [ref=f1e801]:
          - cell "#24" [ref=f1e802]
          - cell "HW04 Automation" [ref=f1e803]
          - cell "30,000,000 ₫" [ref=f1e804]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e805]
          - cell "Đang giao" [ref=f1e806]
          - cell [ref=f1e807]:
            - button "Hoàn thành" [ref=f1e809] [cursor=pointer]
        - row [ref=f1e810]:
          - cell "#23" [ref=f1e811]
          - cell "HW04 Automation" [ref=f1e812]
          - cell "30,000,000 ₫" [ref=f1e813]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e814]
          - cell "Đã hủy" [ref=f1e815]
          - cell [ref=f1e816]:
            - button "Đánh dấu Đã giao" [ref=f1e818] [cursor=pointer]
        - row [ref=f1e819]:
          - cell "#22" [ref=f1e820]
          - cell "HW04 Automation" [ref=f1e821]
          - cell "30,000,000 ₫" [ref=f1e822]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e823]
          - cell "Đã giao" [ref=f1e824]
          - cell [ref=f1e825]
        - row [ref=f1e826]:
          - cell "#21" [ref=f1e827]
          - cell "HW04 Automation" [ref=f1e828]
          - cell "30,000,000 ₫" [ref=f1e829]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e830]
          - cell "Đã xác nhận" [ref=f1e831]
          - cell [ref=f1e832]:
            - generic [ref=f1e833]:
              - button "Giao hàng" [ref=f1e834] [cursor=pointer]
              - button "Hủy" [ref=f1e835] [cursor=pointer]
        - row [ref=f1e836]:
          - cell "#20" [ref=f1e837]
          - cell "HW04 Automation" [ref=f1e838]
          - cell "30,000,000 ₫" [ref=f1e839]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e840]
          - cell "Chờ xác nhận" [ref=f1e841]
          - cell [ref=f1e842]:
            - generic [ref=f1e843]:
              - button "Xác nhận" [ref=f1e844] [cursor=pointer]
              - button "Hủy" [ref=f1e845] [cursor=pointer]
        - row [ref=f1e846]:
          - cell "#19" [ref=f1e847]
          - cell "HW04 Automation" [ref=f1e848]
          - cell "30,000,000 ₫" [ref=f1e849]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e850]
          - cell "Đã hủy" [ref=f1e851]
          - cell [ref=f1e852]:
            - button "Đánh dấu Đã giao" [ref=f1e854] [cursor=pointer]
        - row [ref=f1e855]:
          - cell "#18" [ref=f1e856]
          - cell "HW04 Automation" [ref=f1e857]
          - cell "30,000,000 ₫" [ref=f1e858]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e859]
          - cell "Đã hủy" [ref=f1e860]
          - cell [ref=f1e861]:
            - button "Đánh dấu Đã giao" [ref=f1e863] [cursor=pointer]
        - row [ref=f1e864]:
          - cell "#17" [ref=f1e865]
          - cell "HW04 Automation" [ref=f1e866]
          - cell "30,000,000 ₫" [ref=f1e867]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e868]
          - cell "Đã giao" [ref=f1e869]
          - cell [ref=f1e870]
        - row [ref=f1e871]:
          - cell "#16" [ref=f1e872]
          - cell "HW04 Automation" [ref=f1e873]
          - cell "30,000,000 ₫" [ref=f1e874]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e875]
          - cell "Đang giao" [ref=f1e876]
          - cell [ref=f1e877]:
            - button "Hoàn thành" [ref=f1e879] [cursor=pointer]
        - row [ref=f1e880]:
          - cell "#15" [ref=f1e881]
          - cell "HW04 Automation" [ref=f1e882]
          - cell "30,000,000 ₫" [ref=f1e883]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e884]
          - cell "Đã xác nhận" [ref=f1e885]
          - cell [ref=f1e886]:
            - generic [ref=f1e887]:
              - button "Giao hàng" [ref=f1e888] [cursor=pointer]
              - button "Hủy" [ref=f1e889] [cursor=pointer]
        - row [ref=f1e890]:
          - cell "#14" [ref=f1e891]
          - cell "HW04 Automation" [ref=f1e892]
          - cell "30,000,000 ₫" [ref=f1e893]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e894]
          - cell "Chờ xác nhận" [ref=f1e895]
          - cell [ref=f1e896]:
            - generic [ref=f1e897]:
              - button "Xác nhận" [ref=f1e898] [cursor=pointer]
              - button "Hủy" [ref=f1e899] [cursor=pointer]
        - row [ref=f1e900]:
          - cell "#13" [ref=f1e901]
          - cell "HW04 Automation" [ref=f1e902]
          - cell "30,000,000 ₫" [ref=f1e903]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e904]
          - cell "Đã hủy" [ref=f1e905]
          - cell [ref=f1e906]:
            - button "Đánh dấu Đã giao" [ref=f1e908] [cursor=pointer]
        - row [ref=f1e909]:
          - cell "#12" [ref=f1e910]
          - cell "HW04 Automation" [ref=f1e911]
          - cell "30,000,000 ₫" [ref=f1e912]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e913]
          - cell "Đã xác nhận" [ref=f1e914]
          - cell [ref=f1e915]:
            - generic [ref=f1e916]:
              - button "Giao hàng" [ref=f1e917] [cursor=pointer]
              - button "Hủy" [ref=f1e918] [cursor=pointer]
        - row [ref=f1e919]:
          - cell "#11" [ref=f1e920]
          - cell "HW04 Automation" [ref=f1e921]
          - cell "30,000,000 ₫" [ref=f1e922]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e923]
          - cell "Đã hủy" [ref=f1e924]
          - cell [ref=f1e925]:
            - button "Đánh dấu Đã giao" [ref=f1e927] [cursor=pointer]
        - row [ref=f1e928]:
          - cell "#10" [ref=f1e929]
          - cell "HW04 Automation" [ref=f1e930]
          - cell "30,000,000 ₫" [ref=f1e931]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e932]
          - cell "Đã giao" [ref=f1e933]
          - cell [ref=f1e934]
        - row [ref=f1e935]:
          - cell "#9" [ref=f1e936]
          - cell "HW04 Automation" [ref=f1e937]
          - cell "30,000,000 ₫" [ref=f1e938]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e939]
          - cell "Chờ xác nhận" [ref=f1e940]
          - cell [ref=f1e941]:
            - generic [ref=f1e942]:
              - button "Xác nhận" [ref=f1e943] [cursor=pointer]
              - button "Hủy" [ref=f1e944] [cursor=pointer]
        - row [ref=f1e945]:
          - cell "#8" [ref=f1e946]
          - cell "HW04 Automation" [ref=f1e947]
          - cell "30,000,000 ₫" [ref=f1e948]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e949]
          - cell "Đã hủy" [ref=f1e950]
          - cell [ref=f1e951]:
            - button "Đánh dấu Đã giao" [ref=f1e953] [cursor=pointer]
        - row [ref=f1e954]:
          - cell "#7" [ref=f1e955]
          - cell "HW04 Automation" [ref=f1e956]
          - cell "30,000,000 ₫" [ref=f1e957]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e958]
          - cell "Đã giao" [ref=f1e959]
          - cell [ref=f1e960]
        - row [ref=f1e961]:
          - cell "#6" [ref=f1e962]
          - cell "HW04 Automation" [ref=f1e963]
          - cell "30,000,000 ₫" [ref=f1e964]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e965]
          - cell "Đang giao" [ref=f1e966]
          - cell [ref=f1e967]:
            - button "Hoàn thành" [ref=f1e969] [cursor=pointer]
        - row [ref=f1e970]:
          - cell "#5" [ref=f1e971]
          - cell "HW04 Automation" [ref=f1e972]
          - cell "30,000,000 ₫" [ref=f1e973]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e974]
          - cell "Đã xác nhận" [ref=f1e975]
          - cell [ref=f1e976]:
            - generic [ref=f1e977]:
              - button "Giao hàng" [ref=f1e978] [cursor=pointer]
              - button "Hủy" [ref=f1e979] [cursor=pointer]
        - row [ref=f1e980]:
          - cell "#4" [ref=f1e981]
          - cell "HW04 Automation" [ref=f1e982]
          - cell "30,000,000 ₫" [ref=f1e983]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e984]
          - cell "Chờ xác nhận" [ref=f1e985]
          - cell [ref=f1e986]:
            - generic [ref=f1e987]:
              - button "Xác nhận" [ref=f1e988] [cursor=pointer]
              - button "Hủy" [ref=f1e989] [cursor=pointer]
        - row [ref=f1e990]:
          - cell "#3" [ref=f1e991]
          - cell "HW04 Automation" [ref=f1e992]
          - cell "30,000,000 ₫" [ref=f1e993]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e994]
          - cell "Chờ xác nhận" [ref=f1e995]
          - cell [ref=f1e996]:
            - generic [ref=f1e997]:
              - button "Xác nhận" [ref=f1e998] [cursor=pointer]
              - button "Hủy" [ref=f1e999] [cursor=pointer]
        - row [ref=f1e1000]:
          - cell "#2" [ref=f1e1001]
          - cell "HW04 Automation" [ref=f1e1002]
          - cell "30,000,000 ₫" [ref=f1e1003]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e1004]
          - cell "Chờ xác nhận" [ref=f1e1005]
          - cell [ref=f1e1006]:
            - generic [ref=f1e1007]:
              - button "Xác nhận" [ref=f1e1008] [cursor=pointer]
              - button "Hủy" [ref=f1e1009] [cursor=pointer]
        - row [ref=f1e1010]:
          - cell "#1" [ref=f1e1011]
          - cell "HW04 Automation" [ref=f1e1012]
          - cell "30,000,000 ₫" [ref=f1e1013]
          - cell "227 Nguyen Van Cu, Q5, TP.HCM" [ref=f1e1014]
          - cell "Chờ xác nhận" [ref=f1e1015]
          - cell [ref=f1e1016]:
            - generic [ref=f1e1017]:
              - button "Xác nhận" [ref=f1e1018] [cursor=pointer]
              - button "Hủy" [ref=f1e1019] [cursor=pointer]
```

# Test source

```ts
  16  |  *
  17  |  * Every case is read from test-data/fr-10-order-state.cases.json (HW04 §6
  18  |  * forbids inline case data) and the spec dispatches on the record's
  19  |  * `assertion` field, never on its caseId.
  20  |  *
  21  |  * Each case creates its own order and walks it to the starting state through
  22  |  * the admin API. That is setup only — the behaviour under test is always
  23  |  * exercised through the UI, so no case can be disturbed by another's outcome.
  24  |  */
  25  | const cases = loadCases('fr-10-order-state.cases.json', orderStateCaseSchema);
  26  | 
  27  | /** The only status labels §3's five states may render as. */
  28  | const STATUS_LABEL_DOMAIN = [
  29  |   'Chờ xác nhận',
  30  |   'Đã xác nhận',
  31  |   'Đang giao',
  32  |   'Đã giao',
  33  |   'Đã hủy',
  34  | ];
  35  | 
  36  | /** Both order surfaces expose the same vocabulary, so cases can share code. */
  37  | type OrderSurface = AdminOrdersPage | MyOrdersPage;
  38  | 
  39  | function required<T>(value: T | null, field: string, caseId: string): T {
  40  |   if (value === null) {
  41  |     throw new Error(`${caseId}: data record is missing \`${field}\`.`);
  42  |   }
  43  |   return value;
  44  | }
  45  | 
  46  | async function openAdminOrders(page: Page, token: string): Promise<AdminOrdersPage> {
  47  |   await seedAdminToken(page, token);
  48  |   const adminOrders = new AdminOrdersPage(page);
  49  |   await adminOrders.goto();
  50  |   return adminOrders;
  51  | }
  52  | 
  53  | async function openMyOrders(page: Page, token: string): Promise<MyOrdersPage> {
  54  |   await seedUserToken(page, token);
  55  |   const myOrders = new MyOrdersPage(page);
  56  |   await myOrders.goto();
  57  |   return myOrders;
  58  | }
  59  | 
  60  | test.describe('FR-10 — Trạng thái đơn hàng', () => {
  61  |   for (const testCase of cases) {
  62  |     test(`${testCase.caseId} — ${testCase.title}`, async ({
  63  |       page,
  64  |       context,
  65  |       admin,
  66  |     }) => {
  67  |       const { user, orderId } = await createPendingOrder('fr10');
  68  |       for (const status of testCase.setupPath) {
  69  |         await setOrderStatus(admin.token, orderId, status);
  70  |       }
  71  |       const statusLabel = required(
  72  |         testCase.expected.statusLabel,
  73  |         'expected.statusLabel',
  74  |         testCase.caseId,
  75  |       );
  76  | 
  77  |       switch (testCase.assertion) {
  78  |         case 'transition-succeeds': {
  79  |           const surface: OrderSurface =
  80  |             testCase.actor === 'admin'
  81  |               ? await openAdminOrders(page, admin.token)
  82  |               : await openMyOrders(page, user.token);
  83  | 
  84  |           // Pattern 1 — count. The order must appear exactly once before the
  85  |           // case acts, so a miss is reported as a setup failure, not as a
  86  |           // mysterious timeout on the control.
  87  |           await expect(surface.rowFor(orderId)).toHaveCount(1);
  88  | 
  89  |           await surface.activate(
  90  |             orderId,
  91  |             required(testCase.control, 'control', testCase.caseId),
  92  |           );
  93  | 
  94  |           // Pattern 2 — text content. The transition is legal, so the row must
  95  |           // settle on the target state's label.
  96  |           await expect(
  97  |             surface.statusBadge(orderId),
  98  |             'a legal transition must move the order to its target state',
  99  |           ).toHaveText(statusLabel);
  100 |           break;
  101 |         }
  102 | 
  103 |         case 'controls-exactly': {
  104 |           const adminOrders = await openAdminOrders(page, admin.token);
  105 |           await expect(adminOrders.rowFor(orderId)).toHaveCount(1);
  106 |           await expect(adminOrders.statusBadge(orderId)).toHaveText(statusLabel);
  107 | 
  108 |           // Pattern 3 — list equality. The admin app offers one button per
  109 |           // transition it permits, so the button set is the system's own claim
  110 |           // about the outgoing edges of this state. Asserting the exact set
  111 |           // proves both halves of §3 at once: no legal transition is missing,
  112 |           // and no transition outside the diagram is offered.
  113 |           await expect(
  114 |             adminOrders.controlsFor(orderId),
  115 |             `state \`${statusLabel}\` must offer exactly the transitions §3 allows`,
> 116 |           ).toHaveText(
      |             ^ Error: state `Đã hủy` must offer exactly the transitions §3 allows
  117 |             required(testCase.expectedControls, 'expectedControls', testCase.caseId),
  118 |           );
  119 |           break;
  120 |         }
  121 | 
  122 |         case 'control-not-offered': {
  123 |           const myOrders = await openMyOrders(page, user.token);
  124 |           await expect(myOrders.rowFor(orderId)).toHaveCount(1);
  125 |           await expect(myOrders.statusBadge(orderId)).toHaveText(statusLabel);
  126 | 
  127 |           // Pattern 4 — absence. §3 forbids the actor this action entirely, so
  128 |           // the control must not be offered at all.
  129 |           await expect(
  130 |             myOrders.control(
  131 |               orderId,
  132 |               required(testCase.control, 'control', testCase.caseId),
  133 |             ),
  134 |             'the user must not be offered a control §3 forbids them',
  135 |           ).toHaveCount(0);
  136 |           break;
  137 |         }
  138 | 
  139 |         case 'status-labels-in-domain': {
  140 |           const adminOrders = await openAdminOrders(page, admin.token);
  141 |           await expect(adminOrders.rowFor(orderId)).toHaveCount(1);
  142 | 
  143 |           const rendered = await adminOrders.allStatusBadges.allTextContents();
  144 |           const outsideDomain = [...new Set(rendered.map((t) => t.trim()))].filter(
  145 |             (label) => !STATUS_LABEL_DOMAIN.includes(label),
  146 |           );
  147 | 
  148 |           // Pattern 5 — set membership. §3 specifies five states; a label
  149 |           // outside that vocabulary means an order reached a state the spec
  150 |           // does not define.
  151 |           expect(
  152 |             outsideDomain,
  153 |             'no order may show a status outside the five §3 specifies',
  154 |           ).toEqual([]);
  155 |           break;
  156 |         }
  157 | 
  158 |         case 'privileged-transition-refused': {
  159 |           const myOrders = await openMyOrders(page, user.token);
  160 |           await expect(myOrders.statusBadge(orderId)).toHaveText(statusLabel);
  161 | 
  162 |           // Reproduced the way HW02 found it: the request is issued from
  163 |           // inside the shopper's own signed-in browser session, using the very
  164 |           // token the browser holds. The web UI offers no control for this, so
  165 |           // no UI path exists — but the privilege boundary is what §3 (with
  166 |           // FR-12) constrains, and the outcome is still read back from the UI.
  167 |           const probe = await page.evaluate(
  168 |             async ({ apiUrl, id, status }) => {
  169 |               const response = await fetch(
  170 |                 `${apiUrl}/api/admin/orders/${id}/status`,
  171 |                 {
  172 |                   method: 'PUT',
  173 |                   headers: {
  174 |                     'Content-Type': 'application/json',
  175 |                     Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  176 |                   },
  177 |                   body: JSON.stringify({ status }),
  178 |                 },
  179 |               );
  180 |               return { ok: response.ok, status: response.status };
  181 |             },
  182 |             {
  183 |               apiUrl: config.apiUrl,
  184 |               id: orderId,
  185 |               status: required(testCase.targetStatus, 'targetStatus', testCase.caseId),
  186 |             },
  187 |           );
  188 | 
  189 |           expect(
  190 |             probe.ok,
  191 |             'a shopper session must not be able to drive an admin transition',
  192 |           ).toBe(false);
  193 | 
  194 |           await page.reload();
  195 |           await expect(
  196 |             myOrders.statusBadge(orderId),
  197 |             'the order must still be in the state it started from',
  198 |           ).toHaveText(statusLabel);
  199 |           break;
  200 |         }
  201 | 
  202 |         case 'history-requires-login': {
  203 |           // No token is seeded: this page has never been signed in.
  204 |           const myOrders = new MyOrdersPage(page);
  205 |           await myOrders.goto();
  206 | 
  207 |           await expect(myOrders.loginPrompt).toBeVisible();
  208 |           await expect(
  209 |             myOrders.rowFor(orderId),
  210 |             'an anonymous session must not see anyone else’s order',
  211 |           ).toHaveCount(0);
  212 |           await expect(
  213 |             myOrders.control(
  214 |               orderId,
  215 |               required(testCase.control, 'control', testCase.caseId),
  216 |             ),
```