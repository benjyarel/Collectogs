import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FolderSelect } from '.'

import { FAKE_FOLDERS } from '@/app/test/mocks'

describe('renders', () => {
    test('a placeholder option, disabled and selected by default', () => {
        render(<FolderSelect folders={FAKE_FOLDERS} onChange={() => { }} />)

        const placeholder = screen.getByText<HTMLOptionElement>('Select a folder')
        const select = screen.getByLabelText<HTMLSelectElement>('Folder:')
        expect(placeholder.disabled).toBe(true)
        expect(select.value).toBe('')
    })

    test('one option per folder, with its name and count', () => {
        render(<FolderSelect folders={FAKE_FOLDERS} onChange={() => { }} />)

        expect(screen.getByText('All (42)')).toBeDefined()
        expect(screen.getByText('Vinyl (12)')).toBeDefined()
    })
})

describe('interactivity', () => {
    test('calls onChange with the selected folder id when the selection changes', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<FolderSelect folders={FAKE_FOLDERS} onChange={onChange} />)

        const select = screen.getByLabelText<HTMLSelectElement>('Folder:')
        await user.selectOptions(select, 'Vinyl (12)')

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(select.value).toBe('2')
    })
})
