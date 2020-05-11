import { stylesheet } from 'typestyle';

export const popups = stylesheet({
  popupWrapper: {
    backgroundColor: 'rgb(224, 242, 241, 0.1)',
    width: 'fitContent'
  },
  area: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px',
    $nest: {
      '& p': {
        fontSize: '14px',
        color: '#70757a',
        margin: '0',
        marginLeft: '10px',
        textAlign: 'right',
        width: '100%'
      }
    }
  },
  material: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px',
    $nest: {
      '& p': {
        fontSize: '14px',
        color: '#70757a',
        margin: '0',
        marginLeft: '10px',
        textAlign: 'right',
        width: '100%'
      }
    }
  },
  popupHeader: {
    backgroundColor: '#00695c',
    width: 'fit-content',
    borderEadius: '3px',
    color: 'white',
    padding: '5px 10px',
    margin: '0',
    fontSize: '16px'
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationCoordinates: {
    color: '#70757a',
    fontSize: '14px',
    margin: '0',
    marginLeft: '5px'
  }
});
