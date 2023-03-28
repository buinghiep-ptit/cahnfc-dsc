import { weekday } from '@/utils'
import { Box, Grid, Stack, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { MuiTrapezoid } from '../MUITrapezoid'
import { AccordionRanking } from './AccordionRanking'
import { CountdownTimer } from './CountDownNextMatch'
import { JustifyBox } from './Matching'

export interface IProps {}

export function TrapezoidInfo(props: IProps) {
  const [tabIndex, setTabIndex] = React.useState(0)

  const THREE_DAYS_IN_MS = 18 * 24 * 60 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS

  return (
    <>
      <Stack pb={10} display="flex" alignItems={'center'}>
        <Stack
          direction={'row'}
          sx={{
            width: 'calc(60vw - 120px)',
            height: '40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <MuiTrapezoid
            onMouseDown={() => setTabIndex(0)}
            background={tabIndex === 0 ? '#ffd200' : '#FFFFFF'}
            direction="down"
            borderradiusbefore="5px 0 0 0"
            borderradiusafter="0 5px 0 0"
            sx={{
              width: '30vw',
              height: '100%',
              position: 'relative',
              transition: '0.5s ease-in-out',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color:
                  tabIndex === 0 ? 'secondary.main' : 'secondary.contrastText',
                zIndex: 1,
              }}
            >
              {'Night Wolf 2023'}
            </Typography>
          </MuiTrapezoid>
          <MuiTrapezoid
            onMouseDown={() => setTabIndex(1)}
            background={tabIndex === 1 ? '#ffd200' : '#FFFFFF'}
            direction="down"
            borderradiusbefore="5px 0 0 0"
            borderradiusafter="0 5px 0 0"
            sx={{
              width: '30vw',
              height: '100%',
              position: 'relative',
              transition: '0.5s ease-in-out',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color:
                  tabIndex === 1 ? 'secondary.main' : 'secondary.contrastText',
                zIndex: 1,
              }}
            >
              {'BẢNG XẾP HẠNG'}
            </Typography>
          </MuiTrapezoid>
        </Stack>
        <Box position={'relative'} mt={'-3px'}>
          <MuiTrapezoid
            background={'#ffd200'}
            direction="up"
            bordertrapezoid="#212529"
            borderradiusbefore="5px 0 0 5px"
            borderradiusafter="0 5px 5px 0"
            sx={{
              width: '60vw',
              height: '56px',
              position: 'relative',
            }}
          >
            <Stack
              flexDirection={'row'}
              justifyContent="space-between"
              width="100%"
              px={tabIndex === 0 ? 9 : 3.5}
            >
              {tabIndex === 0 && (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      zIndex: 99,
                    }}
                  >
                    {'CÔNG AN HÀ NỘI FC'}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      zIndex: 99,
                    }}
                  >
                    {'HOÀNG ANH GIA LAI FC'}
                  </Typography>
                </>
              )}
              {tabIndex === 1 && (
                <Grid container zIndex={99}>
                  <Grid item xs={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'primary.main',
                        zIndex: 99,
                      }}
                    >
                      thứ hạng
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'primary.main',
                        zIndex: 99,
                        textAlign: 'left',
                      }}
                    >
                      câu lạc bộ
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'primary.main',
                        zIndex: 99,
                      }}
                    >
                      SỐ TRẬN
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'primary.main',
                        zIndex: 99,
                      }}
                    >
                      ĐIỂM
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Stack>
          </MuiTrapezoid>
          <MuiTrapezoid
            background={'#212529'}
            direction="up"
            bordertrapezoid="#FFFFFF"
            borderradiusbefore="5px 0 0 5px"
            borderradiusafter="0 5px 5px 0"
            sx={{
              width: 'calc(60vw - 16px)',
              height: '48px',
              position: 'absolute',
              top: '4px',
              left: '8px',
            }}
          />
        </Box>
        {tabIndex === 0 && (
          <JustifyBox
            gap={7}
            py={5}
            px={2}
            sx={{
              width: 'calc(60vw - 60px)',
              bgcolor: '#FFFFFF',
              mt: '-4px',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            <Image
              src={'/assets/images/logos/logo-2.svg'}
              alt="logo 1"
              width={132}
              height={132}
            />
            <Stack gap={3}>
              <Typography variant="subtitle1" color={'secondary'}>
                BẮT ĐẦU SAU
              </Typography>
              <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              <Typography variant="subtitle2" color={'secondary'}>
                {weekday(new Date().getDay())},{' '}
                {moment(new Date()).format('DD/MM/YYYY - HH:mm')} - SVĐ Hàng Đẫy
              </Typography>
            </Stack>
            <Image
              src={'/assets/images/logos/logo-1.svg'}
              alt="logo 1"
              width={132}
              height={132}
            />
          </JustifyBox>
        )}
        {tabIndex === 1 && (
          <JustifyBox
            py={1}
            sx={{
              width: 'calc(60vw - 60px)',
              bgcolor: '#FFFFFF',
              mt: '-4px',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            <AccordionRanking />
          </JustifyBox>
        )}
      </Stack>
    </>
  )
}
