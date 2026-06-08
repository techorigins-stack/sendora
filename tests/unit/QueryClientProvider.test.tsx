/// <reference types="@testing-library/jest-dom" />
import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SendoraQueryClientProvider from '../../src/components/QueryClientProvider'

describe('QueryClientProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <SendoraQueryClientProvider>
        <span>child</span>
      </SendoraQueryClientProvider>,
    )
    expect(getByText('child')).toBeInTheDocument()
  })
})
