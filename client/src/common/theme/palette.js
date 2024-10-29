import { amber, grey, green, indigo, red, common } from '@mui/material/colors';

export default () => {
  const colors = {
    white: common.white,
    background: grey[50],
    primary: indigo[900],
    secondary: green[800],
    positive: green[500],
    medium: amber[700],
    negative: red[500],
    neutral: grey[500],
    geometry: '#3bb2d0',
  };

  const colorsDevices = {
    0: '#F34C28',
    1: '#F39A28',
    2: '#1EC910',
    3: '#1012C9',
    4: '#C310C9',
    5: '#1FDBF1',
    6: '#F6FD04',
    7: '#808080',
  };
  return {
    background: {
      default: colors.background,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.white,
    },
    neutral: {
      main: colors.neutral,
    },
    geometry: {
      main: colors.geometry,
    },
    success: {
      main: colors.positive,
    },
    warning: {
      main: colors.medium,
    },
    colors,
    colorsDevices,
  };
};
