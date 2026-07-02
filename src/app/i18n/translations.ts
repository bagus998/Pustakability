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
    sectionLabel:  { id: "Fitur Aksesibilitas",             en: "Accessibility Features" },
    sectionTitle:  { id: "Dirancang untuk Semua Cara Membaca", en: "Designed for Every Way of Reading" },
    sectionBody:   {
      id: "Pustakability menyediakan beragam fitur agar setiap mahasiswa UB dapat mengakses informasi dengan cara yang paling nyaman bagi mereka.",
      en: "Pustakability provides diverse features so every UB student can access information in the way most comfortable for them.",
    },
    wcagLabel: { id: "Pernyataan Aksesibilitas", en: "Accessibility Statement" },
    wcagBody: {
      id: "Pustakability berkomitmen memenuhi standar WCAG 2.1 Level AA. Jika Anda menemukan hambatan aksesibilitas, hubungi tim PLD UB di",
      en: "Pustakability is committed to meeting WCAG 2.1 Level AA standards. If you encounter accessibility barriers, contact the PLD UB team at",
    },
    items: {
      audio:   { title: { id: "Audio & Text-to-Speech", en: "Audio & Text-to-Speech" }, desc: { id: "Dengarkan buku dengan kecepatan dan suara yang dapat disesuaikan. Mendukung bahasa Indonesia dan Inggris.", en: "Listen to books at adjustable speed and voice. Supports Indonesian and English." } },
      braille: { title: { id: "Braille Digital", en: "Digital Braille" }, desc: { id: "Konten tersedia dalam format BRF yang kompatibel dengan display braille dan embosser.", en: "Content available in BRF format compatible with braille displays and embossers." } },
      daisy:   { title: { id: "Buku DAISY", en: "DAISY Books" }, desc: { id: "Format Digital Accessible Information System dengan navigasi terstruktur per bab, halaman, dan paragraf.", en: "Digital Accessible Information System format with structured navigation by chapter, page, and paragraph." } },
      font:    { title: { id: "Font Ramah Disleksia", en: "Dyslexia-Friendly Font" }, desc: { id: "Pilih font OpenDyslexic, ukuran huruf besar, dan spasi baris yang lebar untuk kemudahan membaca.", en: "Choose OpenDyslexic font, large text size, and wide line spacing for reading comfort." } },
      night:   { title: { id: "Mode Baca Malam", en: "Night Reading Mode" }, desc: { id: "Tampilan gelap yang nyaman dan berbagai tema warna untuk pengguna dengan low vision atau sensitivitas cahaya.", en: "Comfortable dark display and various color themes for users with low vision or light sensitivity." } },
      reader:  { title: { id: "Screen Reader Ready", en: "Screen Reader Ready" }, desc: { id: "Sepenuhnya kompatibel dengan NVDA, JAWS, dan VoiceOver. Setiap elemen dilengkapi label ARIA yang lengkap.", en: "Fully compatible with NVDA, JAWS, and VoiceOver. Every element has complete ARIA labels." } },
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
    error:       { id: "Email atau kata sandi tidak sesuai. Coba akun demo di bawah.", en: "Email or password does not match. Try a demo account below." },
    noAccount:   { id: "Belum punya akun?", en: "Don't have an account?" },
    registerLink:{ id: "Daftar Sekarang", en: "Register Now" },
    guest:       { id: "Hanya ingin melihat-lihat?", en: "Just browsing?" },
    guestLink:   { id: "Jelajahi sebagai tamu →", en: "Browse as guest →" },
    back:        { id: "Kembali ke Beranda", en: "Back to Home" },
    show:        { id: "Tampilkan kata sandi", en: "Show password" },
    hide:        { id: "Sembunyikan kata sandi", en: "Hide password" },
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
    emailLabel:   { id: "Email UB",               en: "UB Email" },
    emailPh:      { id: "nim@student.ub.ac.id",   en: "id@student.ub.ac.id" },
    facultyLabel: { id: "Fakultas",               en: "Faculty" },
    facultyPh:    { id: "Pilih Fakultas",         en: "Select Faculty" },
    disabilityLabel: { id: "Jenis Disabilitas Cetak", en: "Type of Print Disability" },
    disabilityPh: { id: "Pilih jenis disabilitas", en: "Select disability type" },
    disabilityNote: { id: "Verifikasi oleh tim PLD UB diperlukan sebelum akun aktif.", en: "Verification by the PLD UB team is required before the account is activated." },
    passwordLabel: { id: "Kata Sandi",            en: "Password" },
    passwordPh:   { id: "Minimal 8 karakter",     en: "Minimum 8 characters" },
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
      format:     { id: "Format",                en: "Format" },
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
    copyright:   { id: "© 2024 Pustakability — Pusat Layanan Disabilitas, Universitas Brawijaya.", en: "© 2024 Pustakability — Disability Services Center, Universitas Brawijaya." },
    privacy:     { id: "Kebijakan Privasi",     en: "Privacy Policy" },
    terms:       { id: "Syarat Penggunaan",     en: "Terms of Use" },
    home:        { id: "Beranda",               en: "Home" },
    catalog:     { id: "Koleksi Buku",          en: "Book Collections" },
    formatList: {
      audio:   { id: "Audio & Text-to-Speech",  en: "Audio & Text-to-Speech" },
      pdf:     { id: "PDF Aksesibel",            en: "Accessible PDF" },
      daisy:   { id: "Buku DAISY",              en: "DAISY Books" },
      braille: { id: "Braille Digital (BRF)",   en: "Digital Braille (BRF)" },
      font:    { id: "Font OpenDyslexic",        en: "OpenDyslexic Font" },
    },
  },
} as const;

/** Pick the right string for the current language */
export function tr<T extends { id: string; en: string }>(entry: T, lang: Lang): string {
  return entry[lang];
}
