import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';

const styles = () => ({
  bar: {
    flexGrow: 1,
  },
  button: {
    color: 'white',
    borderColor: 'white',
  },
  message: {
    flexGrow: 1,
    color: 'white',
  }
});

const LoggedinView = ({ classes, data, logoutMutation }) => (
  <AppBar className={classes.bar} position="static">
    <Toolbar>
      <Typography className={classes.message} variant="h6">
        Hello, {data && data.me && data.me.name}!
      </Typography>
      <p></p>
      <Button className={classes.button} variant="outlined" onClick={logoutMutation}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
);

const enhanced = compose(
  withStyles(styles)
);

export default enhanced(LoggedinView);
