import React, { useEffect, useState } from 'react';
import { Router } from './Router';
import { setAccessToken } from './accessToken';

export const App: React.FC = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:4000/refresh_token", {
            credentials: 'include',
            method: 'POST'
        }).then(async response => {
            const { accessToken } = await response.json()
            setAccessToken(accessToken)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div><Router /></div>
    )
}
