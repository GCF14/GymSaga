import { useRouter } from 'next/navigation';

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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';

export default function DeleteAccountButton() {
  const { deleteAccount, isLoading, error } = useDeleteAccount();
  const { user } = useAuthContext();
  const router = useRouter();

  const handleContinueClick = async () => {
    const success = await deleteAccount(user.userId);

    if (success) {
      localStorage.clear();
      router.push('/login');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-4" variant="destructive">
          Delete my account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers. Enter your password to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input placeholder="Password" type="password" />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs"
            disabled={isLoading}
            onClick={handleContinueClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
