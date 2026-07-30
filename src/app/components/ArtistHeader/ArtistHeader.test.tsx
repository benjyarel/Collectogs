import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ArtistHeader } from '.'

describe("renders", () => {
    test("the word 'Artist'", () => {
        render(<ArtistHeader artistName="Daft Punk" />)
        expect(screen.getByText("Artist")).toBeDefined()
    })

    test("the artist name", () => {
        render(<ArtistHeader artistName="Daft Punk" />)
        expect(screen.getByText("Daft Punk")).toBeDefined()
    })
})
