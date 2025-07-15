import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';

export default function MealTable() {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Meal Name</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Calories</TableHead>
          <TableHead>Protein</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Fried Chicken</TableCell>
          <TableCell>300 grams</TableCell>
          <TableCell>1000 kcal</TableCell>
          <TableCell>80 grams</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mango</TableCell>
          <TableCell>500 grams</TableCell>
          <TableCell>150 kcal</TableCell>
          <TableCell>35 grams</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Orange Juice</TableCell>
          <TableCell>250 mL</TableCell>
          <TableCell>20 kcal</TableCell>
          <TableCell>0 grams</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>1170 kcal</TableCell>
          <TableCell>115 grams</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
