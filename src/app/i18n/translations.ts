export type Lang = "id" | "en";

export const t = {
  // ── Navbar ──────────────────────────────────────────────
  nav: {
    home:         { id: "Beranda",      en: "Home" },
    catalog:      { id: "Koleksi",      en: "Collections" },
    admin:        { id: "Admin",        en: "Admin" },
    addBook:      { id: "Tambah Buku",  en: "Add Book" },
    signIn:       { id: "Masuk",        en: "Sign In" },
    register:     { id: "Daftar",       en: "Register" },
    signOut:      { id: "Keluar",       en: "Sign Out" },
    search:       { id: "Cari",         en: "Search" },
    searchPlaceholder: {
      id: "Cari judul, penulis, atau kategori...",
      en: "Search title, author, or category...",
    },
    viewCatalog:  { id: "Jelajahi Koleksi", en: "Browse Collections" },
    darkMode:     { id: "Mode gelap",   en: "Dark mode" },
    lightMode:    { id: "Mode terang",  en: "Light mode" },
    skipToMain:   { id: "Lewati ke konten utama", en: "Skip to main content" },
    myProfile:    { id: "Profil Saya",  en: "My Profile" },
  },

  // ── Roles ────────────────────────────────────────────────
  role: {
    admin:     { id: "Administrator", en: "Administrator" },
    user:      { id: "Pengguna",      en: "User" },
    volunteer: { id: "Volunteer",     en: "Volunteer" },
    guest:     { id: "Tamu",          en: "Guest" },
  },

  // ── Hero ────────────────────────────────────────────────
  hero: {
    badge: {
      id: "Pusat Layanan Disabilitas — Universitas Brawijaya",
      en: "Disability Services Center — Universitas Brawijaya",
    },
    heading1: { id: "Pustaka Digital",        en: "Digital Library" },
    headingAccent: { id: "Aksesibel",         en: "Accessible" },
    heading2: {
      id: "untuk Penyandang Disabilitas Cetak",
      en: "for Students with Print Disabilities",
    },
    body: {
      id: "Akses lebih dari {count} koleksi buku teks, jurnal, dan materi pembelajaran dalam format Audio, Braille Digital, DAISY, dan PDF Aksesibel — khusus untuk mahasiswa UB.",
      en: "Access over {count} textbooks, journals, and learning materials in Audio, Digital Braille, DAISY, and Accessible PDF formats — exclusively for UB students.",
    },
    searchPlaceholder: {
      id: "Cari judul buku, penulis, atau kategori...",
      en: "Search book title, author, or category...",
    },
    searchBtn:      { id: "Cari",              en: "Search" },
    ctaBrowse:      { id: "Jelajahi Koleksi",  en: "Browse Collections" },
    ctaRegister:    { id: "Daftar Sekarang",   en: "Register Now" },
    statBooks:      { id: "Koleksi Digital",   en: "Digital Collections" },
    statAudio:      { id: "Audio Books",       en: "Audio Books" },
    formats: {
      audio:   { id: "Audio Book",       en: "Audio Book" },
      pdf:     { id: "PDF Aksesibel",    en: "Accessible PDF" },
      daisy:   { id: "DAISY",            en: "DAISY" },
      braille: { id: "Braille Digital",  en: "Digital Braille" },
    },
    formatDesc: {
      audio:   { id: "Text-to-Speech",  en: "Text-to-Speech" },
      pdf:     { id: "Teks digital",    en: "Digital text" },
      daisy:   { id: "Navigasi audio",  en: "Audio navigation" },
      braille: { id: "Format BRF",      en: "BRF format" },
    },
  },

  // ── Stats ────────────────────────────────────────────────
  stats: {
    collections:   { id: "Koleksi Buku",      en: "Book Collections" },
    collectionsSub:{ id: "& jurnal digital",  en: "& digital journals" },
    formats:       { id: "Format Aksesibel",  en: "Accessible Formats" },
    formatsSub:    { id: "Audio, Braille, DAISY, dll.", en: "Audio, Braille, DAISY, etc." },
    users:         { id: "Pengguna Aktif",    en: "Active Users" },
    usersSub:      { id: "Mahasiswa UB",      en: "UB Students" },
    categories:    { id: "Kategori",          en: "Categories" },
    categoriesSub: { id: "Lintas disiplin ilmu", en: "Across disciplines" },
  },

  // ── Features ─────────────────────────────────────────────
  features: {
    sectionLabel:  { id: "Standar Aksesibilitas",             en: "Accessibility Standards" },
    sectionTitle:  { id: "Memenuhi Standar WCAG 2.1 Level AA", en: "Meeting WCAG 2.1 Level AA Standards" },
    sectionBody:   {
      id: "Pustakability dibangun dengan prinsip aksesibilitas native agar dapat diakses secara maksimal oleh mahasiswa penyandang disabilitas menggunakan perangkat pembaca layar dan teknologi asistif.",
      en: "Pustakability is built with native accessibility principles for seamless access by students with disabilities using screen readers and assistive technology.",
    },
    wcagLabel: { id: "Komitmen Aksesibilitas WCAG 2.1 AA", en: "WCAG 2.1 AA Accessibility Commitment" },
    wcagBody: {
      id: "Pustakability berkomitmen penuh memenuhi standar WCAG 2.1 Level AA. Jika Anda menemukan hambatan aksesibilitas, hubungi tim PLD UB di",
      en: "Pustakability is fully committed to meeting WCAG 2.1 Level AA standards. If you encounter accessibility barriers, contact the PLD UB team at",
    },
    items: {
      reader:     { title: { id: "Kompatibel Pembaca Layar", en: "Screen Reader Native" }, desc: { id: "Didesain dengan tag HTML5 semantik dan struktur ARIA lengkap untuk NVDA, JAWS, VoiceOver, dan TalkBack.", en: "Built with semantic HTML5 tags and complete ARIA landmarks for NVDA, JAWS, VoiceOver, and TalkBack." } },
      keyboard:   { title: { id: "Navigasi Penuh Keyboard", en: "Full Keyboard Navigation" }, desc: { id: "Seluruh menu, tombol, dan pembaca e-book dapat dioperasikan 100% via keyboard dengan indikator fokus kontras tinggi.", en: "Every menu, button, and e-book reader control is 100% operable via keyboard with high-contrast focus rings." } },
      contrast:   { title: { id: "Kontras Warna 4.5:1 & Mode Gelap", en: "4.5:1 Color Contrast & Dark Mode" }, desc: { id: "Memenuhi rasio kontras minimal 4.5:1 WCAG 2.1 AA dengan Mode Gelap untuk kenyamanan pengguna low vision.", en: "Meets WCAG 2.1 AA minimum 4.5:1 contrast ratio with Dark Mode for low-vision comfort." } },
      responsive: { title: { id: "Responsif & Zoom Teks 200%", en: "200% Responsive Text Zoom" }, desc: { id: "Tampilan beradaptasi hingga pembesaran teks 200% tanpa mengganggu tata letak atau memotong konten.", en: "Layout adapts up to 200% text zoom without breaking grid layout or clipping content." } },
      formats:    { title: { id: "Format Digital Aksesibel", en: "Accessible Digital Formats" }, desc: { id: "Koleksi buku tersedia dalam format teks digital, DAISY 3.0, PDF terstruktur, dan Braille Digital (BRF).", en: "Book collections available in digital text, DAISY 3.0, structured PDF, and Digital Braille (BRF)." } },
      pld:        { title: { id: "Layanan Transkrip PLD UB", en: "PLD UB Transcription Support" }, desc: { id: "Terintegrasi dengan Pusat Layanan Disabilitas UB untuk bantuan konversi buku dan pemenuhan format khusus.", en: "Integrated with UB Disability Services Center for book conversion assistance and custom formats." } },
    },
    badges: {
      accessible:   { id: "Aksesibel", en: "Accessible" },
      contrast:     { id: "Kontras 4.5:1", en: "4.5:1 Contrast" },
      reflow:       { id: "Reflow 200%", en: "200% Reflow" },
      standardized: { id: "Terstandarisasi", en: "Standardized" },
      pldCertified: { id: "Tersertifikasi PLD UB", en: "PLD UB Certified" },
      wcagBadge:    { id: "WCAG 2.1 AA", en: "WCAG 2.1 AA" },
    },
  },

  // ── Book Catalog Section ─────────────────────────────────
  catalog: {
    sectionLabel:  { id: "Koleksi Pilihan",              en: "Featured Collections" },
    sectionTitle:  { id: "Temukan Buku yang Anda Butuhkan", en: "Find the Book You Need" },
    viewAll:       { id: "Lihat Semua Koleksi",          en: "View All Collections" },
    readNow:       { id: "Baca Sekarang",                en: "Read Now" },
    preview:       { id: "Preview",                      en: "Preview" },
    categories: {
      all:    { id: "Semua",     en: "All" },
      sains:  { id: "Sains",    en: "Science" },
      teknik: { id: "Teknik",   en: "Engineering" },
      hukum:  { id: "Hukum",    en: "Law" },
      ekonomi:{ id: "Ekonomi",  en: "Economics" },
      sosial: { id: "Sosial",   en: "Social" },
      psikologi: { id: "Psikologi", en: "Psychology" },
      teknologi: { id: "Teknologi", en: "Technology" },
      kedokteran: { id: "Kedokteran", en: "Medicine" },
      pertanian: { id: "Pertanian", en: "Agriculture" },
    },
  },

  // ── Catalog Page ─────────────────────────────────────────
  catalogPage: {
    title:         { id: "Koleksi Pustakability",           en: "Pustakability Collections" },
    subtitle:      { id: "koleksi dalam berbagai format aksesibel", en: "collections in various accessible formats" },
    searchPlaceholder: { id: "Cari judul, penulis, atau kata kunci...", en: "Search title, author, or keyword..." },
    showing:       { id: "Menampilkan",   en: "Showing" },
    collections:   { id: "koleksi",       en: "collections" },
    for:           { id: "untuk",         en: "for" },
    inCategory:    { id: "dalam kategori", en: "in category" },
    resetFilter:   { id: "Reset Filter",  en: "Reset Filter" },
    noResults:     { id: "Tidak ada buku yang sesuai dengan filter Anda.", en: "No books match your filter." },
    formats: {
      all:     { id: "Semua Format",     en: "All Formats" },
      audio:   { id: "Audio",            en: "Audio" },
      pdf:     { id: "PDF",              en: "PDF" },
      daisy:   { id: "DAISY",            en: "DAISY" },
      braille: { id: "Braille",          en: "Braille" },
    },
    sort: {
      relevance: { id: "Relevansi",       en: "Relevance" },
      newest:    { id: "Terbaru",         en: "Newest" },
      rating:    { id: "Rating Tertinggi", en: "Highest Rating" },
      az:        { id: "Judul A-Z",       en: "Title A-Z" },
    },
  },

  // ── How To Access ─────────────────────────────────────────
  howTo: {
    sectionLabel:  { id: "Cara Mendapatkan Akses",  en: "How to Get Access" },
    sectionTitle:  { id: "Empat Langkah Mudah",     en: "Four Easy Steps" },
    sectionBody:   {
      id: "Pustakability hanya tersedia untuk mahasiswa Universitas Brawijaya yang terdaftar sebagai penyandang disabilitas cetak di PLD UB.",
      en: "Pustakability is only available to Universitas Brawijaya students registered as print disability users at PLD UB.",
    },
    steps: [
      {
        title: { id: "Daftar ke PLD UB",     en: "Register at PLD UB" },
        desc:  { id: "Kunjungi Pusat Layanan Disabilitas UB di Gedung Rektorat Lt. 1, atau hubungi via email. Bawa dokumen identitas mahasiswa aktif.", en: "Visit the Disability Services Center at the Rectorate Building Floor 1, or contact via email. Bring your active student ID." },
      },
      {
        title: { id: "Verifikasi Status",    en: "Status Verification" },
        desc:  { id: "Tim PLD UB akan melakukan assessment dan verifikasi status disabilitas cetak Anda (tunanetra, low vision, disleksia, atau gangguan fisik yang memengaruhi kemampuan membaca cetak).", en: "The PLD UB team will assess and verify your print disability status (blindness, low vision, dyslexia, or physical impairment affecting print reading ability)." },
      },
      {
        title: { id: "Aktivasi Akun",        en: "Account Activation" },
        desc:  { id: "Terima email aktivasi dengan kredensial login Pustakability ke email UB Anda. Proses aktivasi membutuhkan 1–3 hari kerja.", en: "Receive an activation email with Pustakability login credentials to your UB email. Activation takes 1–3 business days." },
      },
      {
        title: { id: "Mulai Membaca",        en: "Start Reading" },
        desc:  { id: "Akses ribuan koleksi dalam format pilihan Anda kapan saja dan dari mana saja.", en: "Access thousands of collections in your preferred format anytime, anywhere." },
      },
    ],
    helpTitle: { id: "Butuh Bantuan Pendaftaran?",   en: "Need Help Registering?" },
    helpBody:  {
      id: "Tim PLD UB siap membantu Anda melalui proses pendaftaran dan memastikan Anda mendapatkan akses ke format yang paling sesuai.",
      en: "The PLD UB team is ready to help you through the registration process and ensure you get access to the most suitable format.",
    },
  },

  // ── Testimonials ──────────────────────────────────────────
  testimonials: {
    sectionLabel: { id: "Cerita Pengguna",                     en: "User Stories" },
    sectionTitle: { id: "Belajar Lebih Mudah dengan Pustakability", en: "Learning Made Easier with Pustakability" },
  },

  // ── CTA Banner ───────────────────────────────────────────
  cta: {
    title: { id: "Mulai Perjalanan Belajar Anda Hari Ini",  en: "Start Your Learning Journey Today" },
    body:  {
      id: "Bergabunglah dengan lebih dari 1.200 mahasiswa UB yang telah merasakan kemudahan belajar tanpa hambatan aksesibilitas.",
      en: "Join over 1,200 UB students who have experienced barrier-free learning.",
    },
    browse:   { id: "Jelajahi Koleksi",  en: "Browse Collections" },
    register: { id: "Daftar Sekarang",   en: "Register Now" },
  },

  // ── Login ─────────────────────────────────────────────────
  login: {
    title:       { id: "Masuk ke Pustakability",       en: "Sign In to Pustakability" },
    subtitle:    { id: "Akses koleksi digital aksesibel Universitas Brawijaya", en: "Access the accessible digital collection of Universitas Brawijaya" },
    demoLabel:   { id: "Akun Demo — klik untuk mengisi otomatis:", en: "Demo Accounts — click to auto-fill:" },
    emailLabel:  { id: "Email UB",      en: "UB Email" },
    emailPh:     { id: "mahasiswa@ub.ac.id", en: "student@ub.ac.id" },
    passwordLabel: { id: "Kata Sandi",  en: "Password" },
    passwordPh:  { id: "Masukkan kata sandi", en: "Enter your password" },
    submit:      { id: "Masuk",         en: "Sign In" },
    submitting:  { id: "Memproses...",  en: "Processing..." },
    error:       { id: "Email atau kata sandi tidak sesuai.", en: "Email or password does not match." },
    rateLimitError: { id: "Terlalu banyak percobaan login yang gagal. Silakan coba lagi dalam 15 menit.", en: "Too many failed login attempts. Please try again in 15 minutes." },
    pendingError:{ id: "Akun Anda masih dalam proses verifikasi oleh Admin PLD UB. Silakan tunggu hingga disetujui.", en: "Your account is still pending verification by the PLD UB Admin. Please wait for approval." },
    noAccount:   { id: "Belum punya akun?", en: "Don't have an account?" },
    registerLink:{ id: "Daftar Sekarang", en: "Register Now" },
    guest:       { id: "Hanya ingin melihat-lihat?", en: "Just browsing?" },
    guestLink:   { id: "Jelajahi sebagai tamu →", en: "Browse as guest →" },
    back:        { id: "Kembali ke Beranda", en: "Back to Home" },
    show:        { id: "Tampilkan kata sandi", en: "Show password" },
    hide:        { id: "Sembunyikan kata sandi", en: "Hide password" },
    forgotLink:  { id: "Lupa Password?", en: "Forgot Password?" },
  },

  // ── Forgot Password ───────────────────────────────────────
  forgot: {
    modalTitle:       { id: "Reset Kata Sandi", en: "Reset Password" },
    step1Desc:        { id: "Masukkan alamat email UB terdaftar Anda. Kami akan mengirimkan tautan reset kata sandi langsung ke inbox email Anda.", en: "Enter your registered UB email address. We will send a password reset link directly to your inbox." },
    emailLabel:       { id: "Email UB Terdaftar", en: "Registered UB Email" },
    emailPh:          { id: "nama@student.ub.ac.id", en: "name@student.ub.ac.id" },
    invalidEmailErr:  { id: "Masukkan alamat email UB yang valid.", en: "Please enter a valid UB email address." },
    userNotFoundErr:  { id: "Email UB tidak terdaftar dalam sistem Pustakability.", en: "UB email is not registered in Pustakability." },
    rateLimitErr:     { id: "Batas pengiriman email tercapai (Rate Limit 429). Mohon tunggu beberapa menit atau sesuaikan 'Rate Limits' di Supabase Auth Dashboard.", en: "Email rate limit reached (Rate Limit 429). Please wait a few minutes or adjust 'Rate Limits' in Supabase Auth Dashboard." },
    sendBtn:          { id: "Kirim Tautan Reset via Email", en: "Send Reset Link via Email" },
    sendingBtn:       { id: "Mengirim Tautan...", en: "Sending Link..." },
    sentTitle:        { id: "Tautan Reset Terkirim!", en: "Reset Link Sent!" },
    sentDesc:         { id: "Tautan verifikasi me-reset kata sandi telah dikirimkan ke", en: "Password reset verification link has been sent to" },
    sentCheckInbox:   { id: "Silakan periksa inbox atau folder Spam email Anda dan klik tombol Reset Password.", en: "Please check your inbox or Spam folder and click the Reset Password button." },
    closeBtn:         { id: "Mengerti, Tutup", en: "Got it, Close" },
    verifiedTitle:    { id: "Tautan Konfirmasi Email Terverifikasi", en: "Email Verification Link Verified" },
    verifiedDesc:     { id: "Anda telah mengklik tautan verifikasi email. Silakan masukkan kata sandi baru Anda di bawah ini.", en: "You clicked the email verification link. Please enter your new password below." },
    newPasswordLabel: { id: "Kata Sandi Baru", en: "New Password" },
    newPasswordPh:    { id: "Minimal 8 karakter", en: "Minimum 8 characters" },
    confirmPassLabel: { id: "Konfirmasi Kata Sandi Baru", en: "Confirm New Password" },
    confirmPassPh:    { id: "Ulangi kata sandi baru", en: "Re-enter new password" },
    passMinErr:       { id: "Kata sandi baru minimal 8 karakter.", en: "New password must be at least 8 characters." },
    passMismatchErr:  { id: "Konfirmasi kata sandi baru tidak cocok.", en: "New password confirmation does not match." },
    resetSuccessToast:{ id: "Kata sandi berhasil diperbarui! Silakan login.", en: "Password successfully updated! Please log in." },
    resetExpiredErr:  { id: "Tautan verifikasi tidak valid atau telah kadaluarsa.", en: "Verification link is invalid or has expired." },
    submittingBtn:    { id: "Memproses...", en: "Processing..." },
    submitBtn:        { id: "Ubah Kata Sandi", en: "Update Password" },
    backBtn:          { id: "Kembali", en: "Back" },
  },

  // ── Profile Settings ──────────────────────────────────────
  profile: {
    modalTitle:        { id: "Pengaturan Profil Saya",   en: "My Profile Settings" },
    tabInfo:           { id: "Informasi Profil",        en: "Profile Info" },
    tabSecurity:       { id: "Keamanan & Kata Sandi",   en: "Security & Password" },
    avatarLabel:       { id: "Foto Profil / Avatar",    en: "Profile Picture / Avatar" },
    avatarUploadBtn:   { id: "Pilih Foto Baru",         en: "Upload New Photo" },
    avatarUrlPh:       { id: "https://... (URL foto)",  en: "https://... (photo URL)" },
    nameLabel:         { id: "Nama Lengkap",            en: "Full Name" },
    namePh:            { id: "Masukkan nama lengkap",   en: "Enter full name" },
    nimLabel:          { id: "NIM / ID Mahasiswa",      en: "NIM / Student ID" },
    nimPh:             { id: "Contoh: 215150201111001", en: "e.g. 215150201111001" },
    emailLabel:        { id: "Alamat Email UB",         en: "UB Email Address" },
    roleLabel:         { id: "Peran Akun",              en: "Account Role" },
    facultyLabel:      { id: "Fakultas",                en: "Faculty" },
    disabilityLabel:   { id: "Disabilitas Cetak",       en: "Print Disability Category" },
    disabilityPh:      { id: "Contoh: Tunanetra / Low Vision / Disleksia", en: "e.g. Blindness / Low Vision / Dyslexia" },
    saveBtn:           { id: "Simpan Perubahan",        en: "Save Changes" },
    savingBtn:         { id: "Menyimpan...",            en: "Saving..." },
    saveSuccess:       { id: "Profil Anda berhasil diperbarui!", en: "Your profile has been updated!" },
    currentPassLabel:  { id: "Kata Sandi Saat Ini",      en: "Current Password" },
    currentPassPh:     { id: "Masukkan kata sandi saat ini", en: "Enter current password" },
    newPassLabel:      { id: "Kata Sandi Baru",         en: "New Password" },
    newPassPh:         { id: "Minimal 8 karakter",      en: "Minimum 8 characters" },
    confirmPassLabel:  { id: "Konfirmasi Kata Sandi Baru", en: "Confirm New Password" },
    confirmPassPh:     { id: "Ulangi kata sandi baru",  en: "Re-enter new password" },
    updatePassBtn:     { id: "Ubah Kata Sandi",         en: "Update Password" },
    updatingPassBtn:   { id: "Mengubah...",             en: "Updating..." },
    passSuccess:       { id: "Kata sandi Anda berhasil diperbarui!", en: "Your password has been updated!" },
    currentPassErr:    { id: "Kata sandi saat ini salah. Mohon periksa kembali.", en: "Current password is incorrect. Please check again." },
    passMinErr:        { id: "Kata sandi baru minimal 8 karakter.", en: "New password must be at least 8 characters." },
    passMismatchErr:   { id: "Konfirmasi kata sandi baru tidak cocok.", en: "New password confirmation does not match." },
    removePhoto:       { id: "Hapus Foto", en: "Remove Photo" },
    securityDesc:      { id: "Untuk keamanan akun, Anda harus memasukkan kata sandi saat ini sebelum menetapkan kata sandi baru.", en: "For account security, you must enter your current password before setting a new one." },
    changeEmailLabel:  { id: "Ubah Email", en: "Change Email" },
    newEmailLabel:     { id: "Email Baru", en: "New Email" },
    newEmailPh:        { id: "Masukkan email baru", en: "Enter new email" },
    changeEmailBtn:    { id: "Kirim Verifikasi Email", en: "Send Email Verification" },
    changingEmailBtn:  { id: "Mengirim...", en: "Sending..." },
    emailChangeSuccess:{ id: "Email verifikasi telah dikirim ke alamat baru. Silakan periksa inbox Anda.", en: "Verification email sent to your new address. Please check your inbox." },
    emailChangeErr:    { id: "Gagal mengirim verifikasi email.", en: "Failed to send email verification." },
  },

  // ── Register ──────────────────────────────────────────────
  register: {
    title:       { id: "Daftar Pustakability",    en: "Register for Pustakability" },
    step:        { id: "Langkah",                 en: "Step" },
    of:          { id: "dari",                    en: "of" },
    step1Label:  { id: "Peran & Info",            en: "Role & Info" },
    step2Label:  { id: "Keamanan",                en: "Security" },
    roleLabel:   { id: "Saya mendaftar sebagai:", en: "I am registering as:" },
    roles: {
      user: {
        label: { id: "Pengguna (Mahasiswa)",      en: "User (Student)" },
        desc:  { id: "Akses penuh ke seluruh koleksi e-book. Untuk penyandang disabilitas cetak yang terdaftar di PLD UB.", en: "Full access to all e-book collections. For print disability users registered at PLD UB." },
      },
      volunteer: {
        label: { id: "Relawan (Volunteer)",       en: "Volunteer" },
        desc:  { id: "Dapat berkontribusi menambahkan buku ke koleksi, dengan validasi dari admin sebelum ditampilkan.", en: "Can contribute books to the collection, with admin validation before publishing." },
      },
    },
    nameLabel:    { id: "Nama Lengkap",           en: "Full Name" },
    namePh:       { id: "Nama sesuai KTM",        en: "Name as on student ID" },
    nimLabel:     { id: "NIM",                    en: "Student ID" },
    nimPh:        { id: "Nomor Induk Mahasiswa",  en: "Student ID number" },
    nimError:     { id: "NIM harus berupa angka (8–18 digit)", en: "NIM must be numeric (8–18 digits)" },
    emailLabel:   { id: "Email UB",               en: "UB Email" },
    emailPh:      { id: "nim@student.ub.ac.id",   en: "id@student.ub.ac.id" },
    emailErrorUser: { id: "Email mahasiswa harus menggunakan domain @student.ub.ac.id", en: "Student email must use @student.ub.ac.id domain" },
    emailErrorVol:  { id: "Email harus menggunakan domain UB (@student.ub.ac.id atau @ub.ac.id)", en: "Email must use UB domain (@student.ub.ac.id or @ub.ac.id)" },
    facultyLabel: { id: "Fakultas",               en: "Faculty" },
    facultyPh:    { id: "Pilih Fakultas",         en: "Select Faculty" },
    disabilityLabel: { id: "Jenis Disabilitas Cetak", en: "Type of Print Disability" },
    disabilityPh: { id: "Pilih jenis disabilitas", en: "Select disability type" },
    disabilityNote: { id: "Verifikasi oleh tim PLD UB diperlukan sebelum akun aktif.", en: "Verification by the PLD UB team is required before the account is activated." },
    passwordLabel: { id: "Kata Sandi",            en: "Password" },
    passwordPh:   { id: "Minimal 8 karakter",     en: "Minimum 8 characters" },
    passwordLength: { id: "Minimal 8 karakter",    en: "Minimum 8 characters" },
    passwordUppercase: { id: "Setidaknya 1 huruf kapital (A-Z)", en: "At least 1 uppercase letter (A-Z)" },
    passwordNumber: { id: "Setidaknya 1 angka (0-9)", en: "At least 1 number (0-9)" },
    passwordWeakError: { id: "Kata sandi belum memenuhi kriteria keamanan minimal", en: "Password does not meet minimum security criteria" },
    confirmLabel: { id: "Konfirmasi Kata Sandi",  en: "Confirm Password" },
    confirmPh:    { id: "Ulangi kata sandi",      en: "Repeat password" },
    confirmError: { id: "Kata sandi tidak cocok", en: "Passwords do not match" },
    summary:      { id: "Ringkasan Pendaftaran",  en: "Registration Summary" },
    agreeText:    { id: "Saya menyetujui", en: "I agree to the" },
    terms:        { id: "Syarat & Ketentuan", en: "Terms & Conditions" },
    and:          { id: "dan", en: "and" },
    privacy:      { id: "Kebijakan Privasi", en: "Privacy Policy" },
    next:         { id: "Lanjutkan →",      en: "Continue →" },
    submit:       { id: "Daftar Sekarang",  en: "Register Now" },
    submitting:   { id: "Memproses...",     en: "Processing..." },
    successTitle: { id: "Pendaftaran Berhasil!", en: "Registration Successful!" },
    successBodyUser: { id: "Akun Anda sedang diverifikasi oleh tim PLD UB. Kami akan mengirimkan email aktivasi ke alamat email Anda dalam 1–3 hari kerja.", en: "Your account is being verified by the PLD UB team. We will send an activation email within 1–3 business days." },
    successBodyVol:  { id: "Pendaftaran volunteer Anda sedang direview oleh admin. Anda akan mendapat notifikasi via email setelah disetujui.", en: "Your volunteer registration is being reviewed by an admin. You will receive an email notification once approved." },
    backToLogin:  { id: "Kembali ke Login", en: "Back to Login" },
    back:         { id: "Sudah punya akun? Masuk", en: "Already have an account? Sign In" },
    backToStep1:  { id: "Kembali ke Langkah 1",   en: "Back to Step 1" },
  },

  // ── EbookReader ───────────────────────────────────────────
  ebook: {
    toc:          { id: "Daftar Isi",            en: "Table of Contents" },
    prevChapter:  { id: "Bab Sebelumnya",        en: "Previous Chapter" },
    nextChapter:  { id: "Bab Berikutnya",        en: "Next Chapter" },
    chapter:      { id: "Bab",                   en: "Chapter" },
    previewMode:  { id: "Mode Preview",          en: "Preview Mode" },
    locked:       { id: "Konten Terkunci",       en: "Content Locked" },
    lockedBody:   { id: "Anda sudah membaca bagian preview. Daftar sebagai pengguna Pustakability untuk mengakses", en: "You have read the preview section. Register as a Pustakability user to access" },
    lockedBodyEnd:{ id: "bab penuh dari buku ini.", en: "full chapters of this book." },
    registerFree: { id: "Daftar Sekarang — Gratis", en: "Register Now — Free" },
    hasAccount:   { id: "Sudah punya akun? Masuk", en: "Already have an account? Sign In" },
    previewEnd:   { id: "Ini adalah akhir dari preview bab pertama", en: "This is the end of the first chapter preview" },
    previewPrompt:{ id: "Daftar gratis untuk membaca", en: "Register free to read" },
    previewChaptersLeft: { id: "bab berikutnya", en: "more chapters" },
    availableChapters: { id: "bab tersedia untuk tamu.", en: "chapters available for guests." },
    registerFull: { id: "Daftar untuk Akses Penuh", en: "Register for Full Access" },
    close:        { id: "Tutup pembaca",         en: "Close reader" },
    toggleSidebar:{ id: "Toggle daftar isi",     en: "Toggle table of contents" },
  },

  // ── Admin Dashboard ───────────────────────────────────────
  admin: {
    title:        { id: "Admin Dashboard",       en: "Admin Dashboard" },
    subtitle:     { id: "Kelola pengguna, koleksi buku, dan validasi kontribusi volunteer", en: "Manage users, book collections, and volunteer contribution validation" },
    connectedToSupabase: { id: "Terhubung", en: "Connected" },
    offlineMode:  { id: "Mode Offline",           en: "Offline Mode" },
    refresh:      { id: "Segarkan",               en: "Refresh" },
    tabs: {
      overview:  { id: "Ringkasan",              en: "Overview" },
      users:     { id: "Pengguna",               en: "Users" },
      books:     { id: "Koleksi Buku",           en: "Book Collections" },
      validasi:  { id: "Validasi",               en: "Validation" },
    },
    overview: {
      totalUsers: { id: "Total Pengguna",        en: "Total Users" },
      totalBooks: { id: "Total Buku",            en: "Total Books" },
      pending:    { id: "Menunggu Validasi",      en: "Pending Validation" },
      activeUsers:{ id: "Pengguna Aktif",        en: "Active Users" },
      thisWeek:   { id: "+2 minggu ini",         en: "+2 this week" },
      categories: { id: "12 kategori",           en: "12 categories" },
      volSubmit:  { id: "Pengajuan volunteer",   en: "Volunteer submissions" },
      thisMonth:  { id: "Bulan ini",             en: "This month" },
    },
    users: {
      title:      { id: "Daftar Pengguna",       en: "User List" },
      name:       { id: "Nama",                  en: "Name" },
      email:      { id: "Email",                 en: "Email" },
      role:       { id: "Peran",                 en: "Role" },
      faculty:    { id: "Fakultas",              en: "Faculty" },
      status:     { id: "Status",                en: "Status" },
      joined:     { id: "Bergabung",             en: "Joined" },
      action:     { id: "Aksi",                  en: "Action" },
      active:     { id: "Aktif",                 en: "Active" },
      pending:    { id: "Menunggu",              en: "Pending" },
      suspended:  { id: "Ditangguhkan",          en: "Suspended" },
    },
    books: {
      title:      { id: "Koleksi Buku",          en: "Book Collection" },
      bookTitle:  { id: "Judul",                 en: "Title" },
      author:     { id: "Penulis",               en: "Author" },
      category:   { id: "Kategori",              en: "Category" },
      year:       { id: "Tahun",                 en: "Year" },
      format:     { id: "Format",                en: "Format" },
      chapters:   { id: "Bab",                   en: "Chapters" },
      pages:      { id: "hlm",                   en: "pages" },
      chapterUnit:{ id: "Bab",                   en: "Ch." },
      status:     { id: "Status",                en: "Status" },
      action:     { id: "Aksi",                  en: "Action" },
      active:     { id: "Aktif",                 en: "Active" },
    },
    validation: {
      title:      { id: "Pengajuan Volunteer Menunggu Validasi", en: "Volunteer Submissions Pending Validation" },
      empty:      { id: "Tidak ada pengajuan yang perlu divalidasi.", en: "No submissions need validation." },
      approve:    { id: "Setujui",               en: "Approve" },
      reject:     { id: "Tolak",                 en: "Reject" },
      pending:    { id: "Menunggu",              en: "Pending" },
      submittedBy:{ id: "Diajukan oleh:",        en: "Submitted by:" },
    },
    quickActions: {
      viewPending: { id: "Lihat Validasi Tertunda", en: "View Pending Validations" },
      manageUsers: { id: "Kelola Pengguna",      en: "Manage Users" },
      manageBooks: { id: "Manajemen Buku",       en: "Book Management" },
    },
  },

  // ── Volunteer Dashboard ───────────────────────────────────
  volunteer: {
    title:      { id: "Dashboard Volunteer",     en: "Volunteer Dashboard" },
    subtitle:   { id: "Kontribusikan buku ke koleksi Pustakability.", en: "Contribute books to the Pustakability collection." },
    hello:      { id: "Halo,",                   en: "Hello," },
    tabs: {
      submissions: { id: "Pengajuan Saya",       en: "My Submissions" },
      add:         { id: "Tambah Buku Baru",     en: "Add New Book" },
    },
    submissions: {
      title:      { id: "Buku yang Saya Ajukan", en: "Books I Submitted" },
      empty:      { id: "Belum ada buku yang diajukan.", en: "No books submitted yet." },
      first:      { id: "Ajukan Buku Pertama",   en: "Submit Your First Book" },
      submittedAt:{ id: "Diajukan:",             en: "Submitted:" },
      info:       { id: "Setelah Anda mengajukan buku, tim admin Pustakability akan mereview dalam 1–3 hari kerja. Anda akan mendapat notifikasi email setelah buku disetujui atau ditolak.", en: "After you submit a book, the Pustakability admin team will review it within 1–3 business days. You will receive an email notification after the book is approved or rejected." },
      infoLabel:  { id: "Alur Validasi:", en: "Validation Flow:" },
    },
    status: {
      pending:  { id: "Menunggu Validasi", en: "Pending Validation" },
      approved: { id: "Disetujui",         en: "Approved" },
      rejected: { id: "Ditolak",           en: "Rejected" },
    },
    form: {
      title:       { id: "Formulir Pengajuan Buku Baru", en: "New Book Submission Form" },
      fileLabel:   { id: "FILE BUKU (.EPUB / .TXT / .PDF)", en: "BOOK FILE (.EPUB / .TXT / .PDF)" },
      dragDropText:{ id: "Drag & drop file atau klik untuk memilih", en: "Drag & drop file or click to select" },
      supportedFormatsText: { id: "Format yang didukung: .epub · .txt · .pdf", en: "Supported formats: .epub · .txt · .pdf" },
      maxSizeText: { id: "Maksimum 50 MB",          en: "Maximum 50 MB" },
      bookTitle:   { id: "Judul Buku",             en: "Book Title" },
      bookTitlePh: { id: "Judul lengkap buku",     en: "Full book title" },
      author:      { id: "Penulis",                en: "Author" },
      authorPh:    { id: "Nama penulis / editor",  en: "Author / editor name" },
      publisher:   { id: "Penerbit",               en: "Publisher" },
      publisherPh: { id: "Nama penerbit",          en: "Publisher name" },
      category:    { id: "Kategori",               en: "Category" },
      categoryPh:  { id: "Pilih kategori",         en: "Select category" },
      year:        { id: "Tahun Terbit",            en: "Publication Year" },
      description: { id: "Deskripsi Singkat",      en: "Short Description" },
      descriptionPh:{ id: "Deskripsikan isi dan tujuan buku ini...", en: "Describe the content and purpose of this book..." },
      coverUrl:    { id: "URL Sampul Buku",        en: "Book Cover URL" },
      coverUrlPh:  { id: "https://... (opsional)", en: "https://... (optional)" },
      formats:     { id: "Format Aksesibel Tersedia", en: "Available Accessible Formats" },
      copyright:   { id: "Pastikan buku yang Anda ajukan bebas hak cipta atau memiliki izin distribusi yang sesuai. Pengajuan yang melanggar hak cipta akan langsung ditolak.", en: "Ensure the book you submit is copyright-free or has appropriate distribution rights. Submissions that violate copyright will be immediately rejected." },
      copyrightLabel: { id: "Penting:", en: "Important:" },
      submit:      { id: "Kirim Pengajuan",        en: "Submit Book" },
      submitting:  { id: "Mengirim...",            en: "Sending..." },
      minFormat:   { id: "Pilih minimal satu format", en: "Select at least one format" },
    },
    success: {
      title: { id: "Pengajuan Terkirim!",  en: "Submission Sent!" },
      body:  { id: "Buku Anda sedang direview oleh admin. Mengalihkan ke halaman pengajuan...", en: "Your book is being reviewed by an admin. Redirecting to submissions page..." },
    },
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    description: { id: "Pustaka digital aksesibel untuk mahasiswa penyandang disabilitas cetak di Universitas Brawijaya.", en: "Accessible digital library for students with print disabilities at Universitas Brawijaya." },
    navigation:  { id: "Navigasi",              en: "Navigation" },
    formats:     { id: "Format Tersedia",       en: "Available Formats" },
    contactTitle:{ id: "Kontak PLD UB",         en: "Contact PLD UB" },
    websiteLabel:{ id: "Website PLD UB",        en: "PLD UB Website" },
    copyright:   { id: "© 2026 Pustakability — Pusat Layanan Disabilitas, Universitas Brawijaya.", en: "© 2026 Pustakability — Disability Services Center, Universitas Brawijaya." },
    privacy:     { id: "Kebijakan Privasi",     en: "Privacy Policy" },
    terms:       { id: "Syarat Penggunaan",     en: "Terms of Use" },
    home:        { id: "Beranda",               en: "Home" },
    catalog:     { id: "Koleksi Buku",          en: "Book Collections" },
    formatList: {
      audio:   { id: "Audio & Text-to-Speech",  en: "Audio & Text-to-Speech" },
      pdf:     { id: "PDF Aksesibel",            en: "Accessible PDF" },
      daisy:   { id: "Buku DAISY",              en: "DAISY Books" },
      braille: { id: "Braille Digital (BRF)",   en: "Digital Braille (BRF)" },
    },
  },

  // ── Legal Modals ──────────────────────────────────────────
  legal: {
    privacyTitle: { id: "Kebijakan Privasi Pustakability", en: "Pustakability Privacy Policy" },
    termsTitle:   { id: "Syarat Penggunaan Pustakability", en: "Pustakability Terms of Use" },
    closeBtn:     { id: "Tutup", en: "Close" },
    privacyContent: {
      intro: {
        id: "Pustakability berkomitmen menjaga kerahasiaan dan keamanan data pribadi seluruh pemustaka, mahasiswa, dan relawan di lingkungan Universitas Brawijaya.",
        en: "Pustakability is committed to safeguarding the privacy and security of all library users, students, and volunteers within Universitas Brawijaya."
      },
      section1Title: { id: "1. Pengumpulan & Jenis Data", en: "1. Data Collection & Types" },
      section1Body:  {
        id: "Kami mengumpulkan informasi akun dasar mencakup Nama Lengkap, Email UB (@ub.ac.id / @student.ub.ac.id), NIM, Fakultas, dan status disabilitas yang diisi secara sukarela untuk keperluan autentikasi dan penyesuaian format aksesibilitas.",
        en: "We collect basic account information including Full Name, UB Email (@ub.ac.id / @student.ub.ac.id), NIM, Faculty, and voluntary disability status for authentication and accessibility format customization."
      },
      section2Title: { id: "2. Penggunaan & Keamanan Data", en: "2. Data Usage & Security" },
      section2Body:  {
        id: "Data pribadi hanya digunakan untuk verifikasi anggota, penyediaan buku digital aksesibel, serta koordinasi layanan transkripsi dengan Pusat Layanan Disabilitas UB. Kredensial kata sandi dilindungi enkripsi SHA-256 dan data tidak pernah diperjualbelikan kepada pihak ketiga.",
        en: "Personal data is strictly used for member verification, provision of accessible digital books, and transcription service coordination with UB Disability Services Center. Password credentials are secured using SHA-256 encryption and data is never sold to third parties."
      },
      section3Title: { id: "3. Hak & Kendali Pengguna", en: "3. User Rights & Control" },
      section3Body:  {
        id: "Pengguna berhak memperbarui data profil atau mengajukan penghapusan akun kapan saja dengan menghubungi tim admin PLD UB melalui psldbrawijaya@ub.ac.id.",
        en: "Users reserve the right to update profile information or request account deletion at any time by contacting the PLD UB admin team at psldbrawijaya@ub.ac.id."
      }
    },
    termsContent: {
      intro: {
        id: "Dengan mengakses atau menggunakan platform Pustakability, Anda menyetujui ketentuan dan syarat penggunaan di bawah ini.",
        en: "By accessing or using the Pustakability platform, you agree to the terms and conditions outlined below."
      },
      section1Title: { id: "1. Hak Akses & Keanggotaan", en: "1. Access Rights & Eligibility" },
      section1Body:  {
        id: "Layanan pustaka digital ini dikhususkan bagi civitas akademika Universitas Brawijaya, terutama mahasiswa penyandang disabilitas cetak (print-disabled). Akun yang terdaftar harus diverifikasi oleh administrator sebelum mendapat akses penuh.",
        en: "This accessible digital library is dedicated to Universitas Brawijaya students and academic community, especially students with print disabilities. Registered accounts must be verified by administrators prior to receiving full access."
      },
      section2Title: { id: "2. Hak Cipta & Penggunaan Berkelayakan (Fair Use)", en: "2. Copyright & Fair Use" },
      section2Body:  {
        id: "Seluruh koleksi e-book, DAISY, audio, dan Braille Digital disediakan semata-mata untuk keperluan pembelajaran dan penelitian non-komersial berdasarkan pengecualian hak cipta disabilitas. Dilarang keras menggandakan, mendistribusikan ulang, atau memperjualbelikan materi buku secara komersial.",
        en: "All e-book, DAISY, audio, and Digital Braille materials are provided solely for non-commercial educational and research purposes under disability copyright exemptions. Unauthorized redistribution, copying, or commercial resale of materials is strictly prohibited."
      },
      section3Title: { id: "3. Tanggung Jawab & Kepatuhan WCAG 2.1 AA", en: "3. Account Responsibility & WCAG 2.1 AA Compliance" },
      section3Body:  {
        id: "Setiap pengguna bertanggung jawab atas keamanan kata sandi masing-masing. Pustakability menjamin kepatuhan standar aksesibilitas WCAG 2.1 Level AA untuk kenyamanan seluruh pemustaka.",
        en: "Each user is responsible for maintaining the confidentiality of their password credentials. Pustakability commits to maintaining WCAG 2.1 Level AA accessibility standards for all users."
      }
    }
  },
} as const;

/** Pick the right string for the current language */
export function tr<T extends { id: string; en: string }>(entry: T | undefined | null, lang: Lang): string {
  if (!entry) return "";
  return entry[lang] ?? entry.id ?? "";
}
