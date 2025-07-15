import { Badge } from '@/components/ui/badge';

export default function BadgeRow() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Badge>CEO</Badge>
      <Badge>Dev</Badge>
      <Badge>Designer</Badge>
    </div>
  );
}
