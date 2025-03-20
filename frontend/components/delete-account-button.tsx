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
  import { Input } from "@/components/ui/input";

export default function DeleteAccountButton() {
    const { deleteAccount, isLoading, error } = useDeleteAccount();
    const { user } = useAuthContext(); 
    const router = useRouter();

    const handleContinueClick = async () => {
        const success = await deleteAccount(user.userId); 

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
                account and remove your data from our servers. Enter your password to confirm.
            </AlertDialogDescription>
            </AlertDialogHeader>
                <Input type="password" placeholder="Password"/>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90" onClick={handleContinueClick} disabled={isLoading} >Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}