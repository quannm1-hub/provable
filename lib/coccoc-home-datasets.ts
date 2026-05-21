/** Mock datasets for Cốc Cốc DA Intern home test (from 2_SQL_test.xlsx + sample clickstream) */

export const COCCOC_EMPLOYEE = [
    { FirstName: "Bob", LastName: "Smith", ID: 1, HireDate: "2009-06-20", TerminationDate: "2016-01-01", Salary: 10000 },
    { FirstName: "Joe", LastName: "Jarrod", ID: 2, HireDate: "2010-02-12", TerminationDate: null as string | null, Salary: 20000 },
    { FirstName: "Nancy", LastName: "Soley", ID: 3, HireDate: "2012-03-14", TerminationDate: null, Salary: 30000 },
    { FirstName: "Keith", LastName: "Widjaja", ID: 4, HireDate: "2013-09-10", TerminationDate: "2014-01-01", Salary: 20000 },
    { FirstName: "Kelly", LastName: "Smalls", ID: 5, HireDate: "2013-09-10", TerminationDate: null, Salary: 20000 },
    { FirstName: "Frank", LastName: "Nguyen", ID: 6, HireDate: "2015-04-10", TerminationDate: "2015-05-01", Salary: 60000 },
];

export const COCCOC_ANNUAL_REVIEWS = [
    { ID: 10, EmpID: 1, ReviewDate: "2016-01-01" },
    { ID: 20, EmpID: 2, ReviewDate: "2016-04-12" },
    { ID: 30, EmpID: 10, ReviewDate: "2015-02-13" },
    { ID: 40, EmpID: 22, ReviewDate: "2010-10-12" },
    { ID: 50, EmpID: 11, ReviewDate: "2009-01-01" },
    { ID: 60, EmpID: 12, ReviewDate: "2009-03-03" },
    { ID: 70, EmpID: 13, ReviewDate: "2008-12-01" },
    { ID: 80, EmpID: 1, ReviewDate: "2003-04-12" },
    { ID: 90, EmpID: 1, ReviewDate: "2014-04-30" },
];

export const COCCOC_CLICKSTREAM = [
    { date: "2019-02-25", time: "00:01:01", user_id: "a37agOUtUEQiyagcdU2TAA", domain: "youtube.com", timestamp: "2019-02-25 00:01:01", hour: "00" },
    { date: "2019-02-25", time: "00:03:12", user_id: "5wGdzKx3Kf4WK0gNfwZPpw", domain: "www.google.com", timestamp: "2019-02-25 00:03:12", hour: "00" },
    { date: "2019-02-25", time: "03:15:22", user_id: "bK9mN2pQx1", domain: "www.facebook.com", timestamp: "2019-02-25 03:15:22", hour: "03" },
    { date: "2019-02-25", time: "03:18:44", user_id: "cL0nO3qRy2", domain: "coccoc.com", timestamp: "2019-02-25 03:18:44", hour: "03" },
    { date: "2019-02-25", time: "11:58:01", user_id: "5wGdzKx3Kf4WK0gNfwZPpw", domain: "www.google.com", timestamp: "2019-02-25 11:58:01", hour: "11" },
    { date: "2019-02-25", time: "12:01:15", user_id: "dM1pP4sSz3", domain: "www.youtube.com", timestamp: "2019-02-25 12:01:15", hour: "12" },
    { date: "2019-02-25", time: "12:15:33", user_id: "eN2qQ5tTa4", domain: "news.zing.vn", timestamp: "2019-02-25 12:15:33", hour: "12" },
    { date: "2019-02-25", time: "12:53:01", user_id: "a37agOUtUEQiyagcdU2TAA", domain: "youtube.com", timestamp: "2019-02-25 12:53:01", hour: "12" },
    { date: "2019-02-25", time: "14:02:10", user_id: "fO3rR6uUb5", domain: "www.facebook.com", timestamp: "2019-02-25 14:02:10", hour: "14" },
    { date: "2019-02-25", time: "14:22:45", user_id: "gP4sS7vVc6", domain: "kenh14.vn", timestamp: "2019-02-25 14:22:45", hour: "14" },
    { date: "2019-02-25", time: "14:55:01", user_id: "hQ5tT8wWd7", domain: "tiki.vn", timestamp: "2019-02-25 14:55:01", hour: "14" },
    { date: "2019-02-25", time: "17:10:20", user_id: "iR6uU9xXe8", domain: "vn.yahoo.com", timestamp: "2019-02-25 17:10:20", hour: "17" },
    { date: "2019-02-25", time: "17:45:33", user_id: "jS7vV0yYf9", domain: "coccoc.com", timestamp: "2019-02-25 17:45:33", hour: "17" },
    { date: "2019-02-25", time: "19:05:12", user_id: "kT8wW1zZg0", domain: "www.youtube.com", timestamp: "2019-02-25 19:05:12", hour: "19" },
    { date: "2019-02-25", time: "19:30:44", user_id: "lU9xX2aAh1", domain: "www.google.com", timestamp: "2019-02-25 19:30:44", hour: "19" },
    { date: "2019-02-25", time: "19:55:18", user_id: "mV0yY3bBi2", domain: "trangtraiviet.vn", timestamp: "2019-02-25 19:55:18", hour: "19" },
    { date: "2019-02-25", time: "20:12:01", user_id: "nW1zZ4cCj3", domain: "www.facebook.com", timestamp: "2019-02-25 20:12:01", hour: "20" },
    { date: "2019-02-25", time: "20:40:22", user_id: "oX2aA5dDk4", domain: "www.youtube.com", timestamp: "2019-02-25 20:40:22", hour: "20" },
];

export type CoccocDatasetKey = "employee" | "annual_reviews" | "clickstream";

export const COCCOC_DATASET_META: Record<
    CoccocDatasetKey,
    { label: string; tableName: string; description: string }
> = {
    employee: {
        label: "Employee",
        tableName: "Employee",
        description: "Bảng nhân viên: FirstName, LastName, ID, HireDate, TerminationDate, Salary.",
    },
    annual_reviews: {
        label: "AnnualReviews",
        tableName: "AnnualReviews",
        description: "Bảng review: ID, EmpID, ReviewDate.",
    },
    clickstream: {
        label: "Clickstream sample",
        tableName: "clickstream",
        description:
            "Mẫu clickstream: date, time, user_id, domain — dùng cho DAU, traffic theo giờ, top domain.",
    },
};

export function getCoccocDatasetRows(
    key: CoccocDatasetKey,
): Record<string, string | number | null>[] {
    switch (key) {
        case "employee":
            return COCCOC_EMPLOYEE.map((r) => ({ ...r }));
        case "annual_reviews":
            return COCCOC_ANNUAL_REVIEWS.map((r) => ({ ...r }));
        case "clickstream":
            return COCCOC_CLICKSTREAM.map((r) => ({ ...r }));
    }
}
