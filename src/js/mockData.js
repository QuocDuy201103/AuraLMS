// Initial Mock Data representing the LMS Database
export const initialStudents = [
  {
    id: "student-anh",
    name: "Nguyễn Minh Anh",
    email: "minhanh.excellent@auralms.edu.vn",
    tier: "excellent",
    progress: 80,
    avatar: "MA",
    skills: {
      knowledge: 95,
      logic: 98,
      presentation: 85,
      consistency: 95
    },
    weeklyStudyTime: [120, 150, 180, 160, 200, 220, 240], // in minutes
    weeklyScores: [9.0, 9.5, 9.8, 9.5, 10.0, 9.7, 10.0],
    achievements: [
      { id: "ach-1", name: "Thợ Săn Thử Thách", description: "Hoàn thành 3 bài tập nâng cao liên tiếp", icon: "🏆", date: "2026-07-20" },
      { id: "ach-2", name: "Kiện Tướng Logic", description: "Giải quyết thuật toán Đệ quy tối ưu nhất", icon: "🧠", date: "2026-07-25" }
    ],
    completedLessons: ["lesson-1", "lesson-2", "lesson-2-adv", "lesson-3", "lesson-4"],
    unlockedLessons: ["lesson-1", "lesson-2", "lesson-2-adv", "lesson-3", "lesson-4", "lesson-4-adv", "lesson-5"],
    submittedAssignments: [
      {
        assignmentId: "assign-1",
        submittedDate: "2026-07-15",
        studentAnswer: "Thuật toán tìm kiếm nhị phân chia đôi mảng dữ liệu đã sắp xếp ở mỗi bước. Thời gian chạy là O(log n) vì kích thước bài toán giảm đi một nửa sau mỗi lần so sánh. So với tìm kiếm tuần tự O(n), thuật toán này nhanh hơn vượt trội khi dữ liệu lớn.",
        status: "graded",
        grade: 10,
        rubricGrading: {
          content: 40,      // Max 40
          argument: 30,     // Max 30
          language: 20,     // Max 20
          effort: 10        // Max 10
        },
        teacherFeedback: "Bài làm xuất sắc! Lập luận chặt chẽ, sử dụng ký hiệu Big O chính xác. Em đã hiểu rất sâu cách thức hoạt động của cấu trúc dữ liệu này. Hãy tiếp tục phát huy ở phần đệ quy nâng cao nhé!"
      },
      {
        assignmentId: "assign-5",
        submittedDate: "2026-07-18",
        studentAnswer: "Cấu trúc rẽ nhánh if-else giúp phân luồng điều khiển chương trình. Khi xếp loại học sinh theo GPA, ta có thể viết chuỗi if-else if. Tuy nhiên, việc lồng lặp lồng cấu trúc if quá sâu (Nested If) sẽ tạo ra 'mã nguồn hình mũi tên' (Arrow Code) rất khó đọc. Để tránh, ta nên áp dụng kỹ thuật 'Early Return' (trả về sớm) hoặc chuyển sang sử dụng câu lệnh switch-case hoặc bảng ánh xạ đối tượng.",
        status: "graded",
        grade: 9.5,
        rubricGrading: {
          content: 38,
          argument: 28,
          language: 19,
          effort: 10
        },
        teacherFeedback: "Em đã phân tích rất tốt về nhược điểm Arrow Code và đề xuất giải pháp Early Return rất thực tế. Cách viết sạch sẽ, rõ ràng!"
      },
      {
        assignmentId: "assign-7",
        submittedDate: "2026-07-22",
        studentAnswer: "Mảng tĩnh lưu trữ một lượng phần tử cố định trên bộ nhớ liên tục. Mảng động (như Array trong JS) tự động nhân đôi kích thước (Resize) khi đầy. Phép chèn vào mảng động tốn O(n) cho việc copy phần tử khi đầy, tuy nhiên khi tính trung bình (khấu hao), phép chèn chỉ tốn thời gian O(1) Amortized.",
        status: "graded",
        grade: 10,
        rubricGrading: {
          content: 40,
          argument: 30,
          language: 20,
          effort: 10
        },
        teacherFeedback: "Lập luận về Amortized Time Complexity hoàn hảo! Sự hiểu biết của em vượt trội so với yêu cầu bài học."
      },
      {
        assignmentId: "assign-2",
        submittedDate: "2026-07-29",
        studentAnswer: "Hàm đệ quy tính số Fibonacci hoạt động bằng cách gọi lại chính nó: F(n) = F(n-1) + F(n-2). Tuy nhiên, cách tính này có độ phức tạp O(2^n) do tính lặp lại nhiều bài toán con. Để tối ưu, ta có thể áp dụng Quy hoạch động (Dynamic Programming) lưu trữ các kết quả đã tính để giảm độ phức tạp xuống O(n). Dưới đây là code minh họa: \n\nfunction fib(n, memo = {}) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n}",
        status: "pending",
        grade: null,
        rubricGrading: null,
        teacherFeedback: ""
      }
    ]
  },
  {
    id: "student-nam",
    name: "Lê Hoàng Nam",
    email: "hoangnam.average@auralms.edu.vn",
    tier: "average",
    progress: 55,
    avatar: "HN",
    skills: {
      knowledge: 75,
      logic: 70,
      presentation: 78,
      consistency: 82
    },
    weeklyStudyTime: [60, 80, 90, 75, 110, 95, 120],
    weeklyScores: [7.5, 7.8, 8.0, 7.5, 8.2, 8.0, 8.5],
    achievements: [
      { id: "ach-3", name: "Chiến Binh Chăm Chỉ", description: "Học tập liên tục trong 7 ngày không ngắt quãng", icon: "🔥", date: "2026-07-22" }
    ],
    completedLessons: ["lesson-1", "lesson-2"],
    unlockedLessons: ["lesson-1", "lesson-2", "lesson-3", "lesson-3-boost"],
    submittedAssignments: [
      {
        assignmentId: "assign-1",
        submittedDate: "2026-07-16",
        studentAnswer: "Tìm kiếm nhị phân là thuật toán tìm một phần tử trong danh sách đã được sắp xếp. Nó hoạt động bằng cách liên tục chia đôi khoảng tìm kiếm. Độ phức tạp là O(log n), tốt hơn nhiều so với O(n) của tìm kiếm tuần tự.",
        status: "graded",
        grade: 8.0,
        rubricGrading: {
          content: 32,      // Max 40
          argument: 24,     // Max 30
          language: 16,     // Max 20
          effort: 8         // Max 10
        },
        teacherFeedback: "Em đã nêu được ý chính của thuật toán và độ phức tạp. Lập luận tương đối tốt nhưng cần giải thích rõ hơn TẠI SAO nó lại giảm đi một nửa ở mỗi bước để bài luận thuyết phục hơn. Cố gắng bứt phá ở bài tập tới nhé!"
      },
      {
        assignmentId: "assign-5",
        submittedDate: "2026-07-19",
        studentAnswer: "Quyết định rẽ nhánh trong code dùng if và else. Để tránh rẽ nhánh quá phức tạp, chúng ta có thể dùng switch case để tách các trường hợp. nested if làm code bị thụt lề quá nhiều, gây khó chịu cho người đọc.",
        status: "graded",
        grade: 8.0,
        rubricGrading: {
          content: 32,
          argument: 22,
          language: 18,
          effort: 8
        },
        teacherFeedback: "Bài làm khá đầy đủ. Chú ý mô tả thêm về giải thuật phân loại điểm GPA cụ thể trong các bài luận sau để tăng tính thực tiễn nhé!"
      },
      {
        assignmentId: "assign-3",
        submittedDate: "2026-07-28",
        studentAnswer: "Mảng là một cấu trúc dữ liệu dùng để lưu trữ danh sách các phần tử có cùng kiểu dữ liệu liên tiếp nhau trong bộ nhớ. Để duyệt qua mảng, ta dùng vòng lặp for hoặc while. Ưu điểm là truy cập nhanh qua chỉ số O(1), nhược điểm là kích thước cố định (trong một số ngôn ngữ tĩnh) và việc chèn/xóa phần tử ở đầu mảng mất thời gian O(n).",
        status: "pending",
        grade: null,
        rubricGrading: null,
        teacherFeedback: ""
      }
    ]
  },
  {
    id: "student-vy",
    name: "Trần Thị Vy",
    email: "thivy.struggling@auralms.edu.vn",
    tier: "struggling",
    progress: 25,
    avatar: "TV",
    skills: {
      knowledge: 45,
      logic: 40,
      presentation: 55,
      consistency: 60
    },
    weeklyStudyTime: [30, 45, 40, 50, 45, 60, 70],
    weeklyScores: [5.0, 5.5, 6.0, 5.8, 6.2, 6.5, 6.8],
    achievements: [
      { id: "ach-4", name: "Bước Đi Đầu Tiên", description: "Vượt qua bài học nhập môn với tinh thần quyết tâm", icon: "🌱", date: "2026-07-10" },
      { id: "ach-5", name: "Nỗ Lực Không Ngừng", description: "Hoàn thành bài tập ôn tập củng cố gốc", icon: "🛡️", date: "2026-07-26" }
    ],
    completedLessons: ["lesson-1"],
    unlockedLessons: ["lesson-1", "lesson-2", "lesson-2-ref"],
    submittedAssignments: [
      {
        assignmentId: "assign-1",
        submittedDate: "2026-07-17",
        studentAnswer: "Tìm kiếm nhị phân là mình tìm số ở giữa trước. Nếu số cần tìm lớn hơn thì tìm bên phải, nhỏ hơn thì tìm bên trái. Cứ chia đôi ra như vậy. Nó nhanh hơn tìm từng số một từ đầu đến cuối.",
        status: "graded",
        grade: 6.5,
        rubricGrading: {
          content: 25,      // Max 40
          argument: 18,     // Max 30
          language: 14,     // Max 20
          effort: 8         // Max 10 (High effort score for struggling student)
        },
        teacherFeedback: "Vy ơi, em đã hiểu được ý tưởng cốt lõi của tìm kiếm nhị phân là luôn chia đôi khoảng tìm kiếm rồi đó! Đây là bước tiến rất lớn. Dù chưa sử dụng các thuật ngữ chuyên sâu như độ phức tạp O(log n), cách em mô tả rất dễ hiểu. Hãy tự tin lên, cô tin em sẽ học tốt phần này!"
      },
      {
        assignmentId: "assign-5",
        submittedDate: "2026-07-20",
        studentAnswer: "Câu lệnh if else dùng khi mình muốn máy tính lựa chọn làm cái này hay cái kia tùy điều kiện. Ví dụ nếu điểm >= 5 thì đậu, ngược lại thì rớt. Nếu viết quá nhiều điều kiện lồng nhau thì code sẽ rối như tơ vò và rất dễ viết sai điều kiện.",
        status: "graded",
        grade: 7.0,
        rubricGrading: {
          content: 28,
          argument: 20,
          language: 14,
          effort: 8
        },
        teacherFeedback: "Em đã lấy ví dụ điểm đậu/rớt rất thực tế. Lời phê cho thấy em hiểu được tác hại của việc viết lồng if quá nhiều. Cô rất vui vì sự tiến bộ của em!"
      },
      {
        assignmentId: "assign-4",
        submittedDate: "2026-07-29",
        studentAnswer: "Vòng lặp là để máy tính làm đi làm lại một việc mà mình không cần viết nhiều dòng code giống nhau. Ví dụ như in từ 1 đến 10. Vòng lặp while sẽ chạy khi điều kiện còn đúng, nếu quên tăng biến đếm thì máy sẽ bị treo (lặp vô tận).",
        status: "pending",
        grade: null,
        rubricGrading: null,
        teacherFeedback: ""
      }
    ]
  }
];

