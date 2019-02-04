import { compose, lifecycle, renderNothing } from 'recompose';
import { withSnackbar } from 'notistack';
import { get } from 'lodash';

const messageTypeMapping = {
  CREATED: 'success',
  UPDATED: 'info',
  DELETED: 'warning'
};

const messageType = type => get(messageTypeMapping, type, 'error');

export default compose(
  withSnackbar,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props === nextProps || !nextProps.message) {
        return;
      }

      this.props.enqueueSnackbar(nextProps.message, {
        variant: messageType(nextProps.mutation),
        autoHideDuration: nextProps.autoHideDuration || 1500,
      });
    }
  }),
  renderNothing
)();
