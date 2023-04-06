import { useState, useEffect, useRef, ReactElement } from 'react'
import axios from 'axios'

export interface IProps {
  apiUrl?: string
  children?: ReactElement
  setData: (data: any) => void
}

export function Section({ apiUrl, children, setData }: IProps) {
  const sectionRef = useRef<any>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          //   const fetchData = async () => {
          //     // const res = await axios.get(apiUrl)
          //     setData(res.data)
          //   }
          setData(apiUrl + ' data')
          //   fetchData()
          console.log('trigger')
          observer.unobserve(sectionRef.current)
        }
      })
    })
    observer.observe(sectionRef.current)
  }, [apiUrl])

  return (
    <div ref={sectionRef}>
      {children}
      {/* <h1>{props.title}</h1> */}
      {/* <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul> */}
    </div>
  )
}

// function Home() {
//   return (
//     <div>
//       <Section title="Section 1" apiUrl="/api/section1" />
//       <Section title="Section 2" apiUrl="/api/section2" />
//       <Section title="Section 3" apiUrl="/api/section3" />
//     </div>
//   )
// }

// export default Home
