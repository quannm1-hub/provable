import type { DatasetId } from "./datasets";
import { DATASET_META, getDatasetRows } from "./datasets";

export type CompanyDatasetMeta = {
    id: DatasetId;
    name: string;
    vietnameseName: string;
    description: string;
    rowCount: number;
    columns: string[];
};

export const COMPANY_DATASET_META: Record<DatasetId, CompanyDatasetMeta> = {
    employees: {
        id: "employees",
        name: "employees",
        vietnameseName: "Dữ liệu nhân sự",
        description:
            "Bảng chứa thông tin nhân sự mẫu như phòng ban, vai trò, lương và trạng thái làm việc.",
        rowCount: 8,
        columns: DATASET_META.employees.columns,
    },
    candidate_funnel: {
        id: "candidate_funnel",
        name: "candidate_funnel",
        vietnameseName: "Dữ liệu phễu ứng viên",
        description:
            "Bảng mô phỏng dữ liệu ứng viên, nguồn ứng tuyển, trạng thái tuyển dụng và điểm đánh giá.",
        rowCount: 8,
        columns: DATASET_META.candidate_funnel.columns,
    },
    orders: {
        id: "orders",
        name: "orders",
        vietnameseName: "Dữ liệu đơn hàng",
        description:
            "Bảng mô phỏng đơn hàng với khách hàng, số lượng, tổng tiền, trạng thái và thành phố.",
        rowCount: 5,
        columns: DATASET_META.orders.columns,
    },
    products: {
        id: "products",
        name: "products",
        vietnameseName: "Dữ liệu sản phẩm",
        description: "Bảng mô phỏng sản phẩm, danh mục, giá, tồn kho và trạng thái.",
        rowCount: 5,
        columns: DATASET_META.products.columns,
    },
    marketing_performance: {
        id: "marketing_performance",
        name: "marketing_performance",
        vietnameseName: "Dữ liệu hiệu quả marketing",
        description:
            "Bảng mô phỏng campaign marketing với spend, leads, conversions và trạng thái.",
        rowCount: 5,
        columns: DATASET_META.marketing_performance.columns,
    },
};

export function getCompanyDatasetMeta(id: DatasetId): CompanyDatasetMeta {
    return COMPANY_DATASET_META[id];
}

export function getDatasetPreviewRows(id: DatasetId, limit = 5) {
    return getDatasetRows(id).slice(0, limit);
}
