import React, { useEffect, useRef, useState } from 'react';
import { SimulationSection } from './components/SimulationSection';
import { ThemeToggle } from './components/ThemeToggle';
import { QuizSection } from './components/QuizSection';
import { PasswordStrength } from './components/PasswordStrength';
// Mengimpor ikon-ikon yang dibutuhkan dari file Icons.tsx
import { ShieldCheckIcon, LaptopIcon, CloudIcon, FileIcon, LockIcon, GoogleDriveIcon, ICloudIcon, OneDriveIcon, DropboxIcon } from './components/Icons';

// Komponen untuk item FAQ yang bisa dibuka-tutup
const FaqItem: React.FC<{
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}> = ({ title, children, isOpen, onClick }) => {
    // Ikon chevron untuk indikator buka/tutup
    const ChevronDownIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );

    return (
        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:border-cyan-400/50">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-6 text-left"
                aria-expanded={isOpen}
            >
                <h3 className="font-bold text-lg text-slate-800 dark:text-cyan-400">{title}</h3>
                <ChevronDownIcon className={`w-5 h-5 text-slate-500 dark:text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="p-6 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};


// Komponen utama aplikasi kita
const App: React.FC = () => {
    // useRef untuk menyimpan referensi ke setiap panel cerita (story-panel)
    const panelsRef = useRef<(HTMLElement | null)[]>([]);
    // useState untuk mengontrol item FAQ mana yang sedang terbuka
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // useEffect untuk mengamati kapan panel cerita masuk ke dalam viewport
    useEffect(() => {
        // IntersectionObserver adalah API browser untuk mendeteksi visibilitas elemen
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Jika elemen (panel) terlihat, tambahkan kelas 'is-visible' untuk memicu animasi fade-in
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                // Opsi: observer akan aktif saat 30% dari panel terlihat
                threshold: 0.3, 
            }
        );

        const currentPanels = panelsRef.current;
        // Menerapkan observer ke setiap panel
        currentPanels.forEach((panel) => {
            if (panel) observer.observe(panel);
        });

        // Fungsi cleanup: berhenti mengamati panel saat komponen di-unmount
        return () => {
            currentPanels.forEach((panel) => {
                if (panel) observer.unobserve(panel);
            });
        };
    }, []); 

    // Fungsi untuk menambahkan elemen ke array refs (panelsRef)
    const addToRefs = (el: HTMLElement | null) => {
        if (el && !panelsRef.current.includes(el)) {
            panelsRef.current.push(el);
        }
    };
    
    // Fungsi untuk menangani klik pada item FAQ
    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Render JSX dari komponen App
    return (
        // Container utama aplikasi dengan styling latar belakang adaptif
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-300 antialiased transition-colors duration-500">
            <ThemeToggle />
            
            <div className="relative isolate overflow-hidden">
                {/* Latar Belakang Dekoratif */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
                    {/* Pola grid SVG untuk latar belakang */}
                    <svg
                        className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 dark:stroke-slate-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] transition-colors duration-500"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern id="grid-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid-pattern)" />
                    </svg>
                </div>

                {/* Bagian utama aplikasi yang bisa di-scroll */}
                <main className="snap-y snap-mandatory h-screen w-screen overflow-y-auto overflow-x-hidden">
                    
                    {/* Bagian 1: Halaman Pembuka */}
                    <section ref={addToRefs} className="story-panel min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative snap-start">
                        <div className="max-w-3xl w-full">
                            <ShieldCheckIcon className="h-16 w-16 text-cyan-600 dark:text-cyan-400 mx-auto mb-6" />
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 text-transparent bg-clip-text">
                                CLOUD SAFE
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8">
                                Simulasi Edukasi Enkripsi Data di Cloud Storage
                            </p>
                            {/* Indikator scroll ke bawah */}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                                <svg className="w-6 h-6 text-slate-400 dark:text-slate-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                            </div>
                        </div>
                    </section>

                    {/* Bagian 2: Pertanyaan tentang Penggunaan Cloud */}
                    <section ref={addToRefs} className="story-panel min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative snap-start">
                        <div className="max-w-3xl w-full">
                             <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-12 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 text-transparent bg-clip-text">
                                Kamu sering menyimpan file, foto, atau tugas penting di cloud?
                            </h2>
                             {/* Di sini letak gambar/ikon layanan cloud storage */}
                             <div className="flex items-center justify-center gap-6 md:gap-10 text-slate-500 dark:text-slate-400 flex-wrap">
                                <GoogleDriveIcon className="w-16 h-16 md:w-20 md:h-20 transition-transform hover:scale-110 hover:text-[#4285F4]" />
                                <ICloudIcon className="w-16 h-16 md:w-20 md:h-20 transition-transform hover:scale-110 hover:text-[#3699F0]" />
                                <OneDriveIcon className="w-16 h-16 md:w-20 md:h-20 transition-transform hover:scale-110 hover:text-[#0078D4]" />
                                <DropboxIcon className="w-16 h-16 md:w-20 md:h-20 transition-transform hover:scale-110 hover:text-[#0061FF]" />
                             </div>
                        </div>
                    </section>

                    {/* Bagian 3: Penjelasan Cara Kerja */}
                    <section ref={addToRefs} className="story-panel min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative snap-start">
                        <div className="max-w-3xl w-full">
                             <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 text-transparent bg-clip-text">
                                Tapi, tau gak sih cara kerjanya?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                                Saat kamu mengunggah sesuatu, file itu melakukan perjalanan dari perangkatmu ke server data yang aman di suatu tempat di dunia.
                            </p>
                             <div className="flex items-center justify-center gap-4 md:gap-8 text-slate-500 dark:text-slate-400">
                                <div className="flex flex-col items-center gap-2">
                                    <LaptopIcon className="w-20 h-20"/>
                                    <span className="font-semibold">Perangkat Kamu</span>
                                </div>
                                <div className="text-cyan-600 dark:text-cyan-400 font-mono text-xl md:text-3xl animate-pulse">-&gt;</div>
                                <div className="flex flex-col items-center gap-2">
                                    <CloudIcon className="w-20 h-20"/>
                                    <span className="font-semibold">Cloud Server</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Bagian 4: Penjelasan Keamanan dan Enkripsi */}
                     <section ref={addToRefs} className="story-panel min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative snap-start">
                        <div className="max-w-3xl w-full">
                             <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 text-transparent bg-clip-text">
                                Apa itu beneran aman?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                                Iya, aman! Keamanan ini dicapai melalui sebuah proses canggih yang disebut <span className="text-cyan-600 dark:text-cyan-400 font-bold">Enkripsi</span>. Anggap saja ini seperti mengubah file kamu menjadi pesan rahasia. Sebelum disimpan, datamu diacak menjadi kode yang tidak bisa dibaca siapa pun tanpa 'kunci' yang tepat.
                            </p>
                             <div className="flex items-center justify-center gap-4 md:gap-8 text-slate-500 dark:text-slate-400">
                                <div className="flex flex-col items-center gap-2">
                                    <FileIcon className="w-20 h-20"/>
                                    <span className="font-semibold">File Asli</span>
                                </div>
                                <div className="text-yellow-500 dark:text-yellow-400 font-mono text-xl md:text-3xl animate-pulse">-&gt;</div>
                                <div className="flex flex-col items-center gap-2">
                                    <LockIcon className="w-20 h-20"/>
                                    <span className="font-semibold">File Terenkripsi</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bagian 5: Simulasi Interaktif */}
                    <section ref={addToRefs} className="story-panel min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative snap-start">
                        <div className="max-w-6xl w-full">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 text-transparent bg-clip-text">Sekarang, coba sendiri!</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                                Unggah sebuah file untuk melihat perjalanan datamu. Mulai dari upload, pengacakan (enkripsi), hingga proses pengembalian (dekripsi).
                            </p>
                            <SimulationSection />
                        </div>
                    </section>

                    {/* Bagian 6: Password Strength Meter (FITUR BARU) */}
                     <section ref={addToRefs} className="story-panel min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative snap-start bg-slate-100/30 dark:bg-slate-900/30">
                        <div className="max-w-4xl w-full">
                             <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 text-transparent bg-clip-text">
                                Jangan Lupa Kuncinya!
                            </h2>
                            <div className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto space-y-4">
                                <p>
                                    Tunggu sebentar... di simulasi tadi ada "Kunci Enkripsi" yang rumit, tapi kenapa saat kita download file asli dari Google Drive atau iCloud, kita tidak pernah diminta memasukkan kode aneh itu?
                                </p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">
                                    Itu karena penyedia layanan menyimpan semua kunci rumit itu di dalam sebuah "Brankas Digital" milikmu.
                                </p>
                                <p>
                                    Lalu siapa yang pegang kunci brankasnya? <span className="text-indigo-600 dark:text-indigo-400 font-bold">KAMU!</span> Kunci brankas itu adalah <span className="underline decoration-indigo-500 decoration-2">Password Akun Cloud-mu</span>. Jadi, kamu dimudahkan dengan hanya mengingat satu password saja.
                                </p>
                                <p className="italic text-sm">
                                    "Artinya, jika password akunmu lemah, sama saja kamu membiarkan pintu brankas terbuka lebar."
                                </p>
                            </div>
                            <PasswordStrength />
                        </div>
                    </section>

                    {/* Bagian 7: Quiz Interaktif (FITUR BARU) */}
                    <section ref={addToRefs} className="story-panel min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative snap-start">
                        <QuizSection />
                    </section>

                    {/* Bagian 9: Pertanyaan yang Sering Diajukan (FAQ) */}
                    <section ref={addToRefs} className="story-panel min-h-screen w-full flex flex-col items-center justify-center p-6 relative snap-start pb-20">
                        <div className="max-w-3xl w-full">
                            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 text-transparent bg-clip-text">
                                Pertanyaan Umum (FAQ)
                            </h2>
                            <div className="space-y-4">
                                <FaqItem title="Apa itu Cloud Storage?" isOpen={openFaq === 0} onClick={() => toggleFaq(0)}>
                                    Anggap saja seperti hard drive digital raksasa yang bisa kamu akses dari mana saja lewat internet. Daripada menyimpan file di satu komputer, kamu menyimpannya di server aman yang dikelola oleh perusahaan seperti Google, Apple, atau Microsoft. Ini memungkinkan kamu mengakses file dari ponsel, laptop, atau tablet kapan pun kamu butuh.
                                </FaqItem>
                                <FaqItem title="Apakah Data Saya Aman di Cloud?" isOpen={openFaq === 1} onClick={() => toggleFaq(1)}>
                                    Ya, penyedia layanan cloud ternama sangat serius soal keamanan. Mereka menggunakan berbagai lapisan perlindungan, termasuk pengamanan fisik di pusat data mereka, sistem deteksi ancaman, dan yang terpenting, enkripsi. Namun, keamanan akunmu juga bergantung pada kamu—gunakan kata sandi yang kuat dan aktifkan otentikasi dua faktor (2FA).
                                </FaqItem>
                                <FaqItem title="Apa Itu Enkripsi dan Mengapa Penting?" isOpen={openFaq === 2} onClick={() => toggleFaq(2)}>
                                    Enkripsi adalah proses mengubah datamu menjadi kode rahasia yang tidak dapat dibaca. Bayangkan seperti memasukkan surat ke dalam amplop yang terkunci. Hanya orang yang memiliki kunci yang tepat (kunci dekripsi) yang bisa membukanya dan membaca isinya. Ini sangat penting karena jika seseorang berhasil mengakses server, mereka hanya akan menemukan data acak yang tidak berguna tanpa kunci tersebut.
                                </FaqItem>
                                <FaqItem title="Bagaimana jika saya lupa password akun saya?" isOpen={openFaq === 3} onClick={() => toggleFaq(3)}>
                                    Jangan panik! Sebagian besar penyedia layanan cloud (seperti Google atau iCloud) memiliki fitur "Lupa Password". Biasanya mereka akan mengirimkan kode verifikasi ke email pemulihan atau nomor HP yang sudah kamu daftarkan sebelumnya. Makanya, sangat penting untuk selalu mengupdate nomor HP dan email cadanganmu agar pintu brankas digitalmu tidak terkunci selamanya.
                                </FaqItem>
                                <FaqItem title="Apakah file yang saya hapus langsung hilang selamanya?" isOpen={openFaq === 4} onClick={() => toggleFaq(4)}>
                                    Biasanya tidak langsung hilang. Kebanyakan layanan memindahkan file yang dihapus ke folder "Sampah" (Trash/Bin) terlebih dahulu selama 30 hari. Ini fitur penyelamat jika kamu tidak sengaja menghapus file penting. Namun, jika kamu menghapusnya dari folder Sampah, barulah file tersebut biasanya hilang permanen dan sulit dikembalikan.
                                </FaqItem>
                            </div>
                        </div>
                    </section>
                </main>
                
                {/* Footer Aplikasi */}
                <footer className="fixed bottom-0 left-0 w-full text-center py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-500">Project UAS ICT LITERACY - Rizal Maulana - 250401010197</p>
                </footer>
            </div>
        </div>
    );
};

export default App;