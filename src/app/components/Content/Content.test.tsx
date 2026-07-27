import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Content } from '.'
import { FAKE_RELEASES } from '@/app/test/mocks'
import { Release } from '@/app/types'

describe('renders', () => {
    test('a placeholder message when there are no releases', () => {
        render(<Content releases={[]} />)

        expect(screen.getByText('Select a folder to see its albums.')).toBeDefined()
    })

    test(' a release, with its title and year', () => {
        render(<Content releases={FAKE_RELEASES} />)

        expect(screen.getByText('OK Computer(1997)')).toBeDefined()
    })

    test('an "Uncategorized" section for releases without a master', () => {
        const uncategorizedRelease: Release = {
            id: 2000,
            category: 'uncategorized',
            artistName: 'Curtis Mayfield',
            artistId: 20,
            title: 'Some Bootleg',
            masterId: 0,
            masterUrl: '',
            year: 1975,
            coverImageUrl: '',
            thumbImageUrl: '',
        }

        render(<Content releases={[...FAKE_RELEASES, uncategorizedRelease]} />)

        expect(screen.getByText('Uncategorized')).toBeDefined()
        expect(screen.getByText('Some Bootleg(1975)')).toBeDefined()
    })
})