import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '.'

const FAKE_USER = Object.freeze({ id: 0, username: "toto", resource_url: 'https://toto.fr', consumer_name: "Collectogs" })

describe("renders", () => {
    test("the logo", () => {
        render(<Header discogUser={FAKE_USER} />)
        expect(screen.getByText("Collectogs")).toBeDefined()
    })

    test('the avatar if the user is logged in', () => {
        render(<Header discogUser={FAKE_USER} />)
        expect(screen.getByAltText("username avatar")).toBeDefined()
    })

    test("the login button, if user is not authentified", () => {
        render(<Header discogUser={null} />)
        expect(screen.getByRole("button")).toBeDefined()
    })
})