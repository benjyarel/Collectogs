import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Content } from '.'

const FAKE_RELEASES = [
    {
        artistName: 'Radiohead',
        artistId: 10,
        title: 'OK Computer',
        masterId: 100,
        masterUrl: 'https://fake-api.com/masters/100',
        year: 1997,
        coverImageUrl: '',
        thumbImageUrl: '',
    },
]

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