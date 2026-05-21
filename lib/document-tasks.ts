/** PRD document tasks for interview / job simulation */

export type DocumentResource = {
    id: string;
    title: string;
    type: string;
    estimatedTime: string;
    content: string;
};

export type DocumentTask = {
    id: string;
    programId: string;
    title: string;
    type: "prd";
    company: string;
    role: string;
    team: string;
    scenario: string;
    objective: string;
    deliverable: string;
    expectedFormats: string[];
    templateFileName: string;
    passThreshold: number;
    requiredSections: string[];
    importantKeywords: string[];
    evaluationCriteria: string[];
};

export const PRD_TEMPLATE_MARKDOWN = `# Product Requirement Documentation

## 1. Tên tính năng
Điền tên tính năng tại đây.

## 2. Bối cảnh
Mô tả bối cảnh sản phẩm và lý do cần tính năng này.

## 3. Vấn đề cần giải quyết
Mô tả vấn đề chính của người dùng.

## 4. Người dùng mục tiêu
Liệt kê nhóm người dùng chính.

## 5. Mục tiêu sản phẩm
Mô tả mục tiêu của tính năng.

## 6. Phạm vi tính năng
### In scope
- 

### Out of scope
- 

## 7. User flow
Mô tả luồng người dùng chính.

## 8. Yêu cầu chức năng
Liệt kê các yêu cầu chức năng chính.

## 9. Yêu cầu phi chức năng
Liệt kê các yêu cầu về hiệu năng, khả dụng, giao diện, bảo mật nếu có.

## 10. Trạng thái lỗi và edge cases
Mô tả các trường hợp lỗi hoặc tình huống đặc biệt.

## 11. Tiêu chí thành công
Mô tả cách đánh giá tính năng thành công.

## 12. Ghi chú cho Design / Engineering
Các lưu ý khi thiết kế và triển khai.
`;

export const PRD_SAMPLE_ANSWER = `# Product Requirement Documentation

## 1. Tên tính năng
Provable Coach

## 2. Bối cảnh
Provable là nền tảng học kỹ năng và mô phỏng công việc. Trong phần học, người dùng cần được hướng dẫn rõ ràng hơn thay vì chỉ đọc bài và làm quiz. Provable Coach giúp người học đi qua từng bước học tập bằng chat quick answer, phản hồi chi tiết và gợi ý học lại đúng phần còn yếu.

## 3. Vấn đề cần giải quyết
Người học mới dễ bị mất phương hướng khi không hiểu khái niệm hoặc làm sai bài tập. Nếu hệ thống chỉ báo đúng/sai, họ không biết cần sửa gì. Điều này làm giảm tỷ lệ hoàn thành bài học và giảm khả năng chuyển sang task mô phỏng công việc.

## 4. Người dùng mục tiêu
- Người mới học SQL
- Sinh viên mới ra trường
- Người muốn luyện kỹ năng để đi thực tập
- Người cần hướng dẫn chi tiết khi tự học

## 5. Mục tiêu sản phẩm
- Giúp người học hiểu rõ khái niệm trước khi làm bài
- Cung cấp phản hồi cụ thể khi người học sai
- Hướng dẫn người học bằng quick answers thay vì chat tự do
- Kết nối kiến thức học với task mô phỏng công việc
- Tăng tỷ lệ hoàn thành module học

## 6. Phạm vi tính năng
### In scope
- Chat coach dạng quick answer
- Câu hỏi kiểm tra mức độ hiểu
- Giải thích theo trình độ
- Hint nhiều cấp độ
- Phản hồi chi tiết
- Remedial flow khi sai nhiều lần
- Điều hướng LearningDataPanel theo hành động của user
- Liên kết bài học với task thực tập liên quan

### Out of scope
- Chat AI tự do
- Chấm điểm bằng AI thật
- Backend thật
- Authentication thật
- Nội dung cho tất cả topic ngoài SQL

## 7. User flow
1. User chọn topic SQL cơ bản.
2. Coach hỏi mức độ hiểu.
3. User chọn quick answer.
4. Coach giải thích theo trình độ.
5. User trả lời concept check.
6. User viết SQL trong editor.
7. Hệ thống chạy validation rule-based.
8. Coach phản hồi chi tiết.
9. Nếu user sai nhiều lần, coach đưa hint hoặc remedial flow.
10. Khi hoàn thành module, coach gợi ý task mô phỏng liên quan.

## 8. Yêu cầu chức năng
- Hệ thống phải hiển thị chat coach trong learning workspace.
- Chat coach chỉ dùng quick answers, không có text input tự do.
- Khi user chọn quick answer, bubble lựa chọn phải được thay thế bằng câu trả lời đã chọn.
- Coach phải có thể chuyển tab LearningDataPanel.
- SQL editor là nơi duy nhất user nhập text tự do trong phần học SQL.
- Hệ thống phải hiển thị kết quả SQL dạng bảng.
- Feedback phải chỉ rõ user đúng gì, sai gì, thiếu gì và nên sửa thế nào.
- Hệ thống phải gợi ý module học liên quan nếu user bị sai ở task mô phỏng.

## 9. Yêu cầu phi chức năng
- UI hỗ trợ light/dark theme.
- Toàn bộ giao diện tiếng Việt.
- Trải nghiệm phải rõ ràng trong demo 3-5 phút.
- Không gọi API ngoài.
- Không yêu cầu backend.

## 10. Trạng thái lỗi và edge cases
- User chưa chọn câu trả lời.
- User chạy SQL rỗng.
- User submit sai nhiều lần.
- User cố xem đáp án mẫu trước khi mở khóa.
- User quay lại từ learn module sang internship task.
- User upload sai định dạng file trong task PRD.

## 11. Tiêu chí thành công
- User hiểu bước tiếp theo trong bài học.
- User nhận được phản hồi cụ thể khi sai.
- User có thể hoàn thành ít nhất một module SQL.
- User có thể đi từ task mô phỏng sang module học liên quan và quay lại.
- Demo thể hiện rõ vòng lặp Learn → Apply → Review → Prove.

## 12. Ghi chú cho Design / Engineering
- Tối ưu readability trong chat.
- Quick answers cần nằm trong luồng chat.
- Không giữ lại quick answer disabled sau khi user chọn.
- DataPanel cần tự chuyển tab theo hành động.
- Các panel chính nên resize được.
- Cần tách mock data khỏi UI components.
`;

