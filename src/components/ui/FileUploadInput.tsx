import { useState, useRef } from "react";
import { UploadSimple, X, File, Image, CheckCircle, SpinnerGap } from "@phosphor-icons/react";
import { uploadFile } from "@/utils/uploadFile";
import { toast } from "sonner";

export interface UploadedFile {
  fileUrl: string;
  fileType: string;
  name: string;
  certTypeLabel?: string;
}

interface FileUploadInputProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  value: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  hint?: string;
}

const FileUploadInput = ({
  label,
  accept = "image/*,.pdf",
  multiple = true,
  maxFiles = 5,
  value,
  onChange,
  hint,
}: FileUploadInputProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (value.length + files.length > maxFiles) {
      toast.error(`Tối đa ${maxFiles} file`, { duration: 3000 });
      return;
    }

    setUploading(true);
    const newFiles: UploadedFile[] = [];

    for (const file of Array.from(files)) {
      try {
        const result = await uploadFile(file);
        newFiles.push({
          fileUrl: result.url,
          fileType: result.resourceType === "image" ? "image" : "document",
          name: file.name,
        });
      } catch {
        toast.error(`Không thể tải lên: ${file.name}`, { duration: 3000 });
      }
    }

    onChange([...value, ...newFiles]);
    setUploading(false);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-black/60">
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          uploading
            ? "border-black/20 bg-black/5 cursor-not-allowed"
            : "border-black/20 hover:border-[#FF5722] hover:bg-[#FF5722]/5 cursor-pointer"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <SpinnerGap className="w-9 h-9 text-[#FF5722] animate-spin" />
            <p className="text-sm text-black/60">Đang tải lên...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-black/5 rounded-full flex items-center justify-center mb-1">
              <UploadSimple className="w-7 h-7 text-black/40" />
            </div>
            <p className="text-sm font-medium text-black/70">
              Kéo thả hoặc{" "}
              <span className="text-[#FF5722] font-bold">chọn file</span>
            </p>
            {hint && <p className="text-xs text-black/40 mt-1">{hint}</p>}
          </div>
        )}
      </div>

      {/* File list */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 bg-black/5 rounded-lg border border-black/10"
            >
              {file.fileType === "image" ? (
                <Image className="w-5 h-5 text-[#FF5722] shrink-0" weight="duotone" />
              ) : (
                <File className="w-5 h-5 text-[#FF5722] shrink-0" weight="duotone" />
              )}
              <span className="flex-1 text-sm text-black/80 truncate">{file.name}</span>
              <CheckCircle className="w-4 h-4 text-[#00A650] shrink-0" weight="fill" />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="w-6 h-6 flex items-center justify-center text-black/30 hover:text-red-500 transition-colors shrink-0 hover:bg-red-50 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
