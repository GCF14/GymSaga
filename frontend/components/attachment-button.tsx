import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { FilePreviewDialog } from "@/components/file-preview-dialog"
import { toast } from "sonner"

interface AttachmentButtonProps {
    onFilesChange: (file: File[]) => void;
    maxFiles: number;
}

export default function AttachmentButton({ onFilesChange, maxFiles }: AttachmentButtonProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            if (maxFiles && (files.length + newFiles.length > maxFiles)) {
                toast.error(`Error: You can upload up to ${maxFiles} file.`, {
                    action: {
                      label: "Close",
                      onClick: () => toast.dismiss(),
                    },
                    style: {
                      color: "#ffffff",
                      borderColor: "#7f1d1d",
                      backgroundColor: "#7f1d1d",
                    },
                    actionButtonStyle: {
                      backgroundColor: "#7f1d1d",
                      borderColor: "#ffffff",
                      color: "#ffffff",
                      borderWidth: "1px",
                    borderStyle: "solid", 
                    }
                  });
                return;
            }
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            if (onFilesChange) {
                onFilesChange([...files, ...newFiles]);
            }
        }
    }
    const handleRemoveFile = (fileToRemove: File) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
        if (onFilesChange) {
            onFilesChange(files.filter((file) => file !== fileToRemove));
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    }

    const getFileIcon = (file: File) => {
        const fileType = file.type.split("/")[0];
        const fileSubtype = file.type.split("/")[1];
    
        if (fileType === "image" && fileSubtype === "gif") {
            return <span className="material-symbols-rounded">gif_box</span>;
        }

        switch (fileType) {
            case "image":
                return <span className="material-symbols-rounded">image</span>
            case "video":
                return <span className="material-symbols-rounded">movie</span>
            case "audio":
                return <span className="material-symbols-rounded">music_note</span>
            default:
                return <span className="material-symbols-rounded">description</span>
        }
    }

    return (
        <div className="flex flex-row gap-2 items-start">
            <Button onClick={triggerFileInput} variant="outline" size="icon" className="hover-button">
                <span className="material-symbols-rounded">attach_file</span>
            </Button>
            <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
                aria-label="File upload"
            />
            {files.map((file, index) => (
                <div key={index} className="relative group">
                    <Button variant="outline" size="icon" onClick={() => setSelectedFile(file)}>
                        {getFileIcon(file)}
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-3 w-3 absolute -top-1 -right-1 rounded-full hidden group-hover:flex items-center justify-center"
                        onClick={() => handleRemoveFile(file)}
                        aria-label={`Remove ${file.name}`}
                    >
                        <span className="material-symbols-rounded thin">cancel</span>
                    </Button>
            </div>
          ))}
        <FilePreviewDialog file={selectedFile} onClose={() => setSelectedFile(null)} />
        </div>
      )
}