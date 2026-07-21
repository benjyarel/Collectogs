import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LeftPanel } from '.'

const FAKE_FOLDERS = [
    { id: 1, name: 'All', count: 42, resource_url: 'https://fake-api.com/folders/1' },
]

const FAKE_ARTISTS = [
    { id: 10, name: 'Radiohead' },
]

describe('renders', () => {
    test('the folder select and a loading message while artists are loading', () => {
        render(
            <LeftPanel
                folders={FAKE_FOLDERS}
                artists={[]}
                selectedArtistId={null}
                isLoading={true}
                onFolderChange={() => { }}
                onArtistSelect={() => { }}
            />
        )

        expect(screen.getByLabelText('Folder:')).toBeDefined()
        expect(screen.getByText('Loading artists…')).toBeDefined()
        expect(screen.queryByLabelText('Artist:')).toBeNull()
    })

    test('the artist select once artists are loaded', () => {
        render(
            <LeftPanel
                folders={FAKE_FOLDERS}
                artists={FAKE_ARTISTS}
                selectedArtistId={null}
                isLoading={false}
                onFolderChange={() => { }}
                onArtistSelect={() => { }}
            />
        )

        expect(screen.getByLabelText('Artist:')).toBeDefined()
        expect(screen.queryByText('Loading artists…')).toBeNull()
    })
})

describe('interactivity', () => {
    test('forwards folder selection to onFolderChange', async () => {
        const user = userEvent.setup()
        const onFolderChange = vi.fn()
        render(
            <LeftPanel
                folders={FAKE_FOLDERS}
                artists={FAKE_ARTISTS}
                selectedArtistId={null}
                isLoading={false}
                onFolderChange={onFolderChange}
                onArtistSelect={() => { }}
            />
        )

        await user.selectOptions(screen.getByLabelText<HTMLSelectElement>('Folder:'), 'All (42)')

        expect(onFolderChange).toHaveBeenCalledTimes(1)
    })

    test('forwards artist selection to onArtistSelect', async () => {
        const user = userEvent.setup()
        const onArtistSelect = vi.fn()
        render(
            <LeftPanel
                folders={FAKE_FOLDERS}
                artists={FAKE_ARTISTS}
                selectedArtistId={null}
                isLoading={false}
                onFolderChange={() => { }}
                onArtistSelect={onArtistSelect}
            />
        )

        await user.selectOptions(screen.getByLabelText<HTMLSelectElement>('Artist:'), 'Radiohead')

        expect(onArtistSelect).toHaveBeenCalledTimes(1)
    })
})
