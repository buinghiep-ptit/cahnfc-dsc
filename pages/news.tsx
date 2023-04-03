import * as React from 'react'

export interface IProps {}

export default function NewsPage(props: IProps) {
  return <div></div>
}

import { useRouter } from 'next/router'

const Tab1 = () => {
  const router = useRouter()

  if (router.pathname === '/tab1') {
    return <div>This is the Tab 1 content.</div>
  } else {
    return null
  }
}

const Tab2 = () => {
  const router = useRouter()

  if (router.pathname === '/tab2') {
    return <div>This is the Tab 2 content.</div>
  } else {
    return null
  }
}

const Tab3 = () => {
  const router = useRouter()

  if (router.pathname === '/tab3') {
    return <div>This is the Tab 3 content.</div>
  } else {
    return null
  }
}

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const Layout = ({ children }: any) => {
  const router = useRouter()

  type TabName = {
    [key: string]: number | string
  }

  const tabNameToIndex: TabName = {
    tab1: 0,
    tab2: 1,
    tab3: 2,
  }

  const indexToTabName: TabName = {
    0: 'tab1',
    1: 'tab2',
    2: 'tab3',
  }

  const [value, setValue] = useState(
    tabNameToIndex[router.pathname.slice(1)] || 0,
  )

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue)
    router.push(`/${indexToTabName[newValue]}`)
  }

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
      {children}
    </>
  )
}

export { Layout }
