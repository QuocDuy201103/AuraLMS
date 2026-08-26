# ⚙️ Kiến Trúc Kỹ Thuật Hệ Thống AuraLMS

AuraLMS được xây dựng theo mô hình **Single Page Application (SPA)** thuần túy chạy hoàn toàn ở phía client (Client-side architecture), giúp tối ưu hóa hiệu năng, giảm thiểu chi phí máy chủ và có tốc độ phản hồi cực nhanh (131ms).

```mermaid
graph TD
    subgraph UI_Layer [Tầng Giao Diện - HTML5/CSS3]
        A["index.html (Semantic Structure)"]
        B["styles.css (Glassmorphism, Cyberpunk Dark Mode, CSS Variables)"]
    end

    subgraph Core_Logic_Layer [Tầng Nghiệp Vụ - Javascript ES6 Modules]
        C["main.js (Main Controller / Routing / DOM Event Handling)"]
        D["state.js (Reactive State Management / LocalStorage Sync)"]
        E["mockData.js (Database giả lập cho Học viên, Bài học, Bài tập)"]
    end

    subgraph Component_Layer [Tầng Thành Phần - Components]
        F["dashboard.js (Bảng điều khiển Học viên & Giáo viên)"]
        G["roadmap.js (Bản đồ lộ trình SVG thích ứng động)"]
        H["grading.js (Trình chấm điểm Rubrics & AI Feedback Assistant)"]
        I["companion.js (Trợ lý ảo AI thích ứng đa tính cách)"]
        J["analytics.js (Trực quan hóa biểu đồ Radar & Trend qua Chart.js)"]
    end

    subgraph External_Libraries [Thư viện Ngoại vi - CDN]
        K["Chart.js (CDN)"]
        L["Canvas-confetti (CDN)"]
    end

    %% Mối quan hệ giữa các thành phần
    A --> C
    B --> A
    C --> D
    D --> E
    
    C --> F
    C --> G
    C --> H
    C --> I
    C --> J
    
    J --> K
    F --> L
    H --> L
```

### Chi tiết các tệp nguồn chính:
- **[index.html](file:///d:/code/GFT/TrackA/index.html)**: Cấu trúc trang SPA chính, bao gồm sidebar điều hướng, header thanh chọn vai trò/học viên, các vùng chứa nội dung (panels), modal hiển thị bài giảng, và các thẻ `<canvas>` dùng cho biểu đồ. Nạp các thư viện ngoài qua CDN.
- **[styles.css](file:///d:/code/GFT/TrackA/src/css/styles.css)**: Hệ thống kiểu dáng CSS tùy chỉnh hoàn toàn (Vanilla CSS). Sử dụng các biến CSS Variables cấu hình tông màu thích ứng cho từng nhóm học sinh. Thiết kế theo phong cách Glassmorphism (`backdrop-filter: blur(14px)`) và Cyberpunk tối giản hiện đại.
- **[state.js](file:///d:/code/GFT/TrackA/src/js/state.js)**: Chứa lớp quản lý trạng thái tập trung `StateManager`. Cung cấp cơ chế đăng ký lắng nghe sự thay đổi (Reactive State/Pub-Sub pattern), tự động lưu trữ và đồng bộ hóa trạng thái hiện tại xuống `LocalStorage` (tránh mất dữ liệu khi F5 trang).
- **[mockData.js](file:///d:/code/GFT/TrackA/src/js/mockData.js)**: Lưu trữ dữ liệu cấu trúc bài giảng, câu hỏi tự luận, các tiêu chí đánh giá chi tiết (rubrics) và thông tin cơ sở dữ liệu mẫu của học viên.
- **[main.js](file:///d:/code/GFT/TrackA/src/js/main.js)**: Trình điều phối luồng chính (Main Controller). Lắng nghe tương tác của người dùng (chuyển vai trò học viên/giáo viên, chọn học sinh, click menu), kích hoạt các hàm render tương ứng của các component và xử lý nộp bài tập.
