import React, { useState, useCallback, useMemo } from 'react';
import { SimulationStatus } from '../types';
import { FileUpload } from './FileUpload';
import { CloudIcon, FileIcon, KeyIcon, LaptopIcon, LockIcon, CheckCircleIcon } from './Icons';

const StatusMessage: React.FC<{
    status: SimulationStatus;
    fileName: string | null;
}> = ({ status, fileName }) => {
    const messages = {
        [SimulationStatus.IDLE]: 'Pilih file untuk memulai simulasi.',
        [SimulationStatus.UPLOADING]: `Mengunggah "${fileName}" ke cloud...`,
        [SimulationStatus.ENCRYPTING]: 'Mengunci file Anda dengan enkripsi yang kuat...',
        [SimulationStatus.STORED]: 'Aman! File Anda telah dienkripsi dan disimpan.',
        [SimulationStatus.DECRYPTING]: 'Membuka kunci file Anda dan mempersiapkan unduhan...',
        [SimulationStatus.COMPLETE]: 'File telah dikembalikan ke perangkat Anda dengan aman.',
    };
    return <p className="text-center text-slate-500 dark:text-slate-400 h-6 transition-opacity duration-300 font-medium">{messages[status]}</p>;
};

const ProcessExplanation: React.FC<{ status: SimulationStatus }> = ({ status }) => {
    // Definisi langkah-langkah proses
    const steps = [
        {
            id: 'upload',
            title: '1. Secure Channel',
            active: status === SimulationStatus.UPLOADING,
            desc: "Saat Anda upload, file tidak dikirim 'telanjang'. Ia melewati terowongan aman (SSL/TLS) agar tidak bisa diintip di tengah jalan."
        },
        {
            id: 'encrypt',
            title: '2. Enkripsi (Pengacakan)',
            active: status === SimulationStatus.ENCRYPTING,
            desc: "Sampai di server, file diacak menggunakan algoritma matematika rumit (seperti AES-256). Tanpa kunci, file ini cuma sampah digital."
        },
        {
            id: 'store',
            title: '3. Penyimpanan',
            active: status === SimulationStatus.STORED,
            desc: "File tersimpan diam di hard drive server. Kunci pembukanya dipisah di tempat lain yang super aman. Hacker masuk? Mereka cuma dapat file acak."
        },
        {
            id: 'decrypt',
            title: '4. Otentikasi & Dekripsi',
            active: status === SimulationStatus.DECRYPTING || status === SimulationStatus.COMPLETE,
            desc: "Saat Anda mau download, sistem mengecek: 'Benar ini Anda?'. Jika password benar, sistem mengambil kunci, membuka acakan file, dan mengirim balik file asli."
        }
    ];

    if (status === SimulationStatus.IDLE) return null;

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {steps.map((step) => (
                <div 
                    key={step.id} 
                    className={`p-4 rounded-lg border transition-all duration-500 ${step.active 
                        ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-400 transform scale-105 shadow-md' 
                        : 'bg-white/40 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-60'}`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        {step.active ? (
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                        ) : (
                            <div className={`w-2 h-2 rounded-full ${status === SimulationStatus.COMPLETE ? 'bg-green-500' : 'bg-slate-400'}`} />
                        )}
                        <h4 className={`font-bold ${step.active ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-600 dark:text-slate-400'}`}>
                            {step.title}
                        </h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.desc}
                    </p>
                </div>
            ))}
        </div>
    );
};

