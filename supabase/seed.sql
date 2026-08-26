-- Seed Data for AuraLMS

-- Insert Students
INSERT INTO public.students (id, name, email, tier, progress, avatar, skills, weekly_study_time, weekly_scores, completed_lessons, unlocked_lessons)
VALUES
(
    'student-vy',
    'Trần Thị Vy',
    'thivy.struggling@auralms.edu.vn',
    'struggling',
    25,
    'TV',
    '{"knowledge": 45, "logic": 40, "presentation": 55, "consistency": 60}'::jsonb,
    ARRAY[30, 45, 40, 50, 45, 60, 70],
    ARRAY[5.0, 5.5, 6.0, 5.8, 6.2, 6.5, 6.8],
    ARRAY['lesson-1'],
    ARRAY['lesson-1', 'lesson-2', 'lesson-2-ref']
),
(
    'student-nam',
    'Nguyễn Văn Nam',
    'vannam.average@auralms.edu.vn',
    'average',
    60,
    'NV',
    '{"knowledge": 70, "logic": 75, "presentation": 65, "consistency": 80}'::jsonb,
    ARRAY[60, 75, 80, 90, 85, 100, 110],
    ARRAY[7.0, 7.2, 7.5, 7.8, 8.0, 8.2, 8.5],
    ARRAY['lesson-1', 'lesson-2'],
    ARRAY['lesson-1', 'lesson-2', 'lesson-3', 'lesson-3-boost']
),
(
    'student-anh',
    'Phạm Hoàng Anh',
    'hoanganh.excellent@auralms.edu.vn',
    'excellent',
    90,
    'PH',
    '{"knowledge": 95, "logic": 98, "presentation": 90, "consistency": 95}'::jsonb,
    ARRAY[90, 120, 110, 130, 140, 150, 160],
    ARRAY[9.0, 9.2, 9.5, 9.6, 9.8, 9.9, 10.0],
    ARRAY['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4-adv'],
    ARRAY['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4-adv', 'lesson-5-proj']
),
(
    'student-long',
    'Lê Hoàng Long',
    'hoanglong@auralms.edu.vn',
    'average',
    50,
    'HL',
    '{"knowledge": 65, "logic": 70, "presentation": 60, "consistency": 75}'::jsonb,
    ARRAY[45, 50, 60, 70, 65, 80, 85],
    ARRAY[6.5, 7.0, 7.2, 7.5, 7.8, 8.0, 8.2],
    ARRAY['lesson-1'],
    ARRAY['lesson-1', 'lesson-2', 'lesson-3']
)
ON CONFLICT (id) DO NOTHING;

