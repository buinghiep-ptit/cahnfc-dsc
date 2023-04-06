/* eslint-disable react/jsx-filename-extension */
import { fetchDataHome } from '@/api-client/home'
import { Box, Stack } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export default function MyPage() {
  const sectionRefs = useRef([])
  const sectionIds = [
    'banner',
    'upcoming-match',
    'ranking',
    'matches',
    'news',
    'videos',
    'main-team',
    'donors',
  ]
  const [sectionsData, setSectionsData] = useState([
    { id: 'banner', loaded: false, data: [] },
    { id: 'upcoming-match', loaded: false, data: [] },
    { id: 'ranking', loaded: false, data: [] },
    { id: 'matches', loaded: false, data: [] },
    { id: 'news', loaded: false, data: [] },
    { id: 'videos', loaded: false, data: [] },
    { id: 'main-team', loaded: false, data: [] },
    { id: 'donors', loaded: false, data: [] },
  ])

  // useEffect(() => {
  //   // Khởi tạo dữ liệu cho các section
  //   setSectionsData([
  //     { id: 'section1', loaded: false, data: [] },
  //     { id: 'section2', loaded: false, data: [] },
  //     { id: 'section3', loaded: false, data: [] },
  //     { id: 'section4', loaded: false, data: [] },
  //     { id: 'section5', loaded: false, data: [] },
  //     { id: 'section6', loaded: false, data: [] },
  //     { id: 'section7', loaded: false, data: [] },
  //     { id: 'section8', loaded: false, data: [] },
  //     { id: 'section9', loaded: false, data: [] },
  //     { id: 'section10', loaded: false, data: [] },
  //     // ...
  //   ])
  // }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id')
          const sectionData = sectionsData.find(data => data.id === sectionId)

          if (sectionData && !sectionData.loaded) {
            // Gọi API để lấy dữ liệu cho section này

            const data = await fetchDataHome(sectionId)

            fetch(
              `https://js-post-api.herokuapp.com/api/posts?_page=${sectionId.slice(
                7,
              )}`,
            )
              .then(res => res.json())
              .then(data => {
                // Cập nhật dữ liệu đã tải cho section và render lại
                sectionData.data = data.data
                sectionData.loaded = true
                const newSectionsData = [...sectionsData, sectionData]
                setSectionsData([...newSectionsData])
              })
          }
        }
      })
    })

    sectionRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [])

  return (
    <Stack gap={3}>
      {sectionIds.map((sectionId, index) => (
        <Box
          key={sectionId}
          width={'100%'}
          height={800}
          bgcolor="green"
          ref={el => (sectionRefs.current[index] = el)}
          id={sectionId}
        >
          <span>{sectionId}</span>
        </Box>
      ))}
    </Stack>
  )
}
