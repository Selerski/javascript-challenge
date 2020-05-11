import { stylesheet } from 'typestyle';

export const charts = stylesheet({
  chartContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    $nest: {
      '& .title': {
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: '#00695c',
        fontWeight: 'bold',
        color: 'white',
        padding: '10px 20px'
      }
    }
  },
  chartWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '500px',
    maxWidth: '500px'
  }
});