-- Insert Lessons
INSERT INTO public.lessons (id, title, description, tier_type, difficulty, time_estimate, parent_lesson_id, order_index, content)
VALUES
(
    'lesson-1',
    'Nhập môn Thuật toán & Tư duy Máy tính',
    'Tổng quan về tư duy thuật toán, các khái niệm biến số, kiểu dữ liệu và luồng thực thi trong lập trình.',
    'core',
    'Dễ',
    '45 phút',
    NULL,
    1.0,
    '<h3>1. Khái niệm Thuật toán</h3><p>Thuật toán là tập hợp các chỉ dẫn rõ ràng, có từng bước để giải quyết một bài toán cụ thể...</p>'
),
(
    'lesson-2',
    'Cấu trúc Điều kiện & Vòng lặp Cơ bản',
    'Nắm vững câu lệnh điều khiển if-else và vòng lặp for/while trong việc tự động hóa xử lý dữ liệu.',
    'core',
    'Trung bình',
    '60 phút',
    'lesson-1',
    2.0,
    '<h3>2. Vòng lặp For & While</h3><p>Vòng lặp cho phép thực hiện lặp đi lặp lại khối lệnh cho đến khi thỏa mãn điều kiện dừng...</p>'
),
(
    'lesson-2-ref',
    'Bổ trợ: Thực hành Vòng lặp Trực quan',
    'Dành riêng cho nhóm Cần hỗ trợ: Luyện tập viết vòng lặp vẽ hình để hiểu rõ cơ chế từng bước thực thi.',
    'refresher',
    'Dễ',
    '30 phút',
    'lesson-2',
    2.5,
    '<h3>Bài tập Bổ trợ Vy</h3><p>Hãy vẽ hình tam giác sao bằng 2 vòng lặp lồng nhau...</p>'
),
(
    'lesson-3',
    'Mảng & Cấu trúc Dữ liệu Tuyến tính',
    'Quản lý danh sách phần tử, tìm kiếm tuyến tính và các thao tác chèn/xóa trong mảng 1 chiều.',
    'core',
    'Trung bình',
    '75 phút',
    'lesson-2',
    3.0,
    '<h3>3. Mảng Động & Tối ưu Bộ nhớ</h3><p>Tìm hiểu cách lưu trữ mảng phần tử liên tiếp trong bộ nhớ RAM...</p>'
),
(
    'lesson-3-boost',
    'Tăng tốc: Tối ưu Thuật toán với Con trỏ đôi',
    'Dành riêng cho nhóm Khá: Áp dụng kỹ thuật Two Pointers để giảm độ phức tạp từ O(N^2) xuống O(N).',
    'boost',
    'Nâng cao',
    '45 phút',
    'lesson-3',
    3.5,
    '<h3>Chuyên sâu Nam</h3><p>Cách áp dụng 2 con trỏ chạy từ 2 đầu mảng để đảo ngược hoặc tìm cặp phần tử...</p>'
),
(
    'lesson-4-adv',
    'Thử thách Chuyên sâu: Thuật toán Đệ quy & Quy hoạch Động',
    'Dành riêng cho nhóm Xuất sắc: Giải quyết các bài toán đệ quy phức tạp và tối ưu hóa không gian bộ nhớ.',
    'advanced',
    'Rất khó',
    '90 phút',
    'lesson-3',
    4.0,
    '<h3>Chuyên sâu Anh</h3><p>Đệ quy nhớ (Memoization) và bảng quy hoạch động Tabulation...</p>'
),
(
    'lesson-5-proj',
    'Đồ án Thực tế: Xây dựng Bộ lọc Dữ liệu Thông minh',
    'Chương cuối tích hợp kiến thức xây dựng ứng dụng thực tế phân tích dữ liệu học tập.',
    'core',
    'Thử thách',
    '120 phút',
    'lesson-4-adv',
    5.0,
    '<h3>Project Cuối khóa</h3><p>Tổng hợp các cấu trúc dữ liệu và giải thuật đã học...</p>'
)
ON CONFLICT (id) DO NOTHING;

