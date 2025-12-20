import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Blessings as initialData } from '@/pages/mydata';

interface BlessingData {
  nfc_id: string;
  blessing_text: string | null;
  is_password_enabled: boolean | string;
  password: string | null;
}

interface BlessingContextType {
  nfcId: string | null;
  hasBlessing: boolean;
  blessingText: string;
  isPasswordEnabled: boolean;
  password: string | null;
  setNfcId: (id: string | null) => void;
  setHasBlessing: (val: boolean) => void;
  setBlessingText: (text: string) => void;
  setPasswordEnabled: (val: boolean) => void;
  setPassword: (pwd: string | null) => void;
  resetState: () => void;
  saveToMockDB: (overrideData?: { text: string; pwdEnabled: boolean; pwd: string | null }) => void;
  loadDeviceData: (id: string) => void;
  checkIdExists: (id: string) => boolean;
}

const BlessingContext = createContext<BlessingContextType | undefined>(undefined);

export const BlessingProvider = ({ children }: { children: ReactNode }) => {
  // serverDb 用于存放从 PHP 获取的所有动态数据
  const [serverDb, setServerDb] = useState<BlessingData[]>([]);
  
  const [nfcId, setNfcId] = useState<string | null>(null);
  const [hasBlessing, setHasBlessing] = useState(false);
  const [blessingText, setBlessingText] = useState("");
  const [isPasswordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState<string | null>(null);

  // 1. 初始化时，先去 PHP 拿一次数据
  useEffect(() => {
    fetch('/api.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setServerDb(data);
      })
      .catch(err => console.error("初始同步失败，请检查 api.php 是否存在", err));
  }, []);

  // 2. 存在性校验：本地 mydata 有 或者 服务器 remote_db 有，都算通过
  const checkIdExists = (id: string) => {
    const inLocal = (initialData as BlessingData[]).some(item => item.nfc_id === id);
    const inServer = serverDb.some(item => item.nfc_id === id);
    return inLocal || inServer;
  };

  // 3. 加载数据：优先用服务器的，没有再用本地初始的
  const loadDeviceData = async (id: string) => {
    setNfcId(id);
    try {
      // 每次加载前重新拉取最新数据，确保多机同步
      const res = await fetch('/api.php');
      const remoteData: BlessingData[] = await res.json();
      setServerDb(remoteData);

      const serverMatch = remoteData.find(item => item.nfc_id === id);
      const localMatch = (initialData as BlessingData[]).find(item => item.nfc_id === id);
      
      const device = serverMatch || localMatch;

      if (device && device.blessing_text && device.blessing_text !== "NULL") {
        setBlessingText(device.blessing_text);
        const isPwd = device.is_password_enabled === true || 
                      String(device.is_password_enabled).toUpperCase() === "TRUE";
        setPasswordEnabled(isPwd);
        setPassword(device.password);
        setHasBlessing(true);
      } else {
        setHasBlessing(false);
        resetState();
      }
    } catch (e) {
      console.error("加载失败");
    }
  };

  const resetState = () => {
    setBlessingText("");
    setPasswordEnabled(false);
    setPassword(null);
    setHasBlessing(false);
  };

  // 4. 保存数据：推送到 PHP 接口
  const saveToMockDB = async (overrideData?: { text: string; pwdEnabled: boolean; pwd: string | null }) => {
    if (!nfcId) return;

    const final_text = overrideData ? overrideData.text : blessingText;
    const final_pwdEnabled = overrideData ? overrideData.pwdEnabled : isPasswordEnabled;
    const final_pwd = overrideData ? overrideData.pwd : password;

    const newData: BlessingData = {
      nfc_id: nfcId,
      blessing_text: final_text,
      is_password_enabled: final_pwdEnabled,
      password: final_pwd,
    };

    try {
      // 发送到服务器
      await fetch('/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });

      // 更新本地内存状态，让 UI 立即变化
      setServerDb(prev => {
        const filtered = prev.filter(item => item.nfc_id !== nfcId);
        return [...filtered, newData];
      });
      
      setHasBlessing(true);
      setBlessingText(final_text);
      setPasswordEnabled(final_pwdEnabled === true || String(final_pwdEnabled).toUpperCase() === "TRUE");
      setPassword(final_pwd);
      
      console.log("多机同步保存成功");
    } catch (e) {
      console.error("同步到服务器失败", e);
      alert("保存失败，请检查网络连接");
    }
  };

  return (
    <BlessingContext.Provider value={{
      nfcId, hasBlessing, blessingText, isPasswordEnabled, password,
      setNfcId, setHasBlessing, setBlessingText, setPasswordEnabled, setPassword,
      resetState, saveToMockDB, loadDeviceData, checkIdExists
    }}>
      {children}
    </BlessingContext.Provider>
  );
};

export const useBlessing = () => {
  const context = useContext(BlessingContext);
  if (!context) throw new Error("useBlessing must be used within a BlessingProvider");
  return context;
};