import React, { useState } from 'react';
import { LockIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon } from './Icons';

export const PasswordStrength: React.FC = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const checkStrength = (pass: string) => {
        let score = 0;
        if (!pass) return 0;

        if (pass.length > 7) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        return score;
    };

    const strengthScore = checkStrength(password);

    const getStrengthLabel = (score: number) => {
        switch (score) {
            case 0: return { text: 'Sangat Lemah', color: 'bg-slate-300 dark:bg-slate-600', textCol: 'text-slate-500' };
            case 1: return { text: 'Lemah', color: 'bg-red-500', textCol: 'text-red-500' };
            case 2: return { text: 'Sedang', color: 'bg-yellow-500', textCol: 'text-yellow-500' };
            case 3: return { text: 'Kuat', color: 'bg-blue-500', textCol: 'text-blue-500' };
            case 4: return { text: 'Sangat Kuat', color: 'bg-green-500', textCol: 'text-green-500' };
            default: return { text: '', color: 'bg-slate-200', textCol: 'text-slate-400' };
        }
    };

    const label = getStrengthLabel(strengthScore);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 mt-8">
             <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                                <ShieldCheckIcon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Cek Keamanan Password</h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            Keamanan data dimulai dari kunci masuknya. Coba ketik password (jangan gunakan password aslimu!) untuk melihat seberapa kuat kombinasinya.
                        </p>
                        
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="block w-full pl-10 pr-10 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all dark:text-white"
                                placeholder="Ketik simulasi password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Strength Meter Bars */}
                        <div className="flex gap-2 mb-2 h-2">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`flex-1 rounded-full transition-all duration-500 ${
                                        password && strengthScore >= step ? label.color : 'bg-slate-200 dark:bg-slate-700'
                                    }`}
                                ></div>
                            ))}
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Kekuatan:</span>
                            <span className={`text-sm font-bold transition-colors duration-300 ${label.textCol}`}>
                                {password ? label.text : 'Menunggu input...'}
                            </span>
                        </div>
                    </div>

                    {/* Tips Side */}
                    <div className="flex-1 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                        <h4 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-3">Tips Password Kuat:</h4>
                        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className={strengthScore >= 1 && password.length > 7 ? "text-green-500" : "text-slate-400"}>✓</span>
                                Minimal 8 karakter (lebih panjang lebih baik)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className={/[A-Z]/.test(password) ? "text-green-500" : "text-slate-400"}>✓</span>
                                Gunakan huruf besar & kecil
                            </li>
                            <li className="flex items-start gap-2">
                                <span className={/[0-9]/.test(password) ? "text-green-500" : "text-slate-400"}>✓</span>
                                Campurkan angka
                            </li>
                            <li className="flex items-start gap-2">
                                <span className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : "text-slate-400"}>✓</span>
                                Tambahkan simbol (!@#$)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};