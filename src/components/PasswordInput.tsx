import React, { useRef, useState, useEffect } from 'react';

interface PasswordInputProps {
  onComplete: (password: string) => void;
  error?: boolean;
  onErrorClear?: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  onComplete,
  error = false,
  onErrorClear,
}) => {
  const [values, setValues] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (error) {
      // Reset values on error
      setValues(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  }, [error]);

  const handleChange = (index: number, value: string) => {
    if (onErrorClear) onErrorClear();
    
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    
    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);

    // Auto-focus next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all filled
    if (digit && index === 3) {
      const password = newValues.join('');
      if (password.length === 4) {
        onComplete(password);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newValues = [...values];
    
    for (let i = 0; i < 4; i++) {
      newValues[i] = pasted[i] || '';
    }
    
    setValues(newValues);
    
    if (pasted.length === 4) {
      onComplete(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-14 h-16 text-center text-2xl font-bold rounded-2xl border-2 
            bg-card transition-all duration-200 outline-none
            ${error 
              ? 'border-destructive animate-shake' 
              : value 
                ? 'border-primary shadow-card' 
                : 'border-border focus:border-primary focus:shadow-card'
            }`}
        />
      ))}
    </div>
  );
};