export const lessons = [
  {
    id: "lesson-1",
    title: "Logic & Thuật toán Cơ bản",
    description: "Làm quen với tư duy máy tính, các khái niệm thuật toán và cách biểu diễn thuật toán bằng mã giả/lưu đồ.",
    tierType: "core",
    difficulty: "Dễ",
    time: "45 phút",
    order: 1,
    content: `
      <h3>1. Thuật toán là gì?</h3>
      <p>Thuật toán (Algorithm) là một tập hợp hữu hạn các chỉ dẫn rõ ràng để giải quyết một bài toán cụ thể. Có thể hiểu đơn giản, thuật toán giống như công thức nấu ăn: bạn cần các nguyên liệu (đầu vào) và các bước thực hiện tuần tự để ra món ăn hoàn chỉnh (đầu ra).</p>
      <h3>2. Biểu diễn Thuật toán</h3>
      <p>Có 3 cách phổ biến để mô tả thuật toán:</p>
      <ul>
        <li><strong>Ngôn ngữ tự nhiên:</strong> Diễn đạt từng bước bằng câu chữ thuần túy.</li>
        <li><strong>Lưu đồ thuật toán (Flowchart):</strong> Dùng các khối hình học (hình chữ nhật cho xử lý, hình thoi cho rẽ nhánh quyết định, hình elip cho bắt đầu/kết thúc).</li>
        <li><strong>Mã giả (Pseudocode):</strong> Dùng mã có cấu trúc tương tự lập trình nhưng không phụ thuộc cú pháp của bất kỳ ngôn ngữ cụ thể nào.</li>
      </ul>
      <pre>
Ví dụ mã giả Tìm số lớn nhất:
1. Cho mảng A có N phần tử.
2. Đặt Max = A[0].
3. Duyệt từ i = 1 đến N-1:
     Nếu A[i] > Max thì đặt Max = A[i].
4. Trả về Max.
      </pre>
      <h3>3. Vai trò của tư duy Logic</h3>
      <p>Tư duy logic giúp lập trình viên chia nhỏ bài toán phức tạp thành các bài toán con dễ giải quyết hơn. Đây là nền tảng cốt lõi của lập trình.</p>
    `
  },
  {
    id: "lesson-2",
    title: "Cấu trúc Điều kiện & Vòng lặp",
    description: "Học cách điều khiển luồng chương trình bằng if-else và lặp lại công việc hiệu quả bằng for/while.",
    tierType: "core",
    difficulty: "Trung bình",
    time: "60 phút",
    order: 2,
    content: `
      <h3>1. Cấu trúc Điều kiện (if-else)</h3>
      <p>Giúp máy tính đưa ra quyết định dựa trên điều kiện đúng (true) hoặc sai (false).</p>
      <pre>
if (điều_kiện) {
    // Thực hiện nếu đúng
} else {
    // Thực hiện nếu sai
}
      </pre>
      <h3>2. Cấu trúc Vòng lặp (Loops)</h3>
      <p>Dùng để thực hiện lặp đi lặp lại một công việc cho đến khi điều kiện dừng thỏa mãn.</p>
      <ul>
        <li><strong>Vòng lặp for:</strong> Thích hợp khi biết trước số lần lặp.</li>
        <li><strong>Vòng lặp while:</strong> Thích hợp khi lặp theo một điều kiện logic cho đến khi điều kiện đó sai.</li>
      </ul>
      <pre>
// Vòng lặp for in ra từ 1 đến 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
      </pre>
    `
  },
  {
    id: "lesson-2-ref",
    title: "Bổ trợ: Thực hành Vòng lặp Trực quan",
    description: "Dành riêng cho nhóm Cần hỗ trợ: Luyện tập viết vòng lặp vẽ hình để hiểu rõ cơ chế hoạt động.",
    tierType: "refresher",
    difficulty: "Dễ",
    time: "30 phút",
    parentLessonId: "lesson-2",
    order: 2.5,
    content: `
      <h3>🛡️ Bài học bổ trợ: Vòng lặp trực quan cho nhóm Cần Hỗ Trợ</h3>
      <p>Đừng lo lắng nhé! Vòng lặp thực ra rất gần gũi. Hãy cùng tưởng tượng việc <strong>vẽ 5 ngôi sao liên tục</strong> trên giấy.</p>
      <p>Bước đi chi tiết của máy tính:</p>
      <ol>
        <li>Lấy một biến tên là <code>ngoiSaoDaVe = 0</code>.</li>
        <li>Kiểm tra: <code>ngoiSaoDaVe < 5</code>? (Đúng, vì 0 < 5). Vẽ ngôi sao thứ nhất!</li>
        <li>Tăng <code>ngoiSaoDaVe</code> lên 1 (bây giờ có 1 ngôi sao).</li>
        <li>Kiểm tra: <code>1 < 5</code>? Đúng. Vẽ ngôi sao thứ hai!</li>
        <li>Lặp lại đến khi <code>ngoiSaoDaVe = 5</code>. Lúc này kiểm tra <code>5 < 5</code> là Sai. Máy tính dừng vẽ!</li>
      </ol>
      <h3>Tránh lỗi lặp vô tận (Treo máy)</h3>
      <p>Treo máy xảy ra khi bạn <strong>quên không tăng biến đếm</strong> hoặc điều kiện dừng luôn Đúng. Ví dụ:</p>
      <pre>
let i = 1;
while (i <= 5) {
    console.log("Hello");
    // Quên mất dòng i++ ! Biến i mãi mãi bằng 1, vòng lặp chạy vô tận.
}
      </pre>
      <p>Hãy chú ý điều chỉnh biến đếm bên trong ngoặc nhọn của vòng lặp nhé!</p>
    `
  },
  {
    id: "lesson-2-adv",
    title: "Chuyên sâu: Tối ưu hóa & Big O Notation",
    description: "Dành riêng cho nhóm Xuất sắc: Phân tích độ phức tạp thời gian và không gian của thuật toán vòng lặp lồng nhau.",
    tierType: "advanced",
    difficulty: "Khó",
    time: "90 phút",
    parentLessonId: "lesson-2",
    order: 2.8,
    content: `
      <h3>👑 Phân tích thuật toán nâng cao cho nhóm Xuất Sắc</h3>
      <p>Chào em. Khi viết vòng lặp, điều tối quan trọng là phân tích hiệu năng thông qua độ phức tạp thuật toán (Big O Notation).</p>
      <h3>1. Time Complexity (Độ phức tạp thời gian)</h3>
      <ul>
        <li><strong>O(1) - Constant Time:</strong> Các câu lệnh gán, so sánh cơ bản không phụ thuộc đầu vào.</li>
        <li><strong>O(n) - Linear Time:</strong> Một vòng lặp đơn chạy từ 0 đến N.</li>
        <li><strong>O(n²) - Quadratic Time:</strong> Hai vòng lặp lồng nhau chạy từ 0 đến N.</li>
      </ul>
      <h3>2. Cách tính Big O của vòng lặp lồng nhau</h3>
      <pre>
for (let i = 0; i < N; i++) {       // Chạy N lần
    for (let j = 0; j < N; j++) {   // Mỗi lần chạy tiếp N lần
        // Câu lệnh O(1)
    }
}
Tổng thời gian chạy: N * N = O(N²)
      </pre>
      <p>Trong thực tế, bạn cần tìm mọi cách để tránh sử dụng các thuật toán O(N²) khi kích thước dữ liệu lớn (N > 10,000).</p>
    `
  },
  {
    id: "lesson-3",
    title: "Mảng & Cấu trúc Dữ liệu cơ bản",
    description: "Tìm hiểu cách lưu trữ nhiều giá trị trong mảng, cách truy xuất, duyệt mảng và ứng dụng mảng trong thực tế.",
    tierType: "core",
    difficulty: "Trung bình",
    time: "75 phút",
    order: 3,
    content: `
      <h3>1. Mảng (Array) là gì?</h3>
      <p>Mảng là một cấu trúc dữ liệu tuyến tính lưu trữ các phần tử liên tiếp nhau trong bộ nhớ RAM. Các phần tử có cùng kiểu dữ liệu và được truy xuất qua <strong>chỉ số (Index)</strong> bắt đầu từ 0.</p>
      <h3>2. Ưu và nhược điểm của Mảng</h3>
      <ul>
        <li><strong>Ưu điểm:</strong> Truy cập ngẫu nhiên cực nhanh qua chỉ số với độ phức tạp O(1).</li>
        <li><strong>Nhược điểm:</strong> Kích thước mảng cố định (đối với ngôn ngữ tĩnh) và việc chèn hoặc xóa phần tử ở đầu/giữa mảng rất tốn kém (O(N)) do phải dịch chuyển các phần tử phía sau.</li>
      </ul>
      <pre>
Cấu trúc mảng trong bộ nhớ:
Index:   0    1    2    3
Value: [ 10 | 20 | 30 | 40 ]
Truy cập Value[2] sẽ ra ngay 30 (O(1)).
      </pre>
    `
  },
  {
    id: "lesson-3-boost",
    title: "Bứt phá: Tối ưu hóa Tìm kiếm & Sắp xếp mảng",
    description: "Dành cho nhóm Trung bình: Vượt ngưỡng từ O(n^2) sang O(n log n) qua các bài tập thực tế.",
    tierType: "boost",
    difficulty: "Trung bình - Khó",
    time: "60 phút",
    parentLessonId: "lesson-3",
    order: 3.5,
    content: `
      <h3>🚀 Bài học bứt phá cho nhóm Trung Bình</h3>
      <p>Chào Nam! Mục tiêu của bạn hôm nay là tối ưu hóa việc tìm kiếm phần tử trong mảng để bứt phá lên nhóm giỏi.</p>
      <h3>Tìm kiếm tuần tự vs Tìm kiếm nhị phân</h3>
      <p>Khi mảng chưa được sắp xếp, ta bắt buộc phải dùng <strong>Tìm kiếm tuần tự (Linear Search)</strong> chạy từ đầu đến cuối mảng, tốn thời gian <strong>O(N)</strong>.</p>
      <p>Nếu mảng đã được sắp xếp, ta áp dụng <strong>Tìm kiếm nhị phân (Binary Search)</strong> để chia đôi khoảng tìm kiếm sau mỗi bước, giảm thời gian chạy xuống <strong>O(log N)</strong>. Đối với mảng 1 triệu phần tử:</p>
      <ul>
        <li>Tìm kiếm tuần tự: Tốn tối đa 1,000,000 phép so sánh.</li>
        <li>Tìm kiếm nhị phân: Tốn tối đa chỉ 20 phép so sánh!</li>
      </ul>
      <pre>
Thuật toán Tìm kiếm Nhị phân hoạt động bằng cách:
1. Xác định Left = 0, Right = N - 1.
2. Tính Mid = (Left + Right) / 2.
3. So sánh A[Mid] với số cần tìm X:
   - Nếu bằng: Trả về Mid (Tìm thấy).
   - Nếu A[Mid] < X: Đặt Left = Mid + 1 (Tìm nửa phải).
   - Nếu A[Mid] > X: Đặt Right = Mid - 1 (Tìm nửa trái).
      </pre>
    `
  },
  {
    id: "lesson-4",
    title: "Hàm & Thiết kế mã nguồn Module",
    description: "Học cách đóng gói code thành các hàm có thể tái sử dụng, tham số, giá trị trả về và tư duy chia để trị.",
    tierType: "core",
    difficulty: "Trung bình",
    time: "90 phút",
    order: 4,
    content: `
      <h3>1. Hàm (Function) là gì?</h3>
      <p>Hàm là một khối lệnh được đóng gói đặt tên để thực hiện một nhiệm vụ cụ thể. Việc sử dụng hàm giúp mã nguồn sạch sẽ, dễ bảo trì và tránh việc viết lại các đoạn code trùng lặp.</p>
      <h3>2. Cấu trúc của Hàm</h3>
      <pre>
function tenHam(thamSo1, thamSo2) {
    // Thực hiện logic
    return giaTriTraVe;
}
      </pre>
      <p>Khi gọi hàm, ta truyền vào các **đối số** tương ứng với tham số được khai báo.</p>
    `
  },
  {
    id: "lesson-4-adv",
    title: "Chuyên sâu: Thuật toán Đệ quy nâng cao",
    description: "Dành riêng cho nhóm Xuất sắc: Giải quyết các bài toán đệ quy có nhớ (Memoization).",
    tierType: "advanced",
    difficulty: "Khó",
    time: "120 phút",
    parentLessonId: "lesson-4",
    order: 4.5,
    content: `
      <h3>👑 Phân tích Đệ quy chuyên sâu cho nhóm Xuất Sắc</h3>
      <p>Chào em. Đệ quy (Recursion) là kỹ thuật một hàm gọi lại chính nó. Để viết đệ quy chạy đúng, bạn cần làm rõ hai phần:</p>
      <ol>
        <li><strong>Trường hợp cơ sở (Base Case):</strong> Điều kiện dừng đệ quy để tránh lỗi tràn bộ nhớ Call Stack.</li>
        <li><strong>Trường hợp đệ quy (Recursive Case):</strong> Gọi lại chính hàm đó với bài toán nhỏ hơn.</li>
      </ol>
      <h3>Tối ưu hóa đệ quy Fibonacci</h3>
      <p>Thuật toán đệ quy Fibonacci thông thường chạy với độ phức tạp thời gian <strong>O(2^n)</strong> vì lặp lại việc tính toán các bài toán con rất nhiều lần.</p>
      <p>Để tối ưu, ta sử dụng <strong>Quy hoạch động có nhớ (Memoization)</strong> lưu lại kết quả đã tính vào mảng hoặc object để giảm độ phức tạp xuống <strong>O(N)</strong>.</p>
      <pre>
Code đệ quy Fibonacci tối ưu:
function fib(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n]; // Trả về kết quả đã tính
    return memo[n] = fib(n-1, memo) + fib(n-2, memo);
}
      </pre>
    `
  },
  {
    id: "lesson-5",
    title: "Project thực tế: Ứng dụng quản lý cá nhân",
    description: "Xây dựng ứng dụng hoàn chỉnh kết hợp tất cả các kiến thức đã học, thiết kế luồng xử lý và tối ưu hóa trải nghiệm.",
    tierType: "core",
    difficulty: "Khó",
    time: "180 phút",
    order: 5,
    content: `
      <h3>Project thực tế: Ứng dụng quản lý cá nhân</h3>
      <p>Chào các bạn! Đây là bài học cuối cùng kết hợp toàn bộ kiến thức về cấu trúc mảng, vòng lặp, hàm, và thiết kế UI.</p>
      <h3>Các bước xây dựng ứng dụng hoàn chỉnh:</h3>
      <ol>
        <li><strong>Thiết kế Tầng dữ liệu (Model):</strong> Định nghĩa cấu trúc mảng đối tượng lưu trữ thông tin phần tử.</li>
        <li><strong>Xây dựng Tầng logic (Controller):</strong> Viết các hàm thêm, xóa, tìm kiếm và sắp xếp dữ liệu.</li>
        <li><strong>Tích hợp Giao diện (View):</strong> Sử dụng Javascript thao tác DOM hiển thị dữ liệu trực quan ra màn hình.</li>
      </ol>
      <p>Hãy lập kế hoạch, phân bổ các chức năng thành các hàm module độc lập để code dễ mở rộng nhất!</p>
    `
  }
];

