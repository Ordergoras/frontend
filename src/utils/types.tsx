export type Order = {
  orderId: string,
  tableNr: number,
  staffId: string,
  staffName: string,
  orderedItems: { [key: string]: number }
  createdAt: string,
  completed: boolean,
}

export type Item = {
  itemId: string,
  name: string,
  amount: number,
  price: number,
  group: ItemGroup,
}

export type ItemGroup = 'Food' | 'Drink' | 'Other'
