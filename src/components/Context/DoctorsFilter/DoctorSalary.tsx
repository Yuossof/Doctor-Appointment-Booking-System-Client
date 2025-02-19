'use client';

import { createContext, useContext, useState } from "react";

interface ISalaryContext {
    salary: number | '',
    setSalary: React.Dispatch<React.SetStateAction<number | ''>>
}

const salaryContext = createContext<ISalaryContext| null>(null);

export default function SalaryProvider({ children }: { children: React.ReactNode }) {
    const [salary, setSalary] = useState<number | ''>('');
  return <salaryContext.Provider value={{ salary, setSalary }}>{children}</salaryContext.Provider>
}

export const useSalary = () : ISalaryContext  | null => {
    return useContext(salaryContext);
}