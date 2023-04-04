import * as React from 'react'

export interface IProps {
  children?: React.ReactElement
}

export function AuthContainer({ children }: IProps) {
  return <>{children}</>
}
