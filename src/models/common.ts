import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface ILayoutProps {
  children?: ReactNode
}
export type NextPageWithLayout = NextPage & {
  Layout?: (props: ILayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
