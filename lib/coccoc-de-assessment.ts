/** Cốc Cốc DE Intern Assessment — submission review practice */

export const COCCOC_DE_ASSESSMENT_PROGRAM = {
    id: "coccoc-de-intern-assessment",
    company: "Cốc Cốc",
    companyId: "coccoc",
    title: "Cốc Cốc · DE Intern Assessment",
    vietnameseTitle: "Cốc Cốc · Chấm bài DE Intern Assessment",
    programTitleEn: "Cốc Cốc · DE Intern Assessment",
    role: "Data Engineering Intern",
    team: "Data Platform",
    description:
        "Module đo lường AI Chat: đọc bối cảnh sản phẩm, viết PRD + SQL, nộp package và xem review pipeline trên Provable.",
    estimatedTime: "3 ngày",
    difficulty: "Intern / Entry-level",
    taskCount: 1,
    passThreshold: 75,
    badge: "Cốc Cốc · DE Assessment Review",
    yourRole:
        "Bạn là ứng viên Data Engineering Intern trong team Data Platform tại Cốc Cốc. Nhiệm vụ là đọc hiểu dataset e-commerce mô phỏng, viết truy vấn SQL cho từng task và đóng gói bài nộp (repo hoặc .zip) để reviewer đánh giá.",
    yourGoal:
        "Hoàn thành 3 task SQL (`task1.sql`, `task2.sql`, `task3.sql`) trên repo starter, thể hiện tư duy xử lý dữ liệu và chất lượng truy vấn, kèm README / hướng dẫn chạy rõ ràng — sau đó upload bài để nhận phản hồi từ review pipeline trên Provable.",
};

export type CoccocDeProgramTabId =
    | "overview"
    | "company"
    | "jobs"
    | "stakeholder"
    | "task-context"
    | "role-goal";

export type CoccocDeProgramTabSection = {
    title: string;
    content: string;
    bullets?: string[];
};

export type CoccocDeProgramTab = {
    id: CoccocDeProgramTabId;
    label: string;
    content: string;
    bullets?: string[];
    sections?: CoccocDeProgramTabSection[];
};

