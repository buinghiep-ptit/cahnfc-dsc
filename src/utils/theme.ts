import {
  createTheme,
  PaletteOptions,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles'
// Create a theme instance.

interface IPalette extends PaletteOptions {
  neutral?: any
}
interface IThemeOptions extends ThemeOptions {
  breakpoints?: any
  palette?: IPalette
}

export let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          // paddingLeft: "0px!important",
          // paddingRight: "0px!important",
        },
        maxWidthSm: {
          // paddingLeft: "0px!important",
          // paddingRight: "0px!important",
          maxWidth: '680px',
          '@media (min-width: 600px)': {
            maxWidth: '680px',
          },
        },
        maxWidthMd: {
          maxWidth: '824px',
          '@media (min-width: 900px)': {
            maxWidth: '824px',
          },
        },
        maxWidthLg: {
          maxWidth: '1290px',
          '@media (min-width: 1025px)': {
            maxWidth: '1290px',
          },
        },
      },
      variants: [],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          // paddingLeft: "0px!important",
          // paddingRight: "0px!important",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          color: 'black',
          '&:hover, &.active': {
            color: '#556cd6',
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: {
            variant: 'contained',
            color: 'primary',
          },
          style: {
            textTransform: 'none',
            color: 'white',
            fontSize: '1rem',
            padding: '8px 24px',
            background:
              'radial-gradient(88.39% 88.39% at 16.07% 11.61%, #FFBD70 0%, #FF7836 100%)',
            borderRadius: '100px',
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // "& .MuiOutlinedInput-notchedOutline": {
          //   border: `5px solid green`,
          // },
          borderRadius: '12px',
          minHeight: '48px',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid #FF7836`,
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid #FF7836`,
            },
          },
        },
        input: {
          padding: '0 16px',
        },
        notchedOutline: {
          borderColor: '#D8E0F3', // instead for .MuiOutlinedInput-notchedOutline
        },
      },
      variants: [
        {
          props: {
            name: 'dark',
          },
          style: {
            fontSize: '0.9375rem',
            lineHeight: 1.5,
            fontWeight: 500,
            color: '#39476A',
            backgroundColor: '#101426',
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.9375rem',
          fontWeight: 400,
          lineHeight: 1.5,
          color: '#D8E0F3',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'red',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 4,
        },
      },
      variants: [
        {
          props: {
            color: 'secondary',
          },
          style: {
            fontWeight: 'bold',
            fontSize: 16,
            color: 'white',
            backgroundColor: '#142850',
          },
        },
      ],
    },
  },
  palette: {
    neutral: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    primary: {
      main: '#FF7836',
      light: '#828DF8',
      dark: '#3832A0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981',
      light: '#3FC79A',
      dark: '#0B815A',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#14B8A6',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D14343',
      light: '#DA6868',
      dark: '#922E2E',
      contrastText: '#FFFFFF',
    },
    action: {
      active: '#6B7280',
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background: {
      default: '#F9FAFC',
      paper: '#FFFFFF',
    },
    divider: '#E6E8F0',
    text: {
      primary: '#101426',
      secondary: '#65748B',
      disabled: 'rgba(55, 65, 81, 0.48)',
    },
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
  ],
  typography: {
    allVariants: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
    },
    button: {
      fontWeight: 900,
    },
    fontFamily: [
      'Inter',
      'sans-serif',
      'Caveat cursive',
      'Livvic sans-serif',
    ].join(','),
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      color: '#323E5D',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
      color: '#101426',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.25,
      color: '#475985',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375,
      color: '#101426',
    },
  },
} as IThemeOptions)

theme = responsiveFontSizes(theme)