export const assignments = [
  {
    id: "assign-1",
    lessonId: "lesson-1",
    title: "Phân tích Thuật toán Tìm kiếm Nhị phân",
    type: "essay",
    description: "Hãy giải thích cách thức hoạt động của thuật toán tìm kiếm nhị phân. So sánh độ phức tạp của nó với tìm kiếm tuần tự và giải thích tại sao nó lại tối ưu hơn.",
    questionText: "Viết một bài luận ngắn (150-300 từ) phân tích thuật toán tìm kiếm nhị phân.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Độ chính xác nội dung", weight: 40, desc: "Hiểu bản chất thuật toán, cơ chế chia đôi khoảng tìm kiếm và điều kiện mảng đã sắp xếp." },
      { id: "argument", name: "Lập luận & So sánh", weight: 30, desc: "So sánh rõ ràng với tìm kiếm tuần tự thông qua độ phức tạp Big O (O(log n) vs O(n))." },
      { id: "language", name: "Ngôn từ chuyên môn", weight: 20, desc: "Sử dụng đúng thuật ngữ kỹ thuật, viết mạch lạc, cấu trúc rõ ràng." },
      { id: "effort", name: "Sự nỗ lực & Tiến bộ", weight: 10, desc: "Thành ý làm bài, trình bày cẩn thận, có sự cải thiện so với các bài trước." }
    ]
  },
  {
    id: "assign-5",
    lessonId: "lesson-2",
    title: "Ứng dụng Cấu trúc rẽ nhánh trong thực tế",
    type: "essay",
    description: "Hãy phân tích cách hoạt động của câu lệnh rẽ nhánh (if-else, switch-case). Trình bày ví dụ thực tế về việc phân loại điểm học sinh dựa vào điểm trung bình và giải thích tại sao việc lồng quá nhiều if-else (Nested If) lại là một bad practice.",
    questionText: "Trình bày ứng dụng câu lệnh rẽ nhánh if-else và cách tối ưu khi có quá nhiều điều kiện.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Độ chính xác nội dung", weight: 40, desc: "Hiểu rõ cơ chế rẽ nhánh và sử dụng đúng cú pháp điều kiện." },
      { id: "argument", name: "Lập luận tối ưu", weight: 30, desc: "Chỉ ra được nhược điểm của lồng if-else quá sâu và đề xuất giải pháp thay thế (switch-case, early return)." },
      { id: "language", name: "Trình bày code sạch", weight: 20, desc: "Viết mã nguồn minh họa rõ ràng, căn lề chuẩn xác, dễ đọc." },
      { id: "effort", name: "Sự nỗ lực học tập", weight: 10, desc: "Có phân tích sâu, tự lấy ví dụ thực tiễn sinh động." }
    ]
  },
  {
    id: "assign-4",
    lessonId: "lesson-2-ref",
    title: "Ý nghĩa của Vòng lặp và Tránh lỗi Lặp vô tận",
    type: "essay",
    description: "Dành cho nhóm Cần hỗ trợ: Giải thích bằng ngôn ngữ của em về lý do chúng ta cần vòng lặp trong lập trình và cách em làm sao để không gặp lỗi lặp vô hạn (treo máy).",
    questionText: "Giải thích tác dụng của vòng lặp và cách tránh lỗi lặp vô tận.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Độ chính xác nội dung", weight: 40, desc: "Hiểu vòng lặp dùng để lặp đi lặp lại công việc và vai trò của điều kiện dừng." },
      { id: "argument", name: "Lấy ví dụ thực tế", weight: 30, desc: "Lấy được ví dụ gần gũi trong đời sống hoặc trong code minh họa điều kiện lặp." },
      { id: "language", name: "Khả năng diễn đạt", weight: 20, desc: "Diễn đạt tự nhiên, tự tin, không e ngại khi nói về khó khăn lập trình." },
      { id: "effort", name: "Tinh thần tự học", weight: 10, desc: "Chăm chỉ hoàn thành bài, câu chữ nắn nót, thể hiện sự cầu thị cao." }
    ]
  },
  {
    id: "assign-6",
    lessonId: "lesson-2-adv",
    title: "Giải thuật Số nguyên tố & Sàng Eratosthenes",
    type: "essay",
    description: "Dành cho nhóm Xuất sắc: Hãy so sánh giải thuật kiểm tra số nguyên tố cơ bản độ phức tạp O(sqrt(N)) với giải thuật Sàng Eratosthenes để tìm tất cả số nguyên tố nhỏ hơn N. Giải thích nguyên lý hoạt động của Sàng Eratosthenes và cách tối ưu hóa không gian bộ nhớ.",
    questionText: "Phân tích và so sánh thuật toán kiểm tra số nguyên tố thông thường với Sàng Eratosthenes.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Độ chính xác toán học", weight: 40, desc: "Giải thích đúng cơ chế sàng lọc bội số và đánh giá đúng độ phức tạp thời gian O(N log log N)." },
      { id: "argument", name: "Chứng minh tối ưu", weight: 30, desc: "Nêu rõ sự vượt trội về thời gian chạy khi N lớn và cách tối ưu bộ nhớ bằng mảng bit/boolean." },
      { id: "language", name: "Mã nguồn tối ưu", weight: 20, desc: "Cài đặt thuật toán sàng bằng Javascript chuẩn xác, chạy đúng logic." },
      { id: "effort", name: "Tư duy sáng tạo", weight: 10, desc: "Đề xuất thêm giải pháp Sàng phân đoạn (Segmented Sieve) cho khoảng lớn." }
    ]
  },
  {
    id: "assign-7",
    lessonId: "lesson-3",
    title: "Mảng động (Dynamic Array) vs Mảng tĩnh",
    type: "essay",
    description: "Hãy so sánh sự khác nhau về mặt lưu trữ bộ nhớ và hiệu năng giữa mảng tĩnh (kích thước cố định) và mảng động (như ArrayList trong Java hay Array trong JS). Giải thích cơ chế tự nhân đôi kích thước khi mảng động bị đầy.",
    questionText: "So sánh cơ chế hoạt động, ưu/nhược điểm của mảng động và mảng tĩnh.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Độ chính xác nội dung", weight: 40, desc: "Nêu rõ cơ chế cấp phát bộ nhớ động, cách nhân đôi dung lượng (resize) và copy phần tử sang mảng mới." },
      { id: "argument", name: "Độ phức tạp khấu hao", weight: 30, desc: "Giải thích được tại sao phép chèn vào mảng động có độ phức tạp khấu hao (Amortized Time Complexity) là O(1)." },
      { id: "language", name: "Diễn đạt khoa học", weight: 20, desc: "Bản so sánh mạch lạc, lập luận logic, sử dụng đúng thuật ngữ chuyên môn." },
      { id: "effort", name: "Chi tiết & Đầy đủ", weight: 10, desc: "Trình bày cẩn thận, có sơ đồ biểu diễn bộ nhớ bằng ký tự hoặc ví dụ minh họa." }
    ]
  },
  {
    id: "assign-3",
    lessonId: "lesson-3-boost",
    title: "Ứng dụng và hạn chế của Mảng",
    type: "essay",
    description: "Dành cho nhóm Trung bình: Hãy nêu định nghĩa về cấu trúc dữ liệu mảng, các thao tác cơ bản trên mảng và phân tích ưu, nhược điểm của mảng trong bộ nhớ máy tính.",
    questionText: "Trình bày về mảng, ưu/nhược điểm và cách duyệt qua mảng.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Độ chính xác nội dung", weight: 40, desc: "Định nghĩa đúng mảng, cách cấp phát bộ nhớ liên tục và truy xuất chỉ số." },
      { id: "argument", name: "Phân tích ưu nhược điểm", weight: 30, desc: "Nêu được ưu điểm O(1) truy cập, nhược điểm O(n) chèn/xóa và kích thước cố định." },
      { id: "language", name: "Rõ ràng & Rành mạch", weight: 20, desc: "Bài viết logic, dễ hiểu, trình bày có hệ thống đầu dòng." },
      { id: "effort", name: "Sự cố gắng bứt phá", weight: 10, desc: "Có ví dụ minh họa trực quan hoặc liên hệ ứng dụng cụ thể." }
    ]
  },
  {
    id: "assign-8",
    lessonId: "lesson-4",
    title: "Thiết kế Hàm sạch (Clean Function)",
    type: "essay",
    description: "Trong phát triển phần mềm chuyên nghiệp, việc viết mã nguồn sạch là tối quan trọng. Hãy phân tích các tiêu chuẩn của một 'Hàm sạch' (Clean Function) bao gồm: Nguyên lý Đơn nhiệm (Single Responsibility Principle), Hàm thuần khiết (Pure Function), hạn chế tác dụng phụ (Side Effects) và cách đặt tên hàm ý nghĩa.",
    questionText: "Trình bày các tiêu chuẩn thiết kế hàm sạch và lợi ích trong việc bảo trì dự án.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Khái niệm hàm sạch", weight: 40, desc: "Định nghĩa chính xác Pure Function, Side Effect và nguyên lý Single Responsibility." },
      { id: "argument", name: "Tầm quan trọng bảo trì", weight: 30, desc: "Giải thích rõ tại sao viết hàm sạch giúp việc viết Unit Test và bảo trì code dễ dàng hơn." },
      { id: "language", name: "Code mẫu Clean vs Dirty", weight: 20, desc: "Cung cấp ví dụ thực tế so sánh một đoạn code viết tệ (dirty) và sau khi được refactor thành hàm sạch (clean)." },
      { id: "effort", name: "Mức độ đầu tư", weight: 10, desc: "Bài luận trình bày khoa học, lấy ví dụ thực tiễn lập trình sinh động." }
    ]
  },
  {
    id: "assign-2",
    lessonId: "lesson-4-adv",
    title: "Tối ưu hóa đệ quy tính số Fibonacci",
    type: "essay",
    description: "Dành cho nhóm Xuất sắc: Phân tích bài toán tính Fibonacci bằng đệ quy thường và đề xuất giải pháp tối ưu hóa bằng Quy hoạch động hoặc Khử đệ quy. Viết code minh họa.",
    questionText: "Giải thích nhược điểm đệ quy thường và trình bày giải pháp tối ưu hóa đệ quy Fibonacci kèm code mẫu.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Độ chính xác nội dung", weight: 40, desc: "Chỉ ra nhược điểm O(2^n) do trùng lặp bài toán con, đưa ra cách khắc phục chính xác." },
      { id: "argument", name: "Lập luận & So sánh", weight: 30, desc: "Chứng minh sự cải thiện độ phức tạp xuống O(n) về mặt toán học." },
      { id: "language", name: "Mã nguồn tối ưu", weight: 20, desc: "Viết code sạch, chạy đúng, có giải thích các biến và logic." },
      { id: "effort", name: "Ý tưởng đột phá", weight: 10, desc: "Đề xuất thêm giải pháp không gian bộ nhớ O(1) hoặc các góc nhìn độc đáo." }
    ]
  },
  {
    id: "assign-9",
    lessonId: "lesson-5",
    title: "Hoạch định Kiến trúc Ứng dụng CRUD",
    type: "essay",
    description: "Hãy phác thảo kế hoạch kiến trúc cho một ứng dụng CRUD nhỏ (ví dụ: Quản lý thư viện sách). Trình bày cách em thiết kế cấu trúc dữ liệu lưu trữ mảng đối tượng sách, viết các hàm xử lý logic (Thêm, Sửa, Xóa, Tìm kiếm) và cơ chế cập nhật giao diện (DOM Rendering) đồng bộ.",
    questionText: "Phác thảo kiến trúc lập trình ứng dụng CRUD quản lý dữ liệu mảng đối tượng.",
    maxScore: 10,
    rubric: [
      { id: "content", name: "Thiết kế mô hình dữ liệu", weight: 40, desc: "Thiết kế mảng đối tượng hợp lý, khai báo đầy đủ các hàm xử lý logic cần thiết." },
      { id: "argument", name: "Đồng bộ hóa dữ liệu", weight: 30, desc: "Mô tả giải pháp đồng bộ trạng thái lưu trữ LocalStorage với giao diện hiển thị tránh lỗi dữ liệu." },
      { id: "language", name: "Tính tái sử dụng mã", weight: 20, desc: "Lập kế hoạch chia nhỏ code thành các module/hàm độc lập dễ tái sử dụng." },
      { id: "effort", name: "Tính ứng dụng thực tế", weight: 10, desc: "Kế hoạch hoàn chỉnh, thực tế, thể hiện được tư duy xây dựng phần mềm bài bản." }
    ]
  }
];
