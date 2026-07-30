import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FolderSelect } from '.'

import { FAKE_FOLDERS } from '@/app/test/mocks'

describe('renders', () => {
    test('one item per folder, with its name and count', () => {
        render(<FolderSelect folders={FAKE_FOLDERS} selectedFolderId={null} onSelect={() => { }} />)

        expect(screen.getByRole('button', { name: /All/ })).toBeDefined()
        expect(screen.getByRole('button', { name: /Vinyl/ })).toBeDefined()
        expect(screen.getByText('42')).toBeDefined()
        expect(screen.getByText('12')).toBeDefined()
    })

    test('marks the selected folder as current', () => {
        render(<FolderSelect folders={FAKE_FOLDERS} selectedFolderId={2} onSelect={() => { }} />)

        expect(screen.getByRole('button', { name: /Vinyl/ }).getAttribute('aria-current')).toBe('true')
        expect(screen.getByRole('button', { name: /All/ }).getAttribute('aria-current')).toBe('false')
    })
})

describe('interactivity', () => {
    test('calls onSelect with the folder id when a folder is clicked', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()
        render(<FolderSelect folders={FAKE_FOLDERS} selectedFolderId={null} onSelect={onSelect} />)

        await user.click(screen.getByRole('button', { name: /Vinyl/ }))

        expect(onSelect).toHaveBeenCalledWith(2)
    })
})
