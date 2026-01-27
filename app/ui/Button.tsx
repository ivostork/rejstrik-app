'use client'

import React, { useState } from 'react'
import { GovButton } from '@gov-design-system-ce/react'

type Props = {}

export default function Button({ }: Props) {
    const [clicks, setClicks] = useState<number>(0)

    function handleEvent(ev: React.MouseEvent<HTMLButtonElement>): void {
        // preventDefault not needed for a normal button click
        setClicks(c => c + 1)
    }

    return (
        <>
            <GovButton color='primary' type='solid' size='m' onClick={handleEvent}>
                Click me: {clicks}
            </GovButton>

            <span
                aria-live='polite'
                style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                    clip: 'rect(0 0 0 0)',
                    whiteSpace: 'nowrap'
                }}
            >
                {clicks} clicks
            </span>
        </>
    )
}