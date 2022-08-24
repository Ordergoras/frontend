import {FoodInfo, WineInfo, WineSizes, WineSizesEnum} from './types';
import store from '../Redux/store';
import i18n from 'i18next';

export const isWineInfo = (obj: FoodInfo | WineInfo | undefined): obj is WineInfo => {
  return (obj as WineInfo).wineId !== undefined
}

export const isFoodInfo = (obj: FoodInfo | WineInfo | undefined): obj is FoodInfo => {
  return (obj as FoodInfo).description !== undefined
}

export const getChipLabel = (outerKey: string, itemId: string, amount: number): string => {
  const itemIdMap = store.getState().data.itemIdMap
  if(itemIdMap) {
    if (outerKey === itemId) {
      return itemIdMap[itemId].name + ': ' + amount
    } else if(itemIdMap[outerKey] && itemIdMap[outerKey].information && isWineInfo(itemIdMap[outerKey].information)) {
      switch (itemId as WineSizes) {
        case WineSizesEnum.pointOne:
          return itemIdMap[outerKey].name + ' - ' + i18n.t('pointOne') + ': ' + amount
        case WineSizesEnum.pointTwo:
          return itemIdMap[outerKey].name + ' - ' + i18n.t('pointTwo') + ': ' + amount
        case WineSizesEnum.pointFour:
          return itemIdMap[outerKey].name + ' - ' + i18n.t('pointFour') + ': ' + amount
        case WineSizesEnum.bottle:
          return itemIdMap[outerKey].name + ' - ' + i18n.t('bottle') + ': ' + amount
      }
    }
  }
  return 'Error'
}
