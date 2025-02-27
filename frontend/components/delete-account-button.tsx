import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { useDeleteAccount } from "@/hooks/useDeleteAccount" 
  import { useAuthContext } from "@/hooks/useAuthContext" 
  import { useRouter } from "next/navigation";


export default function DeleteAccountButton() {
    const { deleteAccount, isLoading, error } = useDeleteAccount();
    const { user } = useAuthContext(); 
    const router = useRouter();

    const handleContinueClick = async () => {
        if (!user || !user.id) {
            return;
        }

        const success = await deleteAccount(user.id); 

        if (success) {
            localStorage.clear();
            router.push("/login");
        }
    };

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mt-4">
                Delete my account
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90" onClick={handleContinueClick} disabled={isLoading} >Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}