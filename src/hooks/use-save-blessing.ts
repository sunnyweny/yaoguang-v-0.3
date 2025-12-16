import { useMutation } from '@tanstack/react-query';


interface SaveBlessingPayload {
    nfcId: string;
    blessingText: string;
    passwordEnabled: boolean;
    password: string; // 只有 passwordEnabled=true 时才需要
}

// ⚠️ 替换为您的实际 API 地址
const API_URL = '/api/save-blessing'; 

const saveBlessing = async (payload: SaveBlessingPayload) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        // 后端保存失败，抛出错误
        throw new Error('Failed to save blessing data to the server.');
    }

    return response.json(); // 返回后端确认信息
};

export const useSaveBlessing = () => {
    return useMutation({
        mutationFn: saveBlessing,
        // onSuccess, onError 可以在组件内灵活处理
    });
};