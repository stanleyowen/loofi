import React, { useState, useEffect } from 'react'
import algoliasearch from 'algoliasearch'
import { Skeleton } from '@material-ui/lab'
import { Close } from '../lib/icons.component'
import { TextField, IconButton } from '@material-ui/core'

const Search = ({ properties }: any) => {
    const items: any = []
    const [data, setData] = useState<any>({
        isFetching: false,
        keyword: '',
        result: ''
    })
    const handleData = (a: string, b: any) => setData({ ...data, [a]: b })
    const client = algoliasearch(String(process.env.REACT_APP_ALGOLIA_ID), String(process.env.REACT_APP_ALGOLIA_API_KEY))
    useEffect(() => {
        setData({ ...data, isFetching: true})
        if(data.keyword) client.initIndex('music').search(data.keyword).then(({hits}) => setData({ ...data, isFetching: false, result: hits }))
    }, [data.keyword])

    if(data.keyword)
        if(!data || data.length === 0 && !data.isFetching)
            for(let i=0; i<4; i++) {
                items.push(
                    <div className="m-10" key={i}>
                        <div className="large-card">
                            <Skeleton variant="circle" height={200} animation="wave" />
                            <div className="flex">
                                <span className="mt-10 w-70"><Skeleton variant="text" animation="wave" /></span>
                                <span className="w-40"><Skeleton variant="text" animation="wave" /></span>
                            </div>
                        </div>
                    </div>
                )
            }
        else if (data.length > 0)
            data.map((music: any, index: any) => {
                items.push(
                    <div className="m-10" key={index}>
                        <a className="large-card" href={music.link}>
                            <img src={music.image} alt={music.title} />
                            <div className="flex">
                                <div className="m-auto w-70">
                                    <h3 className="mt-10">{music.title}</h3>
                                    <p className="author">{music.author}</p>
                                </div>
                                <button className="play-btn m-auto" id={(music.title+music.author).replace(/\s/g, "-")}></button>
                            </div>
                        </a>
                    </div>
                )
            })
        else if(!data.isFetching && data?.result?.length === 0) items.push(<div>No Results Found for <b>{data?.keyword}</b></div>)

    const ClearQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleData('keyowrd', '')
        document.getElementById('search-query')?.focus()
    }

    return (
        <div className="m-10">
            <div className="flex">
                <TextField label="Search" variant="outlined" className="search" value={data.keyword} onChange={e => handleData('keyword', e.target.value)} id="search-query" autoFocus />
                <IconButton className={(data.keyword ? null : 'none') + " close-btn"} style={{padding: '10px'}} onClick={ClearQuery}>{Close()}</IconButton>
            </div>
            <div className="mt-30 col-4" id="playlist">{items}</div>
        </div>
    )
}

export default Search