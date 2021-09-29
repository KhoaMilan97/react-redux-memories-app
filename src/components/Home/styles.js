import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('sm')]: {
    container: {
      flexDirection: 'column-reverse !important',
    },
  },
}));
