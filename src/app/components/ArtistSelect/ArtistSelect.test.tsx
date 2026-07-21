import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ArtistSelect } from '.'
import { FAKE_ARTISTS } from '@/app/test/mocks'

describe('renders', () => {
    test('a placeholder message when there are no artists', () => {
        render(<ArtistSelect artists={[]} selectedArtistId={null} onChange={() => { }} />)

        expect(screen.getByText('Select a folder to see its artists.')).toBeDefined()
    })

    test('one option per artist', () => {
        render(<ArtistSelect artists={FAKE_ARTISTS} selectedArtistId={null} onChange={() => { }} />)

        expect(screen.getByText('Radiohead')).toBeDefined()
        expect(screen.getByText('Portishead')).toBeDefined()
    })

    test('the currently selected artist', () => {
        render(<ArtistSelect artists={FAKE_ARTISTS} selectedArtistId={11} onChange={() => { }} />)

        const select = screen.getByLabelText<HTMLSelectElement>('Artist:')
        expect(select.value).toBe('11')
    })
})

describe('interactivity', () => {
    test('calls onChange with the selected artist id when the selection changes', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<ArtistSelect artists={FAKE_ARTISTS} selectedArtistId={null} onChange={onChange} />)

        const select = screen.getByLabelText<HTMLSelectElement>('Artist:')
        await user.selectOptions(select, 'Portishead')

        expect(onChange).toHaveBeenCalledTimes(1)
    })
})
