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
}

const BlessingContext = createContext<BlessingContextType | undefined>(undefined);

const STORAGE_KEY = 'NFC_BLESSING_DATABASE';

export const BlessingProvider = ({ children }: { children: ReactNode }) => {
  const [db, setDb] = useState<BlessingData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialData as BlessingData[];
      }
    }
    return initialData as BlessingData[];
  });

  const [nfcId, setNfcId] = useState<string | null>(null);
  const [hasBlessing, setHasBlessing] = useState(false);
  const [blessingText, setBlessingText] = useState("");
  const [isPasswordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }, [db]);

  const loadDeviceData = (id: string) => {
    // 强制先从 localStorage 获取最新数据，防止内存 db 未同步
    const saved = localStorage.getItem(STORAGE_KEY);
    const currentDb: BlessingData[] = saved ? JSON.parse(saved) : db;
    
    const device = currentDb.find(item => item.nfc_id === id);
    setNfcId(id);
    
    if (device && device.blessing_text && device.blessing_text !== "NULL") {
      setBlessingText(device.blessing_text);
      const isPwd = device.is_password_enabled === true || 
                    String(device.is_password_enabled).toUpperCase() === "TRUE";
      setPasswordEnabled(isPwd);
      setPassword(device.password);
      setHasBlessing(true);
    } else {
      setHasBlessing(false);
      setBlessingText("");
      setPasswordEnabled(false);
      setPassword(null);
    }
  };

  const resetState = () => {
    setBlessingText("");
    setPasswordEnabled(false);
    setPassword(null);
    setHasBlessing(false);
  };

  const saveToMockDB = (overrideData?: { text: string; pwdEnabled: boolean; pwd: string | null }) => {
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

    // 1. 更新内存数组状态
    setDb(prev => {
      const index = prev.findIndex(item => item.nfc_id === nfcId);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = newData;
        return updated;
      }
      return [...prev, newData];
    });

    // 2. 立即写入 LocalStorage，确保持久化
    const saved = localStorage.getItem(STORAGE_KEY);
    const currentDb: BlessingData[] = saved ? JSON.parse(saved) : (initialData as BlessingData[]);
    const index = currentDb.findIndex(item => item.nfc_id === nfcId);
    
    let finalDb;
    if (index > -1) {
      finalDb = [...currentDb];
      finalDb[index] = newData;
    } else {
      finalDb = [...currentDb, newData];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalDb));
    
    // 3. 同步当前 Context 的所有 UI 状态
    setHasBlessing(true);
    setBlessingText(final_text);
    setPasswordEnabled(final_pwdEnabled === true || String(final_pwdEnabled).toUpperCase() === "TRUE");
    setPassword(final_pwd);
  };

  return (
    <BlessingContext.Provider value={{
      nfcId, hasBlessing, blessingText, isPasswordEnabled, password,
      setNfcId, setHasBlessing, setBlessingText, setPasswordEnabled, setPassword,
      resetState, saveToMockDB, loadDeviceData
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