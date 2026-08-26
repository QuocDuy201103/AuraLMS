# ☁️ Hướng Dẫn Triển Khai Lên Vercel (Deployment Guide) AuraLMS

AuraLMS là một SPA tĩnh được đóng gói bằng Vite, do đó nó hoàn toàn tương thích và triển khai cực kỳ dễ dàng trên nền tảng đám mây **Vercel** miễn phí.

### Cách 1: Triển khai trực tiếp qua dòng lệnh (Vercel CLI)
Dành cho lập trình viên muốn triển khai nhanh từ Terminal cục bộ mà không cần đẩy code lên kho GitHub công khai.

1. **Cài đặt Vercel CLI toàn cục**:
   ```bash
   npm install -g vercel
   ```
2. **Đăng nhập vào tài khoản Vercel**:
   ```bash
   vercel login
   ```
   *Lựa chọn đăng nhập bằng Github, Google, Email hoặc các phương thức khác. Hệ thống sẽ mở trình duyệt để xác thực.*
3. **Tiến hành thiết lập và Deploy**:
   Chạy lệnh sau tại thư mục gốc của dự án (`TrackA`):
   ```bash
   vercel
   ```
4. **Trả lời các câu hỏi cấu hình của Vercel CLI**:
   - `Set up and deploy “d:\code\GFT\TrackA”?` -> Nhập `y` (Đồng ý)
   - `Which scope do you want to deploy to?` -> Chọn tài khoản cá nhân của bạn (nhấn Enter)
   - `Link to existing project?` -> Nhập `n` (Không - tạo project mới)
   - `What’s your project’s name?` -> Nhập `auralms` (hoặc nhấn Enter để chọn mặc định)
   - `In which directory is your code located?` -> Nhập `./` (Nhấn Enter)
   - Vercel sẽ tự động phát hiện cấu hình **Vite**:
     `Auto-detected Project Settings (Vite):`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Development Command: `vite`
   - `Want to modify these settings?` -> Nhập `n` (Không cần chỉnh sửa vì Vite đã được cấu hình tối ưu sẵn)
5. **Triển khai lên bản chính thức (Production Deploy)**:
   Sau khi kiểm tra bản Deploy nháp (Preview URL) hoạt động tốt, chạy lệnh sau để triển khai chính thức:
   ```bash
   vercel --prod
   ```
   *Vercel sẽ biên dịch dự án và trả về một đường link URL duy nhất có hậu tố `.vercel.app` để truy cập công cộng.*

### Cách 2: Triển khai tự động thông qua GitHub (Khuyên dùng)
Phương pháp này giúp tự động hóa quá trình deploy (CI/CD). Mỗi khi bạn đẩy mã nguồn mới lên GitHub, Vercel sẽ tự động build và cập nhật trang web.

1. **Tạo Repo trên GitHub**:
   - Truy cập trang GitHub cá nhân của bạn và tạo một repository mới (Ví dụ: `auralms-project`).
2. **Đẩy mã nguồn cục bộ lên repo GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AuraLMS project"
   git branch -M main
   git remote add origin https://github.com/tai-khoan-cua-ban/auralms-project.git
   git push -u origin main
   ```
3. **Triển khai trên trang chủ Vercel**:
   - Truy cập vào trang điều khiển [Vercel Dashboard](https://vercel.com).
   - Nhấn nút **Add New...** -> Chọn **Project**.
   - Tìm kiếm và chọn Repository `auralms-project` từ danh sách tài khoản Github đã liên kết của bạn, nhấn **Import**.
   - Tại trang thiết lập cấu hình:
     - **Framework Preset**: Chọn **Vite** (Vercel tự động phát hiện và chọn sẵn).
     - **Root Directory**: Để mặc định là `./`.
     - **Build and Output Settings**: Đảm bảo lệnh Build là `npm run build` và Output Directory là `dist`.
   - Nhấn nút **Deploy**. Quá trình build sẽ diễn ra trong khoảng 20-30 giây và trang web của bạn sẽ chính thức hoạt động trực tuyến.
