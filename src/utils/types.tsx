export type Order = {
  orderId: string,
  tableNr: number,
  staffId: string,
  staffName: string,
  orderedItems: { [key: string]: { [key: string]: number} }
  completedItems: { [key: string]: { [key: string]: number} }
  createdAt: string,
  completed: boolean,
  price: number,
}

export type Item = {
  itemId: string,
  name: string,
  inStock: boolean,
  price: number,
  group: ItemGroup,
  information: ItemInfo | undefined,
}

export type ItemInfo = FoodInfo | WineInfo

export type FoodInfo = {
  description: string,
}

export type WineInfo = {
  wineId: string,
  fullName: string,
  winery: string,
  year: string,
  bottleSize: string,
  bottlePrice: string,
  pointOnePrice: string,
  pointTwoPrice: string,
  pointFourPrice: string,
}

export type Staff = {
  staffId: string,
  name: string,
  isAdmin: boolean,
}

export type ItemGroup = 'Drink' | 'Food' | 'Wine' | 'Other'

export enum ItemEnum { 'Drink', 'Food', 'Wine', 'Other' }

export type WineSizes = 'pointOne' | 'pointTwo' | 'pointFour' | 'bottle'

export enum WineSizesEnum { 'pointOne' = "pointOne", 'pointTwo' = "pointTwo", 'pointFour' = "pointFour", 'bottle' = "bottle" }