-- Insert Assignments
INSERT INTO public.assignments (id, lesson_id, title, type, description, question_text, max_score, rubric)
VALUES
(
    'assign-1',
    'lesson-1',
    'Bài tập Tự luận 1: Tư Duy Máy Tính & Khái Niệm Thuật Toán',
    'essay',
    'Phân tích khái niệm thuật toán và viết các bước thực thi tính tổng dãy số.',
    'Hãy trình bày định nghĩa thuật toán và viết giải thuật tính tổng S = 1 + 2 + ... + N bằng ngôn ngữ tự nhiên.',
    10,
    '{"content_max": 40, "logic_max": 30, "presentation_max": 20, "effort_max": 10}'::jsonb
),
(
    'assign-2',
    'lesson-2',
    'Bài tập Tự luận 2: Phân Tích & Tối Ưu Vòng Lặp Thuật Toán',
    'essay',
    'Viết vòng lặp và xử lý trường hợp lỗi lặp vô tận (Infinite Loop).',
    'Em hãy giải thích tại sao biến i++ lại quan trọng trong vòng lặp for/while và viết mã giả tính tổng số chẵn.',
    10,
    '{"content_max": 40, "logic_max": 30, "presentation_max": 20, "effort_max": 10}'::jsonb
),
(
    'assign-3',
    'lesson-3',
    'Bài tập Tự luận 3: Cấu Trúc Mảng & Kỹ Thuật Con Trỏ Đôi',
    'essay',
    'Áp dụng 2 con trỏ Two Pointers tìm cặp phần tử có tổng bằng K.',
    'Hãy trình bày ý tưởng giải bài toán Two Pointers với độ phức tạp thời gian O(N).',
    10,
    '{"content_max": 40, "logic_max": 30, "presentation_max": 20, "effort_max": 10}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Insert FAQs
INSERT INTO public.faqs (id, category, question, answer, order_index)
VALUES
(
    'faq-1',
    'Lộ trình Thích ứng',
    'AuraLMS điều chỉnh lộ trình học tập cho từng học viên như thế nào?',
    'Hệ thống tự động phân tích điểm số Rubrics và tiến độ của học viên để tự động mở khóa các nhánh bài học bổ trợ (cho nhóm Cần hỗ trợ) hoặc mở khóa sớm các thử thách chuyên sâu nâng cao (cho nhóm Khá/Giỏi).',
    1
),
(
    'faq-2',
    'Trợ lý AI Companion',
    'Trợ lý AI đa tính cách trong AuraLMS hoạt động ra sao?',
    'Mỗi nhóm học sinh (Vy, Nam, Anh) có trợ lý AI với phong cách phản hồi riêng biệt: Vy nhận lời khuyên thân thiện/động viên; Nam nhận gợi ý tối ưu/bứt phá; Anh nhận câu hỏi thách thức tư duy nâng cao.',
    2
),
(
    'faq-3',
    'Rubrics & Đánh giá',
    'Tiêu chí chấm điểm Rubrics 4 thành phần bao gồm những gì?',
    'Rubrics đánh giá minh bạch trên 4 tiêu chí: Nội dung (40%), Lập luận & Logic (30%), Ngôn từ diễn đạt (20%), và Nỗ lực tiến bộ (10%). Điểm nỗ lực khích lệ các học sinh có sự cải thiện vượt bậc.',
    3
),
(
    'faq-4',
    'Thời gian phản hồi',
    'Cam kết thời gian phản hồi (Response Time Promise) là gì?',
    'AuraLMS phản hồi giao diện thích ứng & gợi ý AI chỉ trong 131ms, đồng thời cam kết nhận xét tự luận chi tiết từ giáo viên/AI được hoàn thành trong vòng 24 giờ.',
    4
)
ON CONFLICT (id) DO NOTHING;

-- Insert Users / Accounts for Authentication
INSERT INTO public.users (id, name, email, password, role, avatar, student_id)
VALUES
(
    'user-vy',
    'Trần Thị Vy',
    'thivy.struggling@auralms.edu.vn',
    '123456',
    'student',
    'TV',
    'student-vy'
),
(
    'user-nam',
    'Nguyễn Văn Nam',
    'vannam.average@auralms.edu.vn',
    '123456',
    'student',
    'NV',
    'student-nam'
),
(
    'user-anh',
    'Phạm Hoàng Anh',
    'hoanganh.excellent@auralms.edu.vn',
    '123456',
    'student',
    'PH',
    'student-anh'
),
(
    'user-admin',
    'Quản Trị Viên (Admin)',
    'admin@auralms.edu.vn',
    'admin123',
    'admin',
    'AD',
    NULL
),
(
    'user-minh',
    'Thầy Nguyễn Văn Minh',
    'vanminh.teacher@auralms.edu.vn',
    '123456',
    'teacher',
    'NM',
    NULL
)
ON CONFLICT (id) DO NOTHING;

-- Insert Initial Submissions
INSERT INTO public.submissions (student_id, student_name, student_avatar, tier, assignment_title, submitted_date, student_answer, status, grade, teacher_feedback)
VALUES
(
    'student-vy',
    'Trần Thị Vy',
    'TV',
    'struggling',
    'Bài 2: Phân Tích & Tối Ưu Vòng Lặp Thuật Toán',
    'Hôm nay - 10:15 AM',
    'Em chào cô, em đã viết vòng lặp for từ 1 đến N để tính tổng các phần tử. Nhưng lúc đầu em quên biến i++ nên bị lặp vô tận. Em đã sửa được rồi ạ!',
    'pending',
    6.8,
    NULL
),
(
    'student-nam',
    'Nguyễn Văn Nam',
    'NV',
    'average',
    'Bài 3: Cấu Trúc Mảng & Kỹ Thuật Con Trỏ Đôi (Two Pointers)',
    'Hôm nay - 09:30 AM',
    'Em chào thầy, em đã giải bài toán tìm cặp số có tổng bằng K bằng cách dùng 2 con trỏ left và right. Độ phức tạp đạt O(N) thời gian và O(1) bộ nhớ.',
    'pending',
    8.5,
    NULL
),
(
    'student-anh',
    'Phạm Hoàng Anh',
    'PH',
    'excellent',
    'Bài 4: Đệ Quy Memoization & Quy Hoạch Động Cuộn Biến',
    'Hôm qua - 16:45 PM',
    'Thưa thầy, bài toán Fibonacci đệ quy em đã tối ưu bằng kỹ thuật Memoization và chuyển sang quy hoạch động cuộn biến space O(1) đạt hiệu năng tối đa.',
    'graded',
    10.0,
    'Bài làm xuất sắc! Lập luận chặt chẽ và tối ưu bộ nhớ đạt điểm tối đa.'
)
ON CONFLICT (id) DO NOTHING;
