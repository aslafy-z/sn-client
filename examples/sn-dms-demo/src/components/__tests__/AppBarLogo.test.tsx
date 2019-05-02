import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import AppBarLogo from '../AppBarLogo'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MemoryRouter>
      <AppBarLogo />
    </MemoryRouter>,
    div,
  )
})
