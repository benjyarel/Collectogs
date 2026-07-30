import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import { CollectionProgress } from '.'

import styles from './CollectionProgress.module.css'

describe('renders', () => {
    test('the owned and total album counts', () => {
        render(<CollectionProgress owned={12} total={18} />)

        expect(screen.getByText('12 of 18 albums in your collection')).toBeDefined()
    })

    test('the singular form when there is only one album total', () => {
        render(<CollectionProgress owned={1} total={1} />)

        expect(screen.getByText('1 of 1 album in your collection')).toBeDefined()
    })

    test('a progress bar reflecting the owned and total values', () => {
        render(<CollectionProgress owned={12} total={18} />)

        const progress = screen.getByRole('progressbar') as HTMLProgressElement
        expect(progress.value).toBe(12)
        expect(progress.max).toBe(18)
    })

    test('a visual fill matching the completion percentage', () => {
        const { container } = render(<CollectionProgress owned={9} total={12} />)

        const fill = container.querySelector<HTMLDivElement>(`.${styles.fill}`)
        expect(fill?.style.width).toBe('75%')
    })
})
