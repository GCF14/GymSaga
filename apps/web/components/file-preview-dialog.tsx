'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FilePreviewDialogProps {
  file: File | null;
  onClose: () => void;
}

export function FilePreviewDialog({ file, onClose }: FilePreviewDialogProps) {
  if (!file) {
    return null;
  }

  const fileType = file.type.split('/')[0];

  const renderPreview = () => {
    switch (fileType) {
      case 'image':
        return (
          <img
            alt={file.name}
            className="max-h-[60vh] max-w-full object-contain"
            src={URL.createObjectURL(file) || '/placeholder.svg'}
          />
        );
      case 'video':
        return (
          <video controls className="max-h-[60vh] max-w-full" src={URL.createObjectURL(file)} />
        );
      case 'audio':
        return <audio controls className="w-full" src={URL.createObjectURL(file)} />;
      default:
        return (
          <div className="flex h-[60vh] flex-col items-center justify-center">
            {getFileIcon(file)}
            <p className="mt-4 text-lg">Preview not available</p>
          </div>
        );
    }
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
    <Dialog open={!!file} onOpenChange={onClose}>
      <DialogContent className="min-w-[750px]">
        <DialogHeader>
          <DialogTitle>{file.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">{renderPreview()}</div>
      </DialogContent>
    </Dialog>
  );
}
