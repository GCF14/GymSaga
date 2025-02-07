import React, { useRef } from "react";
import { Button } from "@/components/ui/button"

export default function AttachmentButton() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAttachmentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log(file);
        }
    };

    return (
        <>
            <Button variant="outline" size="icon" className="hover-button" onClick={handleAttachmentClick}>
                <span className="material-symbols-rounded">attachment</span>
            </Button>
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </>

    )
}