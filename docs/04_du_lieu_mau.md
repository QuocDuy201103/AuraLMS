# 📂 Cấu Trúc Dữ Liệu Mẫu (Mock Data Schema) AuraLMS

Dữ liệu mẫu mô phỏng hệ thống quản lý học tập thực tế, chi tiết tại [mockData.js](file:///d:/code/GFT/TrackA/src/js/mockData.js).

### 1. Thực thể Học viên (Student Schema)
Mỗi học viên có một hồ sơ năng lực riêng:
```javascript
{
  id: "student-vy",                                      // Định danh duy nhất
  name: "Trần Thị Vy",                                   // Họ và tên
  email: "thivy.struggling@auralms.edu.vn",
  tier: "struggling",                                    // Phân nhóm học lực ('struggling' | 'average' | 'excellent')
  progress: 25,                                          // Phần trăm tiến độ học tập (%)
  avatar: "TV",                                          // Ký tự viết tắt đại diện
  skills: {                                              // Điểm năng lực (0 - 100)
    knowledge: 45,                                       // Kiến thức nền
    logic: 40,                                           // Logic thuật toán
    presentation: 55,                                    // Khả năng diễn đạt
    consistency: 60                                      // Sự kiên trì
  },
  weeklyStudyTime: [30, 45, 40, 50, 45, 60, 70],         // Thời gian tự học 7 ngày (phút)
  weeklyScores: [5.0, 5.5, 6.0, 5.8, 6.2, 6.5, 6.8],     // Điểm số trung bình qua 7 ngày gần nhất
  achievements: [                                        // Danh hiệu đạt được
    { id: "ach-4", name: "Bước Đi Đầu Tiên", description: "Vượt qua bài học nhập môn với tinh thần quyết tâm", icon: "🌱", date: "2026-07-10" }
  ],
  completedLessons: ["lesson-1"],                        // Danh sách ID bài học đã hoàn thành
  unlockedLessons: ["lesson-1", "lesson-2", "lesson-2-ref"], // Danh sách ID bài học đã mở khóa
  submittedAssignments: [                                // Danh sách các bài tự luận đã nộp
    {
      assignmentId: "assign-1",                          // Liên kết ID bài tập
      submittedDate: "2026-07-17",
      studentAnswer: "...",                              // Bài làm tự luận của học sinh
      status: "graded",                                  // Trạng thái ('pending' | 'graded')
      grade: 6.5,                                        // Điểm số thang điểm 10
      rubricGrading: {                                   // Chi tiết điểm số từng tiêu chí Rubric
        content: 25,                                     // Nội dung (tối đa 40)
        argument: 18,                                    // Lập luận (tối đa 30)
        language: 14,                                    // Diễn đạt (tối đa 20)
        effort: 8                                        // Sự nỗ lực (tối đa 10)
      },
      teacherFeedback: "..."                             // Lời phê của giáo viên
    }
  ]
}
```

### 2. Thực thể Bài học (Lesson Schema)
```javascript
{
  id: "lesson-2-ref",
  title: "Bổ trợ: Thực hành Vòng lặp Trực quan",
  description: "Dành riêng cho nhóm Cần hỗ trợ: Luyện tập viết vòng lặp vẽ hình để hiểu rõ cơ chế hoạt động.",
  tierType: "refresher",                                 // Thể loại thích ứng ('core' | 'refresher' | 'advanced' | 'boost')
  difficulty: "Dễ",                                      // Độ khó hiển thị
  time: "30 phút",                                       // Thời lượng học ước tính
  parentLessonId: "lesson-2",                            // Bài học gốc liên quan
  order: 2.5,                                            // Thứ tự hiển thị trong lộ trình
  content: "HTML chứa nội dung bài giảng phong phú..."
}
```

### 3. Thực thể Bài tập Tự luận (Assignment Schema)
```javascript
{
  id: "assign-1",
  lessonId: "lesson-1",
  title: "Phân tích Thuật toán Tìm kiếm Nhị phân",
  type: "essay",                                         // Thể loại tự luận
  description: "Hãy giải thích cách thức hoạt động...",  // Đề bài chi tiết
  questionText: "Viết một bài luận ngắn (150-300 từ)...",
  maxScore: 10,
  rubric: [                                              // Định nghĩa ma trận Rubrics chấm điểm
    { id: "content", name: "Độ chính xác nội dung", weight: 40, desc: "..." },
    { id: "argument", name: "Lập luận & So sánh", weight: 30, desc: "..." },
    { id: "language", name: "Ngôn từ chuyên môn", weight: 20, desc: "..." },
    { id: "effort", name: "Sự nỗ lực & Tiến bộ", weight: 10, desc: "..." }
  ]
}
```
