import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryService = {
    getCategories: (params?: string) => instance.get(`${endpoint.CATEGORY}?${params}`),
    addCategory: (payload: ICategory) => instance.post(endpoint.CATEGORY, payload),
    deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
    getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
    updatedCategoryById: (id: string, payload: ICategory) => instance.put(`${endpoint.CATEGORY}/${id}`, payload),
};

export default categoryService;