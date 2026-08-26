# 🛠️ Danh Sách Công Cụ, Mô Hình & API AuraLMS

### 1. Danh sách công cụ & Thư viện sử dụng
- **Vite (v5.4.15)**: Công cụ đóng gói (bundler) và máy chủ chạy thử nghiệm siêu nhanh (Hot Module Replacement trong 131ms).
- **Vanilla Javascript & CSS**: Không sử dụng các framework nặng nề như React/Angular hay thư viện CSS như Tailwind, giúp tối đa hóa khả năng tối ưu hóa CSS & JS thủ công và tốc độ tải trang.
- **Chart.js (qua CDN)**: Thư viện hiển thị biểu đồ HTML5 trực quan, vẽ biểu đồ mạng nhện (Radar Chart) năng lực và biểu đồ xu hướng (Line/Bar Chart).
- **Canvas-confetti (qua CDN)**: Tạo hiệu ứng pháo hoa chúc mừng tăng tương tác và hứng thú học tập khi học viên hoàn thành bài học lý thuyết hoặc nộp bài tập.

### 2. Mô hình & Thuật toán Thích ứng (Adaptive Logic)
- **Thuật toán rẽ nhánh lộ trình học tập**:
  - Khi giáo viên chấm bài tập bổ trợ Vòng lặp (`assign-4`) của Vy đạt điểm $\ge 7.0$, hệ thống tự động hoàn thành khóa bổ trợ và mở khóa chương chính tiếp theo ("Mảng & Cấu trúc Dữ liệu").
  - Khi giáo viên chấm bài tập Mảng tăng tốc (`assign-3`) của Nam đạt điểm giỏi $\ge 8.5$, hệ thống tự rẽ thêm nhánh phụ chuyên sâu nâng cao ("Thuật toán Đệ quy nâng cao") - bài học thường chỉ mở cho học sinh xuất sắc - nhằm tạo điều kiện cho Nam bứt phá.
  - Khi Anh đạt điểm xuất sắc $\ge 9.0$ cho bài đệ quy Fibonacci (`assign-2`), bản đồ tự động mở khóa chương cuối Project thực tế.
- **Mô hình Trợ lý ảo AI Companion**:
  - Tích hợp logic hội thoại đa tính cách giả lập trực tiếp trên Client (Simulated AI Agent Engine) với phong cách ngôn từ riêng biệt cho từng đối tượng học sinh.
  - Phân tích từ khóa đầu vào từ học sinh để phản hồi chính xác và phù hợp (Ví dụ: Vy hỏi về vòng lặp sẽ nhận được giải thích trực quan bằng đời sống thực tế và hướng dẫn sửa lỗi lặp vô hạn; Nam nhận mẹo tối ưu và lời khuyên sử dụng Linked List; Anh nhận giải thuật cuộn biến Fibonacci tối ưu hóa không gian bộ nhớ $O(1)$).
- **AI Feedback Assistant**:
  - Tự động sinh phản hồi mẫu từ giáo viên gửi học sinh bằng cách ánh xạ các điểm số Rubrics thành câu nhận xét mang tính cá nhân hóa (động viên Vy, thúc đẩy Nam, thách thức Anh). Giáo viên có thể chỉnh sửa tùy ý nhận xét này trước khi gửi chính thức.
