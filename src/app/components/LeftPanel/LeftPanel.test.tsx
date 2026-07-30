import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { LeftPanel } from '.'

import { FAKE_FOLDERS, FAKE_ARTISTS } from '@/app/test/mocks'

describe('renders', () => {
    test('the folder list and a loading message while artists are loading', () => {
        render(
            <LeftPanel
                folders={FAKE_FOLDERS}
                artists={[]}
                selectedFolderId={null}
                selectedArtistId={null}
                isLoading={true}
                onFolderSelect={() => { }}
                onArtistSelect={() => { }}
            />
        )

        expect(screen.getByRole('button', { name: /Vinyl/ })).toBeDefined()
        expect(screen.getByText('Loading artists…')).toBeDefined()
        expect(screen.queryByRole('button', { name: 'Radiohead' })).toBeNull()
    })

    test('the artist list once artists are loaded', () => {
        render(
            <LeftPanel
                folders={FAKE_FOLDERS}
                artists={FAKE_ARTISTS}
                selectedFolderId={null}
                selectedArtistId={null}
                isLoading={false}
                onFolderSelect={() => { }}
                onArtistSelect={() => { }}
            />
        )

        expect(screen.getByRole('button', { name: 'Radiohead' })).toBeDefined()
        expect(screen.queryByText('Loading artists…')).toBeNull()
    })
})

describe('interactivity', () => {
    test('forwards folder selection to onFolderSelect', async () => {
        const user = userEvent.setup()
        const onFolderSelect = vi.fn()
        render(
            <LeftPanel
                folders={FAKE_FOLDERS}
                artists={FAKE_ARTISTS}
                selectedFolderId={null}
                selectedArtistId={null}
                isLoading={false}
                onFolderSelect={onFolderSelect}
                onArtistSelect={() => { }}
            />
        )

        await user.click(screen.getByRole('button', { name: /Vinyl/ }))

        expect(onFolderSelect).toHaveBeenCalledWith(2)
    })

    test('forwards artist selection to onArtistSelect', async () => {
        const user = userEvent.setup()
        const onArtistSelect = vi.fn()
        render(
            <LeftPanel
                folders={FAKE_FOLDERS}
                artists={FAKE_ARTISTS}
                selectedFolderId={null}
                selectedArtistId={null}
                isLoading={false}
                onFolderSelect={() => { }}
                onArtistSelect={onArtistSelect}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Radiohead' }))

        expect(onArtistSelect).toHaveBeenCalledWith(10)
    })
})
