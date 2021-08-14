import React, { useState, useEffect } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Close } from '../lib/icons.component'
import { TextField, IconButton } from '@material-ui/core'
import algoliasearch from 'algoliasearch'

const Search = ({ properties }: any) => {
    const items: any = []
    const [data, setData] = useState<any>()
    const [keyword, setKeyword] = useState<string>('')

    const client = algoliasearch(String(process.env.REACT_APP_ALGOLIA_ID), String(process.env.REACT_APP_ALGOLIA_API_KEY))
    useEffect(() => {
        if(keyword) client.initIndex('music').search(keyword).then(({hits}) => console.log(hits))
    }, [keyword])

    // if(keyword)
    //     if(!data || data.length === 0)
    //         for(let i=0; i<4; i++) {
    //             items.push(
    //                 <div className="m-10" key={i}>
    //                     <div className="large-card">
    //                         <Skeleton variant="circle" height={200} animation="wave" />
    //                         <div className="flex">
    //                             <span className="mt-10 w-70"><Skeleton variant="text" animation="wave" /></span>
    //                             <span className="w-40"><Skeleton variant="text" animation="wave" /></span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )
    //         }
    //     else data.map((music: any, index: any) => {
    //         items.push(
    //             <div className="m-10" key={index}>
    //                 <a className="card flex" href={music.link}>
    //                     <img src={music.image} alt={music.title} />
    //                     <p className="m-auto w-50">{music.title}</p>
    //                     <button className="play-btn m-auto" id={(music.title+music.author).replace(/\s/g, "-")}></button>
    //                 </a>
    //             </div>
    //         )
    //     })
    // console.log(data)

    const ClearQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setKeyword('')
        document.getElementById('search-query')?.focus()
    }

    return (
        <div className="m-10">
            <div className="flex">
                <TextField label="Search" variant="outlined" className="search" value={keyword} onChange={e => setKeyword(e.target.value)} id="search-query" autoFocus />
                <IconButton className={(keyword ? null : 'none') + " close-btn"} style={{padding: '10px'}} onClick={ClearQuery}>{Close()}</IconButton>
            </div>
            <div className="mt-30 col-4" id="playlist">{items}</div>
        </div>
    )
}

export default Search