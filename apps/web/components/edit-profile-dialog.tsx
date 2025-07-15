'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Textarea } from './ui/textarea';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function EditProfileDialog() {
  const { user } = useAuthContext();
  const userId = user?.userId;
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async () => {
    if (!userId) {
      toast.error('User ID not found.');

      return;
    }

    const bodyData = {
      ...(username.trim() !== '' && { username }),
      ...(bio.trim() !== '' && { bio }),
    };

    if (Object.keys(bodyData).length === 0) {
      toast.error('No changes detected.');

      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/update/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || data.error || 'Failed to update profile.');

        return;
      }

      const oldUsername = user?.username;
      const newUsername = username.trim() !== '' ? username : oldUsername;

      // Update local storage
      localStorage.setItem('username', newUsername);

      // Update auth context
      dispatch({
        type: 'LOGIN',
        payload: { ...user, ...bodyData },
      });

      toast.success('Profile successfully updated!');

      // Close the dialog
      setIsOpen(false);

      // Dispatch a custom event with more details
      window.dispatchEvent(
        new CustomEvent('profileUpdated', {
          detail: {
            oldUsername,
            newUsername,
            usernameChanged: oldUsername !== newUsername,
            userId: userId,
            timestamp: Date.now(),
          },
        }),
      );

      // Navigate to the new profile URL if username changed
      if (oldUsername && newUsername && oldUsername !== newUsername) {
        // Using a slight delay to ensure localStorage is updated before navigation
        setTimeout(() => {
          // Force a hard reload to clear all cached data
          window.location.href = `/${encodeURIComponent(newUsername)}`;
        }, 300);
      } else {
        // Force router refresh to update data
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating the profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <span className="material-symbols-rounded">edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information here!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Username</Label>
            <Input
              className="col-span-3"
              id="username"
              placeholder={user?.username || 'Username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Write something about yourself..."
              rows={10}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isSubmitting} onClick={handleUpdate}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
