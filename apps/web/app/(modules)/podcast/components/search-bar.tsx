"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  // تحديث القيمة إذا تغيرت من الخارج (مثلاً عند الضغط على سجل البحث)
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // منطق الـ Debounce لتقليل طلبات الـ API
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 500); // ينتظر نصف ثانية بعد توقف الكتابة ليقوم بالبحث

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative group w-full">
      <input
        type="text"
        placeholder="Search the sound universe..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 text-white rounded-full py-5 pl-8 pr-14 outline-none transition-all backdrop-blur-2xl placeholder:text-white/20 shadow-2xl"
      />
      <div className="absolute right-6 top-5 text-white/20 group-hover:text-blue-500 transition-colors pointer-events-none">
        <Search size={24} />
      </div>
    </div>
  );
}