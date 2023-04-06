import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useRouter } from 'next/router'
import React from 'react'

interface StyledTabsProps {
  children?: React.ReactNode
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-scroller': {
    padding: '4px 0',
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    // maxWidth: 32,
    width: '100%',
    backgroundColor: '#ED1E24',
  },
})

interface StyledTabProps {
  label: string
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  fontFamily: 'UTM Bebas',
  textTransform: 'uppercase',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(18),
  marginRight: theme.spacing(1),
  letterSpacing: '1px',
  color: '#212529', //theme.palette.text.primary,
  '&.Mui-selected': {
    color: '#ED1E24', // theme.palette.primary,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}))

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}
interface CustomizedNavTabsProps {
  navInfo: {
    rootName?: string
    rootPath?: string
    items: { scope: string; label: string }[]
  }
  currentTab: number
  setCurrentTab: (tabIdx: number) => void
}

export function CustomizeTabs({
  currentTab,
  setCurrentTab,
  ...props
}: CustomizedNavTabsProps) {
  const { navInfo } = props
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
    // const tabName = `tab${newValue + 1}`
    router.push(`${router.pathname}?scope=${newValue}`)
  }

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <StyledTabs
        value={currentTab}
        onChange={handleChange}
        aria-label="styled tabs example"
      >
        {navInfo.items.map((item, index) => (
          <StyledTab
            key={item.scope}
            label={item.label}
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
    </Box>
  )
}
