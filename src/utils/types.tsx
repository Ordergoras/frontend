export type Item = {
  itemId: string,
  name: string,
  amount: number,
  group: ItemGroup,
}

export type ItemGroup = 'Food' | 'Drink' | 'Other'
