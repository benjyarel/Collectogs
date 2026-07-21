import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Content } from '.'
import { FAKE_RELEASES } from '@/app/test/mocks'

describe('renders', () => {
    test('a placeholder message when there are no releases', () => {
        render(<Content releases={[]} />)

        expect(screen.getByText('Select a folder to see its albums.')).toBeDefined()
    })

    test(' a release, with its title and year', () => {
        render(<Content releases={FAKE_RELEASES} />)

        expect(screen.getByText('OK Computer (1997)')).toBeDefined()
    })
})