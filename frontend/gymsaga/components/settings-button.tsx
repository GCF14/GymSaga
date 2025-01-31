import Link from 'next/link';
import { Button } from './ui/button';

export default function SettingsButton() {
  return (
    <Link href="/settings">
      <Button variant="outline" size="icon">
        <span className="material-symbols-rounded">
          settings
        </span>
      </Button>
    </Link>
  );
}