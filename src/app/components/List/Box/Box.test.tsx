import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Box } from '.'

describe('renders', () => {
    test('a list containing its children', () => {
        render(
            <Box>
                <li>Item one</li>
                <li>Item two</li>
            </Box>
        )

        expect(screen.getByRole('list')).toBeDefined()
        expect(screen.getByText('Item one')).toBeDefined()
        expect(screen.getByText('Item two')).toBeDefined()
    })
})
