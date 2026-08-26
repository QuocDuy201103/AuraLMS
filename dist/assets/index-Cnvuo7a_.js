(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const V=[{id:"student-anh",name:"Nguyễn Minh Anh",email:"minhanh.excellent@auralms.edu.vn",tier:"excellent",progress:80,avatar:"MA",skills:{knowledge:95,logic:98,presentation:85,consistency:95},weeklyStudyTime:[120,150,180,160,200,220,240],weeklyScores:[9,9.5,9.8,9.5,10,9.7,10],achievements:[{id:"ach-1",name:"Thợ Săn Thử Thách",description:"Hoàn thành 3 bài tập nâng cao liên tiếp",icon:"🏆",date:"2026-07-20"},{id:"ach-2",name:"Kiện Tướng Logic",description:"Giải quyết thuật toán Đệ quy tối ưu nhất",icon:"🧠",date:"2026-07-25"}],completedLessons:["lesson-1","lesson-2","lesson-2-adv","lesson-3","lesson-4"],unlockedLessons:["lesson-1","lesson-2","lesson-2-adv","lesson-3","lesson-4","lesson-4-adv","lesson-5"],submittedAssignments:[{assignmentId:"assign-1",submittedDate:"2026-07-15",studentAnswer:"Thuật toán tìm kiếm nhị phân chia đôi mảng dữ liệu đã sắp xếp ở mỗi bước. Thời gian chạy là O(log n) vì kích thước bài toán giảm đi một nửa sau mỗi lần so sánh. So với tìm kiếm tuần tự O(n), thuật toán này nhanh hơn vượt trội khi dữ liệu lớn.",status:"graded",grade:10,rubricGrading:{content:40,argument:30,language:20,effort:10},teacherFeedback:"Bài làm xuất sắc! Lập luận chặt chẽ, sử dụng ký hiệu Big O chính xác. Em đã hiểu rất sâu cách thức hoạt động của cấu trúc dữ liệu này. Hãy tiếp tục phát huy ở phần đệ quy nâng cao nhé!"},{assignmentId:"assign-5",submittedDate:"2026-07-18",studentAnswer:"Cấu trúc rẽ nhánh if-else giúp phân luồng điều khiển chương trình. Khi xếp loại học sinh theo GPA, ta có thể viết chuỗi if-else if. Tuy nhiên, việc lồng lặp lồng cấu trúc if quá sâu (Nested If) sẽ tạo ra 'mã nguồn hình mũi tên' (Arrow Code) rất khó đọc. Để tránh, ta nên áp dụng kỹ thuật 'Early Return' (trả về sớm) hoặc chuyển sang sử dụng câu lệnh switch-case hoặc bảng ánh xạ đối tượng.",status:"graded",grade:9.5,rubricGrading:{content:38,argument:28,language:19,effort:10},teacherFeedback:"Em đã phân tích rất tốt về nhược điểm Arrow Code và đề xuất giải pháp Early Return rất thực tế. Cách viết sạch sẽ, rõ ràng!"},{assignmentId:"assign-7",submittedDate:"2026-07-22",studentAnswer:"Mảng tĩnh lưu trữ một lượng phần tử cố định trên bộ nhớ liên tục. Mảng động (như Array trong JS) tự động nhân đôi kích thước (Resize) khi đầy. Phép chèn vào mảng động tốn O(n) cho việc copy phần tử khi đầy, tuy nhiên khi tính trung bình (khấu hao), phép chèn chỉ tốn thời gian O(1) Amortized.",status:"graded",grade:10,rubricGrading:{content:40,argument:30,language:20,effort:10},teacherFeedback:"Lập luận về Amortized Time Complexity hoàn hảo! Sự hiểu biết của em vượt trội so với yêu cầu bài học."},{assignmentId:"assign-2",submittedDate:"2026-07-29",studentAnswer:`Hàm đệ quy tính số Fibonacci hoạt động bằng cách gọi lại chính nó: F(n) = F(n-1) + F(n-2). Tuy nhiên, cách tính này có độ phức tạp O(2^n) do tính lặp lại nhiều bài toán con. Để tối ưu, ta có thể áp dụng Quy hoạch động (Dynamic Programming) lưu trữ các kết quả đã tính để giảm độ phức tạp xuống O(n). Dưới đây là code minh họa: 

function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}`,status:"pending",grade:null,rubricGrading:null,teacherFeedback:""}]},{id:"student-nam",name:"Lê Hoàng Nam",email:"hoangnam.average@auralms.edu.vn",tier:"average",progress:55,avatar:"HN",skills:{knowledge:75,logic:70,presentation:78,consistency:82},weeklyStudyTime:[60,80,90,75,110,95,120],weeklyScores:[7.5,7.8,8,7.5,8.2,8,8.5],achievements:[{id:"ach-3",name:"Chiến Binh Chăm Chỉ",description:"Học tập liên tục trong 7 ngày không ngắt quãng",icon:"🔥",date:"2026-07-22"}],completedLessons:["lesson-1","lesson-2"],unlockedLessons:["lesson-1","lesson-2","lesson-3","lesson-3-boost"],submittedAssignments:[{assignmentId:"assign-1",submittedDate:"2026-07-16",studentAnswer:"Tìm kiếm nhị phân là thuật toán tìm một phần tử trong danh sách đã được sắp xếp. Nó hoạt động bằng cách liên tục chia đôi khoảng tìm kiếm. Độ phức tạp là O(log n), tốt hơn nhiều so với O(n) của tìm kiếm tuần tự.",status:"graded",grade:8,rubricGrading:{content:32,argument:24,language:16,effort:8},teacherFeedback:"Em đã nêu được ý chính của thuật toán và độ phức tạp. Lập luận tương đối tốt nhưng cần giải thích rõ hơn TẠI SAO nó lại giảm đi một nửa ở mỗi bước để bài luận thuyết phục hơn. Cố gắng bứt phá ở bài tập tới nhé!"},{assignmentId:"assign-5",submittedDate:"2026-07-19",studentAnswer:"Quyết định rẽ nhánh trong code dùng if và else. Để tránh rẽ nhánh quá phức tạp, chúng ta có thể dùng switch case để tách các trường hợp. nested if làm code bị thụt lề quá nhiều, gây khó chịu cho người đọc.",status:"graded",grade:8,rubricGrading:{content:32,argument:22,language:18,effort:8},teacherFeedback:"Bài làm khá đầy đủ. Chú ý mô tả thêm về giải thuật phân loại điểm GPA cụ thể trong các bài luận sau để tăng tính thực tiễn nhé!"},{assignmentId:"assign-3",submittedDate:"2026-07-28",studentAnswer:"Mảng là một cấu trúc dữ liệu dùng để lưu trữ danh sách các phần tử có cùng kiểu dữ liệu liên tiếp nhau trong bộ nhớ. Để duyệt qua mảng, ta dùng vòng lặp for hoặc while. Ưu điểm là truy cập nhanh qua chỉ số O(1), nhược điểm là kích thước cố định (trong một số ngôn ngữ tĩnh) và việc chèn/xóa phần tử ở đầu mảng mất thời gian O(n).",status:"pending",grade:null,rubricGrading:null,teacherFeedback:""}]},{id:"student-vy",name:"Trần Thị Vy",email:"thivy.struggling@auralms.edu.vn",tier:"struggling",progress:25,avatar:"TV",skills:{knowledge:45,logic:40,presentation:55,consistency:60},weeklyStudyTime:[30,45,40,50,45,60,70],weeklyScores:[5,5.5,6,5.8,6.2,6.5,6.8],achievements:[{id:"ach-4",name:"Bước Đi Đầu Tiên",description:"Vượt qua bài học nhập môn với tinh thần quyết tâm",icon:"🌱",date:"2026-07-10"},{id:"ach-5",name:"Nỗ Lực Không Ngừng",description:"Hoàn thành bài tập ôn tập củng cố gốc",icon:"🛡️",date:"2026-07-26"}],completedLessons:["lesson-1"],unlockedLessons:["lesson-1","lesson-2","lesson-2-ref"],submittedAssignments:[{assignmentId:"assign-1",submittedDate:"2026-07-17",studentAnswer:"Tìm kiếm nhị phân là mình tìm số ở giữa trước. Nếu số cần tìm lớn hơn thì tìm bên phải, nhỏ hơn thì tìm bên trái. Cứ chia đôi ra như vậy. Nó nhanh hơn tìm từng số một từ đầu đến cuối.",status:"graded",grade:6.5,rubricGrading:{content:25,argument:18,language:14,effort:8},teacherFeedback:"Vy ơi, em đã hiểu được ý tưởng cốt lõi của tìm kiếm nhị phân là luôn chia đôi khoảng tìm kiếm rồi đó! Đây là bước tiến rất lớn. Dù chưa sử dụng các thuật ngữ chuyên sâu như độ phức tạp O(log n), cách em mô tả rất dễ hiểu. Hãy tự tin lên, cô tin em sẽ học tốt phần này!"},{assignmentId:"assign-5",submittedDate:"2026-07-20",studentAnswer:"Câu lệnh if else dùng khi mình muốn máy tính lựa chọn làm cái này hay cái kia tùy điều kiện. Ví dụ nếu điểm >= 5 thì đậu, ngược lại thì rớt. Nếu viết quá nhiều điều kiện lồng nhau thì code sẽ rối như tơ vò và rất dễ viết sai điều kiện.",status:"graded",grade:7,rubricGrading:{content:28,argument:20,language:14,effort:8},teacherFeedback:"Em đã lấy ví dụ điểm đậu/rớt rất thực tế. Lời phê cho thấy em hiểu được tác hại của việc viết lồng if quá nhiều. Cô rất vui vì sự tiến bộ của em!"},{assignmentId:"assign-4",submittedDate:"2026-07-29",studentAnswer:"Vòng lặp là để máy tính làm đi làm lại một việc mà mình không cần viết nhiều dòng code giống nhau. Ví dụ như in từ 1 đến 10. Vòng lặp while sẽ chạy khi điều kiện còn đúng, nếu quên tăng biến đếm thì máy sẽ bị treo (lặp vô tận).",status:"pending",grade:null,rubricGrading:null,teacherFeedback:""}]}],Y=[{id:"lesson-1",title:"Logic & Thuật toán Cơ bản",description:"Làm quen với tư duy máy tính, các khái niệm thuật toán và cách biểu diễn thuật toán bằng mã giả/lưu đồ.",tierType:"core",difficulty:"Dễ",time:"45 phút",order:1,content:`
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
    `},{id:"lesson-2",title:"Cấu trúc Điều kiện & Vòng lặp",description:"Học cách điều khiển luồng chương trình bằng if-else và lặp lại công việc hiệu quả bằng for/while.",tierType:"core",difficulty:"Trung bình",time:"60 phút",order:2,content:`
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
    `},{id:"lesson-2-ref",title:"Bổ trợ: Thực hành Vòng lặp Trực quan",description:"Dành riêng cho nhóm Cần hỗ trợ: Luyện tập viết vòng lặp vẽ hình để hiểu rõ cơ chế hoạt động.",tierType:"refresher",difficulty:"Dễ",time:"30 phút",parentLessonId:"lesson-2",order:2.5,content:`
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
    `},{id:"lesson-2-adv",title:"Chuyên sâu: Tối ưu hóa & Big O Notation",description:"Dành riêng cho nhóm Xuất sắc: Phân tích độ phức tạp thời gian và không gian của thuật toán vòng lặp lồng nhau.",tierType:"advanced",difficulty:"Khó",time:"90 phút",parentLessonId:"lesson-2",order:2.8,content:`
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
    `},{id:"lesson-3",title:"Mảng & Cấu trúc Dữ liệu cơ bản",description:"Tìm hiểu cách lưu trữ nhiều giá trị trong mảng, cách truy xuất, duyệt mảng và ứng dụng mảng trong thực tế.",tierType:"core",difficulty:"Trung bình",time:"75 phút",order:3,content:`
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
    `},{id:"lesson-3-boost",title:"Bứt phá: Tối ưu hóa Tìm kiếm & Sắp xếp mảng",description:"Dành cho nhóm Trung bình: Vượt ngưỡng từ O(n^2) sang O(n log n) qua các bài tập thực tế.",tierType:"boost",difficulty:"Trung bình - Khó",time:"60 phút",parentLessonId:"lesson-3",order:3.5,content:`
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
    `},{id:"lesson-4",title:"Hàm & Thiết kế mã nguồn Module",description:"Học cách đóng gói code thành các hàm có thể tái sử dụng, tham số, giá trị trả về và tư duy chia để trị.",tierType:"core",difficulty:"Trung bình",time:"90 phút",order:4,content:`
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
    `},{id:"lesson-4-adv",title:"Chuyên sâu: Thuật toán Đệ quy nâng cao",description:"Dành riêng cho nhóm Xuất sắc: Giải quyết các bài toán đệ quy có nhớ (Memoization).",tierType:"advanced",difficulty:"Khó",time:"120 phút",parentLessonId:"lesson-4",order:4.5,content:`
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
    `},{id:"lesson-5",title:"Project thực tế: Ứng dụng quản lý cá nhân",description:"Xây dựng ứng dụng hoàn chỉnh kết hợp tất cả các kiến thức đã học, thiết kế luồng xử lý và tối ưu hóa trải nghiệm.",tierType:"core",difficulty:"Khó",time:"180 phút",order:5,content:`
      <h3>Project thực tế: Ứng dụng quản lý cá nhân</h3>
      <p>Chào các bạn! Đây là bài học cuối cùng kết hợp toàn bộ kiến thức về cấu trúc mảng, vòng lặp, hàm, và thiết kế UI.</p>
      <h3>Các bước xây dựng ứng dụng hoàn chỉnh:</h3>
      <ol>
        <li><strong>Thiết kế Tầng dữ liệu (Model):</strong> Định nghĩa cấu trúc mảng đối tượng lưu trữ thông tin phần tử.</li>
        <li><strong>Xây dựng Tầng logic (Controller):</strong> Viết các hàm thêm, xóa, tìm kiếm và sắp xếp dữ liệu.</li>
        <li><strong>Tích hợp Giao diện (View):</strong> Sử dụng Javascript thao tác DOM hiển thị dữ liệu trực quan ra màn hình.</li>
      </ol>
      <p>Hãy lập kế hoạch, phân bổ các chức năng thành các hàm module độc lập để code dễ mở rộng nhất!</p>
    `}],Z=[{id:"assign-1",lessonId:"lesson-1",title:"Phân tích Thuật toán Tìm kiếm Nhị phân",type:"essay",description:"Hãy giải thích cách thức hoạt động của thuật toán tìm kiếm nhị phân. So sánh độ phức tạp của nó với tìm kiếm tuần tự và giải thích tại sao nó lại tối ưu hơn.",questionText:"Viết một bài luận ngắn (150-300 từ) phân tích thuật toán tìm kiếm nhị phân.",maxScore:10,rubric:[{id:"content",name:"Độ chính xác nội dung",weight:40,desc:"Hiểu bản chất thuật toán, cơ chế chia đôi khoảng tìm kiếm và điều kiện mảng đã sắp xếp."},{id:"argument",name:"Lập luận & So sánh",weight:30,desc:"So sánh rõ ràng với tìm kiếm tuần tự thông qua độ phức tạp Big O (O(log n) vs O(n))."},{id:"language",name:"Ngôn từ chuyên môn",weight:20,desc:"Sử dụng đúng thuật ngữ kỹ thuật, viết mạch lạc, cấu trúc rõ ràng."},{id:"effort",name:"Sự nỗ lực & Tiến bộ",weight:10,desc:"Thành ý làm bài, trình bày cẩn thận, có sự cải thiện so với các bài trước."}]},{id:"assign-5",lessonId:"lesson-2",title:"Ứng dụng Cấu trúc rẽ nhánh trong thực tế",type:"essay",description:"Hãy phân tích cách hoạt động của câu lệnh rẽ nhánh (if-else, switch-case). Trình bày ví dụ thực tế về việc phân loại điểm học sinh dựa vào điểm trung bình và giải thích tại sao việc lồng quá nhiều if-else (Nested If) lại là một bad practice.",questionText:"Trình bày ứng dụng câu lệnh rẽ nhánh if-else và cách tối ưu khi có quá nhiều điều kiện.",maxScore:10,rubric:[{id:"content",name:"Độ chính xác nội dung",weight:40,desc:"Hiểu rõ cơ chế rẽ nhánh và sử dụng đúng cú pháp điều kiện."},{id:"argument",name:"Lập luận tối ưu",weight:30,desc:"Chỉ ra được nhược điểm của lồng if-else quá sâu và đề xuất giải pháp thay thế (switch-case, early return)."},{id:"language",name:"Trình bày code sạch",weight:20,desc:"Viết mã nguồn minh họa rõ ràng, căn lề chuẩn xác, dễ đọc."},{id:"effort",name:"Sự nỗ lực học tập",weight:10,desc:"Có phân tích sâu, tự lấy ví dụ thực tiễn sinh động."}]},{id:"assign-4",lessonId:"lesson-2-ref",title:"Ý nghĩa của Vòng lặp và Tránh lỗi Lặp vô tận",type:"essay",description:"Dành cho nhóm Cần hỗ trợ: Giải thích bằng ngôn ngữ của em về lý do chúng ta cần vòng lặp trong lập trình và cách em làm sao để không gặp lỗi lặp vô hạn (treo máy).",questionText:"Giải thích tác dụng của vòng lặp và cách tránh lỗi lặp vô tận.",maxScore:10,rubric:[{id:"content",name:"Độ chính xác nội dung",weight:40,desc:"Hiểu vòng lặp dùng để lặp đi lặp lại công việc và vai trò của điều kiện dừng."},{id:"argument",name:"Lấy ví dụ thực tế",weight:30,desc:"Lấy được ví dụ gần gũi trong đời sống hoặc trong code minh họa điều kiện lặp."},{id:"language",name:"Khả năng diễn đạt",weight:20,desc:"Diễn đạt tự nhiên, tự tin, không e ngại khi nói về khó khăn lập trình."},{id:"effort",name:"Tinh thần tự học",weight:10,desc:"Chăm chỉ hoàn thành bài, câu chữ nắn nót, thể hiện sự cầu thị cao."}]},{id:"assign-6",lessonId:"lesson-2-adv",title:"Giải thuật Số nguyên tố & Sàng Eratosthenes",type:"essay",description:"Dành cho nhóm Xuất sắc: Hãy so sánh giải thuật kiểm tra số nguyên tố cơ bản độ phức tạp O(sqrt(N)) với giải thuật Sàng Eratosthenes để tìm tất cả số nguyên tố nhỏ hơn N. Giải thích nguyên lý hoạt động của Sàng Eratosthenes và cách tối ưu hóa không gian bộ nhớ.",questionText:"Phân tích và so sánh thuật toán kiểm tra số nguyên tố thông thường với Sàng Eratosthenes.",maxScore:10,rubric:[{id:"content",name:"Độ chính xác toán học",weight:40,desc:"Giải thích đúng cơ chế sàng lọc bội số và đánh giá đúng độ phức tạp thời gian O(N log log N)."},{id:"argument",name:"Chứng minh tối ưu",weight:30,desc:"Nêu rõ sự vượt trội về thời gian chạy khi N lớn và cách tối ưu bộ nhớ bằng mảng bit/boolean."},{id:"language",name:"Mã nguồn tối ưu",weight:20,desc:"Cài đặt thuật toán sàng bằng Javascript chuẩn xác, chạy đúng logic."},{id:"effort",name:"Tư duy sáng tạo",weight:10,desc:"Đề xuất thêm giải pháp Sàng phân đoạn (Segmented Sieve) cho khoảng lớn."}]},{id:"assign-7",lessonId:"lesson-3",title:"Mảng động (Dynamic Array) vs Mảng tĩnh",type:"essay",description:"Hãy so sánh sự khác nhau về mặt lưu trữ bộ nhớ và hiệu năng giữa mảng tĩnh (kích thước cố định) và mảng động (như ArrayList trong Java hay Array trong JS). Giải thích cơ chế tự nhân đôi kích thước khi mảng động bị đầy.",questionText:"So sánh cơ chế hoạt động, ưu/nhược điểm của mảng động và mảng tĩnh.",maxScore:10,rubric:[{id:"content",name:"Độ chính xác nội dung",weight:40,desc:"Nêu rõ cơ chế cấp phát bộ nhớ động, cách nhân đôi dung lượng (resize) và copy phần tử sang mảng mới."},{id:"argument",name:"Độ phức tạp khấu hao",weight:30,desc:"Giải thích được tại sao phép chèn vào mảng động có độ phức tạp khấu hao (Amortized Time Complexity) là O(1)."},{id:"language",name:"Diễn đạt khoa học",weight:20,desc:"Bản so sánh mạch lạc, lập luận logic, sử dụng đúng thuật ngữ chuyên môn."},{id:"effort",name:"Chi tiết & Đầy đủ",weight:10,desc:"Trình bày cẩn thận, có sơ đồ biểu diễn bộ nhớ bằng ký tự hoặc ví dụ minh họa."}]},{id:"assign-3",lessonId:"lesson-3-boost",title:"Ứng dụng và hạn chế của Mảng",type:"essay",description:"Dành cho nhóm Trung bình: Hãy nêu định nghĩa về cấu trúc dữ liệu mảng, các thao tác cơ bản trên mảng và phân tích ưu, nhược điểm của mảng trong bộ nhớ máy tính.",questionText:"Trình bày về mảng, ưu/nhược điểm và cách duyệt qua mảng.",maxScore:10,rubric:[{id:"content",name:"Độ chính xác nội dung",weight:40,desc:"Định nghĩa đúng mảng, cách cấp phát bộ nhớ liên tục và truy xuất chỉ số."},{id:"argument",name:"Phân tích ưu nhược điểm",weight:30,desc:"Nêu được ưu điểm O(1) truy cập, nhược điểm O(n) chèn/xóa và kích thước cố định."},{id:"language",name:"Rõ ràng & Rành mạch",weight:20,desc:"Bài viết logic, dễ hiểu, trình bày có hệ thống đầu dòng."},{id:"effort",name:"Sự cố gắng bứt phá",weight:10,desc:"Có ví dụ minh họa trực quan hoặc liên hệ ứng dụng cụ thể."}]},{id:"assign-8",lessonId:"lesson-4",title:"Thiết kế Hàm sạch (Clean Function)",type:"essay",description:"Trong phát triển phần mềm chuyên nghiệp, việc viết mã nguồn sạch là tối quan trọng. Hãy phân tích các tiêu chuẩn của một 'Hàm sạch' (Clean Function) bao gồm: Nguyên lý Đơn nhiệm (Single Responsibility Principle), Hàm thuần khiết (Pure Function), hạn chế tác dụng phụ (Side Effects) và cách đặt tên hàm ý nghĩa.",questionText:"Trình bày các tiêu chuẩn thiết kế hàm sạch và lợi ích trong việc bảo trì dự án.",maxScore:10,rubric:[{id:"content",name:"Khái niệm hàm sạch",weight:40,desc:"Định nghĩa chính xác Pure Function, Side Effect và nguyên lý Single Responsibility."},{id:"argument",name:"Tầm quan trọng bảo trì",weight:30,desc:"Giải thích rõ tại sao viết hàm sạch giúp việc viết Unit Test và bảo trì code dễ dàng hơn."},{id:"language",name:"Code mẫu Clean vs Dirty",weight:20,desc:"Cung cấp ví dụ thực tế so sánh một đoạn code viết tệ (dirty) và sau khi được refactor thành hàm sạch (clean)."},{id:"effort",name:"Mức độ đầu tư",weight:10,desc:"Bài luận trình bày khoa học, lấy ví dụ thực tiễn lập trình sinh động."}]},{id:"assign-2",lessonId:"lesson-4-adv",title:"Tối ưu hóa đệ quy tính số Fibonacci",type:"essay",description:"Dành cho nhóm Xuất sắc: Phân tích bài toán tính Fibonacci bằng đệ quy thường và đề xuất giải pháp tối ưu hóa bằng Quy hoạch động hoặc Khử đệ quy. Viết code minh họa.",questionText:"Giải thích nhược điểm đệ quy thường và trình bày giải pháp tối ưu hóa đệ quy Fibonacci kèm code mẫu.",maxScore:10,rubric:[{id:"content",name:"Độ chính xác nội dung",weight:40,desc:"Chỉ ra nhược điểm O(2^n) do trùng lặp bài toán con, đưa ra cách khắc phục chính xác."},{id:"argument",name:"Lập luận & So sánh",weight:30,desc:"Chứng minh sự cải thiện độ phức tạp xuống O(n) về mặt toán học."},{id:"language",name:"Mã nguồn tối ưu",weight:20,desc:"Viết code sạch, chạy đúng, có giải thích các biến và logic."},{id:"effort",name:"Ý tưởng đột phá",weight:10,desc:"Đề xuất thêm giải pháp không gian bộ nhớ O(1) hoặc các góc nhìn độc đáo."}]},{id:"assign-9",lessonId:"lesson-5",title:"Hoạch định Kiến trúc Ứng dụng CRUD",type:"essay",description:"Hãy phác thảo kế hoạch kiến trúc cho một ứng dụng CRUD nhỏ (ví dụ: Quản lý thư viện sách). Trình bày cách em thiết kế cấu trúc dữ liệu lưu trữ mảng đối tượng sách, viết các hàm xử lý logic (Thêm, Sửa, Xóa, Tìm kiếm) và cơ chế cập nhật giao diện (DOM Rendering) đồng bộ.",questionText:"Phác thảo kiến trúc lập trình ứng dụng CRUD quản lý dữ liệu mảng đối tượng.",maxScore:10,rubric:[{id:"content",name:"Thiết kế mô hình dữ liệu",weight:40,desc:"Thiết kế mảng đối tượng hợp lý, khai báo đầy đủ các hàm xử lý logic cần thiết."},{id:"argument",name:"Đồng bộ hóa dữ liệu",weight:30,desc:"Mô tả giải pháp đồng bộ trạng thái lưu trữ LocalStorage với giao diện hiển thị tránh lỗi dữ liệu."},{id:"language",name:"Tính tái sử dụng mã",weight:20,desc:"Lập kế hoạch chia nhỏ code thành các module/hàm độc lập dễ tái sử dụng."},{id:"effort",name:"Tính ứng dụng thực tế",weight:10,desc:"Kế hoạch hoàn chỉnh, thực tế, thể hiện được tư duy xây dựng phần mềm bài bản."}]}];class tt{constructor(){this.state={currentRole:"student",currentStudentId:"student-vy",activeTab:"dashboard",students:[],lessons:Y,assignments:Z},this.listeners=[]}init(){const e=localStorage.getItem("auralms_state");if(e)try{const n=JSON.parse(e);this.state={...this.state,...n},V.forEach(t=>{const i=this.state.students.find(s=>s.id===t.id);i&&t.submittedAssignments.forEach(s=>{i.submittedAssignments.some(g=>g.assignmentId===s.assignmentId)||i.submittedAssignments.push(s)})}),this.save()}catch(n){console.error("Error loading state from localStorage",n),this.loadDefaults()}else this.loadDefaults()}loadDefaults(){this.state.students=JSON.parse(JSON.stringify(V)),this.save()}save(){localStorage.setItem("auralms_state",JSON.stringify({currentRole:this.state.currentRole,currentStudentId:this.state.currentStudentId,activeTab:this.state.activeTab,students:this.state.students})),this.notify()}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(n=>n!==e)}}notify(){this.listeners.forEach(e=>e(this.state))}setRole(e){this.state.currentRole=e,e==="teacher"?this.state.activeTab="overview":this.state.activeTab="dashboard",this.save()}selectStudent(e){this.state.currentStudentId=e,this.state.currentRole==="student"&&(this.state.activeTab="dashboard"),this.save()}setTab(e){this.state.activeTab=e,this.save()}getStudent(e=this.state.currentStudentId){return this.state.students.find(n=>n.id===e)}submitAssignment(e,n,t){const i=this.state.students.find(g=>g.id===e);if(!i)return;const s=i.submittedAssignments.findIndex(g=>g.assignmentId===n),r={assignmentId:n,submittedDate:new Date().toISOString().split("T")[0],studentAnswer:t,status:"pending",grade:null,rubricGrading:null,teacherFeedback:""};s>=0?i.submittedAssignments[s]=r:i.submittedAssignments.push(r),this.save()}completeLesson(e,n){const t=this.state.students.find(i=>i.id===e);if(t&&!t.completedLessons.includes(n)){t.completedLessons.push(n);const i=this.state.lessons.find(s=>s.id===n);if(i&&i.tierType==="core"){const s=this.state.lessons.find(r=>r.tierType==="core"&&r.order===i.order+1);s&&!t.unlockedLessons.includes(s.id)&&t.unlockedLessons.push(s.id)}t.skills.knowledge=Math.min(100,t.skills.knowledge+5),t.skills.consistency=Math.min(100,t.skills.consistency+2),this.save()}}gradeAssignment(e,n,t,i){const s=this.state.students.find(p=>p.id===e);if(!s)return;const r=s.submittedAssignments.find(p=>p.assignmentId===n);if(!r)return;const g=(t.content||0)+(t.argument||0)+(t.language||0)+(t.effort||0),b=Math.round(g/10*10)/10;r.status="graded",r.grade=b,r.rubricGrading={...t},r.teacherFeedback=i,s.weeklyScores.push(b),s.weeklyScores.length>7&&s.weeklyScores.shift(),s.skills.knowledge=Math.min(100,Math.round(s.skills.knowledge*.9+t.content/40*100*.1)),s.skills.logic=Math.min(100,Math.round(s.skills.logic*.9+t.argument/30*100*.1)),s.skills.presentation=Math.min(100,Math.round(s.skills.presentation*.9+t.language/20*100*.1)),s.skills.consistency=Math.min(100,s.skills.consistency+3),this.applyAdaptiveRules(s,n,b),this.save()}applyAdaptiveRules(e,n,t){e.id==="student-vy"&&n==="assign-4"&&t>=7&&(e.completedLessons.includes("lesson-2-ref")||e.completedLessons.push("lesson-2-ref"),e.completedLessons.includes("lesson-2")||e.completedLessons.push("lesson-2"),e.unlockedLessons.includes("lesson-3")||e.unlockedLessons.push("lesson-3"),e.achievements.find(i=>i.id==="ach-pass-ref")||e.achievements.push({id:"ach-pass-ref",name:"Bứt Phá Gốc Rễ",description:"Chinh phục bài toán Vòng lặp bổ trợ để tiến lên cấp độ mới",icon:"⚡",date:new Date().toISOString().split("T")[0]}),e.progress=Math.max(e.progress,40)),e.id==="student-nam"&&n==="assign-3"&&t>=8.5&&(e.completedLessons.includes("lesson-3-boost")||e.completedLessons.push("lesson-3-boost"),e.completedLessons.includes("lesson-3")||e.completedLessons.push("lesson-3"),e.unlockedLessons.includes("lesson-4")||e.unlockedLessons.push("lesson-4"),e.unlockedLessons.includes("lesson-4-adv")||e.unlockedLessons.push("lesson-4-adv"),e.achievements.find(i=>i.id==="ach-pass-boost")||e.achievements.push({id:"ach-pass-boost",name:"Vượt Ngưỡng Thành Công",description:"Đạt điểm giỏi ở bài tập Mảng tăng tốc để thách thức bản thân",icon:"🚀",date:new Date().toISOString().split("T")[0]}),e.progress=Math.max(e.progress,70)),e.id==="student-anh"&&n==="assign-2"&&t>=9&&(e.completedLessons.includes("lesson-4-adv")||e.completedLessons.push("lesson-4-adv"),e.completedLessons.includes("lesson-4")||e.completedLessons.push("lesson-4"),e.unlockedLessons.includes("lesson-5")||e.unlockedLessons.push("lesson-5"),e.achievements.find(i=>i.id==="ach-pass-adv")||e.achievements.push({id:"ach-pass-adv",name:"Đại Cao Thủ Thuật Toán",description:"Giải bài toán Fibonacci bằng Quy hoạch động tối ưu tuyệt đối",icon:"👑",date:new Date().toISOString().split("T")[0]}),e.progress=100),n==="assign-1"&&t>=5&&(e.completedLessons.includes("lesson-1")||e.completedLessons.push("lesson-1"),e.unlockedLessons.includes("lesson-2")||e.unlockedLessons.push("lesson-2"),e.tier==="struggling"&&!e.unlockedLessons.includes("lesson-2-ref")&&e.unlockedLessons.push("lesson-2-ref"),e.tier==="excellent"&&!e.unlockedLessons.includes("lesson-2-adv")&&e.unlockedLessons.push("lesson-2-adv"))}getRoadmapLessons(e=this.state.currentStudentId){const n=this.getStudent(e);return n?this.state.lessons.filter(t=>t.tierType==="core"?!0:t.tierType==="refresher"?n.tier==="struggling"||n.unlockedLessons.includes(t.id):t.tierType==="advanced"?n.tier==="excellent"||n.unlockedLessons.includes(t.id):t.tierType==="boost"?n.tier==="average"||n.unlockedLessons.includes(t.id):!1).sort((t,i)=>t.order-i.order):[]}getRecommendedLesson(e=this.state.currentStudentId){const n=this.getStudent(e);if(!n)return null;const t=this.getRoadmapLessons(e);return t.find(s=>n.unlockedLessons.includes(s.id)&&!n.completedLessons.includes(s.id))||t[t.length-1]}}const v=new tt;function nt(c,e){const n=document.getElementById(c);if(!n)return;const t=v.getStudent(),i=v.getRoadmapLessons(),s=v.getRecommendedLesson(),r={"lesson-1":{x:100,y:250},"lesson-2":{x:260,y:250},"lesson-2-ref":{x:260,y:390},"lesson-2-adv":{x:260,y:110},"lesson-3":{x:440,y:250},"lesson-3-boost":{x:440,y:110},"lesson-4":{x:620,y:250},"lesson-4-adv":{x:620,y:110},"lesson-5":{x:780,y:250}},g=[{from:"lesson-1",to:"lesson-2",type:"core"},{from:"lesson-2",to:"lesson-2-ref",type:"refresher"},{from:"lesson-2-ref",to:"lesson-3",type:"refresher"},{from:"lesson-2",to:"lesson-2-adv",type:"advanced"},{from:"lesson-2-adv",to:"lesson-3",type:"advanced"},{from:"lesson-2",to:"lesson-3",type:"core"},{from:"lesson-3",to:"lesson-3-boost",type:"boost"},{from:"lesson-3-boost",to:"lesson-4",type:"boost"},{from:"lesson-3",to:"lesson-4",type:"core"},{from:"lesson-4",to:"lesson-4-adv",type:"advanced"},{from:"lesson-4-adv",to:"lesson-5",type:"advanced"},{from:"lesson-4",to:"lesson-5",type:"core"}];let b=`<svg id="roadmap-svg" viewBox="0 0 900 500" width="100%" height="100%">
    <defs>
      <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
      <linearGradient id="ref-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#fdba74" />
      </linearGradient>
      <linearGradient id="adv-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#34d399" />
      </linearGradient>
      <linearGradient id="boost-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#60a5fa" />
      </linearGradient>
      
      <filter id="glow-core" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;const p=i.map(a=>a.id);g.filter(a=>!(!p.includes(a.from)||!p.includes(a.to)||t.tier==="struggling"&&a.from==="lesson-2"&&a.to==="lesson-3"||t.tier==="excellent"&&(a.from==="lesson-2"&&a.to==="lesson-3"||a.from==="lesson-4"&&a.to==="lesson-5")||t.tier==="average"&&a.from==="lesson-3"&&a.to==="lesson-4")).forEach(a=>{const d=r[a.from],l=r[a.to];if(!d||!l)return;const y=t.completedLessons.includes(a.from),f=t.unlockedLessons.includes(a.to);let o="svg-connection-line";y&&f?o+=" completed":f&&(o+=" unlocked"),a.type==="refresher"&&(o+=" refresher-path"),a.type==="advanced"&&(o+=" advanced-path"),a.type==="boost"&&(o+=" boost-path");const u=l.x-d.x,x=l.y-d.y;let k="";if(x!==0){const T=d.x+u*.4,L=d.y,B=d.x+u*.6,_=l.y;k=`M ${d.x} ${d.y} C ${T} ${L}, ${B} ${_}, ${l.x} ${l.y}`}else k=`M ${d.x} ${d.y} L ${l.x} ${l.y}`;b+=`<path d="${k}" class="${o}" />`}),i.forEach(a=>{const d=r[a.id];if(!d)return;const l=t.completedLessons.includes(a.id),y=t.unlockedLessons.includes(a.id),f=s&&s.id===a.id;let o="roadmap-node";l?o+=" completed":f?o+=" active":y||(o+=" locked"),a.tierType==="refresher"&&(o+=" refresher"),a.tierType==="advanced"&&(o+=" advanced"),a.tierType==="boost"&&(o+=" boost");let u="🔒";y&&(l?u="✓":a.tierType==="refresher"?u="🛡️":a.tierType==="advanced"?u="👑":a.tierType==="boost"?u="🚀":u="⚡"),b+=`
      <g class="${o}" data-lesson-id="${a.id}">
        <circle cx="${d.x}" cy="${d.y}" r="${f?28:24}" class="node-circle" />
        <text x="${d.x}" y="${d.y+5}" text-anchor="middle" font-size="${l?"16px":"14px"}" font-weight="bold" fill="white" style="user-select: none;">
          ${u}
        </text>
        <text x="${d.x}" y="${d.y+42}" text-anchor="middle" font-size="11px" font-weight="600" fill="#a1a1aa" style="user-select: none;">
          ${a.title.split(":")[0]}
        </text>
      </g>
    `}),b+="</svg>",n.innerHTML=`
    <div class="glass-card" style="width:100%; overflow: auto;">
      <div class="dashboard-heading">
        <div>
          <h3 style="font-size: 18px; margin-bottom: 4px;">Bản đồ học tập cá nhân hóa</h3>
          <p class="dashboard-title-sub">Lộ trình động tự động rẽ nhánh dựa vào điểm kiểm tra và lực học</p>
        </div>
        <div style="display:flex; gap:10px; font-size:11px;">
          <span class="badge-pill core">Cốt lõi</span>
          ${t.tier==="struggling"?'<span class="badge-pill refresher">Bổ trợ gốc</span>':""}
          ${t.tier==="average"?'<span class="badge-pill boost">Bứt phá</span>':""}
          ${t.tier==="excellent"?'<span class="badge-pill advanced">Chuyên sâu</span>':""}
        </div>
      </div>
      <div class="roadmap-container">
        ${b}
      </div>
      <div id="lesson-detail-panel" class="lesson-quickview glass-card" style="margin-top: 24px; border-color: rgba(139, 92, 246, 0.15); display:none;">
        <!-- Details loaded dynamically -->
      </div>
    </div>
  `,n.querySelectorAll(".roadmap-node").forEach(a=>{a.addEventListener("click",()=>{const d=a.getAttribute("data-lesson-id"),l=i.find(y=>y.id===d);l&&D(l,t,e)})}),s&&n.querySelector(`[data-lesson-id="${s.id}"]`)&&D(s,t,e)}function D(c,e,n){const t=document.getElementById("lesson-detail-panel");if(!t)return;const i=e.unlockedLessons.includes(c.id),s=e.completedLessons.includes(c.id);let r="Đang khóa",g="locked";i&&(s?(r="Đã hoàn thành",g="completed"):(r="Sẵn sàng học",g="todo"));const p=v.state.assignments.find(l=>l.lessonId===c.id);t.style.display="flex",t.style.flexDirection="column",t.style.gap="14px",t.classList.add("show");let h='<span class="badge-pill core">Core</span>';c.tierType==="refresher"&&(h='<span class="badge-pill refresher">Bổ trợ Mất Gốc</span>'),c.tierType==="advanced"&&(h='<span class="badge-pill advanced">Chuyên Sâu Thử Thách</span>'),c.tierType==="boost"&&(h='<span class="badge-pill boost">Bứt Phá Điểm Số</span>');let m="";if(i){if(m+=`
      <button class="action-btn" id="btn-read-lecture" style="margin-top: 8px; background: rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:var(--text-primary); box-shadow:none;">
        <svg style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span>Đọc Bài Giảng Lý Thuyết</span>
      </button>
    `,p){const l=e.submittedAssignments.find(f=>f.assignmentId===p.id);let y="Làm Bài Tập Tự Luận";l&&(l.status==="graded"?y="Xem Báo Cáo Chấm Điểm":y="Xem Bài Đã Nộp (Chờ chấm)"),m+=`
        <button class="action-btn" id="btn-start-lesson" style="margin-top: 8px;">
          <span>${y}</span>
          <svg style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      `}}else m=`
      <button class="action-btn" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); color:var(--text-muted); cursor:not-allowed; box-shadow:none; margin-top: 8px;" disabled>
        <span>Bài học đang được khóa</span>
      </button>
    `;t.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div>
        <div style="display:flex; align-items:center; gap:10px; margin-bottom: 6px;">
          ${h}
          <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">Độ khó: ${c.difficulty}</span>
          <span style="font-size:12px; color:var(--text-muted);">• Thời gian học: ${c.time}</span>
        </div>
        <h4 style="font-size:18px; color:var(--text-primary); margin-bottom: 6px;">${c.title}</h4>
      </div>
      <span class="quest-status ${g}">${r}</span>
    </div>
    <p style="font-size:14px; color:var(--text-secondary); line-height:1.6;">${c.description}</p>
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      ${m}
    </div>
  `;const a=document.getElementById("btn-read-lecture");a&&i&&a.addEventListener("click",()=>{J(c,e,n)});const d=document.getElementById("btn-start-lesson");d&&i&&d.addEventListener("click",()=>{p&&n(p.id)})}function J(c,e,n){const t=document.getElementById("lecture-modal"),i=document.getElementById("lecture-modal-title"),s=document.getElementById("lecture-modal-body"),r=document.getElementById("btn-close-lecture"),g=document.getElementById("btn-complete-lecture");if(!t||!i||!s||!r||!g)return;i.innerText=c.title,s.innerHTML=c.content||"<p>Nội dung bài giảng đang được cập nhật...</p>",t.style.display="flex",r.onclick=()=>{t.style.display="none"};const p=v.state.assignments.find(h=>h.lessonId===c.id);p?g.querySelector("span").innerText="Đã hiểu bài giảng • Đi tới phần làm bài tập":g.querySelector("span").innerText="Đã học xong lý thuyết • Hoàn thành bài giảng",g.onclick=()=>{t.style.display="none",typeof confetti=="function"&&confetti({particleCount:60,spread:40,origin:{y:.8}}),v.completeLesson(e.id,c.id),p?(O("Chúc mừng! Bạn đã hoàn thành phần lý thuyết. Hãy làm bài tập tự luận bên dưới để củng cố nhé.","success"),n(p.id)):O(`Chúc mừng! Bạn đã hoàn thành bài học: ${c.title}`,"success")}}function O(c,e="success"){const n=document.getElementById("toast-container");if(!n)return;const t=document.createElement("div");t.className=`toast ${e}`;let i="🔔";e==="success"&&(i="✓"),e==="info"&&(i="ℹ️"),t.innerHTML=`
    <span>${i}</span>
    <span>${c}</span>
  `,n.appendChild(t),setTimeout(()=>{t.style.animation="slideInRight 0.3s ease-in reverse",setTimeout(()=>{t.remove()},300)},3500)}function S(c,e=null,n=null){const t=document.getElementById(c);if(!t)return;const i=v.state,s=[];i.students.forEach(h=>{h.submittedAssignments.forEach(m=>{const a=i.assignments.find(d=>d.id===m.assignmentId);s.push({student:h,submission:m,assignment:a})})}),s.sort((h,m)=>h.submission.status==="pending"&&m.submission.status!=="pending"?-1:h.submission.status!=="pending"&&m.submission.status==="pending"?1:new Date(m.submission.submittedDate)-new Date(h.submission.submittedDate));let r=null;e&&n?r=s.find(h=>h.student.id===e&&h.assignment.id===n):e&&(r=s.find(h=>h.assignment.id===e)),!r&&s.length>0&&(r=s[0]);let g="";s.length===0?g='<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size:14px;">Chưa có bài nộp nào cần chấm.</div>':s.forEach(h=>{const m=r&&r.student.id===h.student.id&&r.assignment.id===h.assignment.id,a=h.submission.status==="pending"?"Chưa chấm":`Điểm: ${h.submission.grade}`,d=h.submission.status==="pending"?"pending":"graded";let l="";h.student.tier==="excellent"&&(l='<span class="badge-pill core" style="font-size:9px; background:var(--tier-excellent-bg); color:var(--tier-excellent)">Xuất sắc</span>'),h.student.tier==="average"&&(l='<span class="badge-pill core" style="font-size:9px; background:var(--tier-average-bg); color:var(--tier-average)">Trung bình</span>'),h.student.tier==="struggling"&&(l='<span class="badge-pill core" style="font-size:9px; background:var(--tier-struggling-bg); color:var(--tier-struggling)">Cần hỗ trợ</span>'),g+=`
        <div class="quest-item homework-card-item ${m?"active":""}" 
             data-student-id="${h.student.id}" 
             data-assign-id="${h.assignment.id}"
             style="cursor:pointer; margin-bottom: 8px;">
          <div class="quest-left">
            <div class="user-avatar" style="width:32px; height:32px; font-size:12px; box-shadow:none;">
              ${h.student.avatar}
            </div>
            <div class="quest-info">
              <span class="quest-title" style="font-size:13px;">${h.student.name} ${l}</span>
              <span style="font-size:11px; color:var(--text-secondary);">${h.assignment.title}</span>
            </div>
          </div>
          <span class="homework-status-badge ${d}">${a}</span>
        </div>
      `});let b="";if(r){const h=r.student,m=r.submission,a=r.assignment,d=m.status==="graded",l=m.rubricGrading||{content:20,argument:15,language:10,effort:5},y=d?m.grade:((l.content+l.argument+l.language+l.effort)/10).toFixed(1);b=`
      <div class="glass-card" style="display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-light); padding-bottom:12px;">
          <div>
            <span style="font-size:12px; color:var(--accent-purple); font-weight:700;">ĐANG CHẤM BÀI</span>
            <h3 style="font-size:18px; margin-top:2px;">${a.title}</h3>
          </div>
          <div style="text-align:right;">
            <div style="font-size:14px; font-weight:700; color:var(--text-primary);">${h.name}</div>
            <span class="tier-tag ${h.tier}" style="font-size:9px; padding:2px 8px; margin-top:4px;">Nhóm: ${h.tier==="excellent"?"Xuất sắc":h.tier==="average"?"Trung bình":"Cần hỗ trợ"}</span>
          </div>
        </div>

        <div>
          <h4 style="font-size:14px; color:var(--text-secondary); margin-bottom:8px;">Đề bài yêu cầu:</h4>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.5; background:rgba(255,255,255,0.01); border:1px solid var(--border-light); padding:10px 14px; border-radius:8px;">
            ${a.questionText}
          </p>
        </div>

        <div>
          <h4 style="font-size:14px; color:var(--text-secondary); margin-bottom:8px;">Bài làm của học viên (Tự luận):</h4>
          <div class="submitted-answer-box">
${G(m.studentAnswer)}
          </div>
        </div>
      </div>

      <div class="glass-card" style="display:flex; flex-direction:column; gap:18px;">
        <h3 style="font-size:16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px;">Tiêu chí chấm điểm (Rubrics)</h3>
        
        <div class="rubric-interactive-list">
          <!-- Content score -->
          <div class="rubric-slider-group">
            <div class="slider-label-row">
              <span class="slider-title">1. Độ chính xác nội dung (Tối đa 40)</span>
              <span class="slider-max"><span id="lbl-score-content">${l.content}</span> / 40</span>
            </div>
            <input type="range" class="rubric-slider" id="slider-content" min="0" max="40" value="${l.content}" ${d?"disabled":""}>
            <div class="slider-description">${a.rubric[0].desc}</div>
          </div>

          <!-- Argument score -->
          <div class="rubric-slider-group">
            <div class="slider-label-row">
              <span class="slider-title">2. Lập luận & Phân tích (Tối đa 30)</span>
              <span class="slider-max"><span id="lbl-score-argument">${l.argument}</span> / 30</span>
            </div>
            <input type="range" class="rubric-slider" id="slider-argument" min="0" max="30" value="${l.argument}" ${d?"disabled":""}>
            <div class="slider-description">${a.rubric[1].desc}</div>
          </div>

          <!-- Language score -->
          <div class="rubric-slider-group">
            <div class="slider-label-row">
              <span class="slider-title">3. Khả năng diễn đạt & Mã nguồn (Tối đa 20)</span>
              <span class="slider-max"><span id="lbl-score-language">${l.language}</span> / 20</span>
            </div>
            <input type="range" class="rubric-slider" id="slider-language" min="0" max="20" value="${l.language}" ${d?"disabled":""}>
            <div class="slider-description">${a.rubric[2].desc}</div>
          </div>

          <!-- Effort score (PROPOSAL FOR FAIR GRADING) -->
          <div class="rubric-slider-group">
            <div class="slider-label-row">
              <span class="slider-title">4. Sự nỗ lực & Cải thiện (Tối đa 10)</span>
              <span class="slider-max"><span id="lbl-score-effort">${l.effort}</span> / 10</span>
            </div>
            <input type="range" class="rubric-slider" id="slider-effort" min="0" max="10" value="${l.effort}" ${d?"disabled":""}>
            <div class="slider-description">Nhằm khích lệ sự nỗ lực vượt khó (đặc biệt quan trọng đối với học viên mất gốc).</div>
          </div>
        </div>

        <div class="grade-visualizer">
          <div>
            <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">ĐIỂM SỐ TÍNH TOÁN:</span>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Tổng điểm quy đổi về thang 10</div>
          </div>
          <div class="visual-grade-badge"><span id="lbl-final-grade">${y}</span> / 10</div>
        </div>

        <!-- AI Feedback Draft Generator -->
        <div class="ai-feedback-generation-panel">
          <div class="ai-header-bar">
            <span class="ai-title">
              <svg style="width:14px; height:14px;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
              </svg>
              AI Feedback Draft Assistant
            </span>
            ${d?"":'<button class="btn-ai-generate" id="btn-generate-feedback">Soạn Thảo Phản Hồi Bằng AI</button>'}
          </div>
          <div style="font-size:11px; color:var(--text-secondary); margin-bottom:8px;">
            AI tự động thiết kế nội dung nhận xét dựa trên điểm rubric và mức độ học lực của học sinh để đảm bảo tính khích lệ, công bằng.
          </div>
          <textarea class="editor-textarea" id="txt-feedback-content" style="min-height: 120px; font-size:12px;" placeholder="Bấm nút soạn phản hồi AI hoặc tự viết nhận xét tại đây..." ${d?"readonly":""}>${G(m.teacherFeedback)}</textarea>
        </div>

        ${d?`
          <div style="display:flex; align-items:center; gap:8px; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.2); padding:12px; border-radius:8px; color:var(--tier-excellent); font-size:13px; font-weight:600;">
            <svg style="width:18px; height:18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bài tập này đã được chấm điểm thành công.
          </div>
        `:`
          <button class="action-btn" id="btn-submit-grade" style="width:100%; justify-content:center;">
            <span>LƯU ĐIỂM & GỬI PHẢN HỒI</span>
          </button>
        `}
      </div>
    `}else b=`
      <div class="glass-card" style="grid-column: span 2; display:flex; flex-direction:column; justify-content:center; align-items:center; height:300px; color:var(--text-muted);">
        <svg style="width:48px;height:48px;stroke:currentColor;opacity:0.3;margin-bottom:12px;" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <span>Chưa chọn bài làm nào để chấm.</span>
      </div>
    `;if(t.innerHTML=`
    <div class="grading-split">
      <div class="glass-card" style="display:flex; flex-direction:column; gap:16px; height:fit-content;">
        <div>
          <h3 style="font-size: 18px; margin-bottom:4px;">Danh sách bài nộp</h3>
          <p class="dashboard-title-sub">Tổng số: ${s.length} bài đã nộp từ học sinh</p>
        </div>
        <div class="homework-list" style="margin-top: 10px;">
          ${g}
        </div>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:24px;">
        ${b}
      </div>
    </div>
  `,t.querySelectorAll(".homework-card-item").forEach(h=>{h.addEventListener("click",()=>{const m=h.getAttribute("data-student-id"),a=h.getAttribute("data-assign-id");S(c,m,a)})}),r&&r.submission.status==="pending"){const h=document.getElementById("slider-content"),m=document.getElementById("slider-argument"),a=document.getElementById("slider-language"),d=document.getElementById("slider-effort");[h,m,a,d].forEach(o=>{o.addEventListener("input",()=>{const u=parseInt(h.value),x=parseInt(m.value),k=parseInt(a.value),T=parseInt(d.value);document.getElementById("lbl-score-content").innerText=u,document.getElementById("lbl-score-argument").innerText=x,document.getElementById("lbl-score-language").innerText=k,document.getElementById("lbl-score-effort").innerText=T;const B=((u+x+k+T)/10).toFixed(1);document.getElementById("lbl-final-grade").innerText=B})});const y=document.getElementById("btn-generate-feedback");y&&y.addEventListener("click",()=>{const o=parseInt(h.value),u=parseInt(m.value),x=parseInt(a.value),k=parseInt(d.value),L=(o+u+x+k)/10,B=et(r.student,r.assignment,{content:o,argument:u,effort:k,finalGrade:L});document.getElementById("txt-feedback-content").value=B});const f=document.getElementById("btn-submit-grade");f&&f.addEventListener("click",()=>{const o=parseInt(h.value),u=parseInt(m.value),x=parseInt(a.value),k=parseInt(d.value),T=document.getElementById("txt-feedback-content").value;v.gradeAssignment(r.student.id,r.assignment.id,{content:o,argument:u,language:x,effort:k},T),it(`Đã chấm điểm thành công cho học viên ${r.student.name}!`,"success"),S(c,r.student.id,r.assignment.id)})}}function et(c,e,n){const t=n.finalGrade;if(c.tier==="struggling"){let i="Chào Vy, cô rất trân trọng nỗ lực của em khi hoàn thành bài tự luận này. Đọc bài làm của em, cô thấy được sự cố gắng lớn để củng cố gốc rễ lập trình.",s="";n.content>=28?s="Em đã hiểu rất tốt ý chính của bài giảng, nắm bắt chính xác logic cốt lõi.":s="Mặc dù còn một số khái niệm nhỏ chưa thật sự chính xác, nhưng em đã định hình được ý tưởng cốt lõi. Điều này rất đáng khen ngợi!";let r=`Cô đánh giá cao điểm Sự nỗ lực cải thiện của em (${n.effort}/10). Em đã viết nắn nót, giải thích bằng ngôn ngữ tự nhiên rất dễ hiểu.`,g="";return t>=7?g=`Với kết quả rất khả quan này (${t}/10), hệ thống đã mở khóa chương tiếp theo là "Mảng & Cấu trúc dữ liệu". Em có thể quay lại Bản đồ học tập để học tiếp ngay. Cố lên nhé, cô tin em đang tiến bộ từng ngày!`:g="Để hiểu rõ hơn và củng cố thêm, em hãy cùng Trợ lý AI ở góc phải màn hình trao đổi về bài tập ôn tập vòng lặp bổ trợ. Chúng ta sẽ cùng nhau tháo gỡ từng bước một!",`${i}

- Nhận xét nội dung: ${s}
- Nhận xét sự tiến bộ: ${r}

Lời khuyên: ${g}`}if(c.tier==="average"){let i="Chào Nam, bài làm của em rất đầy đủ và phong độ ổn định. Em đã hoàn thành tốt các yêu cầu cơ bản của bài tập này.",s="";n.argument>=24?s="Khả năng phân tích của em tương đối tốt.":s="Phần giải thích lý thuyết và ví dụ bổ trợ còn hơi sơ sài. Để bứt phá lên nhóm xuất sắc, em cần giải thích sâu hơn về nguyên lý hoạt động của cấu trúc hoặc độ phức tạp.";let r="";return t>=8.5?r=`Điểm số tuyệt vời (${t}/10)! Em đã vượt ngưỡng thử thách thành công. Cô đã đặc biệt mở khóa bài học Chuyên sâu Đệ quy nâng cao cho em thử sức. Hãy chứng tỏ năng lực của mình ở mốc học tiếp theo nhé!`:r='Để bứt phá điểm số cao hơn ở các bài sau, em nên tập trung vào các câu hỏi phụ mang tính tư duy tối ưu trong các bài học "Bứt phá" (Boost). Cố gắng đẩy mạnh tư duy logic hơn nữa nhé!',`${i}

- Ưu điểm: Lập trình chạy đúng và viết code tương đối sạch.
- Điểm cần cải thiện: ${s}

Lộ trình đề xuất: ${r}`}if(c.tier==="excellent"){let i="Chào Minh Anh, bài làm xuất sắc như thường lệ. Em nắm bắt tư duy thuật toán vô cùng nhanh và áp dụng lý thuyết vào bài viết rất chuyên nghiệp.",s="Lập luận của em về độ phức tạp bộ nhớ và thuật toán cực kỳ chặt chẽ. Cách em so sánh Big O giữa các thuật toán chứng tỏ tư duy phân tích sâu sắc.",r="";return t>=9.5?r="Để thử thách khả năng của em hơn nữa, cô có câu hỏi phụ này: Em nghĩ thuật toán này sẽ bị ảnh hưởng như thế nào nếu dữ liệu đầu vào phân bố theo một mô hình đặc biệt (ví dụ: mảng đã gần sắp xếp hoàn toàn)? Hãy nghiên cứu sâu hơn và thảo luận cùng cô trong giờ sau nhé! Lộ trình của em đã được chuyển thẳng tới Project thực tế nâng cao.":r="Hãy chú ý tối ưu hóa hơn nữa về mặt tài nguyên bộ nhớ (space complexity) trong các dòng code mẫu. Em đã hoàn thành phần học này và sẵn sàng chuyển sang phần nâng cao kế tiếp.",`${i}

- Nhận xét chi tiết: ${s}

Thử thách thêm: ${r}`}return`Chào em, bài làm của em đã được chấm thành công với điểm số là ${t}/10. Hãy xem bảng phân tích Rubric để biết chi tiết nhé!`}function G(c){return c?c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function it(c,e="success"){const n=document.getElementById("toast-container");if(!n)return;const t=document.createElement("div");t.className=`toast ${e}`;let i="🔔";e==="success"&&(i="✓"),e==="info"&&(i="ℹ️"),t.innerHTML=`
    <span>${i}</span>
    <span>${c}</span>
  `,n.appendChild(t),setTimeout(()=>{t.style.animation="slideInRight 0.3s ease-in reverse",setTimeout(()=>{t.remove()},300)},3500)}function st(){if(document.getElementById("ai-companion-widget"))return;const c=document.createElement("div");c.id="ai-companion-widget",c.className="ai-companion-widget",c.innerHTML=`
    <!-- Chat window -->
    <div class="companion-chat-window" id="companion-chat-window">
      <div class="chat-header">
        <div class="chat-avatar-container">
          <div class="chat-bot-avatar">🤖</div>
          <div class="chat-header-text">
            <span class="chat-bot-name" id="companion-bot-name">Aura AI Companion</span>
            <span class="chat-bot-status" id="companion-bot-status">Đang trực tuyến</span>
          </div>
        </div>
        <button class="btn-close-chat" id="btn-close-chat">
          <svg style="width:16px; height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="chat-messages" id="companion-chat-messages">
        <!-- Message bubble items -->
      </div>

      <div style="padding: 6px 14px; background: rgba(0,0,0,0.2); display: flex; gap: 6px; overflow-x: auto; border-top: 1px solid var(--border-light);" id="companion-suggestions">
        <!-- Prompt suggestions dynamic based on student level -->
      </div>
      
      <div class="chat-input-area">
        <input type="text" class="chat-input" id="companion-chat-input" placeholder="Nhập câu hỏi của em...">
        <button class="chat-send-btn" id="companion-send-btn">
          <svg style="width:14px; height:14px;" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Toggle button -->
    <div class="companion-trigger" id="companion-trigger">
      <svg viewBox="0 0 24 24">
        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8 0 1.63.49 3.14 1.32 4.4L4.1 19.9l3.5-.78C8.86 19.51 10.37 20 12 20c4.42 0 8-3.58 8-8s-3.58-8-8-8zm-1 3h2v2h-2V7zm0 4h2v6h-2v-6z"/>
      </svg>
    </div>
  `,document.body.appendChild(c);const e=document.getElementById("companion-trigger"),n=document.getElementById("companion-chat-window"),t=document.getElementById("btn-close-chat"),i=document.getElementById("companion-send-btn"),s=document.getElementById("companion-chat-input");document.getElementById("companion-chat-messages"),e.addEventListener("click",()=>{n.classList.toggle("show"),n.classList.contains("show")&&(s.focus(),P())}),t.addEventListener("click",()=>{n.classList.remove("show")}),i.addEventListener("click",F),s.addEventListener("keypress",r=>{r.key==="Enter"&&F()}),v.subscribe(()=>{n.classList.contains("show")&&P()})}let R=null;function P(){const c=v.getStudent();if(!c||R===c.id)return;R=c.id;const e=document.getElementById("companion-chat-messages"),n=document.getElementById("companion-bot-name"),t=document.getElementById("companion-bot-status"),i=document.getElementById("companion-suggestions");e.innerHTML="";let s="",r="",g="",b=[];c.tier==="struggling"?(s="Aura Trợ Lý Cổ Vũ (Vy)",r="Đang trực tuyến • Sẵn sàng hướng dẫn từng bước",g="Chào Vy đáng yêu! 🌟 Hôm nay em học thế nào rồi? Đừng lo lắng nếu bài học có chỗ khó nhé. Cô ở đây để giúp em chia nhỏ kiến thức ra. Em muốn cùng cô xem qua phần nào nè?",b=["Giải thích vòng lặp là gì một cách dễ hiểu 🍉","Giúp em gỡ lỗi treo máy (lặp vô hạn) 🛠️","Nhiệm vụ hôm nay của em là gì?"]):c.tier==="average"?(s="Aura Trợ Lý Bứt Phá (Nam)",r="Đang trực tuyến • Kích hoạt chế độ Tăng tốc",g="Chào Nam! Phong độ của em rất ổn định. Mục tiêu tuần này là bứt phá lên nhóm dẫn đầu đấy nhé! Em đang gặp vướng mắc gì trong bài tập Mảng để tối ưu hóa hiệu suất?",b=["Mẹo tối ưu thời gian chạy của vòng lặp","Làm sao để mảng chèn xóa nhanh hơn?","Gợi ý thử thách Vượt ngưỡng tuần này"]):c.tier==="excellent"&&(s="Aura Trợ Lý Tư Duy Sâu (Anh)",r="Đang trực tuyến • Chế độ Thử thách nâng cao",g="Chào Minh Anh. Rất vui được thảo luận cùng một học viên xuất sắc. Đề xuất thuật toán đệ quy của em rất ấn tượng. Em có muốn trao đổi về các bài toán tối ưu hóa thuật toán phức tạp hơn không?",b=["Ý tưởng tối ưu Fibonacci bộ nhớ O(1)","Giải thích Quy hoạch động so với Đệ quy","Đề xuất tài liệu nâng cao về Graph/Tree"]),n.innerText=s,t.innerText=r,E("bot",g),i.innerHTML="",b.forEach(p=>{const h=document.createElement("button");h.className="btn-ai-generate",h.style.whiteSpace="nowrap",h.style.fontSize="11px",h.style.padding="4px 8px",h.innerText=p,h.addEventListener("click",()=>{E("user",p),W(p,c)}),i.appendChild(h)})}function E(c,e){const n=document.getElementById("companion-chat-messages");if(!n)return;const t=document.createElement("div");t.className=`chat-message ${c}`,t.innerHTML=e.replace(/\n/g,"<br>"),n.appendChild(t),n.scrollTop=n.scrollHeight}function F(){const c=document.getElementById("companion-chat-input");if(!c)return;const e=c.value.trim();if(!e)return;E("user",e),c.value="";const n=v.getStudent();setTimeout(()=>{W(e,n)},700)}function W(c,e){const n=c.toLowerCase();let t="";e.tier==="struggling"?n.includes("lặp")||n.includes("vòng lặp")||n.includes("loop")?t=`Dễ hiểu lắm Vy ơi! Vòng lặp giống như em đang tập viết chữ vậy đó:

1. Em bắt đầu từ trang số 1.
2. Viết xong trang đó, em đếm là 1 trang.
3. Em tự hỏi: "Mình đã viết đủ 5 trang chưa?". Nếu chưa, em lại viết tiếp trang số 2.
4. Việc viết chữ và kiểm tra cứ lặp lại như vậy cho đến khi em đếm đủ 5 trang thì dừng lại.

Trong lập trình cũng vậy: máy tính cần một **biến đếm** (như số trang) và một **điều kiện dừng** (đủ 5 trang) để biết khi nào cần dừng lại. Em đã hiểu đoạn này chưa? Hãy thử lấy một ví dụ thực tế khác đi nào!`:n.includes("treo máy")||n.includes("vô hạn")||n.includes("vô tận")?t="À, lỗi lặp vô tận là lỗi phổ biến nhất luôn! Đừng lo nha. Treo máy xảy ra khi máy tính không thấy **điều kiện dừng** bị thay đổi. Ví dụ, em bảo máy viết tiếp khi số trang nhỏ hơn 5, nhưng em quên không tăng biến đếm số trang lên (vẫn mãi là trang số 1).\n\n🛠️ **Cách khắc phục:**\nEm hãy kiểm tra xem trong thân vòng lặp của mình đã có dòng làm thay đổi biến đếm chưa (ví dụ: `i = i + 1` hoặc `i++`). Em có muốn chép đoạn code của em vào đây để cô kiểm tra giúp không?":n.includes("nhiệm vụ")||n.includes("bài tập")?t='Hôm nay nhiệm vụ của Vy là làm bài tự luận nhỏ: **"Ý nghĩa của Vòng lặp và Tránh lỗi Lặp vô tận"** ở mục Bài tập. Bài này được thiết kế riêng với các ví dụ thực tế nhẹ nhàng để em lấy lại gốc rễ. Em cứ làm hết sức mình, điểm Nỗ Lực của cô dành cho em sẽ rất cao đó! Cô tin em làm được!':t="Ý kiến của Vy rất hay! 💖 Cô luôn ở đây đồng hành cùng em. Em hãy cứ thử viết những gì em nghĩ ra nháp, hoặc hỏi cô bất kỳ từ khóa nào em chưa rõ nhé. Không có câu hỏi nào là ngớ ngẩn cả đâu!":e.tier==="average"?n.includes("tối ưu")||n.includes("vòng lặp")||n.includes("hiệu suất")?t=`Chào Nam! Để tối ưu vòng lặp, chúng ta có một số quy tắc vàng:

1. **Tránh tính toán thừa:** Đừng để các câu lệnh tính toán cố định bên trong vòng lặp. Ví dụ: thay vì viết \`for(let i=0; i < array.length; i++)\`, hãy viết \`const len = array.length; for(let i=0; i < len; i++)\`.
2. **Hạn chế vòng lặp lồng nhau:** Hai vòng lặp lồng nhau thường chạy với độ phức tạp O(n²). Hãy thử suy nghĩ xem có thể dùng mảng đánh dấu hoặc cấu trúc Map/Set để giảm xuống O(n) không?

Em có thể áp dụng ngay mẹo này vào bài tập **"Ứng dụng và hạn chế của Mảng"** đang mở để nâng tầm bài làm của mình lên Xuất sắc nhé!`:n.includes("mảng")||n.includes("array")||n.includes("chèn")?t=`Câu hỏi rất trúng trọng tâm, Nam!
Mảng được cấp phát liên tục trong bộ nhớ, nên:
- Truy cập phần tử bằng chỉ số (Index) cực nhanh: O(1).
- Nhưng **chèn hoặc xóa** ở đầu/giữa mảng thì rất chậm: O(n) vì máy tính phải dịch chuyển toàn bộ các phần tử phía sau sang một ô mới.

💡 **Mẹo bứt phá:** Trong các bài toán thực tế, nếu thao tác chèn/xóa xảy ra liên tục, người ta thường dùng **Danh sách liên kết (Linked List)** thay vì Mảng. Em hãy thử tìm hiểu thêm về Linked List xem sao nhé!`:n.includes("vượt ngưỡng")||n.includes("thử thách")||n.includes("nhiệm vụ")?t=`Hôm nay thử thách của Nam là bài: **"Ứng dụng và hạn chế của Mảng"**.
🎯 **Mục tiêu bứt phá:** Nếu bài làm của em đạt điểm từ **8.5 trở lên**, hệ thống sẽ tự động rẽ nhánh bản đồ học tập, mở khóa trước bài học Chuyên sâu **Thuật toán Đệ quy nâng cao** của nhóm Xuất sắc. Đây là cơ hội lớn để em vượt ngưỡng. Hãy tập trung lập luận thật tốt nhé!`:t="Chào Nam, câu hỏi của em rất thú vị. Để giải quyết vấn đề này, cô khuyên em nên phân tích theo 2 bước: đầu tiên đưa ra giải pháp chạy đúng (brute force), sau đó phân tích các điểm nghẽn hiệu năng để tối ưu. Em có muốn cô gợi ý cụ thể hơn cho phần code nào không?":e.tier==="excellent"&&(n.includes("tối ưu")||n.includes("fibonacci")||n.includes("o(1)")?t=`Chào Minh Anh. Để tối ưu thuật toán Fibonacci đệ quy có nhớ O(n) xuống độ phức tạp không gian O(1), ta có thể sử dụng phương pháp cuộn biến (Iterative Space Optimized):

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    let curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
\`\`\`
Bằng cách này, ta chỉ lưu giữ hai giá trị liền trước đó thay vì duy trì cả bảng nhớ Memoization. Ngoài ra, còn có thuật toán nhân ma trận O(log n) hoặc công thức Binet. Em đã từng thử cài đặt phương pháp nhân ma trận chưa?`:n.includes("quy hoạch động")||n.includes("đệ quy")||n.includes("dynamic")?t=`So sánh rất cốt lõi:
- **Đệ quy có nhớ (Top-down Memoization):** Đi từ bài toán lớn, chia nhỏ xuống và lưu kết quả lại khi gặp bài toán con. Dễ suy luận nhưng có nguy cơ tràn ngăn xếp (Stack Overflow) nếu n quá lớn.
- **Quy hoạch động (Bottom-up Tabulation):** Giải quyết từ các bài toán cơ sở nhỏ nhất, lấp đầy bảng phương án đi lên. Không lo tràn ngăn xếp, thường tối ưu bộ nhớ tốt hơn.

Minh Anh hãy thử so sánh hiệu năng thực tế của hai cách này trong bài tập **"Tối ưu hóa đệ quy tính số Fibonacci"** đang chờ chấm nhé!`:n.includes("tài liệu")||n.includes("nâng cao")||n.includes("tree")?t='Để phục vụ cho nhu cầu học chuyên sâu của em, cô đề xuất tìm hiểu cuốn sách cổ điển **"Introduction to Algorithms" (CLRS)** hoặc các chuyên đề về Cấu trúc dữ liệu nâng cao như: **Segment Tree, Fenwick Tree** và thuật toán đồ thị tìm đường đi ngắn nhất (Dijkstra, A*). Cần gợi ý link đọc hay mã nguồn tham khảo cứ bảo cô nhé!':t="Chào Minh Anh. Vấn đề em đưa ra liên quan trực tiếp đến việc cân bằng giữa độ phức tạp thời gian và không gian bộ nhớ. Em có đề xuất giải thuật nào khác để giải quyết bài toán này mà không làm tăng thời gian chạy không? Rất mong được nghe lập luận từ em."),E("bot",t)}let A=null,M=null;function ct(c,e){const n=v.getStudent();if(!n)return;const t=document.getElementById(c),i=document.getElementById(e);if(!t||!i)return;A&&A.destroy(),M&&M.destroy();let s="#8b5cf6",r="rgba(139, 92, 246, 0.2)";n.tier==="excellent"?(s="#10b981",r="rgba(16, 185, 129, 0.2)"):n.tier==="average"?(s="#3b82f6",r="rgba(59, 130, 246, 0.2)"):n.tier==="struggling"&&(s="#f97316",r="rgba(249, 115, 22, 0.2)"),A=new Chart(t,{type:"radar",data:{labels:["Kiến thức nền","Tư duy Logic","Kỹ năng Trình bày","Độ Kiên trì"],datasets:[{label:"Điểm kỹ năng (%)",data:[n.skills.knowledge,n.skills.logic,n.skills.presentation,n.skills.consistency],backgroundColor:r,borderColor:s,borderWidth:2,pointBackgroundColor:s,pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:s}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{r:{angleLines:{color:"rgba(255, 255, 255, 0.08)"},grid:{color:"rgba(255, 255, 255, 0.08)"},pointLabels:{color:"#a1a1aa",font:{size:11,weight:"bold"}},ticks:{display:!1,stepSize:20},min:0,max:100}}}});const g=["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7","Chủ Nhật"],b=n.weeklyStudyTime,p=n.weeklyScores;M=new Chart(i,{type:"bar",data:{labels:g,datasets:[{label:"Thời gian học (Phút)",data:b,backgroundColor:"rgba(139, 92, 246, 0.35)",borderColor:"rgba(139, 92, 246, 0.8)",borderWidth:1,borderRadius:4,yAxisID:"yStudy",order:2},{label:"Điểm số trung bình",data:p,type:"line",borderColor:s,backgroundColor:"transparent",borderWidth:3,pointBackgroundColor:"#fff",pointBorderWidth:2,pointBorderColor:s,tension:.35,yAxisID:"yScores",order:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:"#a1a1aa",font:{size:11}}}},scales:{x:{grid:{display:!1},ticks:{color:"#a1a1aa"}},yStudy:{type:"linear",position:"left",title:{display:!0,text:"Thời gian học (phút)",color:"#a1a1aa"},grid:{color:"rgba(255, 255, 255, 0.05)"},ticks:{color:"#a1a1aa"},min:0},yScores:{type:"linear",position:"right",title:{display:!0,text:"Thang điểm 10",color:"#a1a1aa"},grid:{display:!1},ticks:{color:"#a1a1aa"},min:0,max:10}}}})}function at(c,e){const n=document.getElementById(c);if(!n)return;const t=v.getStudent(),i=v.getRecommendedLesson();let s="",r="";t.tier==="excellent"?(s="Bạn đang dẫn đầu lớp học với tư duy thuật toán vượt trội. Hãy tiếp tục thử thách bản thân với các bài tập chuyên sâu nhé!",r="excellent-recom"):t.tier==="average"?(s="Phong độ học tập của bạn rất ổn định! Hãy chú ý các gợi ý 'Bứt phá' để trang bị kỹ năng nâng cao và vươn lên nhóm dẫn đầu nhé.",r="average-recom"):t.tier==="struggling"&&(s="Chào mừng Vy! Hãy đi từng bước nhỏ cùng Aura LMS. Mỗi bài ôn tập nhỏ sẽ giúp nền móng của em vững chắc hơn bao giờ hết.",r="struggling-recom");let g=[];t.tier==="struggling"?g=[{name:"Đọc lý thuyết cấu trúc Vòng lặp",xp:"20 XP",done:t.completedLessons.includes("lesson-2")},{name:"Trao đổi với Trợ lý ảo AI về cách tránh lặp vô tận",xp:"10 XP",done:!1},{name:"Nộp bài tập ôn tập vòng lặp vẽ hình",xp:"50 XP",done:t.submittedAssignments.some(l=>l.assignmentId==="assign-4")}]:t.tier==="average"?g=[{name:"Giải thích ưu/nhược điểm của Mảng",xp:"30 XP",done:t.submittedAssignments.some(l=>l.assignmentId==="assign-3")},{name:"Luyện tập tối ưu mảng trong bài học Bứt phá",xp:"40 XP",done:t.completedLessons.includes("lesson-3-boost")},{name:"Đạt điểm số từ 8.5 trở lên để mở khóa đệ quy nâng cao",xp:"60 XP",done:!1}]:t.tier==="excellent"&&(g=[{name:"Phân tích bài toán Fibonacci độ phức tạp O(log n)",xp:"40 XP",done:t.completedLessons.includes("lesson-4-adv")},{name:"Đóng vai trò Trợ giảng: giải đáp thắc mắc cho bạn học",xp:"50 XP",done:!0},{name:"Tối ưu hóa bộ nhớ hàm đệ quy xuống O(1)",xp:"60 XP",done:t.submittedAssignments.some(l=>l.assignmentId==="assign-2")}]);let b="";g.forEach(l=>{b+=`
      <div class="quest-item">
        <div class="quest-left">
          <div class="quest-icon">${l.done?"✓":"🔥"}</div>
          <div class="quest-info">
            <span class="quest-title" style="${l.done?"text-decoration: line-through; color: var(--text-muted);":""}">${l.name}</span>
            <span class="quest-xp">${l.xp}</span>
          </div>
        </div>
        <span class="quest-status ${l.done?"completed":"todo"}">${l.done?"Đã xong":"Chưa làm"}</span>
      </div>
    `});let p="";if(i){const l=v.state.assignments.find(o=>o.lessonId===i.id);let y="Bắt đầu học ngay";if(l){const o=t.submittedAssignments.find(u=>u.assignmentId===l.id);o?y=o.status==="graded"?"Xem báo cáo chấm điểm":"Xem bài đã nộp":y="Làm bài tập ngay"}let f='<span class="badge-pill core">Cốt lõi</span>';i.tierType==="refresher"&&(f='<span class="badge-pill refresher">Bổ trợ</span>'),i.tierType==="advanced"&&(f='<span class="badge-pill advanced">Chuyên sâu</span>'),i.tierType==="boost"&&(f='<span class="badge-pill boost">Bứt phá</span>'),p=`
      <div class="glass-card recommend-card ${r}" style="margin-top: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom: 6px;">
              ${f}
              <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">Đề xuất tối ưu tiếp theo</span>
            </div>
            <h3 style="font-size: 18px; margin-bottom: 6px;">Bài học: ${i.title}</h3>
            <p style="font-size: 13px; color: var(--text-secondary); max-width: 500px; margin-bottom: 12px;">${i.description}</p>
            <div style="display:flex; gap:12px; font-size:12px; color:var(--text-muted); margin-bottom: 14px;">
              <span>Độ khó: ${i.difficulty}</span>
              <span>•</span>
              <span>Thời gian: ${i.time}</span>
            </div>
          </div>
          <button class="action-btn" id="btn-dashboard-recom">
            <span>${y}</span>
            <svg style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    `}let h="";t.achievements.length===0?h='<div style="grid-column: span 2; padding: 20px; text-align: center; color: var(--text-muted); font-size:12px;">Chưa đạt huy hiệu nào. Hãy hoàn thành bài học để mở khóa!</div>':t.achievements.forEach(l=>{h+=`
        <div class="achievement-card">
          <div class="achievement-badge">${l.icon}</div>
          <div class="achievement-name">${l.name}</div>
          <div class="achievement-desc">${l.description}</div>
        </div>
      `});let m="";const a=t.submittedAssignments.filter(l=>l.status==="graded");a.length===0?m=`
      <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">
        Chưa có bài tập tự luận nào được chấm điểm.
      </div>
    `:a.forEach(l=>{const y=v.state.assignments.find(f=>f.id===l.assignmentId);y&&(m+=`
        <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-light); padding:16px; border-radius:12px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h4 style="font-size:14px; font-weight:600;">${y.title}</h4>
            <span class="homework-status-badge graded">Điểm số: ${l.grade} / 10</span>
          </div>
          <div style="font-size:12px; color:var(--text-secondary); margin-bottom:8px; line-height: 1.5;">
            <strong>Bài viết của bạn:</strong> "${l.studentAnswer.substring(0,100)}..."
          </div>
          <div style="background: rgba(139, 92, 246, 0.04); border-left: 3px solid var(--accent-purple); padding:10px; border-radius:4px; font-size:12px; color:var(--text-primary); line-height: 1.5; margin-top:8px;">
            <strong>Nhận xét từ giáo viên:</strong> ${l.teacherFeedback}
          </div>
        </div>
      `)}),n.innerHTML=`
    <div class="welcome-banner">
      <div>
        <span class="tier-tag ${t.tier}" style="margin-bottom:12px;">Nhóm học lực: ${t.tier==="excellent"?"Xuất Sắc":t.tier==="average"?"Trung Bình":"Cần hỗ trợ"}</span>
        <h1 class="welcome-title">Chào mừng trở lại, ${t.name}!</h1>
        <p class="welcome-desc">${s}</p>
      </div>
      <div class="user-avatar" style="width:70px; height:70px; font-size:24px; box-shadow: 0 0 20px rgba(139,92,246,0.3)">
        ${t.avatar}
      </div>
    </div>

    <div class="student-grid">
      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Adaptive progress stats cards -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
          <div class="glass-card">
            <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">TIẾN ĐỘ LỘ TRÌNH</span>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
              <span class="stat-value">${t.progress}%</span>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${t.progress}%"></div>
              </div>
            </div>
            <div class="stat-desc">Hoàn thành ${t.completedLessons.length} / ${v.getRoadmapLessons().length} bài học phù hợp</div>
          </div>

          <div class="glass-card">
            <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">HOẠT ĐỘNG TUẦN NÀY</span>
            <div class="stat-value">${t.weeklyStudyTime.reduce((l,y)=>l+y,0)} Phút</div>
            <div class="stat-desc">Thời gian học tập tích lũy qua tương tác bài học & chatbot</div>
          </div>
        </div>

        ${p}

        <!-- Transparent report panel -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px; margin-bottom:14px;">Báo cáo phản hồi & Điểm tự luận minh bạch</h3>
          ${m}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Daily Quests Board -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px;">Nhiệm vụ hàng ngày (Quest)</h3>
          <div class="quest-list">
            ${b}
          </div>
        </div>

        <!-- Achievements Card -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px;">Huy hiệu đã mở khóa</h3>
          <div class="achievement-grid">
            ${h}
          </div>
        </div>
      </div>
    </div>
  `;const d=document.getElementById("btn-dashboard-recom");d&&i&&d.addEventListener("click",()=>{J(i,t,e)})}function ot(c,e){const n=document.getElementById(c);if(!n)return;const t=v.state,i=t.students.length,s=t.students.filter(o=>o.tier==="excellent").length,r=t.students.filter(o=>o.tier==="average").length,g=t.students.filter(o=>o.tier==="struggling").length,b=[];t.students.forEach(o=>{o.submittedAssignments.forEach(u=>{if(u.status==="pending"){const x=t.assignments.find(k=>k.id===u.assignmentId);b.push({student:o,submission:u,assignment:x})}})});let p="";t.students.filter(o=>o.tier==="struggling").forEach(o=>{p+=`
      <div class="alert-message-card warning">
        <svg style="width:20px; height:20px; flex-shrink:0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <strong style="font-size:13px;">Cảnh báo học tập: Học viên ${o.name} (Nhóm Cần hỗ trợ)</strong>
          <p style="font-size:11px; margin-top:2px; opacity:0.9;">Học sinh có lực học logic tương đối thấp (${o.skills.logic}%). Lộ trình đã tự động kích hoạt bài giảng Bổ trợ Vòng lặp. Cần theo sát tiến trình làm bài tập.</p>
        </div>
      </div>
    `}),t.students.filter(o=>o.tier==="average").forEach(o=>{p+=`
      <div class="alert-message-card info">
        <svg style="width:20px; height:20px; flex-shrink:0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <strong style="font-size:13px;">Cơ hội bứt phá: Học viên ${o.name} (Nhóm Trung bình)</strong>
          <p style="font-size:11px; margin-top:2px; opacity:0.9;">Đạt tiến trình học tốt (${o.progress}%). Nếu bài tập Mảng sắp tới đạt điểm giỏi (>= 8.5), hệ thống sẽ gợi ý lộ trình Đệ quy nâng cao để thúc đẩy bứt phá.</p>
        </div>
      </div>
    `}),t.students.filter(o=>o.tier==="excellent").forEach(o=>{p+=`
      <div class="alert-message-card success">
        <svg style="width:20px; height:20px; flex-shrink:0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <strong style="font-size:13px;">Thử thách bổ sung: Học viên ${o.name} (Nhóm Xuất sắc)</strong>
          <p style="font-size:11px; margin-top:2px; opacity:0.9;">Đã hoàn thành xuất sắc các chuyên đề cơ bản. Trợ lý AI đã mở chế độ gợi ý tài liệu học thuật toán CLRS/Graph để tránh gây nhàm chán.</p>
        </div>
      </div>
    `});let d="";b.length===0?d='<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:13px;">Tất cả các bài nộp đã được chấm xong! 🎉</div>':b.forEach(o=>{let u="";o.student.tier==="excellent"&&(u='<span class="badge-pill core" style="font-size:9px; background:var(--tier-excellent-bg); color:var(--tier-excellent)">Xuất sắc</span>'),o.student.tier==="average"&&(u='<span class="badge-pill core" style="font-size:9px; background:var(--tier-average-bg); color:var(--tier-average)">Trung bình</span>'),o.student.tier==="struggling"&&(u='<span class="badge-pill core" style="font-size:9px; background:var(--tier-struggling-bg); color:var(--tier-struggling)">Cần hỗ trợ</span>'),d+=`
        <div class="quest-item" style="margin-bottom:8px;">
          <div class="quest-left">
            <div class="user-avatar" style="width:32px; height:32px; font-size:12px; box-shadow:none;">
              ${o.student.avatar}
            </div>
            <div class="quest-info">
              <span class="quest-title">${o.student.name} ${u}</span>
              <span style="font-size:11px; color:var(--text-secondary);">${o.assignment.title}</span>
            </div>
          </div>
          <button class="btn-ai-generate btn-teacher-grade" data-student-id="${o.student.id}" data-assign-id="${o.assignment.id}" style="padding:6px 12px; font-size:11px;">Chấm bài</button>
        </div>
      `});let l="";t.students.forEach(o=>{let u="",x="";o.tier==="excellent"?(u='<span class="tier-tag excellent" style="font-size:10px;">Xuất sắc</span>',x='<span style="font-size:11px; color:var(--tier-excellent); font-weight:600;">Cần thêm thách thức</span>'):o.tier==="average"?(u='<span class="tier-tag average" style="font-size:10px;">Trung bình</span>',x='<span style="font-size:11px; color:var(--tier-average); font-weight:600;">Ổn định - Đang bứt phá</span>'):o.tier==="struggling"&&(u='<span class="tier-tag struggling" style="font-size:10px;">Cần hỗ trợ</span>',x='<span style="font-size:11px; color:var(--tier-struggling); font-weight:600;">Cần hỗ trợ sát sao</span>');const k=o.submittedAssignments.length,T=o.submittedAssignments.filter(L=>L.status==="graded").length;l+=`
      <div class="student-row-card">
        <div style="display:flex; align-items:center; gap:16px;">
          <div class="user-avatar" style="width:40px; height:40px; font-size:14px; box-shadow:none;">
            ${o.avatar}
          </div>
          <div>
            <div style="font-size:14px; font-weight:700;">${o.name} ${u}</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${o.email}</div>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:4px; align-items:center;">
          <div style="font-size:12px; font-weight:600; color:var(--text-secondary);">Tiến trình lộ trình</div>
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="progress-bar-container" style="width:100px;">
              <div class="progress-bar-fill" style="width: ${o.progress}%"></div>
            </div>
            <span style="font-size:11px; font-weight:700;">${o.progress}%</span>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:4px; align-items:center;">
          <div style="font-size:12px; font-weight:600; color:var(--text-secondary);">Bài tập nộp</div>
          <span style="font-size:11px; font-weight:700; color:var(--text-primary);">${k} nộp (${T} đã chấm)</span>
        </div>

        <div style="text-align:right;">
          <div>${x}</div>
          <button class="btn-ai-generate btn-teacher-view-analytics" data-student-id="${o.id}" style="margin-top:6px; font-size:10px;">Xem Báo Cáo Kỹ Năng</button>
        </div>
      </div>
    `}),n.innerHTML=`
    <!-- Top Stats Row -->
    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; margin-bottom:24px;">
      <div class="glass-card">
        <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">SĨ SỐ LỚP HỌC</span>
        <div class="stat-value">${i} Học viên</div>
        <div class="stat-desc">Đăng ký hoạt động học lập trình</div>
      </div>
      <div class="glass-card">
        <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">NHÓM XUẤT SẮC</span>
        <div class="stat-value" style="background:var(--tier-excellent); -webkit-text-fill-color: var(--tier-excellent);">${s}</div>
        <div class="stat-desc">Nắm bắt nhanh, cần thử thách sâu</div>
      </div>
      <div class="glass-card">
        <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">NHÓM TRUNG BÌNH</span>
        <div class="stat-value" style="background:var(--tier-average); -webkit-text-fill-color: var(--tier-average);">${r}</div>
        <div class="stat-desc">Ổn định, đang đẩy nhanh bứt phá</div>
      </div>
      <div class="glass-card">
        <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">NHÓM CẦN HỖ TRỢ</span>
        <div class="stat-value" style="background:var(--tier-struggling); -webkit-text-fill-color: var(--tier-struggling);">${g}</div>
        <div class="stat-desc">Mất gốc, cần chia nhỏ từng bước</div>
      </div>
    </div>

    <div class="student-grid">
      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Class list roster -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px; margin-bottom:16px;">Sổ điểm & Tiến trình học viên</h3>
          ${l}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Pending Assignments List -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px; margin-bottom:12px;">Bài tập tự luận đang chờ chấm</h3>
          <div class="quest-list">
            ${d}
          </div>
        </div>

        <!-- Automatic notifications / Warnings -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px;">Hệ thống cảnh báo học tập</h3>
          <div class="alerts-panel">
            ${p}
          </div>
        </div>
      </div>
    </div>
  `,n.querySelectorAll(".btn-teacher-grade").forEach(o=>{o.addEventListener("click",()=>{const u=o.getAttribute("data-student-id"),x=o.getAttribute("data-assign-id");e(u,x)})}),n.querySelectorAll(".btn-teacher-view-analytics").forEach(o=>{o.addEventListener("click",()=>{const u=o.getAttribute("data-student-id");v.selectStudent(u),v.setRole("student"),v.setTab("analytics");const x=document.getElementById("role-student"),k=document.getElementById("role-teacher"),T=document.getElementById("student-picker");x&&k&&T&&(k.classList.remove("active"),x.classList.add("active"),T.style.display="block",T.value=u)})})}const z=document.getElementById("role-student"),H=document.getElementById("role-teacher"),I=document.getElementById("student-picker"),rt=document.getElementById("page-title"),X=document.getElementById("menu-student"),j=document.getElementById("menu-teacher"),$=document.getElementById("sidebar-avatar"),K=document.getElementById("sidebar-username"),w=document.getElementById("sidebar-rolebadge"),lt=document.getElementById("toast-container");v.init();function ht(){const c=document.querySelector(".sidebar"),e=document.getElementById("menu-toggle-btn");z.addEventListener("click",()=>{v.setRole("student")}),H.addEventListener("click",()=>{v.setRole("teacher")}),I.addEventListener("change",t=>{v.selectStudent(t.target.value)}),document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-tab");v.setTab(i),window.innerWidth<=768&&c&&c.classList.remove("active")})}),e&&c&&(e.addEventListener("click",t=>{c.classList.toggle("active"),t.stopPropagation()}),document.addEventListener("click",t=>{window.innerWidth<=768&&!c.contains(t.target)&&c.classList.contains("active")&&c.classList.remove("active")}))}v.subscribe(c=>{const e=c.currentRole==="student",n=v.getStudent();e?(H.classList.remove("active"),z.classList.add("active"),I.style.display="block",I.value=c.currentStudentId,j.style.display="none",X.style.display="flex"):(z.classList.remove("active"),H.classList.add("active"),I.style.display="none",X.style.display="none",j.style.display="flex"),e&&n?($.innerText=n.avatar,K.innerText=n.name,w.innerText=n.tier==="excellent"?"Học viên Xuất Sắc":n.tier==="average"?"Học viên Trung Bình":"Học viên Bổ Trợ",n.tier==="excellent"?(w.style.background="var(--tier-excellent-bg)",w.style.color="var(--tier-excellent)",$.style.boxShadow="var(--tier-excellent-glow)"):n.tier==="average"?(w.style.background="var(--tier-average-bg)",w.style.color="var(--tier-average)",$.style.boxShadow="var(--tier-average-glow)"):n.tier==="struggling"&&(w.style.background="var(--tier-struggling-bg)",w.style.color="var(--tier-struggling)",$.style.boxShadow="var(--tier-struggling-glow)")):($.innerText="GV",K.innerText="Cô Nguyễn Mai",w.innerText="Giảng viên",w.style.background="rgba(139, 92, 246, 0.15)",w.style.color="var(--accent-purple)",$.style.boxShadow="0 0 15px rgba(139, 92, 246, 0.4)"),document.querySelectorAll(".nav-item").forEach(i=>{i.getAttribute("data-tab")===c.activeTab?i.classList.add("active"):i.classList.remove("active")});const t={dashboard:"Tổng quan học tập",roadmap:"Lộ trình cá nhân hóa",assignments:"Bài tập tự luận",analytics:"Báo cáo năng lực",overview:"Quản lý Lớp học",grading:"Hỗ trợ chấm bài"};rt.innerText=t[c.activeTab]||"Học tập",document.querySelectorAll(".page-panel").forEach(i=>{i.getAttribute("data-panel")===c.activeTab?i.classList.add("active"):i.classList.remove("active")}),c.currentRole==="student"?c.activeTab==="dashboard"?at("panel-dashboard",U):c.activeTab==="roadmap"?nt("panel-roadmap",U):c.activeTab==="assignments"?q():c.activeTab==="analytics"&&ct("chart-skills-radar","chart-performance-trend"):c.activeTab==="overview"?ot("panel-overview",dt):c.activeTab==="grading"&&S("panel-grading")});function U(c){v.setTab("assignments"),q(c)}function dt(c,e){v.setTab("grading"),S("panel-grading",c,e)}let C=null;function q(c=null){const e=document.getElementById("panel-assignments");if(!e)return;const n=v.state,t=v.getStudent();if(!t)return;const s=v.getRoadmapLessons().map(a=>a.id),r=n.assignments.filter(a=>s.includes(a.lessonId));c&&(C=c),!C&&r.length>0&&(C=r[0].id);let g="";r.forEach(a=>{const d=t.completedLessons.includes(a.lessonId);t.unlockedLessons.includes(a.lessonId);const l=t.submittedAssignments.find(u=>u.assignmentId===a.id);let y="Chưa làm",f="not-submitted";l&&(l.status==="graded"?(y=`Đã chấm: ${l.grade}/10`,f="graded"):(y="Đang chờ chấm",f="pending"));const o=C===a.id;g+=`
      <div class="quest-item homework-card-item ${o?"active":""}" 
           data-assign-id="${a.id}" 
           style="cursor: pointer; margin-bottom: 8px;">
        <div class="quest-left">
          <div class="quest-icon">${d?"✓":"📝"}</div>
          <div class="quest-info">
            <span class="quest-title" style="font-size:13px;">${a.title}</span>
            <span style="font-size:11px; color:var(--text-secondary);">Thang điểm: 10</span>
          </div>
        </div>
        <span class="homework-status-badge ${f}">${y}</span>
      </div>
    `});let b="";const p=r.find(a=>a.id===C);if(p){const a=t.submittedAssignments.find(f=>f.assignmentId===p.id),d=n.lessons.find(f=>f.id===p.lessonId);let l="";if(!a)l=`
        <div style="margin-top: 16px;">
          <h4 style="font-size:14px; margin-bottom:8px;">Nhập câu trả lời của em:</h4>
          <textarea class="editor-textarea" id="homework-answer-text" placeholder="Viết bài luận tự luận của em tại đây (ít nhất 150 từ)..."></textarea>
          <button class="action-btn" id="btn-submit-homework" style="margin-top:14px; width:100%; justify-content:center;">
            <span>NỘP BÀI TẬP TỰ LUẬN</span>
          </button>
        </div>
      `;else if(a.status==="pending")l=`
        <div style="margin-top: 16px;">
          <h4 style="font-size:14px; margin-bottom:8px; color:var(--accent-cyan);">Bài đã nộp thành công!</h4>
          <div class="submitted-answer-box" style="opacity: 0.85;">
${Q(a.studentAnswer)}
          </div>
          <div style="margin-top:16px; padding:12px; background:rgba(234,179,8,0.06); border:1px solid rgba(234,179,8,0.2); border-radius:8px; font-size:13px; color:#f59e0b; display:flex; align-items:center; gap:8px;">
            <svg style="width:18px; height:18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bài đang chờ giáo viên chấm điểm. Hãy chuyển sang vai trò GIÁO VIÊN để chấm điểm.
          </div>
        </div>
      `;else if(a.status==="graded"){let f="";p.rubric.forEach(o=>{const u=a.rubricGrading[o.id]||0,x=o.weight,k=u/x*100;f+=`
          <div class="rubric-report-row">
            <div class="rubric-row-left">
              <span class="rubric-row-title">${o.name}</span>
              <span class="rubric-row-desc">${o.desc}</span>
            </div>
            <div class="rubric-score-display">
              <span class="rubric-score-value">${u} / ${x}</span>
              <div class="rubric-score-bar-bg">
                <div class="rubric-score-bar-fill" style="width: ${k}%"></div>
              </div>
            </div>
          </div>
        `}),l=`
        <div style="margin-top: 16px;">
          <h4 style="font-size:14px; margin-bottom:8px; color:var(--tier-excellent);">Bài tập đã được chấm điểm!</h4>
          <div class="submitted-answer-box" style="max-height: 180px; opacity:0.85;">
${Q(a.studentAnswer)}
          </div>
          
          <div class="transparency-report">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3 style="font-size: 16px;">Báo cáo điểm số minh bạch</h3>
              <span class="homework-status-badge graded" style="font-size:13px; padding:4px 10px;">Điểm số quy đổi: ${a.grade} / 10</span>
            </div>
            <div class="rubric-grid-report">
              ${f}
            </div>

            <div style="margin-top:16px; padding:16px; background:rgba(139, 92, 246, 0.06); border-left:4px solid var(--accent-purple); border-radius:4px 8px 8px 4px; font-size:13px; line-height:1.6;">
              <strong>Lời nhắn chi tiết từ giáo viên:</strong>
              <p style="margin-top:6px; color:var(--text-primary);">${a.teacherFeedback}</p>
            </div>
          </div>
        </div>
      `}let y='<span class="badge-pill core">Core</span>';d.tierType==="refresher"&&(y='<span class="badge-pill refresher">Bổ trợ Mất Gốc</span>'),d.tierType==="advanced"&&(y='<span class="badge-pill advanced">Chuyên Sâu Thử Thách</span>'),d.tierType==="boost"&&(y='<span class="badge-pill boost">Bứt Phá Điểm Số</span>'),b=`
      <div class="glass-card" style="display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 1px solid var(--border-light); padding-bottom:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              ${y}
              <span style="font-size:11px; color:var(--text-secondary); font-weight:600;">Độ khó: ${d.difficulty}</span>
            </div>
            <h3 style="font-size: 18px;">${p.title}</h3>
          </div>
          <span class="quest-status todo">Mức điểm: 10đ</span>
        </div>

        <div>
          <h4 style="font-size:14px; color:var(--text-secondary); margin-bottom:6px;">Mô tả bài tập:</h4>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">${p.description}</p>
        </div>

        ${l}
      </div>
    `}else b=`
      <div class="glass-card" style="display:flex; justify-content:center; align-items:center; height:300px; color:var(--text-muted);">
        Chưa có bài tập nào được chọn.
      </div>
    `;e.innerHTML=`
    <div class="homework-panel">
      <div class="glass-card" style="display:flex; flex-direction:column; gap:16px; height:fit-content;">
        <h3 style="font-size:18px;">Bài tập tự luận của em</h3>
        <p class="dashboard-title-sub">Chọn một bài trong danh sách để xem chi tiết hoặc nộp câu trả lời</p>
        <div class="homework-list" style="margin-top: 10px;">
          ${g}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        ${b}
      </div>
    </div>
  `,e.querySelectorAll(".homework-card-item").forEach(a=>{a.addEventListener("click",()=>{C=a.getAttribute("data-assign-id"),q()})});const m=document.getElementById("btn-submit-homework");m&&m.addEventListener("click",()=>{const a=document.getElementById("homework-answer-text").value.trim();if(!a){N("Vy/Nam/Anh ơi, hãy điền câu trả lời trước khi nộp bài nhé!","info");return}if(a.length<50){N("Bài giải quá ngắn. Em hãy phân tích chi tiết hơn để đạt điểm tốt nhé!","info");return}v.submitAssignment(t.id,C,a),typeof confetti=="function"&&confetti({particleCount:80,spread:60,origin:{y:.8}}),N("Đã nộp bài giải tự luận thành công! Chờ giáo viên chấm điểm nhé.","success"),q()})}function N(c,e="success"){const n=document.createElement("div");n.className=`toast ${e}`;let t="🔔";e==="success"&&(t="✓"),e==="info"&&(t="ℹ️"),n.innerHTML=`
    <span>${t}</span>
    <span>${c}</span>
  `,lt.appendChild(n),setTimeout(()=>{n.style.animation="slideInRight 0.3s ease-in reverse",setTimeout(()=>{n.remove()},300)},3500)}function Q(c){return c?c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}ht();st();v.notify();
