import { createClient } from './supabase/client';

export interface Student {
  id: string;
  name: string;
  email: string;
  tier: 'struggling' | 'average' | 'excellent';
  progress: number;
  avatar: string;
  skills: {
    knowledge: number;
    logic: number;
    presentation: number;
    consistency: number;
  };
  weeklyStudyTime: number[];
  weeklyScores: number[];
  completedLessons: string[];
  unlockedLessons: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  tierType: 'core' | 'refresher' | 'advanced' | 'boost';
  difficulty: string;
  timeEstimate: string;
  parentLessonId?: string;
  orderIndex: number;
  content: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  orderIndex: number;
}

export const INITIAL_STUDENTS: Record<string, Student> = {
  'student-vy': {
    id: 'student-vy',
    name: 'Trần Thị Vy',
    email: 'thivy.struggling@auralms.edu.vn',
    tier: 'struggling',
    progress: 25,
    avatar: 'TV',
    skills: { knowledge: 45, logic: 40, presentation: 55, consistency: 60 },
    weeklyStudyTime: [30, 45, 40, 50, 45, 60, 70],
    weeklyScores: [5.0, 5.5, 6.0, 5.8, 6.2, 6.5, 6.8],
    completedLessons: ['lesson-1'],
    unlockedLessons: ['lesson-1', 'lesson-2', 'lesson-2-ref'],
  },
  'student-nam': {
    id: 'student-nam',
    name: 'Nguyễn Văn Nam',
    email: 'vannam.average@auralms.edu.vn',
    tier: 'average',
    progress: 60,
    avatar: 'NV',
    skills: { knowledge: 70, logic: 75, presentation: 65, consistency: 80 },
    weeklyStudyTime: [60, 75, 80, 90, 85, 100, 110],
    weeklyScores: [7.0, 7.2, 7.5, 7.8, 8.0, 8.2, 8.5],
    completedLessons: ['lesson-1', 'lesson-2'],
    unlockedLessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-3-boost'],
  },
  'student-anh': {
    id: 'student-anh',
    name: 'Phạm Hoàng Anh',
    email: 'hoanganh.excellent@auralms.edu.vn',
    tier: 'excellent',
    progress: 90,
    avatar: 'PH',
    skills: { knowledge: 95, logic: 98, presentation: 90, consistency: 95 },
    weeklyStudyTime: [90, 120, 110, 130, 140, 150, 160],
    weeklyScores: [9.0, 9.2, 9.5, 9.6, 9.8, 9.9, 10.0],
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4-adv'],
    unlockedLessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4-adv', 'lesson-5-proj'],
  },
};

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: '1. Nhập môn Thuật toán & Tư duy Máy tính',
    description: 'Tổng quan về tư duy thuật toán, biến số, kiểu dữ liệu và luồng thực thi trong lập trình.',
    tierType: 'core',
    difficulty: 'Dễ',
    timeEstimate: '45 phút',
    orderIndex: 1.0,
    content: '<h3>1. Khái niệm Thuật toán</h3><p>Thuật toán là tập hợp các chỉ dẫn rõ ràng, có từng bước để giải quyết một bài toán cụ thể. Việc nắm vững tư duy chia nhỏ vấn đề sẽ giúp bạn lập trình hiệu quả hơn.</p>',
  },
  {
    id: 'lesson-2',
    title: '2. Cấu trúc Điều kiện & Vòng lặp Cơ bản',
    description: 'Nắm vững câu lệnh điều khiển if-else và vòng lặp for/while trong việc tự động hóa xử lý dữ liệu.',
    tierType: 'core',
    difficulty: 'Trung bình',
    timeEstimate: '60 phút',
    parentLessonId: 'lesson-1',
    orderIndex: 2.0,
    content: '<h3>2. Vòng lặp For & While</h3><p>Vòng lặp cho phép thực hiện lặp đi lặp lại khối lệnh cho đến khi thỏa mãn điều kiện dừng. Hãy chú ý điều kiện lặp vô tận!</p>',
  },
  {
    id: 'lesson-2-ref',
    title: 'Bổ trợ: Thực hành Vòng lặp Trực quan',
    description: 'Dành riêng cho nhóm Cần hỗ trợ: Luyện tập viết vòng lặp vẽ hình để hiểu rõ cơ chế từng bước thực thi.',
    tierType: 'refresher',
    difficulty: 'Dễ',
    timeEstimate: '30 phút',
    parentLessonId: 'lesson-2',
    orderIndex: 2.5,
    content: '<h3>Bài tập Bổ trợ Vy</h3><p>Hướng dẫn từng bước cách sử dụng vòng lặp để vẽ hình tam giác bằng ký tự sao (*). Tự tin thử sức nhé!</p>',
  },
  {
    id: 'lesson-3',
    title: '3. Mảng & Cấu trúc Dữ liệu Tuyến tính',
    description: 'Quản lý danh sách phần tử, tìm kiếm tuyến tính và các thao tác chèn/xóa trong mảng 1 chiều.',
    tierType: 'core',
    difficulty: 'Trung bình',
    timeEstimate: '75 phút',
    parentLessonId: 'lesson-2',
    orderIndex: 3.0,
    content: '<h3>3. Mảng Động & Tối ưu Bộ nhớ</h3><p>Tìm hiểu cách lưu trữ các phần tử liên tiếp trong RAM và độ phức tạp truy xuất O(1).</p>',
  },
  {
    id: 'lesson-3-boost',
    title: 'Tăng tốc: Tối ưu Thuật toán với Con trỏ đôi',
    description: 'Dành riêng cho nhóm Khá: Áp dụng kỹ thuật Two Pointers để giảm độ phức tạp từ O(N^2) xuống O(N).',
    tierType: 'boost',
    difficulty: 'Nâng cao',
    timeEstimate: '45 phút',
    parentLessonId: 'lesson-3',
    orderIndex: 3.5,
    content: '<h3>Chuyên sâu Nam</h3><p>Tìm hiểu phương pháp 2 con trỏ chạy từ 2 đầu mảng để giải quyết bài toán Two Sum một cách tối ưu.</p>',
  },
  {
    id: 'lesson-4-adv',
    title: '4. Thử thách Chuyên sâu: Thuật toán Đệ quy & Quy hoạch Động',
    description: 'Dành riêng cho nhóm Xuất sắc: Giải quyết các bài toán đệ quy phức tạp và tối ưu hóa không gian bộ nhớ.',
    tierType: 'advanced',
    difficulty: 'Rất khó',
    timeEstimate: '90 phút',
    parentLessonId: 'lesson-3',
    orderIndex: 4.0,
    content: '<h3>Chuyên sâu Anh</h3><p>Khám phá đệ quy nhớ (Memoization) và kỹ thuật quy hoạch động Tabulation với độ phức tạp tối ưu O(N) bộ nhớ O(1).</p>',
  },
  {
    id: 'lesson-5-proj',
    title: '5. Đồ án Thực tế: Xây dựng Bộ lọc Dữ liệu Thông minh',
    description: 'Chương cuối tích hợp kiến thức xây dựng ứng dụng thực tế phân tích dữ liệu học tập.',
    tierType: 'core',
    difficulty: 'Thử thách',
    timeEstimate: '120 phút',
    parentLessonId: 'lesson-4-adv',
    orderIndex: 5.0,
    content: '<h3>Project Cuối khóa</h3><p>Tổng hợp tất cả cấu trúc dữ liệu và giải thuật đã học để hoàn thành bộ lọc dữ liệu thực tế.</p>',
  },
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Lộ trình Thích ứng',
    question: 'AuraLMS điều chỉnh lộ trình học tập cho từng học viên như thế nào?',
    answer: 'Hệ thống tự động phân tích điểm số Rubrics và tiến độ của học viên để tự động mở khóa các nhánh bài học bổ trợ (cho nhóm Cần hỗ trợ) hoặc mở khóa sớm các thử thách chuyên sâu nâng cao (cho nhóm Khá/Giỏi).',
    orderIndex: 1,
  },
  {
    id: 'faq-2',
    category: 'Trợ lý AI Companion',
    question: 'Trợ lý AI đa tính cách trong AuraLMS hoạt động ra sao?',
    answer: 'Mỗi nhóm học sinh (Vy, Nam, Anh) có trợ lý AI với phong cách phản hồi riêng biệt: Vy nhận lời khuyên thân thiện/động viên; Nam nhận gợi ý tối ưu/bứt phá; Anh nhận câu hỏi thách thức tư duy nâng cao.',
    orderIndex: 2,
  },
  {
    id: 'faq-3',
    category: 'Rubrics & Đánh giá',
    question: 'Tiêu chí chấm điểm Rubrics 4 thành phần bao gồm những gì?',
    answer: 'Rubrics đánh giá minh bạch trên 4 tiêu chí: Nội dung (40%), Lập luận & Logic (30%), Ngôn từ diễn đạt (20%), và Nỗ lực tiến bộ (10%). Điểm nỗ lực khích lệ các học sinh có sự cải thiện vượt bậc.',
    orderIndex: 3,
  },
  {
    id: 'faq-4',
    category: 'Thời gian phản hồi',
    question: 'Cam kết thời gian phản hồi (Response Time Promise) là gì?',
    answer: 'AuraLMS phản hồi giao diện thích ứng & gợi ý AI chỉ trong 131ms, đồng thời cam kết nhận xét tự luận chi tiết từ giáo viên/AI được hoàn thành trong vòng 24 giờ.',
    orderIndex: 4,
  },
];
