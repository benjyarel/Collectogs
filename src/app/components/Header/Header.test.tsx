import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '.'
import { FAKE_USER } from '@/app/test/mocks'

describe("renders", () => {
    test("the logo", () => {
        render(<Header discogUser={FAKE_USER} />)
        expect(screen.getByText("Collectogs")).toBeDefined()
    })

    test('the avatar if the user is logged in', () => {
        render(<Header discogUser={FAKE_USER} />)
        expect(screen.getByAltText("user avatar")).toBeDefined()
    })

    test("the login button, if user is not authentified", () => {
        render(<Header />)
        expect(screen.getByRole("button")).toBeDefined()
    })
})