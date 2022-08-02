import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
export let theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#FF6464',
    },
    secondary: {
      light: '#EDF7FA',
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#21243D',
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
      styleOverrides: {
        maxWidthSm: {
          maxWidth: '680px',
          '@media (min-width: 600px)': {
            maxWidth: '680px',
          },
        },
        maxWidthMd: {
          maxWidth: '860px',
          '@media (min-width: 900px)': {
            maxWidth: '860px',
          },
        },
      },
      variants: [],
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
            color: 'white',
          },
        },
      ],
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
})

theme = responsiveFontSizes(theme)
