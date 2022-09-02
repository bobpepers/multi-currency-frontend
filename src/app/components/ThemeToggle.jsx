import React from 'react';
import { styled } from '@mui/material/styles';
import {
  connect,
  useDispatch,
} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Switch,
} from '@mui/material';
import { Brightness3, WbSunny } from '@mui/icons-material';
import { changeTheme } from '../actions';

const PREFIX = 'ThemeToggle';

const classes = {
  switchBase: `${PREFIX}-switchBase`,
  checked: `${PREFIX}-checked`,
  track: `${PREFIX}-track`
};

const Root = styled('div')({
  [`& .${classes.switchBase}`]: {
    color: '#FE6B8B',
    '&$checked': {
      color: '#FE6B8B',
    },
    '&$checked + $track': {
      backgroundColor: '#FE6B8B',
    },
  },
  [`& .${classes.checked}`]: {},
  [`& .${classes.track}`]: {},
});

const ThemeSwitch = Switch;

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
    <Root>
      <WbSunny />
      <ThemeSwitch
        checked={theme !== 'light'}
        onChange={(e) => handleChangeCurrentStyleMode(theme === 'light' ? 'dark' : 'light')}
        classes={{
          switchBase: classes.switchBase,
          checked: classes.checked,
          track: classes.track
        }} />
      <Brightness3 />
    </Root>
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
