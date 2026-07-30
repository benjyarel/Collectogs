import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Item } from '.'

describe('renders', () => {
    test('its children inside a button', () => {
        render(
            <Item isSelected={false} onSelect={() => { }}>
                Vinyl
            </Item>
        )

        expect(screen.getByRole('button', { name: 'Vinyl' })).toBeDefined()
    })

    test('marks itself as current when selected', () => {
        render(
            <Item isSelected={true} onSelect={() => { }}>
                Vinyl
            </Item>
        )

        expect(screen.getByRole('button', { name: 'Vinyl' }).getAttribute('aria-current')).toBe('true')
    })

    test('does not mark itself as current when not selected', () => {
        render(
            <Item isSelected={false} onSelect={() => { }}>
                Vinyl
            </Item>
        )

        expect(screen.getByRole('button', { name: 'Vinyl' }).getAttribute('aria-current')).toBe('false')
    })
})

describe('interactivity', () => {
    test('calls onSelect when clicked', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()
        render(
            <Item isSelected={false} onSelect={onSelect}>
                Vinyl
            </Item>
        )

        await user.click(screen.getByRole('button', { name: 'Vinyl' }))

        expect(onSelect).toHaveBeenCalledTimes(1)
    })
})