export const PRD_BRIEF_SECTIONS = {
    businessContext:
        "Provable muốn tăng mức độ tương tác trong phần học. Hiện tại người học dễ bị lạc vì bài học quá ngắn, ít phản hồi và không biết nên làm gì tiếp theo. Tính năng Provable Coach sẽ đóng vai trò như một mentor trong app, hướng dẫn người học qua chat dạng quick answer, giải thích khái niệm, đưa bài tập, phản hồi lỗi và gợi ý phần cần ôn.",
    problemStatement:
        "Người học mới thường không biết mình sai ở đâu khi làm bài. Họ cần một trải nghiệm học có hướng dẫn rõ ràng, phản hồi cụ thể và khả năng quay lại đúng phần kiến thức còn yếu.",
    targetUsers: [
        "Người mới học SQL",
        "Sinh viên mới ra trường",
        "Người đang chuẩn bị đi thực tập",
        "Người muốn luyện kỹ năng qua mô phỏng công việc",
    ],
    mainFeature:
        "Provable Coach là một chat-based guided tutor. Người dùng không nhập text tự do trong chat mà chọn quick answers. Coach sẽ điều hướng bài học, giải thích kiến thức, đưa câu hỏi kiểm tra, giao bài tập, phản hồi kết quả và gợi ý học lại phần liên quan.",
    coreRequirements: [
        "Chat coach dùng quick answers, không có text input tự do",
        "Quick answer sau khi chọn sẽ thay thế bubble lựa chọn bằng câu trả lời của user",
        "Coach có thể chuyển tab trong LearningDataPanel",
        "Coach đưa phản hồi chi tiết khi user làm sai",
        "Có hint nhiều cấp độ",
        "Có remedial flow khi user sai nhiều lần",
        "Có liên kết từ internship task sang learn module liên quan",
        "Có light/dark theme",
        "Toàn bộ UI tiếng Việt",
        "Kết quả SQL hiển thị dạng bảng",
    ],
    successMetrics: [
        "Người học hiểu mình cần làm gì tiếp theo",
        "Giảm số lần user bị stuck trong bài học",
        "Tăng tỷ lệ hoàn thành module học",
        "Tăng tỷ lệ user chuyển từ Learning sang Job Simulation",
        "Tăng độ hài lòng với phản hồi của hệ thống",
    ],
    constraints: [
        "Prototype frontend-only",
        "Không dùng AI API thật",
        "Không dùng backend",
        "Logic interaction rule-based",
        "Chỉ cần demo được flow chính",
    ],
};

