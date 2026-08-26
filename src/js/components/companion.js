import { stateManager } from '../state.js';

export function initAICompanion() {
  // Create chatbot DOM element if it doesn't exist
  if (document.getElementById('ai-companion-widget')) return;

  const widget = document.createElement('div');
  widget.id = 'ai-companion-widget';
  widget.className = 'ai-companion-widget';
  widget.innerHTML = `
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
  `;

  document.body.appendChild(widget);

  // Setup Event Listeners
  const trigger = document.getElementById('companion-trigger');
  const chatWindow = document.getElementById('companion-chat-window');
  const closeBtn = document.getElementById('btn-close-chat');
  const sendBtn = document.getElementById('companion-send-btn');
  const input = document.getElementById('companion-chat-input');
  const messagesContainer = document.getElementById('companion-chat-messages');

  trigger.addEventListener('click', () => {
    chatWindow.classList.toggle('show');
    if (chatWindow.classList.contains('show')) {
      input.focus();
      // Reset chatbot conversation based on the active student
      resetConversation();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('show');
  });

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Track active student switch to reset companion style/greeting
  stateManager.subscribe(() => {
    if (chatWindow.classList.contains('show')) {
      resetConversation();
    }
  });
}

let activeChatStudentId = null;

function resetConversation() {
  const student = stateManager.getStudent();
  if (!student) return;

  // Avoid resetting if student hasn't changed
  if (activeChatStudentId === student.id) return;
  activeChatStudentId = student.id;

  const messagesContainer = document.getElementById('companion-chat-messages');
  const botName = document.getElementById('companion-bot-name');
  const botStatus = document.getElementById('companion-bot-status');
  const suggestionsContainer = document.getElementById('companion-suggestions');
  
  messagesContainer.innerHTML = '';

  // Setup customized bot profile and greeting based on student's learning profile (Problem 1)
  let botNameText = '';
  let statusText = '';
  let greeting = '';
  let suggestions = [];

  if (student.tier === 'struggling') {
    botNameText = "Aura Trợ Lý Cổ Vũ (Vy)";
    statusText = "Đang trực tuyến • Sẵn sàng hướng dẫn từng bước";
    greeting = `Chào Vy đáng yêu! 🌟 Hôm nay em học thế nào rồi? Đừng lo lắng nếu bài học có chỗ khó nhé. Cô ở đây để giúp em chia nhỏ kiến thức ra. Em muốn cùng cô xem qua phần nào nè?`;
    suggestions = [
      "Giải thích vòng lặp là gì một cách dễ hiểu 🍉",
      "Giúp em gỡ lỗi treo máy (lặp vô hạn) 🛠️",
      "Nhiệm vụ hôm nay của em là gì?"
    ];
  } else if (student.tier === 'average') {
    botNameText = "Aura Trợ Lý Bứt Phá (Nam)";
    statusText = "Đang trực tuyến • Kích hoạt chế độ Tăng tốc";
    greeting = `Chào Nam! Phong độ của em rất ổn định. Mục tiêu tuần này là bứt phá lên nhóm dẫn đầu đấy nhé! Em đang gặp vướng mắc gì trong bài tập Mảng để tối ưu hóa hiệu suất?`;
    suggestions = [
      "Mẹo tối ưu thời gian chạy của vòng lặp",
      "Làm sao để mảng chèn xóa nhanh hơn?",
      "Gợi ý thử thách Vượt ngưỡng tuần này"
    ];
  } else if (student.tier === 'excellent') {
    botNameText = "Aura Trợ Lý Tư Duy Sâu (Anh)";
    statusText = "Đang trực tuyến • Chế độ Thử thách nâng cao";
    greeting = `Chào Minh Anh. Rất vui được thảo luận cùng một học viên xuất sắc. Đề xuất thuật toán đệ quy của em rất ấn tượng. Em có muốn trao đổi về các bài toán tối ưu hóa thuật toán phức tạp hơn không?`;
    suggestions = [
      "Ý tưởng tối ưu Fibonacci bộ nhớ O(1)",
      "Giải thích Quy hoạch động so với Đệ quy",
      "Đề xuất tài liệu nâng cao về Graph/Tree"
    ];
  }

  botName.innerText = botNameText;
  botStatus.innerText = statusText;

  appendMessage('bot', greeting);

  // Load suggestions
  suggestionsContainer.innerHTML = '';
  suggestions.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'btn-ai-generate';
    btn.style.whiteSpace = 'nowrap';
    btn.style.fontSize = '11px';
    btn.style.padding = '4px 8px';
    btn.innerText = s;
    btn.addEventListener('click', () => {
      appendMessage('user', s);
      processBotResponse(s, student);
    });
    suggestionsContainer.appendChild(btn);
  });
}

