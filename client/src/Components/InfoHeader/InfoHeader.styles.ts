import { stylesheet } from 'typestyle';

export const infoHeader = stylesheet({
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    $nest: {
      '& p': {
        color: '#70757a',
        fontSize: '14px',
        margin: '0',
        marginTop: '5px',
        textAlign: 'center'
      }
    }
  },
  infoWrapper: {
    boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)',
    margin: '0',
    marginTop: '10px',
    borderRadius: '5px',
    backgroundColor: '#00695c',
    color: 'white',
    padding: '20px 30px',
    fontWeight: 'bold'
  }
});
