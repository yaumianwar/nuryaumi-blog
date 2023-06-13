import { PostData } from "@/lib/posts";

export const paginate = (items: PostData[], pageNumber: number, pageSize: number) : PostData[] => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize); // 0, 9
};