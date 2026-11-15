# Thrifting 101 — HTML remake

Bản web độc lập của game Thrifting 101, chạy bằng HTML/CSS/JavaScript thuần và sử dụng các asset 3D có sẵn.

## Chạy local

Từ thư mục repo, chạy static server:

```powershell
python -m http.server 4173
```

Mở `http://localhost:4173/`.

Không nên mở trực tiếp bằng `file://` vì browser có thể chặn module Three.js và asset tương đối.

## Deploy GitHub Pages

Repo này đã đặt `index.html` ở root. Khi bật GitHub Pages, chọn:

```text
Deploy from a branch → main → / (root)
```

Three.js được nạp từ CDN nên GitHub Pages cần Internet ở lần chạy đầu.

## Fit workspace và preset quần áo

Trong shop, nhấn **FIT WORKSPACE** để xem từng model quần áo trên Panda hoặc Cvrix. Chỉnh Position offset, Scale multiplier và Rotation theo từng trục; các giá trị được tính tương đối với bước tự căn và cập nhật trực tiếp trên preview. Nhấn **Apply & save** để áp dụng và lưu preset vào trình duyệt. Preset được tự động dùng lại khi món đồ xuất hiện trong game.

**Download preset** xuất toàn bộ transform đã Apply thành `thrifting101-fit-preset.json`. Dùng **Import preset** để nạp JSON trở lại workspace. Preset tách theo nhân vật và ID quần áo.

## Gameplay

- Chọn Panda hoặc Cvrix.
- Kéo từng món áo, quần, giày vào model 3D.
- Giữ chuột trái hoặc phải rồi kéo ngang trên model để xoay nhân vật.
- Hoàn tất 3 lượt để vào photo ending và rating.
- Model được preload theo nhân vật được chọn; menu mở ngay để giảm thời gian chờ.

## Cấu trúc

```text
index.html
game.js
game3d.js
styles.css
Assets/
```

Folder `Assets` trong repo là bản rút gọn chỉ gồm các tài nguyên cần cho bản HTML này.
