import React, { useState, useEffect } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Close } from '../lib/icons.component'
import { TextField, IconButton } from '@material-ui/core'

const Search = ({ songData }: any) => {
    const items: any = []
    const [results, setResult] = useState<any>([])
    const [keyword, setKeyword] = useState<string>('')
    const [isFetching, setFetching] = useState<boolean>(false)

    useEffect(() => {
        if(keyword) {
            setFetching(true)
            var result: any = []
            for (let i=0; i<songData.length; i++) {
                if(String(songData[i].title).toLowerCase().includes(keyword) || String(songData[i].author).toLowerCase().includes(keyword)) result.push(songData[i])
            }
            setResult(result)
            setFetching(false)
        }
    }, [keyword]) // eslint-disable-line

    if(keyword) {
        if(isFetching)
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
        else if (results?.length > 0)
            results.map((music: any, index: any) => {
                return items.push(
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
        else if(!isFetching && results?.length === 0) items.push(<div>No Results Found for <b>{keyword}</b></div>)
    }

    const ClearQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setKeyword('')
        document.getElementById('search-query')?.focus()
    }

    return (
        <div className="m-10">
            <div className="flex">
                <TextField label="Search" variant="outlined" className="search" value={keyword} onChange={e => setKeyword(e.target.value)} id="search-query" autoFocus />
                <IconButton className={(keyword ? null : 'none') + " p-10 close-btn"} onClick={ClearQuery}>{Close()}</IconButton>
            </div>
            <div className="mt-30 col-4" id="playlist">{items}</div>
        </div>
    )
}

export default Search