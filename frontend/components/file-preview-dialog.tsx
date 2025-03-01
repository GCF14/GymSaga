"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Film, Disc3, Image, File, ImagePlay } from "lucide-react"

interface FilePreviewDialogProps {
  file: File | null
  onClose: () => void
}

export function FilePreviewDialog({ file, onClose }: FilePreviewDialogProps) {
  if (!file) return null

  const fileType = file.type.split("/")[0]

  const renderPreview = () => {
    switch (fileType) {
      case "image":
        return (
          <img
            src={URL.createObjectURL(file) || "/placeholder.svg"}
            alt={file.name}
            className="max-w-full max-h-[60vh] object-contain"
          />
        )
      case "video":
        return <video src={URL.createObjectURL(file)} controls className="max-w-full max-h-[60vh]" />
      case "audio":
        return <audio src={URL.createObjectURL(file)} controls className="w-full" />
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            {getFileIcon(file)}
            <p className="mt-4 text-lg">Preview not available</p>
          </div>
        )
    }
  }

    const getFileIcon = (file: File) => {
        const fileType = file.type.split("/")[0];
        const fileSubtype = file.type.split("/")[1];

        if (fileType === "image" && fileSubtype === "gif") {
            return <ImagePlay />
        }

        switch (fileType) {
            case "image":
                return <Image />
            case "video":
                return <Film />
            case "audio":
                return <Disc3 />
            default:
                return <File />
        }
    }

  return (
    <Dialog open={!!file} onOpenChange={onClose}>
      <DialogContent className="min-w-[750px]">
        <DialogHeader>
          <DialogTitle>{file.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">{renderPreview()}</div>
      </DialogContent>
    </Dialog>
  )
}