export const COCCOC_DE_PROGRAM_TABS: CoccocDeProgramTab[] = [
    {
        id: "overview",
        label: "Giới thiệu chung",
        content:
            "Chương trình Cốc Cốc · DE Intern Assessment là module thực hành mô phỏng quy trình làm việc thật của một chuyên gia dữ liệu tại Cốc Cốc — từ nắm bối cảnh sản phẩm, phối hợp đa team, đến thiết kế đo lường và nộp bài để được chấm tự động.",
        sections: [
            {
                title: "Chương trình dành cho ai?",
                content:
                    "Dành cho thực tập sinh / ứng viên Data Engineering Intern hoặc người mới chuyển sang phân tích dữ liệu sản phẩm. Bạn cần có nền tảng SQL, khả năng đọc hiểu yêu cầu nghiệp vụ và tư duy trình bày kết quả rõ ràng cho PM và lãnh đạo.",
            },
            {
                title: "Bạn sẽ làm gì trong module?",
                content:
                    "Module xoay quanh tính năng AI Chat trên trình duyệt Cốc Cốc — một case có điểm mù dữ liệu thực tế mà nhiều team product gặp phải:",
                bullets: [
                    "Đọc bối cảnh công ty, stakeholders và nhiệm vụ qua các tab Giới thiệu",
                    "Soạn PRD / đặc tả kỹ thuật để team Dev triển khai event tracking đúng",
                    "Viết truy vấn SQL tính Active Users theo hệ điều hành (Windows / macOS)",
                    "Đóng gói bài nộp (README, code/SQL, hướng dẫn chạy) và upload lên Provable",
                    "Xem kết quả review pipeline: format, similarity, code run, LLM review",
                ],
            },
            {
                title: "Đầu ra mong đợi",
                content: "Khi hoàn thành, bài làm của bạn nên thể hiện được:",
                bullets: [
                    "Hiểu vấn đề kinh doanh: lượt nhìn thấy icon AI ≠ người dùng thực sự chat",
                    "Đề xuất đo lường có thể triển khai (events, dimensions, metric definitions)",
                    "SQL chạy được trên dữ liệu cc_users / cc_events (hoặc dataset tương đương trong repo)",
                    "Tài liệu đủ để reviewer hoặc đồng đội reproduce kết quả",
                ],
            },
            {
                title: "Cách Provable hỗ trợ",
                content:
                    "Sau khi nộp package, hệ thống mô phỏng pipeline chấm bài của reviewer: kiểm tra format & deadline, README, similarity/template, khả năng chạy code, chất lượng nội dung và gợi ý quyết định Pass / Needs Review / Reject. Bạn có thể chạy pre-check trước, chỉnh sửa và nộp lại để cải thiện điểm.",
            },
            {
                title: "Thời lượng & lộ trình gợi ý",
                content: "Thời lượng ước tính 3 ngày. Gợi ý chia nhỏ:",
                bullets: [
                    "Ngày 1: Đọc hết tab Giới thiệu, làm rõ bối cảnh AI Chat và alignment với PM",
                    "Ngày 2: Hoàn thiện PRD/đặc tả + viết & test SQL",
                    "Ngày 3: Polish README, đóng gói zip, upload và xem feedback review pipeline",
                ],
            },
        ],
    },
    {
        id: "company",
        label: "Công ty",
        content:
            'Cốc Cốc là trình duyệt và công cụ tìm kiếm "Make in Vietnam" hàng đầu, phục vụ hàng chục triệu người dùng Việt với các tính năng bản địa hóa sâu sắc. Tại Cốc Cốc, dữ liệu không chỉ là những con số vô hồn trên màn hình máy tính; dữ liệu là tiếng nói của người dùng, giúp chúng tôi liên tục tối ưu hóa trải nghiệm (UX) và định hình các sản phẩm công nghệ tiên phong.',
    },
    {
        id: "jobs",
        label: "Vai trò",
        content:
            "Bạn đang trong quá trình chuyển đổi để trở thành một chuyên gia phân tích dữ liệu thực thụ. Trong vai trò này, bạn không chỉ ngồi viết code SQL. Bạn là cầu nối quan trọng giữa những gì người dùng thao tác trên màn hình và các quyết định chiến lược của ban lãnh đạo. Sự nhạy bén của bạn về cách AI tương tác với người dùng cuối sẽ là chìa khóa để hoàn thành xuất sắc nhiệm vụ.",
    },
    {
        id: "stakeholder",
        label: "Các bên liên quan",
        content:
            "Trong dự án này, bạn sẽ làm việc trực tiếp (mô phỏng) với ba đội ngũ cốt lõi:",
        bullets: [
            "Product Management Team (Browser): Người đưa ra yêu cầu kinh doanh, họ cần bạn trả lời câu hỏi: \"Tính năng này có đáng để tiếp tục đầu tư không?\"",
            "Backend Development Team: Đội ngũ sẽ thực thi các yêu cầu \"bắn\" sự kiện (event tracking) từ hệ thống dưới sự chỉ dẫn/đặc tả của bạn.",
            "Data Engineering (DE) Team: Những người duy trì Data Warehouse, đảm bảo dữ liệu cc_users và cc_events luôn sạch và sẵn sàng để bạn truy vấn.",
        ],
    },
    {
        id: "task-context",
        label: "Bối cảnh nhiệm vụ",
        content:
            'Đội ngũ phát triển vừa ra mắt tính năng "AI Chat" tích hợp ngay trên thanh sidebar của trình duyệt. Dù các báo cáo ban đầu cho thấy lượng người dùng nhìn thấy icon AI là rất lớn, nhưng chúng ta đang gặp một điểm mù dữ liệu (data blindspot): Không ai rõ có bao nhiêu người thực sự gửi câu lệnh (prompt) để tương tác với AI, và trải nghiệm trên hệ điều hành nào (Windows hay macOS) đang mượt mà hơn.\n\nBan lãnh đạo đang chuẩn bị chốt roadmap cho quý 3/2026. Họ cần dữ liệu thực tế ngay bây giờ để quyết định xem nên tập trung cải thiện giao diện cho nhóm người dùng nào, hay thay đổi luồng trải nghiệm ra sao.',
    },
    {
        id: "role-goal",
        label: "Vai trò & Mục tiêu",
        content:
            "Nhiệm vụ của bạn trong Module này là thiết lập nền tảng đo lường chuẩn xác cho tính năng AI Chat. Đầu ra cốt lõi: Viết một bản Đặc tả kỹ thuật (PRD) rõ ràng cho team Dev để thu thập đúng dữ liệu, và xây dựng logic truy vấn SQL chuẩn xác nhằm tính toán lượng người dùng thực tế (Active Users) theo từng hệ điều hành. Mục tiêu tối thượng không chỉ là cung cấp một con số, mà là giúp đội ngũ Product có đủ cơ sở dữ liệu để tối ưu hóa luồng UX, biến AI Chat trở thành một trợ lý đắc lực thực sự của người dùng thay vì chỉ là một nút bấm trang trí.",
    },
];

/** Starter repo — [Shopify/eng-intern-assessment-data](https://github.com/Shopify/eng-intern-assessment-data/tree/main) */
export const COCCOC_DE_GITHUB_URL =
    "https://github.com/Shopify/eng-intern-assessment-data/tree/main";

