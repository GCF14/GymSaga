import { Button } from "@/components/ui/button"

export default function EditSaveButton() {
    return(
        <div className="flex flex-row gap-4 justify-end">
            <Button variant= "secondary" className="">
                Edit
            </Button>
            <Button className="">
                Save
            </Button>
        </div>
    )
}