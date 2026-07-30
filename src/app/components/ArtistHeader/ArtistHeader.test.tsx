import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ArtistHeader } from '.'

describe("renders", () => {
    test("the word 'Artist'", () => {
        render(<ArtistHeader artistName="Daft Punk" ownedReleases={0} totalRelease={0} />)
        expect(screen.getByText("Artist")).toBeDefined()
    })

    test("the artist name", () => {
        render(<ArtistHeader artistName="Daft Punk" ownedReleases={0} totalRelease={0} />)
        expect(screen.getByText("Daft Punk")).toBeDefined()
    })

    test("the collection progress when the total is known", () => {
        render(<ArtistHeader artistName="Daft Punk" ownedReleases={4} totalRelease={6} />)
        expect(screen.getByText("4 of 6 albums in your collection")).toBeDefined()
    })

    test("no collection progress when the total is not known yet", () => {
        render(<ArtistHeader artistName="Daft Punk" ownedReleases={0} totalRelease={0} />)
        expect(screen.queryByText(/in your collection/)).toBeNull()
    })
})
