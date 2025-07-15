import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

import { FilePreviewDialog } from '@/components/file-preview-dialog';
import { Button } from '@/components/ui/button';

interface AttachmentButtonProps {
  onFilesChange: (file: File[]) => void;
  maxFiles: number;
}

export default function AttachmentButton({ onFilesChange, maxFiles }: AttachmentButtonProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (maxFiles && files.length + newFiles.length > maxFiles) {
        toast.error(`Error: You can upload up to ${maxFiles} file${maxFiles > 1 ? 's' : ''}.`, {
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
          style: {
            color: '#ffffff',
            borderColor: '#7f1d1d',
            backgroundColor: '#7f1d1d',
          },
          actionButtonStyle: {
            backgroundColor: '#7f1d1d',
            borderColor: '#ffffff',
            color: '#ffffff',
            borderWidth: '1px',
            borderStyle: 'solid',
          },
        });

        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      if (onFilesChange) {
        onFilesChange([...files, ...newFiles]);
      }
    }
  };
  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    if (onFilesChange) {
      onFilesChange(files.filter((file) => file !== fileToRemove));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (file: File) => {
    const fileType = file.type.split('/')[0];
    const fileSubtype = file.type.split('/')[1];

    if (fileType === 'image' && fileSubtype === 'gif') {
      return <span className="material-symbols-rounded">gif_box</span>;
    }

    switch (fileType) {
      case 'image':
        return <span className="material-symbols-rounded">image</span>;
      case 'video':
        return <span className="material-symbols-rounded">movie</span>;
      case 'audio':
        return <span className="material-symbols-rounded">music_note</span>;
      default:
        return <span className="material-symbols-rounded">description</span>;
    }
  };

  return (
    <div className="flex flex-row items-start gap-2">
      <Button className="hover-button" size="icon" variant="outline" onClick={triggerFileInput}>
        <span className="material-symbols-rounded">attach_file</span>
      </Button>
      <input
        ref={fileInputRef}
        multiple
        aria-label="File upload"
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />
      {files.map((file, index) => (
        <div key={index} className="group relative">
          <Button size="icon" variant="outline" onClick={() => setSelectedFile(file)}>
            {getFileIcon(file)}
          </Button>
          <Button
            aria-label={`Remove ${file.name}`}
            className="absolute -top-1 -right-1 hidden h-3 w-3 items-center justify-center rounded-full group-hover:flex"
            size="icon"
            variant="destructive"
            onClick={() => handleRemoveFile(file)}
          >
            <span className="material-symbols-rounded thin">cancel</span>
          </Button>
        </div>
      ))}
      <FilePreviewDialog file={selectedFile} onClose={() => setSelectedFile(null)} />
    </div>
  );
}
