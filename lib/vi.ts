/** Vietnamese UI copy for Provable prototype */

export const vi = {
    app: {
        title: "Provable",
        subtitle:
            "Học kỹ năng qua thực hành có hướng dẫn, sau đó chứng minh năng lực bằng mô phỏng công việc thực tế.",
        prototypeNote:
            "Bản demo: SQL cơ bản và thực tập NovaTech đã có đầy đủ tương tác",
    },
    nav: {
        dashboard: "Bảng điều khiển",
        learn: "Học kỹ năng",
        internships: "Thực tập ảo",
        lightMode: "Chế độ sáng",
        darkMode: "Chế độ tối",
    },
    home: {
        learnSkill: "Học kỹ năng",
        learnSkillDesc:
            "Học theo lộ trình tương tác, có câu hỏi kiểm tra mức độ hiểu, bài tập thực hành và phản hồi tức thì.",
        chooseTopic: "Chọn chủ đề học",
        internship: "Giả lập thực tập doanh nghiệp",
        internshipDesc:
            "Thực hành các task giống môi trường công ty để rèn tư duy xử lý công việc.",
        chooseInternship: "Chọn chương trình thực tập",
        topicsTitle: "Học kỹ năng",
        topicsSubtitle:
            "Xây nền tảng qua bài học tương tác, thực hành có hướng dẫn và phản hồi tức thì.",
        viewAllTopics: "Xem tất cả chủ đề",
        internshipsTitle: "Thực tập ảo",
        internshipsSubtitle:
            "Chứng minh năng lực qua chương trình mô phỏng công việc — task thực tế, đáp án mẫu, badge hoàn thành.",
        viewAllInternships: "Xem tất cả chương trình",
        startLearning: "Bắt đầu học",
        startInternship: "Bắt đầu mô phỏng",
        previewUnavailable: "Chưa mở xem trước",
    },
    badges: {
        available: "Có sẵn",
        comingSoon: "Sắp ra mắt",
        beginner: "Dành cho người mới",
        interactive: "Tương tác cao",
        workplace: "Mô phỏng công việc",
        duration: "20-30 phút",
    },
    learn: {
        pageTitle: "Học kỹ năng",
        pageSubtitle:
            "Xây nền tảng qua bài học tương tác, thực hành có hướng dẫn và phản hồi tức thì. Provable Coach điều chỉnh theo mức độ hiểu của bạn.",
        startLearning: "Bắt đầu học",
        coachName: "Provable Coach",
        coachSubtitle: "SQL cơ bản · Lộ trình học",
        moduleLabel: (index: number, total: number, title: string) =>
            `Phần ${index} / ${total}: ${title}`,
        readiness: "Mức sẵn sàng",
        welcome: (title: string, question: string) =>
            `Chào mừng đến **${title}**. ${question}\n\nVì sao quan trọng: bạn sẽ dùng kỹ năng này liên tục khi kiểm tra bảng dữ liệu thật trong công việc.`,
        tryInEditor: "Bây giờ hãy thử trong trình soạn SQL:",
        hintAvailable: "\n\nGợi ý có sẵn bên dưới nếu bạn cần.",
        quickHelp: "\n\nDùng câu trả lời nhanh bên dưới nếu bạn gặp khó.",
        moduleCompleteLast: (title: string) =>
            `Bạn đã hoàn thành **${title}** — và toàn bộ lộ trình **SQL cơ bản**. Làm tốt lắm!`,
        moduleComplete: (title: string, nextTitle: string) =>
            `Bạn đã hoàn thành **${title}**. Bạn đã thể hiện đủ mức hiểu.\n\nSẵn sàng sang **${nextTitle}**?`,
        skipLecture: (prompt: string) =>
            `Đã hiểu — bỏ qua phần lý thuyết dài. Đây là thử thách:\n\n**${prompt}**`,
        notQuite: "Chưa đúng. Hãy làm rõ trước khi thực hành.",
        selectReads: "SELECT đọc dữ liệu — không sửa hay xóa dòng.",
        tryAgainQuiz: (prompt: string) => `Thử lại: **${prompt}**`,
        correctPrefix: "Đúng.",
        dangerousNoWhere:
            "Cẩn thận. UPDATE hoặc DELETE không có WHERE có thể ảnh hưởng cả bảng. Trong công việc thật, đây là loại lỗi khiến cả team im lặng rất lâu.",
        runOkSelect: (msg: string) =>
            `Chạy ổn — ${msg} Xem bảng kết quả bên dưới, rồi **Nộp bài** khi sẵn sàng.`,
        hintPrefix: "Gợi ý",
        tryStructure: "Thử cấu trúc này:",
        explainAgain: (title: string) =>
            `Không sao — đây là cách giải thích đơn giản hơn cho **${title}**:`,
        easierExample: "Đây là ví dụ khác:",
        anotherTask: "Đây là bài tập thực hành khác ở mức tương tự:",
        practiceRound: "Vòng luyện tập:",
        complete: {
            title: "Hoàn thành SQL cơ bản",
            subtitle:
                "Bạn đã hoàn thành tất cả phần với thực hành có hướng dẫn và phản hồi tức thì.",
            modulesDone: "Số phần đã hoàn thành",
            score: "Điểm học tập",
            nextStep:
                "Gợi ý tiếp theo: thử thực tập ảo để áp dụng SQL trong bối cảnh công việc.",
            backDashboard: "Quay về Bảng điều khiển",
            exploreInternships: "Khám phá thực tập ảo",
            reviewSql: "Ôn lại SQL cơ bản",
        },
    },
    internship: {
        pageTitle: "Giả lập thực tập doanh nghiệp",
        pageSubtitle:
            "Khám phá các chương trình mô phỏng công việc, hoàn thành task thực tế và chứng minh năng lực qua sản phẩm đầu ra.",
        startProgram: "Bắt đầu",
        previewProgram: "Xem trước",
        startSimulation: "Bắt đầu mô phỏng",
        backToProgram: "Quay lại chương trình",
        selfPaced: "Tự học theo tốc độ cá nhân",
        noApplication: "Không cần ứng tuyển",
        tasksLabel: (n: number) => `${n} task`,
        mentorName: "Mentor NovaTech",
        mentorSubtitle: "People Operations · Thực tập ảo",
        taskBriefing: "Task 1 / 6: Giới thiệu dự án",
        taskLabel: (step: number, title: string) => `Task ${step} / 6: ${title}`,
        unlockSql: "Hoàn thành phần giới thiệu trong chat mentor để mở các task SQL.",
        readySql: "Tuyệt — dùng trình soạn SQL bên phải khi bạn sẵn sàng.",
        runOk: (msg: string) =>
            `${msg} Xem bảng dữ liệu bên dưới, rồi nộp khi sẵn sàng.`,
        resultReview: (summary: string) => `**Xem lại kết quả:** ${summary}`,
        runFirst: "Chạy SQL trước để xem trước kết quả trong bảng dữ liệu.",
        modelAnswerIntro: "Đây là đáp án mẫu cho task này:",
        reflectionCorrect:
            "Đúng — thể hiện tư duy SQL và nghiệp vụ tốt cho task này.",
        reflectionWrong:
            "Chưa đúng. Hãy nghĩ câu hỏi nghiệp vụ thực sự đang hỏi gì.",
        dangerousUpdate:
            "Truy vấn nguy hiểm. UPDATE không có WHERE có thể thay đổi toàn bộ dòng trong bảng.",
        dangerousDelete:
            "Truy vấn nguy hiểm. DELETE không có WHERE có thể xóa toàn bộ dữ liệu trong bảng.",
        intro: {
            title: "Thực tập ảo Data Operations tại NovaTech",
            welcome:
                "Chào mừng bạn đến với chương trình thực tập ảo Data Operations tại NovaTech. Bạn sẽ đóng vai thực tập sinh trong team People Operations và hỗ trợ chuẩn bị dữ liệu cho báo cáo nhân sự hàng tháng.",
            prerequisite:
                "Mô phỏng này sử dụng các kiến thức SQL cơ bản như SELECT, WHERE, AND / OR, UPDATE và DELETE. Nếu bạn chưa quen, bạn có thể học phần SQL cơ bản trước.",
            disclaimer:
                "Mô phỏng tự học — không phải thực tập hay việc làm thật. Luyện task giống công việc và đối chiếu với đáp án mẫu.",
            start: "Bắt đầu thực tập",
            learnFirst: "Học SQL cơ bản trước",
        },
        submission: {
            notSubmitted: "Chưa nộp",
            checking: "Đang kiểm tra",
            submitted: "Đã nộp",
            modelUnlocked: "Đáp án mẫu đã mở khóa",
        },
        complete: {
            title: "Hoàn thành mô phỏng công việc",
            subtitle:
                "Bạn đã hoàn thành chương trình Thực tập ảo Data Operations tại NovaTech.",
            certificateLabel: "Chứng nhận mô phỏng",
            learner: "Người học",
            learnerName: "Demo User",
            role: "Vai trò",
            status: "Trạng thái",
            statusDone: "Hoàn thành",
            skills: "Kỹ năng",
            cvHint: "Gợi ý mô tả trên CV",
            cvText:
                "Hoàn thành mô phỏng Data Operations tại NovaTech trên Provable, thực hành các task SQL như kiểm tra dữ liệu, lọc dữ liệu theo yêu cầu nghiệp vụ và viết truy vấn cập nhật/xóa an toàn.",
            reviewTasks: "Xem lại task",
            exploreMore: "Khám phá mô phỏng khác",
            sqlScore: "SQL cơ bản",
            safetyScore: "An toàn truy vấn",
            businessScore: "Hiểu yêu cầu nghiệp vụ",
            readiness: "Mức độ sẵn sàng",
            readinessLevel: "Junior-ready",
            reviewModels: "Xem lại đáp án mẫu",
            backDashboard: "Quay về Bảng điều khiển",
            tryLearn: "Thử học SQL cơ bản",
            yourSubmission: "Bài làm của bạn",
            modelAnswer: "Đáp án mẫu",
        },
        taskCard: {
            context: "Bối cảnh công việc",
            instruction: "Yêu cầu",
            deliverable: "Kết quả cần nộp",
        },
        progress: {
            briefing: "Giới thiệu",
            inspect: "Kiểm tra dữ liệu",
            filter: "Lọc nhân sự",
            salary: "Rà soát lương",
            update: "Cập nhật an toàn",
            delete: "Xóa an toàn",
            completion: "Hoàn thành",
        },
    },
    links: {
        relatedKnowledge: "Kiến thức liên quan",
        reviewAgain: "Ôn lại",
        learnQuick: "Học nhanh",
        usedInSimulation: "Áp dụng trong mô phỏng công việc",
        usedInTasks: "Dùng trong các task sau",
        readiness: "Mức sẵn sàng cho task này",
        canStartAnyway:
            "Bạn vẫn có thể làm task ngay. Nếu bị vướng, hãy ôn nhanh các phần liên quan.",
        backToTask: "Quay lại task thực tập",
        reviewingForTask: (skill: string, task: string) =>
            `Bạn đang ôn ${skill} để hỗ trợ task: ${task}.`,
        knowledgeMap: "Bản đồ kỹ năng",
        viewKnowledgeMap: "Xem bản đồ kỹ năng",
        skillUsedIn: "Kỹ năng này đang được dùng ở",
        viewTask: "Xem task",
        prereqSkills: "Kiến thức nên có trước khi bắt đầu",
        nextRecommendations: "Gợi ý tiếp theo",
        taskNeedsSkill: "Task này cần kiến thức",
        solid: "Đã vững",
        learn: "Học",
    },
    chat: {
        chooseResponse: "Chọn câu trả lời",
    },
    sql: {
        editor: "Trình soạn SQL",
        placeholder: "-- Viết SQL tại đây",
        run: "Chạy SQL",
        runTrial: "Chạy thử",
        submit: "Nộp bài",
        submitTask: "Nộp task",
        reset: "Làm lại",
        showHint: "Hiện gợi ý",
        hint: "Gợi ý",
    },
    data: {
        table: "Bảng dữ liệu",
        tableName: "Bảng: employees",
        tableDesc: "Bảng employees chứa thông tin nhân sự mẫu.",
        queryResult: "Kết quả truy vấn",
        preview: "Bản xem trước",
        updatePreview: "Bản xem trước cập nhật",
        deletePreview: "Bản xem trước xóa",
        notPermanent: "Dữ liệu không bị thay đổi vĩnh viễn trong bản demo này.",
        submittedOk: "Đã nộp bài — câu trả lời được chấp nhận",
        notCorrect: "Chưa đúng — xem phản hồi từ coach",
        runOrSubmit: "Chạy SQL hoặc nộp bài để xem kết quả tại đây.",
        rowsReturned: (n: number) => `Trả về ${n} dòng.`,
        emptyResult: "Không có dòng nào khớp với truy vấn hiện tại.",
        runError: "Chưa thể chạy truy vấn. Hãy kiểm tra lại cú pháp hoặc điều kiện.",
        updatePreviewHint: "Các dòng dưới đây sẽ được cập nhật nếu chạy query này.",
        deletePreviewHint: "Các dòng dưới đây sẽ bị xóa nếu chạy query này.",
        comparisonNote:
            "Đối chiếu điều kiện WHERE và cột SELECT với yêu cầu nghiệp vụ của task.",
    },
    sqlRunner: {
        enterQuery: "Hãy nhập truy vấn SQL trước.",
        needFrom: "Cần có FROM employees.",
        updateNoWhere: "UPDATE không có WHERE có thể thay đổi mọi dòng. Hãy thêm WHERE.",
        deleteNoWhere: "DELETE không có WHERE có thể xóa mọi dòng. Hãy thêm WHERE.",
        updatePreview: (n: number) =>
            `Xem trước: ${n} dòng sẽ được cập nhật (dữ liệu không đổi vĩnh viễn trong demo).`,
        deletePreview: (n: number) =>
            `Xem trước: ${n} dòng sẽ bị xóa (dữ liệu không đổi vĩnh viễn trong demo).`,
        unsupported: "Câu lệnh chưa hỗ trợ. Hãy thử SELECT, UPDATE hoặc DELETE.",
    },
} as const;