export const SimulationSection: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
    const [encryptionKey, setEncryptionKey] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleFileSelect = (selectedFile: File) => {
        if (status !== SimulationStatus.IDLE && status !== SimulationStatus.COMPLETE) return;
        resetSimulation();
        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setFileUrl(url);
    };

    const resetSimulation = () => {
        setFile(null);
        setStatus(SimulationStatus.IDLE);
        setEncryptionKey(null);
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
            setFileUrl(null);
        }
    };
    
    const handleEncrypt = async () => {
        if (!file) return;

        setStatus(SimulationStatus.UPLOADING);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Sedikit diperlama untuk baca teks

        setStatus(SimulationStatus.ENCRYPTING);
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const key = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        await new Promise(resolve => setTimeout(resolve, 2500));
        setEncryptionKey(key);
        setStatus(SimulationStatus.STORED);
    };

    const handleDecrypt = async () => {
        if (!fileUrl) return;
        
        setStatus(SimulationStatus.DECRYPTING);
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', file?.name || 'decrypted-file');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setStatus(SimulationStatus.COMPLETE);
        // Jangan auto reset agar user bisa baca step terakhir
        // setTimeout(resetSimulation, 3000); 
    };

    const isProcessing = useMemo(() => {
        return status === SimulationStatus.UPLOADING || status === SimulationStatus.ENCRYPTING || status === SimulationStatus.DECRYPTING;
    }, [status]);


    return (
        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 md:p-8 backdrop-blur-sm border border-slate-200 dark:border-slate-700 w-full max-w-5xl mx-auto shadow-lg">
            {!file ? (
                <FileUpload onFileSelect={handleFileSelect} />
            ) : (
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-lg text-cyan-600 dark:text-cyan-400 mb-8 font-medium bg-cyan-50 dark:bg-slate-900/50 py-2 px-4 rounded-full inline-flex">
                       <FileIcon className="w-5 h-5" />
                       <span>File Aktif: {file.name}</span>
                    </div>

                    {/* Visual Flow */}
                    <div className="flex items-center justify-around my-8 md:my-12 relative h-28">
                        <div className="flex flex-col items-center gap-2 z-10 w-24">
                            <LaptopIcon className={`w-16 h-16 transition-colors duration-300 ${status === SimulationStatus.COMPLETE ? 'text-green-500' : 'text-slate-500 dark:text-slate-400'}`} />
                            <span className="font-semibold text-xs md:text-sm text-slate-600 dark:text-slate-300">Device</span>
                        </div>

                        {/* Dotted line */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-600"></div>

                        {/* File Animation */}
                        <div className={`absolute top-0 left-1/4 transition-all duration-1000 ease-in-out z-20 
                            ${(status === SimulationStatus.STORED || status === SimulationStatus.ENCRYPTING) ? 'left-[70%] md:left-[75%]' : ''}
                            ${(status === SimulationStatus.DECRYPTING) ? 'left-[25%] md:left-[20%]' : ''}
                            ${status === SimulationStatus.UPLOADING ? 'left-[70%] md:left-[75%]' : ''}
                        `}>
                            <div className="relative">
                                <FileIcon className={`w-14 h-14 transition-colors duration-500 ${status === SimulationStatus.ENCRYPTING || status === SimulationStatus.STORED ? 'text-slate-400' : 'text-cyan-500 dark:text-cyan-300'}`} />
                                
                                {status === SimulationStatus.ENCRYPTING && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 rounded">
                                        <LockIcon className="w-8 h-8 text-yellow-500 animate-bounce" />
                                    </div>
                                )}
                                {status === SimulationStatus.STORED && (
                                    <LockIcon className="w-8 h-8 absolute -top-3 -right-3 text-green-500 dark:text-green-400 drop-shadow-lg bg-white dark:bg-slate-800 rounded-full p-1" />
                                )}
                                {status === SimulationStatus.DECRYPTING && (
                                     <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-full h-1 bg-green-500 animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 z-10 w-24">
                            <CloudIcon className="w-16 h-16 text-slate-500 dark:text-slate-400" />
                            <span className="font-semibold text-xs md:text-sm text-slate-600 dark:text-slate-300">Cloud Server</span>
                        </div>
                    </div>

                    {/* Status Message */}
                    <StatusMessage status={status} fileName={file.name} />
                    
                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">
                        {status === SimulationStatus.IDLE && (
                            <button
                                onClick={handleEncrypt}
                                disabled={isProcessing}
                                className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md shadow-md hover:bg-cyan-600 transition-all transform hover:scale-105 disabled:opacity-50"
                            >
                                Mulai Upload & Enkripsi
                            </button>
                        )}

                         {status === SimulationStatus.STORED && (
                            <button
                                onClick={handleDecrypt}
                                disabled={isProcessing}
                                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-all transform hover:scale-105 disabled:opacity-50"
                            >
                                Ambil File (Dekripsi)
                            </button>
                        )}
                        
                        {(status !== SimulationStatus.IDLE && status !== SimulationStatus.STORED && status !== SimulationStatus.COMPLETE) && (
                            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 px-4 py-2 rounded-lg">
                                <div className="w-5 h-5 border-2 border-dashed rounded-full border-current animate-spin"></div>
                                <span className="font-medium animate-pulse">Sedang memproses...</span>
                            </div>
                        )}

                         <button
                            onClick={resetSimulation}
                            className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                            {status === SimulationStatus.COMPLETE ? 'Coba File Lain' : 'Reset'}
                        </button>

                    </div>

                    {/* Technical Process Explanation */}
                    <ProcessExplanation status={status} />

                </div>
            )}
        </div>
    );
};