export const PRD_RESOURCES: DocumentResource[] = [
    {
        id: "prd-what",
        title: "PRD là gì?",
        type: "Hướng dẫn",
        estimatedTime: "3 phút",
        content:
            "PRD là tài liệu giúp Product, Design và Engineering hiểu cùng một vấn đề, cùng một phạm vi và cùng một tiêu chí thành công trước khi xây tính năng.",
    },
    {
        id: "problem-statement",
        title: "Cách viết problem statement",
        type: "Hướng dẫn",
        estimatedTime: "4 phút",
        content:
            "Problem statement nên mô tả ai bị ảnh hưởng, họ gặp khó khăn gì, và hậu quả nếu không giải quyết. Tránh mô tả giải pháp quá sớm.",
    },
    {
        id: "user-flow",
        title: "Cách xác định user flow",
        type: "Hướng dẫn",
        estimatedTime: "5 phút",
        content:
            "User flow nên liệt kê từng bước theo thứ tự thời gian: user vào đâu, làm gì, hệ thống phản hồi ra sao, và kết thúc ở đâu.",
    },
    {
        id: "functional-req",
        title: "Cách viết functional requirements",
        type: "Hướng dẫn",
        estimatedTime: "5 phút",
        content:
            "Mỗi yêu cầu chức năng nên cụ thể, có thể kiểm tra được, và mô tả hành vi hệ thống — không chỉ mô tả ý tưởng chung chung.",
    },
    {
        id: "checklist",
        title: "Checklist trước khi nộp PRD",
        type: "Checklist",
        estimatedTime: "2 phút",
        content:
            "Kiểm tra: đủ 12 mục trong template, problem rõ ràng, in/out scope tách bạch, user flow đủ bước, edge cases được liệt kê, tiêu chí thành công đo được.",
    },
];

export const documentTasks: DocumentTask[] = [
    {
        id: "novatech-prd-provable-coach",
        programId: "novatech-pm-interview",
        title: "Viết Product Requirement Documentation cho tính năng Provable Coach",
        type: "prd",
        company: "NovaTech",
        role: "Associate Product Manager",
        team: "Product Platform Team",
        scenario:
            "NovaTech đang xây dựng một tính năng học tương tác tên là Provable Coach. Tính năng này giúp người học nhận hướng dẫn theo từng bước trong quá trình học và làm task mô phỏng công việc. Bạn được giao nhiệm vụ viết một bản Product Requirement Documentation để team Design và Engineering có thể hiểu rõ yêu cầu sản phẩm.",
        objective:
            "Hoàn thiện tài liệu PRD cho tính năng Provable Coach dựa trên brief đã cho.",
        deliverable: "Một file tài liệu PRD đã hoàn thiện.",
        expectedFormats: [".docx", ".pdf", ".md", ".txt"],
        templateFileName: "provable-coach-prd-template.md",
        passThreshold: 90,
        requiredSections: [
            "Tên tính năng",
            "Bối cảnh",
            "Vấn đề cần giải quyết",
            "Người dùng mục tiêu",
            "Mục tiêu sản phẩm",
            "Phạm vi tính năng",
            "User flow",
            "Yêu cầu chức năng",
            "Yêu cầu phi chức năng",
            "Trạng thái lỗi và edge cases",
            "Tiêu chí thành công",
            "Ghi chú cho Design / Engineering",
        ],
        importantKeywords: [
            "Provable Coach",
            "quick answer",
            "feedback",
            "hint",
            "remedial flow",
            "LearningDataPanel",
            "light/dark theme",
            "tiếng Việt",
        ],
        evaluationCriteria: [
            "Cấu trúc PRD đầy đủ",
            "Bối cảnh và vấn đề rõ ràng",
            "Người dùng mục tiêu cụ thể",
            "Mục tiêu sản phẩm đo được",
            "Phạm vi in-scope / out-of-scope rõ",
            "User flow đủ bước",
            "Yêu cầu chức năng cụ thể",
            "Yêu cầu phi chức năng hợp lý",
            "Edge cases được liệt kê",
            "Tiêu chí thành công rõ ràng",
            "Có liên hệ với tính năng Provable Coach",
        ],
    },
];

export function getDocumentTask(id: string): DocumentTask | undefined {
    return documentTasks.find((t) => t.id === id);
}

export function downloadPrdTemplate() {
    const blob = new Blob([PRD_TEMPLATE_MARKDOWN], {
        type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "provable-coach-prd-template.md";
    a.click();
    URL.revokeObjectURL(url);
}
