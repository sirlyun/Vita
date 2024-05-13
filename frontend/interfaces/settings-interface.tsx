type MyItemList = MyItem[] | null;

interface MyItem {
  my_item_id: number;
  type: string;
  name: String;
  is_used: boolean;
}
