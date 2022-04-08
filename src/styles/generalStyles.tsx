export const utils = {
  topBottomMargin: {
    marginTop: 1,
    marginBottom: 1,
  },
}

export const generalStyles = {
  backgroundContainer: {
    height: '92%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    position: 'absolute',
    left: 0,
  },
  textField: {
    ...utils.topBottomMargin,
  },
  paper: {
    padding: 8,
    margin: 'auto',
  },
  button: {
    ...utils.topBottomMargin,
  },
}
