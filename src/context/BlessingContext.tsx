import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BlessingState {
  hasBlessing: boolean;
  blessingText: string;
  passwordEnabled: boolean;
  password: string;
  isUnlocked: boolean;
}

interface BlessingContextType {
  state: BlessingState;
  setHasBlessing: (value: boolean) => void;
  setBlessingText: (text: string) => void;
  setPasswordEnabled: (enabled: boolean) => void;
  setPassword: (password: string) => void;
  setIsUnlocked: (unlocked: boolean) => void;
  resetState: () => void;
  nfcId: string | null; // 新增 NFC ID 状态
  setNfcId: (id: string | null) => void; // 新增设置函数

}

const initialState: BlessingState = {
  hasBlessing: false,
  blessingText: '',
  passwordEnabled: false,
  password: '',
  isUnlocked: false,
};

const BlessingContext = createContext<BlessingContextType | undefined>(undefined);

export const BlessingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BlessingState>(initialState);
  // 新增独立的 nfcId 状态
  const [nfcId, setNfcId] = useState<string | null>(null);
  const setHasBlessing = (value: boolean) => {
    setState(prev => ({ ...prev, hasBlessing: value }));
  };

  const setBlessingText = (text: string) => {
    setState(prev => ({ ...prev, blessingText: text }));
  };

  const setPasswordEnabled = (enabled: boolean) => {
    setState(prev => ({
      ...prev,
      passwordEnabled: enabled,
      password: enabled ? generatePassword() : ''
    }));
  };

  const setPassword = (password: string) => {
    setState(prev => ({ ...prev, password }));
  };

  const setIsUnlocked = (unlocked: boolean) => {
    setState(prev => ({ ...prev, isUnlocked: unlocked }));
  };

  const resetState = () => {
    setState(initialState);
  };
  // 定义 setNfcId 函数
  const handleSetNfcId = (id: string | null) => {
    setNfcId(id);
  };
  return (
    <BlessingContext.Provider
      value={{
        state,
        setHasBlessing,
        setBlessingText,
        setPasswordEnabled,
        setPassword,
        setIsUnlocked,
        resetState,
        nfcId,
        setNfcId
      }}
    >
      {children}
    </BlessingContext.Provider>
  );
};

export const useBlessing = () => {
  const context = useContext(BlessingContext);
  if (!context) {
    throw new Error('useBlessing must be used within a BlessingProvider');
  }
  return context;
};

// Generate a fixed 4-digit password for testing
function generatePassword(): string {
  return '1234';
}
