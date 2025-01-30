import Link from 'next/link';
import { Button } from './ui/button';

export default function PostButton() {
  return (
    <Button className="mr-4">
        <span className="material-symbols-rounded bold">
          add
        </span>
        <strong>
            Post
        </strong>
    </Button>
  );
}