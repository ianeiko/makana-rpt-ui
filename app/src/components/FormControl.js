import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIFormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { compose } from 'recompose';
import errorForField from '../utils/errorForField';

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

const FormControl = ({ errors, classes, value, label, onChange, field, textFieldOptions }) => {
  const error = errorForField(errors, field);
  return (
    <MUIFormControl className={classes.formControl} fullWidth>
      <TextField
        error={!!error}
        label={error || label}
        onChange={onChange}
        value={value}
        {...textFieldOptions}
      />
    </MUIFormControl>
  );
};

const enhanced = compose(
  withStyles(styles),
);
export default enhanced(FormControl);
