import React from 'react'
import Counter from '@/components/counter'

export default function SSG() {
  return <Counter />
}

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export function getServerSideProps() {
  // Note that in this case we're returning the state directly, without creating
  // the store first (like in /pages/ssr.js), this approach can be better and easier
  console.log('getServerSideProps')

  return {
    props: {
      initialZustandState: {
        lastUpdate: Date.now(),
        light: false,
        count: 999,
      },
    },
  }
}
