import React from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import {
  Switch,
} from '@mui/material';
import { Brightness3, WbSunny } from '@mui/icons-material';
import { changeTheme } from '../actions';

const ThemeSwitch = withStyles({
  switchBase: {
    color: '#FE6B8B',
    '&$checked': {
      color: '#FE6B8B',
    },
    '&$checked + $track': {
      backgroundColor: '#FE6B8B',
    },
  },
  checked: {},
  track: {},
})(Switch);

// tslint:disable:jsx-no-lambda
function ThemeToggle(props) {
  const {
    theme: {
      theme,
    },
  } = props;

  const dispatch = useDispatch();

  const handleChangeCurrentStyleMode = (value) => {
    dispatch(changeTheme(value));
  };

  return (
    <div>
      <WbSunny />
      <ThemeSwitch
        checked={theme !== 'light'}
        onChange={(e) => handleChangeCurrentStyleMode(theme === 'light' ? 'dark' : 'light')}
      />
      <Brightness3 />
    </div>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme,
})

const mapDispatchToProps = (dispatch) => ({
  changeTheme: (payload) => dispatch(changeTheme(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
