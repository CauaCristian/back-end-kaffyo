import { PaginationMeta } from "./Pagination_Meta";

export interface PaginatedResponse<T>{
    data:T[];
    meta:PaginationMeta;
}