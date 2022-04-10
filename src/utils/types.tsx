export type Item = {
  itemId: string,
  name: string,
  amount: number,
  price: number,
  group: ItemGroup,
}

export type ItemGroup = 'Food' | 'Drink' | 'Other'
