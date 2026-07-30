import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ArtistSelect } from '.'

import { FAKE_ARTISTS } from '@/app/test/mocks'

describe('renders', () => {
    test('a placeholder message when there are no artists', () => {
        render(<ArtistSelect artists={[]} selectedArtistId={null} onSelect={() => { }} />)

        expect(screen.getByText('Select a folder to see its artists.')).toBeDefined()
    })

    test('one item per artist', () => {
        render(<ArtistSelect artists={FAKE_ARTISTS} selectedArtistId={null} onSelect={() => { }} />)

        expect(screen.getByRole('button', { name: 'Radiohead' })).toBeDefined()
        expect(screen.getByRole('button', { name: 'Portishead' })).toBeDefined()
    })

    test('marks the currently selected artist as current', () => {
        render(<ArtistSelect artists={FAKE_ARTISTS} selectedArtistId={11} onSelect={() => { }} />)

        expect(screen.getByRole('button', { name: 'Portishead' }).getAttribute('aria-current')).toBe('true')
        expect(screen.getByRole('button', { name: 'Radiohead' }).getAttribute('aria-current')).toBe('false')
    })
})

describe('interactivity', () => {
    test('calls onSelect with the artist id when an artist is clicked', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()
        render(<ArtistSelect artists={FAKE_ARTISTS} selectedArtistId={null} onSelect={onSelect} />)

        await user.click(screen.getByRole('button', { name: 'Portishead' }))

        expect(onSelect).toHaveBeenCalledWith(11)
    })
})
