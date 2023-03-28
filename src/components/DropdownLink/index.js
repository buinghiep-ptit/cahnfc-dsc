/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from 'react'
import Grow from '@mui/material/Grow'
import Icon from '@mui/material/Icon'
import Popper from '@mui/material/Popper'
import { Box, Paper, Typography } from '@mui/material'
import MKBox from '../MKBox'
import MKTypography from '../MKTypography'

function DefaultNavbar(props) {
  const { routes } = props
  const [dropdown, setDropdown] = useState('')
  const [dropdownEl, setDropdownEl] = useState('')
  const [dropdownName, setDropdownName] = useState('')
  const [arrowRef, setArrowRef] = useState(null)

  const renderNavbarItems = routes.map(
    ({ name, icon, href, route, collapse }) => (
      <Box
        key={name}
        ml={2}
        onMouseEnter={({ currentTarget }) => {
          if (collapse) {
            setDropdown(currentTarget)
            setDropdownEl(currentTarget)
            setDropdownName(name)
          }
        }}
        onMouseLeave={() => {
          if (collapse) setDropdown(null)
        }}
      >
        <Typography color="secondary">{name ?? ''}</Typography>
      </Box>
    ),
  )

  const renderRoutes = routes.map(({ name, collapse }) => {
    let template

    if (collapse && name === dropdownName) {
      template = collapse.map(item => (
        <Typography
          key={item.name}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          variant="button"
          textTransform="capitalize"
          px={2}
        >
          {item.name}
        </Typography>
      ))
    }

    return template
  })

  const dropdownMenu = (
    <Popper
      anchorEl={dropdown}
      popperRef={null}
      open={Boolean(dropdown)}
      placement="top"
      transition
      style={{ zIndex: 10 }}
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
      onMouseEnter={() => {
        setDropdown(dropdownEl)
      }}
      onMouseLeave={() => {
        setDropdown(null)
        setDropdownName('')
      }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          sx={{
            transformOrigin: 'center top',
            background: ({ palette: { white } }) => white.main,
          }}
        >
          <MKBox borderRadius="lg">
            <MKTypography variant="h1" color="white">
              <Icon ref={setArrowRef} sx={{ mt: -3 }}>
                arrow_drop_up
              </Icon>
            </MKTypography>
            <MKBox shadow="lg" borderRadius="lg" p={2} mt={2}>
              {renderRoutes}
            </MKBox>
          </MKBox>
        </Grow>
      )}
    </Popper>
  )

  return (
    <Box>
      <Box display={{ xs: 'none', lg: 'flex' }}>{renderNavbarItems}</Box>
      {dropdownMenu}
    </Box>
  )
}

export default DefaultNavbar
