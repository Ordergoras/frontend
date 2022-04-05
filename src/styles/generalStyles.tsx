export const utils = {
  topBottomMargin: {
    marginTop: 1,
    marginBottom: 1,
  },
}

export const generalStyles = {
  backgroundContainer: {
    background: 'linear-gradient(to right bottom, #FF7043, #FFAB40)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
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
