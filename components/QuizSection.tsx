import React, { useState } from 'react';
import { TrophyIcon, CheckCircleIcon, XCircleIcon } from './Icons';

type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
};

const questions: Question[] = [
    {
        id: 1,
        text: "Apa tujuan utama dari enkripsi file di cloud storage?",
        options: [
            "Agar file menjadi lebih kecil ukurannya",
            "Agar file tidak bisa dibaca oleh orang yang tidak berhak",
            "Agar download file menjadi lebih cepat",
            "Agar nama file berubah menjadi unik"
        ],
        correctAnswer: 1,
        explanation: "Benar! Enkripsi mengacak data menjadi kode rahasia sehingga hanya pemilik kunci yang bisa membacanya."
    },
    {
        id: 2,
        text: "Fitur keamanan apa yang sebaiknya diaktifkan selain password?",
        options: [
            "Auto-login",
            "Simpan password di catatan HP",
            "Two-Factor Authentication (2FA)",
            "Share password ke teman"
        ],
        correctAnswer: 2,
        explanation: "Tepat! 2FA memberikan lapisan keamanan kedua, jadi meskipun passwordmu ketahuan, akun tetap aman."
    },
    {
        id: 3,
        text: "Di mana proses enkripsi terjadi pada aplikasi 'Cloud Safe' ini?",
        options: [
            "Di Server Pusat",
            "Di Handphone Orang Lain",
            "Di Browser/Perangkat Anda Sendiri (Client-side)",
            "Tidak terjadi enkripsi"
        ],
        correctAnswer: 2,
        explanation: "Betul! Simulasi ini melakukan enkripsi langsung di browser Anda (Client-side), jadi file asli tidak pernah keluar dari perangkat."
    },
    {
        id: 4,
        text: "Jika kamu login akun cloud di komputer umum (kampus/warnet), apa yang WAJIB dilakukan sebelum pulang?",
        options: [
            "Mematikan monitor saja",
            "Menghapus history browser",
            "Logout (Keluar) dari akun dan menutup browser",
            "Membiarkannya agar besok tidak perlu login lagi"
        ],
        correctAnswer: 2,
        explanation: "Sangat penting! Jika tidak logout, orang berikutnya yang memakai komputer itu bisa mengakses semua data pribadimu dengan mudah."
    },
    {
        id: 5,
        text: "Siapa yang paling bertanggung jawab menjaga kerahasiaan password akun cloud kamu?",
        options: [
            "Pemerintah",
            "Penyedia Layanan Internet (WiFi)",
            "Teman dekatmu",
            "Kamu sendiri"
        ],
        correctAnswer: 3,
        explanation: "Benar! Keamanan dimulai dari diri sendiri. Sebagus apapun sistemnya, jika kamu memberikan passwordmu ke orang lain, datamu tetap terancam."
    }
];

export const QuizSection: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    const handleOptionClick = (index: number) => {
        if (isAnswerChecked) return;
        setSelectedOption(index);
        setIsAnswerChecked(true);

        if (index === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setIsAnswerChecked(false);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsAnswerChecked(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg">
                        <TrophyIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Uji Pengetahuanmu</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Seberapa paham kamu tentang keamanan cloud?</p>
                    </div>
                </div>

                {showScore ? (
                    <div className="text-center py-8">
                        <div className="mb-6 inline-block p-6 rounded-full bg-slate-100 dark:bg-slate-700">
                             <TrophyIcon className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                            Kamu dapat skor {score} dari {questions.length}!
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                            {score === questions.length ? "Luar biasa! Kamu siap jadi Cloud Security Expert. 🛡️" : "Bagus! Tetap pelajari cara menjaga data tetap aman. 📚"}
                        </p>
                        <button 
                            onClick={resetQuiz}
                            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md"
                        >
                            Coba Lagi
                        </button>
                    </div>
                ) : (
                    <div className="transition-all duration-500">
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-6">
                            <div 
                                className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500" 
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
                            Pertanyaan {currentQuestion + 1}/{questions.length}: <br/>
                            <span className="text-lg font-normal text-slate-600 dark:text-slate-400 mt-2 block">{questions[currentQuestion].text}</span>
                        </h4>

                        <div className="space-y-3 mb-8">
                            {questions[currentQuestion].options.map((option, index) => {
                                let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ";
                                if (isAnswerChecked) {
                                    if (index === questions[currentQuestion].correctAnswer) {
                                        buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                                    } else if (selectedOption === index) {
                                        buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                                    } else {
                                        buttonClass += "border-slate-200 dark:border-slate-700 opacity-50";
                                    }
                                } else {
                                    buttonClass += "border-slate-200 dark:border-slate-700 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={isAnswerChecked}
                                        className={buttonClass}
                                    >
                                        <span className="font-medium">{option}</span>
                                        {isAnswerChecked && index === questions[currentQuestion].correctAnswer && (
                                            <CheckCircleIcon className="w-6 h-6 text-green-500" />
                                        )}
                                        {isAnswerChecked && selectedOption === index && index !== questions[currentQuestion].correctAnswer && (
                                            <XCircleIcon className="w-6 h-6 text-red-500" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {isAnswerChecked && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className={`p-4 rounded-lg mb-6 ${selectedOption === questions[currentQuestion].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800' : 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}>
                                    <p className={`text-sm font-semibold mb-1 ${selectedOption === questions[currentQuestion].correctAnswer ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                        {selectedOption === questions[currentQuestion].correctAnswer ? 'Jawaban Benar!' : 'Kurang Tepat.'}
                                    </p>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                                        {questions[currentQuestion].explanation}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <button
                                        onClick={handleNextQuestion}
                                        className="px-6 py-2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                    >
                                        {currentQuestion < questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Skor'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};