import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { Button } from '@mui/material'

const About = ({ config }: any) => {
    useEffect(() => {
        initializeApp({
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_DB_URL,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_SENDER_ID,
            appId: process.env.REACT_APP_ID,
            measurementId: process.env.REACT_APP_MEASUREMENT_ID
        })
        const auth = getAuth()
        getRedirectResult(auth)
        .then((result) => {
            if(result) console.log(result, GoogleAuthProvider.credentialFromResult(result))
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="bg-white container p-10 rounded-corner">
            <h3>Loofi Dashboard</h3>
            <Button
                variant="outlined"
                onClick={() => {
                    signInWithRedirect(getAuth(), new GoogleAuthProvider())
                }
            }>
                Sign in with Google
            </Button>
        </div>
    )
}

export default About