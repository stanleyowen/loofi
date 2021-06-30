import React, { useState, useEffect } from 'react'
import { Skeleton } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

const Search = ({ properties }: any) => {
    const [data, setData] = useState<string>()
    const [keyword, setKeyword] = useState<string>('')
    
    useEffect(() => {
        if(keyword) console.log('Currently Searching', keyword, 'Keywords')
    }, [keyword])

    function searchData() {
        return data ? 'data' : 
            (<div className="m-10">
                <a className="large-card">
                    <Skeleton variant="circle" height={200} animation="wave" />
                    <div className="flex">
                        <span className="mt-10 w-70"><Skeleton variant="text" animation="wave" /></span>
                        <span className="w-40"><Skeleton variant="text" animation="wave" /></span>
                    </div>
                </a>
            </div>)
    }

    return (
        <div className="m-10">
            <TextField label="Search" variant="outlined" className="search" value={keyword} onChange={e => setKeyword(e.target.value)} />
            <div className="mt-30 col-4" id="playlist">{keyword ? searchData() : null}</div>
        </div>
    )
}

export default Search