# 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ AuraLMS

Yêu cầu môi trường: Cần cài đặt sẵn **Node.js** (Khuyến khích phiên bản >= 18.0.0) và **npm** trên hệ điều hành.

### Bước 1: Di chuyển vào thư mục dự án
Mở terminal tại máy tính của bạn và chuyển đến thư mục gốc của dự án AuraLMS:
```bash
cd TrackA
```

### Bước 2: Cài đặt các thư viện phụ thuộc (Dependencies)
Cài đặt công cụ Vite và các gói phát triển cần thiết:
```bash
npm install
```

### Bước 3: Khởi chạy Máy chủ Thử nghiệm (Local Development Server)
Chạy lệnh khởi tạo dev server:
```bash
npm run dev
```
Sau khi khởi chạy thành công, terminal sẽ cung cấp địa chỉ truy cập cục bộ (mặc định là `http://localhost:5173`). Bạn có thể mở trình duyệt và truy cập địa chỉ này để trải nghiệm các tính năng thích ứng trực tiếp.

### Bước 4: Biên dịch mã nguồn phục vụ Production (Build)
Để đóng gói ứng dụng thành các tệp HTML, CSS, JS tĩnh tối ưu hóa cao:
```bash
npm run build
```
Sản phẩm sau khi biên dịch thành công sẽ được xuất ra thư mục `/dist` tại thư mục gốc của dự án.

### Bước 5: Xem thử bản đóng gói tĩnh (Preview Production Build)
Chạy thử bản dựng chính thức đã được tối ưu hóa trước khi đưa lên môi trường server:
```bash
npm run preview
```
