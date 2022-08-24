import React from 'react';
import { Item, ItemEnum, WineSizesEnum } from '../utils/types';
import { Box, Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup, Typography } from '@mui/material';
import { theme } from '../index';
import { useTranslation } from 'react-i18next';
import { isWineInfo } from '../utils/helperFunctions';

interface ItemCardProps {
  item: Item,
  hasMultipleChoices?: boolean,
  onClick: (orderItem: Item, secondaryId?: WineSizesEnum | undefined) => void,
}

function ClickableItem(props: ItemCardProps) {

  const styles = {
    button: {
      padding: 1,
      margin: 1,
      backgroundColor: ItemEnum[props.item.group] === 0 ? theme.palette.primary.light :
        ItemEnum[props.item.group] === 1 ? theme.palette.primary.main :
          ItemEnum[props.item.group] === 2 ? theme.palette.tertiary.main :
            theme.palette.primary.dark,
      ':hover': {
        backgroundColor: ItemEnum[props.item.group] === 0 ? theme.palette.primary.main :
          ItemEnum[props.item.group] === 1 ? theme.palette.primary.dark :
            ItemEnum[props.item.group] === 2 ? theme.palette.tertiary.dark :
              theme.palette.primary.main
      },
      textTransform: 'none',
    },
    divider: {
      border: 1,
      borderColor: theme.palette.divider,
    },
    modal: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
  }

  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = React.useState(false)
  const [secondaryId, setSecondaryId] = React.useState<WineSizesEnum>(WineSizesEnum.pointOne)
  const [sizeAvailable, setSizeAvailable] = React.useState([false, false, false, false])
  const [prices, setPrices] = React.useState([0, 0, 0, 0])

  React.useEffect(() => {
    if(props.item.information && isWineInfo(props.item.information)){
      let newSizesAvailable = [false, false, false, false]
      let newPrices = [0, 0, 0, 0]
      let smallest = WineSizesEnum.bottle
      if(props.item.information?.bottlePrice !== '') {
        newSizesAvailable[3] = true
        newPrices[3] = parseFloat(props.item.information?.bottlePrice)
        smallest = WineSizesEnum.bottle
      }
      if(props.item.information?.pointFourPrice !== '') {
        newSizesAvailable[2] = true
        newPrices[2] = parseFloat(props.item.information?.pointFourPrice)
        smallest = WineSizesEnum.pointFour
      }
      if(props.item.information?.pointTwoPrice !== '') {
        newSizesAvailable[1] = true
        newPrices[1] = parseFloat(props.item.information?.pointTwoPrice)
        smallest = WineSizesEnum.pointTwo
      }
      if(props.item.information?.pointOnePrice !== '') {
        newSizesAvailable[0] = true
        newPrices[0] = parseFloat(props.item.information?.pointOnePrice)
        smallest = WineSizesEnum.pointOne
      }
      setSizeAvailable(newSizesAvailable)
      setPrices(newPrices)
      setSecondaryId(smallest)
    }
  }, [props.item.information])

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Button
        sx={styles.button}
        variant={'contained'}
        disabled={!props.item.inStock}
        onClick={() => props.hasMultipleChoices ? handleModalOpen() : props.onClick(props.item)}
        children={<Box>
          <Typography variant={'h6'}>
            {props.item.name}
          </Typography>
          <Box sx={{...styles.divider, marginTop: 1, marginBottom: 1}}/>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            {
              props.item.group === 'Wine' && isWineInfo(props.item.information) &&
                <Typography variant={'subtitle2'}>
                  {t('year')}{': '}{props.item.information?.year}
                </Typography>
            }
            {
              props.item.group !== 'Wine' &&
                <Typography variant={'subtitle2'}>
                  {t('price')}: {props.item.price.toFixed(2)}€
                </Typography>
            }
            <Box sx={{...styles.divider, marginLeft: 1, marginRight: 1, marginTop: -1}}/>
            <Typography variant={'subtitle2'}>
              {props.item.inStock ? t('inStorage') : t('outOfStock')}
            </Typography>
          </Box>
        </Box>
      }/>
      {
        props.hasMultipleChoices &&
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
          >
            <Box sx={styles.modal}>
              <Typography variant={'h6'} sx={{marginBottom: 2}}>
                {props.item.name}{isWineInfo(props.item.information) && ' - (' + props.item.information?.wineId + ')'}
              </Typography>
              {
                props.item.information && isWineInfo(props.item.information) &&
                  <>
                    <Typography variant={'body1'} sx={{marginBottom: 2}}>
                      {props.item.information?.fullName}
                    </Typography>
                    <Typography variant={'body1'} sx={{marginBottom: 2}}>
                      {props.item.information?.winery}
                    </Typography>
                    <Typography variant={'body1'} sx={{marginBottom: 2}}>
                      {t('year')}{' - '}{props.item.information?.year}
                    </Typography>
                  </>
              }
              <FormControl sx={{marginBottom: 2}}>
                <RadioGroup row value={secondaryId} sx={{justifyContent: 'center'}} onChange={e => {setSecondaryId(e.target.value as WineSizesEnum)}}>
                  {sizeAvailable[0] &&
                    <FormControlLabel value={Object.values(WineSizesEnum)[0]} control={<Radio color={'secondary'}/>}
                                      label={t('pointOne') + ' - ' + prices[0].toFixed(2) + '€'}
                    />}
                  {sizeAvailable[1] &&
                    <FormControlLabel value={Object.values(WineSizesEnum)[1]} control={<Radio color={'secondary'}/>}
                                      label={t('pointTwo') + ' - ' + prices[1].toFixed(2) + '€'}
                    />}
                  {sizeAvailable[2] &&
                    <FormControlLabel value={Object.values(WineSizesEnum)[2]} control={<Radio color={'secondary'}/>}
                                      label={t('pointFour') + ' - ' + prices[2].toFixed(2) + '€'}
                    />}
                  {sizeAvailable[3] &&
                    <FormControlLabel value={Object.values(WineSizesEnum)[3]} control={<Radio color={'secondary'}/>}
                                      label={t('bottle') + ' - ' + prices[3].toFixed(2) + '€'}
                    />}
                </RadioGroup>
              </FormControl>
              <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button color={'primary'} variant={'contained'} onClick={() => handleModalClose()}>
                  {t('close')}
                </Button>
                <Button color={'secondary'} variant={'contained'} onClick={() => {
                  props.onClick(props.item, secondaryId)
                  handleModalClose()
                }}>
                  {t('addToOrder')}
                </Button>
              </Box>
            </Box>
          </Modal>
      }
    </>
  )
}

export default ClickableItem;
