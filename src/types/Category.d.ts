interface ICategory {
    _id?: string;
    name: string;
    description: string;
    icon: string;
}

interface ICategoryFrom extends ICategory {
    icon: FileList;
}

export type { ICategory, ICategoryFrom };