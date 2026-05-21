export type Confidence = "none" | "little" | "master";

export type Phase =
    | "confidence"
    | "explanation"
    | "mini_quiz"
    | "exercise"
    | "module_complete"
    | "simulation"
    | "course_complete";

export type Employee = {
    id: number;
    name: string;
    department: string;
    role: string;
    salary: number;
    status: string;
    location?: string;
};

export type MiniOption = { id: string; label: string };

export type ExerciseLevel = "beginner" | "medium" | "advanced";

export type ExerciseDef = {
    level: ExerciseLevel;
    prompt: string;
    starterCode: string;
    hint: string;
    scaffold: string;
    validate: (query: string) => ValidationResult;
};

export type ValidationResult = {
    ok: boolean;
    feedback: string;
    missing?: string[];
};

export type MiniQuestion = {
    prompt: string;
    options: MiniOption[];
    correctId: string;
    wrongFeedback: Record<string, string>;
    correctFeedback: string;
};

export type CourseModule = {
    id: string;
    index: number;
    title: string;
    confidenceQuestion: string;
    detailedExplanation: string;
    shortRecap: string;
    example: string;
    miniQuestion: MiniQuestion;
    exercises: Record<ExerciseLevel, ExerciseDef>;
};

export type SimulationTask = {
    id: string;
    title: string;
    prompt: string;
    starterCode: string;
    hint: string;
    validate: (query: string) => ValidationResult;
};

export type QueryResultType =
    | "select_result"
    | "empty_result"
    | "validation_error"
    | "danger_warning"
    | "update_preview"
    | "delete_preview";

export type RunResult = {
    ok: boolean;
    kind: "select" | "update" | "delete" | "error";
    resultType?: QueryResultType;
    message: string;
    rows?: Record<string, string | number>[];
    columns?: string[];
    rowCount?: number;
    preview?: { action: string; rows: Employee[] };
    affectedRows?: Record<string, string | number>[];
    warnings?: string[];
    errors?: string[];
};
