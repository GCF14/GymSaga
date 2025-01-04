import Link from 'next/link';
import { Button } from './ui/button';

export default function SettingsButton() {
  return (
    <Link href="/settings">
      <Button variant="outline" size="icon" className="mr-4">
        <span className="material-symbols-rounded">
          settings
        </span>
      </Button>
    </Link>
  );
}