export const COCCOC_DE_ASSIGNMENT = {
    title: "Data Engineer Intern Assessment",
    intro:
        "Bài assessment đánh giá kỹ năng SQL, thao tác dữ liệu và tư duy giải quyết bài toán trên dataset e-commerce mô phỏng. Làm việc trên repo starter, hoàn thành 3 task SQL rồi nộp package để hệ thống chấm.",
    dataset:
        "Dataset gồm các file CSV trong thư mục `data/` (đặt tên `<table>_data.csv`), mô tả schema trong `schema.sql`. Các cột ví dụ: `product_id`, `sales_amount`, `customer_id`, …",
    steps: [
        "Fork repository starter và clone về máy local",
        "Tạo branch mới cho bài làm của bạn",
        "Đọc `schema.sql` và các file CSV trong `data/` để hiểu cấu trúc dữ liệu",
        "Viết truy vấn trong `sql/task1.sql`, `sql/task2.sql`, `sql/task3.sql` cho từng yêu cầu",
        "Đảm bảo mỗi file SQL có query được comment rõ, dùng đúng dataset trong repo",
        "Đóng gói repo (hoặc file .zip chứa thư mục `sql/`, README và giải thích) rồi upload tại Provable để xem review pipeline",
    ],
    notes: [
        "Tham khảo README trong repo starter để biết yêu cầu chi tiết từng task",
        "Dùng đúng các file `<table>_data.csv` được cung cấp — không thay dataset",
        "Sau khi hoàn thành, có thể tạo pull request trên GitHub theo hướng dẫn trong repo (bước nộp thật ngoài app)",
    ],
};

export const COCCOC_DE_TASK = {
    id: "de-intern-package",
    title: "Nộp bài DE Intern Assessment",
    scenario:
        "Fork repo starter, hoàn thành 3 file SQL trong thư mục `sql/`, rồi upload package (zip hoặc README + code) để Provable chấm format, similarity, khả năng chạy và LLM review.",
};

export type CoccocDeProgramTaskId =
    | "intro"
    | "prd"
    | "sql-1"
    | "sql-2"
    | "sql-3"
    | "submit";

export const COCCOC_DE_PROGRAM_TASKS: {
    id: CoccocDeProgramTaskId;
    step: number;
    label: string;
    title: string;
    summary: string;
    deliverable?: string;
}[] = [
    {
        id: "intro",
        step: 1,
        label: "Giới thiệu",
        title: "Đề bài & dataset",
        summary: "Đọc đề bài, link repo starter và hướng dẫn làm bài trước khi viết SQL.",
    },
    {
        id: "prd",
        step: 2,
        label: "PRD",
        title: "Đặc tả & event tracking",
        summary:
            "Soạn PRD/đặc tả cho Dev: events, properties, luồng gửi prompt AI, phân tách theo OS.",
        deliverable: "PRD hoặc tracking spec (trong package)",
    },
    {
        id: "sql-1",
        step: 3,
        label: "SQL 1",
        title: "Task 1 · sql/task1.sql",
        summary: "Truy vấn SQL đầu tiên — xem README repo starter cho yêu cầu cụ thể.",
        deliverable: "sql/task1.sql",
    },
    {
        id: "sql-2",
        step: 4,
        label: "SQL 2",
        title: "Task 2 · sql/task2.sql",
        summary: "Truy vấn thứ hai; chú ý JOIN, filter và comment business logic.",
        deliverable: "sql/task2.sql",
    },
    {
        id: "sql-3",
        step: 5,
        label: "SQL 3",
        title: "Task 3 · sql/task3.sql",
        summary: "Hoàn thiện truy vấn cuối — metric tổng hợp hoặc so sánh theo nhóm.",
        deliverable: "sql/task3.sql",
    },
    {
        id: "submit",
        step: 6,
        label: "Nộp bài",
        title: "Upload & chấm bài",
        summary:
            "Đóng gói README + SQL + PRD, pre-check rồi chấm bài để xem kết quả pipeline.",
        deliverable: "Package .zip hoặc tương đương",
    },
];

export const COCCOC_DE_EXPECTED_PACKAGE = [
    "README.md",
    "Source code (main.py, pipeline.py, solution.sql, notebook.ipynb, …)",
    "Giải thích approach",
    "Setup / run instructions",
    "Assumptions",
    "Output sample hoặc expected result",
];

export const COCCOC_DE_ACCEPTED_FORMATS = [
    { ext: ".zip", note: "Ưu tiên" },
    { ext: ".tar.gz", note: "Chấp nhận" },
    { ext: ".md", note: "Văn bản" },
    { ext: ".txt", note: "Văn bản" },
    { ext: ".pdf", note: "Cảnh báo" },
    { ext: ".docx", note: "Cảnh báo" },
];

export const COCCOC_DE_PIPELINE_STEPS = [
    "Pre-check: format, deadline, README",
    "Similarity & template",
    "Code run",
    "Nội dung & spell check",
    "LLM review & quyết định",
];

export const COCCOC_DE_PASS_CRITERIA = [
    "Package đúng format, đúng hạn",
    "README đủ: problem, approach, setup, run, assumptions, output",
    "Code có thể chạy hoặc hướng dẫn rõ",
    "Similarity / template risk thấp",
    "Không còn placeholder rỗng",
    "LLM review ≥ Pass",
];

export const COCCOC_DE_REQUIRED_SECTIONS = [
    "README",
    "Problem understanding",
    "Approach / Solution design",
    "Setup instructions",
    "Run instructions",
    "Assumptions",
    "Output / result explanation",
    "Limitations / trade-offs",
];

export const RELATED_LEARN_COCCOC_DE = [
    { label: "SQL JOIN", href: "/learn/sql?skill=sql-join" },
    { label: "Data reasoning", href: "/learn" },
];
