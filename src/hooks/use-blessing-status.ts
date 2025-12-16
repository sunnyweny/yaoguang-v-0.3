

import { useQuery } from '@tanstack/react-query';

// 定义后端返回的数据结构
// 需要相应修改：如果后端返回字段与此不同，继续调整
interface BlessingData {
    has_blessing: boolean; // 是否存在祝福
    blessing_text?: string; // 祝福文本内容 (可选)
    password_enabled?: boolean; // 祝福是否受密码保护 (可选)
}

// ⚠️ 替换为实际 API 地址
const API_BASE_URL = '/api/blessing-status'; 

/**
 * useFetchBlessingStatus Hook
 * 用于根据 NFC ID 查询后端，判断该 ID 是否已经存在祝福。
 * * @param nfcId 从 URL 参数中获取的 NFC ID 字符串，可能为 null。
 */
export const useFetchBlessingStatus = (nfcId: string | null) => {
    return useQuery<BlessingData, Error>({
        // queryKey: 唯一标识此查询。当 nfcId 变化时，React Query 会自动重新查询。
        queryKey: ['blessingStatus', nfcId],
        
        // enabled: 只有当 nfcId 存在时，查询才会被执行。
        enabled: !!nfcId, 
        
        // queryFn: 实际执行数据获取的异步函数
        queryFn: async () => {
            if (!nfcId) {
                // 尽管 enabled 已经处理了 null 情况，但 TypeScript 可能需要这个检查
                throw new Error("NFC ID is required for this query.");
            }
            
            // 发送 GET 请求到后端
            const response = await fetch(`${API_BASE_URL}/${nfcId}`);
            
            if (response.status === 404) {
                // 如果 ID 存在但没有祝福，后端可能返回 200，但 data.has_blessing=false。
                // 如果后端返回 404 表示 ID 根本无效，这里可以选择抛出错误或特殊处理。
                // 假设后端返回 200 并包含 has_blessing 字段来表示状态。
                // 如果您确定 404 表示无祝福，您需要调整这里的错误处理。
            }

            if (!response.ok) {
                // 处理其他网络或服务器错误
                throw new Error(`Failed to fetch blessing status. Status: ${response.status}`);
            }

            return response.json();
        },
        
        // 可选：数据在缓存中保持“新鲜”的时间
        staleTime: 5 * 60 * 1000, // 5 分钟
    });
};