import { useRef, useState, useCallback } from "react";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

const ACCEPTED = [".epub", ".txt", ".pdf"];
const ACCEPTED_MIME = [
  "application/epub+zip",
  "text/plain",
  "application/pdf",
  "application/x-pdf",
];
const MAX_MB = 50;

interface FileUploadFormProps {
  darkMode:  boolean;
  onFileSelected: (file: File) => void;
  onFileClear:    () => void;
  selectedFile:   File | null;
  disabled?:      boolean;
}

const formatLabels: Record<string, { color: string; label: string }> = {
  epub: { color: "#0D7070", label: "EPUB" },
  txt:  { color: "#3B5BDB", label: "TXT" },
  pdf:  { color: "#DC2626", label: "PDF" },
};

function fileExt(file: File) {
  return file.name.split(".").pop()?.toLowerCase() ?? "";
}

function fmtSize(bytes: number) {
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1024 ** 2)  return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

export function FileUploadForm({
  darkMode: dm,
  onFileSelected,
  onFileClear,
  selectedFile,
  disabled,
}: FileUploadFormProps) {
  const { t } = useLanguage();
  const inputRef  = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error,    setError]    = useState("");

  const border    = dm ? "#1E2D4F"  : "#E5E7EB";
  const muted     = dm ? "#94A3B8"  : "#6B7280";
  const text      = dm ? "#F1F5F9"  : "#0F1B35";
  const zoneBg    = dm ? "#0D1117"  : "#F9FAFB";
  const zoneActBg = dm ? "#1A2240"  : "#EEF2FF";

  const validate = useCallback((file: File): string => {
    const ext  = fileExt(file);
    const size = file.size / 1024 / 1024;
    if (!ACCEPTED.includes(`.${ext}`))
      return `Format tidak didukung. Gunakan ${ACCEPTED.join(", ")}`;
    if (size > MAX_MB)
      return `Ukuran file terlalu besar (${fmtSize(file.size)}). Maksimum ${MAX_MB} MB.`;
    return "";
  }, []);

  const handleFile = (file: File) => {
    const err = validate(file);
    if (err) { setError(err); return; }
    setError("");
    onFileSelected(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const ext   = selectedFile ? fileExt(selectedFile) : null;
  const fmeta = ext ? formatLabels[ext] : null;

  return (
    <div>
      {/* Drop zone */}
      {!selectedFile ? (
        <div
          className="relative rounded-2xl transition-all cursor-pointer"
          style={{
            border:          `2px dashed ${dragging ? "#3B5BDB" : border}`,
            backgroundColor: dragging ? zoneActBg : zoneBg,
            padding:         "2rem",
            textAlign:       "center",
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          tabIndex={0}
          role="button"
          aria-label="Pilih file buku untuk diunggah"
          onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(",")}
            className="hidden"
            disabled={disabled}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            aria-hidden="true"
          />

          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: dragging ? "#3B5BDB18" : (dm ? "#1E2D4F" : "#EEF2FF") }}
          >
            <Upload
              className="w-7 h-7"
              style={{ color: dragging ? "#3B5BDB" : muted }}
            />
          </div>

          <p style={{ fontSize: "0.95rem", fontWeight: 600, color: text, marginBottom: "0.4rem" }}>
            {dragging ? (t(T.volunteer.form.dragDropText) || "Lepaskan file di sini") : t(T.volunteer.form.dragDropText)}
          </p>
          <p style={{ fontSize: "0.8rem", color: muted }}>
            {t(T.volunteer.form.supportedFormatsText)}
          </p>
          <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.25rem" }}>
            {t(T.volunteer.form.maxSizeText)}
          </p>

          {/* Format badges */}
          <div className="flex justify-center gap-2 mt-4">
            {Object.entries(formatLabels).map(([k, v]) => (
              <span
                key={k}
                className="px-3 py-1 rounded-lg"
                style={{ backgroundColor: `${v.color}15`, color: v.color, fontSize: "0.75rem", fontWeight: 600 }}
              >
                .{k.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Selected file preview */
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{ backgroundColor: dm ? "#1A2240" : "#F0FDF4", border: `1.5px solid ${dm ? "#1E3A5F" : "#BBF7D0"}` }}
        >
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${fmeta?.color ?? "#3B5BDB"}20` }}
          >
            <File className="w-6 h-6" style={{ color: fmeta?.color ?? "#3B5BDB" }} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="px-1.5 py-0.5 rounded"
                style={{ backgroundColor: `${fmeta?.color ?? "#3B5BDB"}18`, color: fmeta?.color ?? "#3B5BDB", fontSize: "0.68rem", fontWeight: 700 }}
              >
                {fmeta?.label ?? ext?.toUpperCase()}
              </span>
              <CheckCircle className="w-4 h-4" style={{ color: "#16A34A" }} aria-label="File valid" />
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: text }} className="truncate">
              {selectedFile.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: muted }}>
              {fmtSize(selectedFile.size)}
            </div>
          </div>

          {/* Remove */}
          {!disabled && (
            <button
              onClick={(e) => { e.stopPropagation(); onFileClear(); inputRef.current && (inputRef.current.value = ""); }}
              className="p-1.5 rounded-xl flex-shrink-0 transition-colors"
              style={{ color: muted }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#E5E7EB")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              aria-label="Hapus file terpilih"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="flex items-start gap-2 mt-2 px-3 py-2.5 rounded-xl"
          style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
          role="alert"
        >
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p style={{ fontSize: "0.8rem", color: "#DC2626" }}>{error}</p>
        </div>
      )}

      {/* Processing note */}
      {selectedFile && (
        <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.5rem" }}>
          File akan diproses secara otomatis — teks diekstrak dan dikonversi ke format yang
          dapat dibaca screen reader (NVDA, JAWS, VoiceOver).
        </p>
      )}
    </div>
  );
}
