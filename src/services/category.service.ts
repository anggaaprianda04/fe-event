import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const categoryService = {
    getCategories: (params?: string) => instance.get(`${endpoint.CATEGORY}?${params}`),
};

export default categoryService;