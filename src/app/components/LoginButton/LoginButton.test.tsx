import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginButton } from './LoginButton'

test('renders', () => {
    render(<LoginButton />)

    expect(screen.getByRole('button')).toBeDefined()
})