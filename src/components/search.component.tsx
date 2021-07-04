import React, { useState, useEffect } from 'react'
import { Close } from '../lib/icons.component'
import { Skeleton } from '@material-ui/lab'
import { TextField, IconButton } from '@material-ui/core'

const Search = ({ properties }: any) => {
    const items:any = []
    // const [data, setData] = useState<string>()
    const [keyword, setKeyword] = useState<string>('')
    
    useEffect(() => {
        if(keyword) console.log('Currently Searching', keyword, 'Keywords')
    }, [keyword])

    if(keyword)
        for (let i=0; i<4; i++){
            items.push(<div className="m-10" key={i}>
                    <div className="large-card">
                        <Skeleton variant="circle" height={200} animation="wave" />
                        <div className="flex">
                            <span className="mt-10 w-70"><Skeleton variant="text" animation="wave" /></span>
                            <span className="w-40"><Skeleton variant="text" animation="wave" /></span>
                        </div>
                    </div>
                </div>)
        }

    const ClearQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setKeyword('')
        document.getElementById('search-query')?.focus()
    }

    return (
        <div className="m-10">
            <div className="flex">
                <TextField label="Search" variant="outlined" className="search" value={keyword} onChange={e => setKeyword(e.target.value)} id="search-query" />
                <IconButton className={(keyword ? null : 'none') + " close-btn"} style={{padding: '10px'}} onClick={ClearQuery}>{Close()}</IconButton>
            </div>
            <div className="mt-30 col-4" id="playlist">{items}</div>
        </div>
    )
}

export default Search