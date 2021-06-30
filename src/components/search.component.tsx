import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'

const Search = ({ properties }: any) => {
    const [keyword, setKeyword] = useState<string>('')

    useEffect(() => {
        if(keyword) console.log('Currently Searching', keyword, 'Keywords')
    }, [keyword])

    return (
        <div className="m-10">
            <TextField label="Search" variant="outlined" className="search" value={keyword} onChange={e => setKeyword(e.target.value)} />
        </div>
    )
}

export default Search