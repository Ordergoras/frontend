export type Order = {
  orderId: string,
  tableNr: number,
  staffId: string,
  staffName: string,
  orderedItems: { [key: string]: number }
  completedItems: { [key: string]: number }
  createdAt: string,
  completed: boolean,
  price: number,
}

export type Item = {
  itemId: string,
  name: string,
  amount: number,
  price: number,
  group: ItemGroup,
}

export type Staff = {
  staffId: string,
  name: string,
  isAdmin: boolean,
}

export type ItemGroup = 'Drink' | 'Food' | 'Wine' | 'Other'

export enum ItemEnum { 'Drink', 'Food', 'Wine', 'Other' }