function appendMessage(sender, text) {
  const container = document.getElementById('companion-chat-messages');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = `chat-message ${sender}`;
  msg.innerHTML = text.replace(/\n/g, '<br>');
  container.appendChild(msg);

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('companion-chat-input');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  input.value = '';

  const student = stateManager.getStudent();
  
  // Simulate AI response delay
  setTimeout(() => {
    processBotResponse(text, student);
  }, 700);
}

// Simulated AI Bot response logic tailored to student's level (Problem 1)
function processBotResponse(inputText, student) {
  const text = inputText.toLowerCase();
  let reply = "";

  if (student.tier === 'struggling') {
    if (text.includes("lặp") || text.includes("vòng lặp") || text.includes("loop")) {
      reply = `Dễ hiểu lắm Vy ơi! Vòng lặp giống như em đang tập viết chữ vậy đó:\n\n1. Em bắt đầu từ trang số 1.\n2. Viết xong trang đó, em đếm là 1 trang.\n3. Em tự hỏi: "Mình đã viết đủ 5 trang chưa?". Nếu chưa, em lại viết tiếp trang số 2.\n4. Việc viết chữ và kiểm tra cứ lặp lại như vậy cho đến khi em đếm đủ 5 trang thì dừng lại.\n\nTrong lập trình cũng vậy: máy tính cần một **biến đếm** (như số trang) và một **điều kiện dừng** (đủ 5 trang) để biết khi nào cần dừng lại. Em đã hiểu đoạn này chưa? Hãy thử lấy một ví dụ thực tế khác đi nào!`;
    } else if (text.includes("treo máy") || text.includes("vô hạn") || text.includes("vô tận")) {
      reply = `À, lỗi lặp vô tận là lỗi phổ biến nhất luôn! Đừng lo nha. Treo máy xảy ra khi máy tính không thấy **điều kiện dừng** bị thay đổi. Ví dụ, em bảo máy viết tiếp khi số trang nhỏ hơn 5, nhưng em quên không tăng biến đếm số trang lên (vẫn mãi là trang số 1).\n\n🛠️ **Cách khắc phục:**\nEm hãy kiểm tra xem trong thân vòng lặp của mình đã có dòng làm thay đổi biến đếm chưa (ví dụ: \`i = i + 1\` hoặc \`i++\`). Em có muốn chép đoạn code của em vào đây để cô kiểm tra giúp không?`;
    } else if (text.includes("nhiệm vụ") || text.includes("bài tập")) {
      reply = `Hôm nay nhiệm vụ của Vy là làm bài tự luận nhỏ: **"Ý nghĩa của Vòng lặp và Tránh lỗi Lặp vô tận"** ở mục Bài tập. Bài này được thiết kế riêng với các ví dụ thực tế nhẹ nhàng để em lấy lại gốc rễ. Em cứ làm hết sức mình, điểm Nỗ Lực của cô dành cho em sẽ rất cao đó! Cô tin em làm được!`;
    } else {
      reply = `Ý kiến của Vy rất hay! 💖 Cô luôn ở đây đồng hành cùng em. Em hãy cứ thử viết những gì em nghĩ ra nháp, hoặc hỏi cô bất kỳ từ khóa nào em chưa rõ nhé. Không có câu hỏi nào là ngớ ngẩn cả đâu!`;
    }
  } 
  
  else if (student.tier === 'average') {
    if (text.includes("tối ưu") || text.includes("vòng lặp") || text.includes("hiệu suất")) {
      reply = `Chào Nam! Để tối ưu vòng lặp, chúng ta có một số quy tắc vàng:\n\n1. **Tránh tính toán thừa:** Đừng để các câu lệnh tính toán cố định bên trong vòng lặp. Ví dụ: thay vì viết \`for(let i=0; i < array.length; i++)\`, hãy viết \`const len = array.length; for(let i=0; i < len; i++)\`.\n2. **Hạn chế vòng lặp lồng nhau:** Hai vòng lặp lồng nhau thường chạy với độ phức tạp O(n²). Hãy thử suy nghĩ xem có thể dùng mảng đánh dấu hoặc cấu trúc Map/Set để giảm xuống O(n) không?\n\nEm có thể áp dụng ngay mẹo này vào bài tập **"Ứng dụng và hạn chế của Mảng"** đang mở để nâng tầm bài làm của mình lên Xuất sắc nhé!`;
    } else if (text.includes("mảng") || text.includes("array") || text.includes("chèn")) {
      reply = `Câu hỏi rất trúng trọng tâm, Nam!\nMảng được cấp phát liên tục trong bộ nhớ, nên:\n- Truy cập phần tử bằng chỉ số (Index) cực nhanh: O(1).\n- Nhưng **chèn hoặc xóa** ở đầu/giữa mảng thì rất chậm: O(n) vì máy tính phải dịch chuyển toàn bộ các phần tử phía sau sang một ô mới.\n\n💡 **Mẹo bứt phá:** Trong các bài toán thực tế, nếu thao tác chèn/xóa xảy ra liên tục, người ta thường dùng **Danh sách liên kết (Linked List)** thay vì Mảng. Em hãy thử tìm hiểu thêm về Linked List xem sao nhé!`;
    } else if (text.includes("vượt ngưỡng") || text.includes("thử thách") || text.includes("nhiệm vụ")) {
      reply = `Hôm nay thử thách của Nam là bài: **"Ứng dụng và hạn chế của Mảng"**.\n🎯 **Mục tiêu bứt phá:** Nếu bài làm của em đạt điểm từ **8.5 trở lên**, hệ thống sẽ tự động rẽ nhánh bản đồ học tập, mở khóa trước bài học Chuyên sâu **Thuật toán Đệ quy nâng cao** của nhóm Xuất sắc. Đây là cơ hội lớn để em vượt ngưỡng. Hãy tập trung lập luận thật tốt nhé!`;
    } else {
      reply = `Chào Nam, câu hỏi của em rất thú vị. Để giải quyết vấn đề này, cô khuyên em nên phân tích theo 2 bước: đầu tiên đưa ra giải pháp chạy đúng (brute force), sau đó phân tích các điểm nghẽn hiệu năng để tối ưu. Em có muốn cô gợi ý cụ thể hơn cho phần code nào không?`;
    }
  } 
  
  else if (student.tier === 'excellent') {
    if (text.includes("tối ưu") || text.includes("fibonacci") || text.includes("o(1)")) {
      reply = `Chào Minh Anh. Để tối ưu thuật toán Fibonacci đệ quy có nhớ O(n) xuống độ phức tạp không gian O(1), ta có thể sử dụng phương pháp cuộn biến (Iterative Space Optimized):\n\n\`\`\`javascript\nfunction fib(n) {\n  if (n <= 1) return n;\n  let prev2 = 0, prev1 = 1;\n  for (let i = 2; i <= n; i++) {\n    let curr = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = curr;\n  }\n  return prev1;\n}\n\`\`\`\nBằng cách này, ta chỉ lưu giữ hai giá trị liền trước đó thay vì duy trì cả bảng nhớ Memoization. Ngoài ra, còn có thuật toán nhân ma trận O(log n) hoặc công thức Binet. Em đã từng thử cài đặt phương pháp nhân ma trận chưa?`;
    } else if (text.includes("quy hoạch động") || text.includes("đệ quy") || text.includes("dynamic")) {
      reply = `So sánh rất cốt lõi:\n- **Đệ quy có nhớ (Top-down Memoization):** Đi từ bài toán lớn, chia nhỏ xuống và lưu kết quả lại khi gặp bài toán con. Dễ suy luận nhưng có nguy cơ tràn ngăn xếp (Stack Overflow) nếu n quá lớn.\n- **Quy hoạch động (Bottom-up Tabulation):** Giải quyết từ các bài toán cơ sở nhỏ nhất, lấp đầy bảng phương án đi lên. Không lo tràn ngăn xếp, thường tối ưu bộ nhớ tốt hơn.\n\nMinh Anh hãy thử so sánh hiệu năng thực tế của hai cách này trong bài tập **"Tối ưu hóa đệ quy tính số Fibonacci"** đang chờ chấm nhé!`;
    } else if (text.includes("tài liệu") || text.includes("nâng cao") || text.includes("tree")) {
      reply = `Để phục vụ cho nhu cầu học chuyên sâu của em, cô đề xuất tìm hiểu cuốn sách cổ điển **"Introduction to Algorithms" (CLRS)** hoặc các chuyên đề về Cấu trúc dữ liệu nâng cao như: **Segment Tree, Fenwick Tree** và thuật toán đồ thị tìm đường đi ngắn nhất (Dijkstra, A*). Cần gợi ý link đọc hay mã nguồn tham khảo cứ bảo cô nhé!`;
    } else {
      reply = `Chào Minh Anh. Vấn đề em đưa ra liên quan trực tiếp đến việc cân bằng giữa độ phức tạp thời gian và không gian bộ nhớ. Em có đề xuất giải thuật nào khác để giải quyết bài toán này mà không làm tăng thời gian chạy không? Rất mong được nghe lập luận từ em.`;
    }
  }

  appendMessage('bot', reply);
}
