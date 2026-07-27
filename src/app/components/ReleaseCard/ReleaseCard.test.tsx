import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReleaseCard } from '.'
import { FAKE_RELEASES } from '@/app/test/mocks'
import { Release } from '@/app/types'

describe('renders', () => {
    test('the release title', () => {
        render(<ReleaseCard release={FAKE_RELEASES[0]} />)
        expect(screen.getByText('OK Computer')).toBeDefined()
    })

    test('the release year', () => {
        render(<ReleaseCard release={FAKE_RELEASES[0]} />)
        expect(screen.getByText('1997')).toBeDefined()
    })

    test('the cover image with an alt text based on the title', () => {
        render(<ReleaseCard release={FAKE_RELEASES[0]} />)
        expect(screen.getByAltText('cover picture of album OK Computer')).toBeDefined()
    })

    test('no year when the release has none', () => {
        const releaseWithoutYear: Release = { ...FAKE_RELEASES[0], year: 0 }
        render(<ReleaseCard release={releaseWithoutYear} />)
        expect(screen.queryByText('0')).toBeNull()
    })
})
