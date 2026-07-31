import { Suspense } from 'react'

import { expect, test, describe } from 'vitest'
import { act, render, screen } from '@testing-library/react'

import { Content } from '.'

import { FAKE_RELEASES } from '@/app/test/mocks'

import { Release } from '@/app/types'

const buildEmptyArtistReleases = () => Promise.resolve({ success: true, releases: [] })

const renderContent = async (props: Parameters<typeof Content>[0]) =>
    act(async () => {
        render(
            <Suspense fallback="loading">
                <Content {...props} />
            </Suspense>,
        )
    })

describe('renders', () => {
    test('a placeholder message when there are no releases', async () => {
        await renderContent({ releases: [], allReleasesPromise: buildEmptyArtistReleases() })

        expect(await screen.findByText('Select a folder to see its albums.')).toBeDefined()
    })

    test(' a release, with its title and year', async () => {
        await renderContent({ releases: FAKE_RELEASES, allReleasesPromise: buildEmptyArtistReleases() })

        expect(await screen.findByText('OK Computer')).toBeDefined()
        expect(screen.getByText('1997')).toBeDefined()
    })

    test('an "Uncategorized" section for releases without a master', async () => {
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

        await renderContent({ releases: [...FAKE_RELEASES, uncategorizedRelease], allReleasesPromise: buildEmptyArtistReleases() })

        expect(await screen.findByText('Uncategorized')).toBeDefined()
        expect(screen.getByText('Some Bootleg')).toBeDefined()
        expect(screen.getByText('1975')).toBeDefined()
    })
})