import React, { useState } from 'react'
import './search.scss'
import logo from '../assets/memes.png'
import loading from '../assets/loading.gif'
const Search = () => {
    const [input, SetInput] = useState('')
  return (
    <>
    <main className='search-bar'>
        <div className="image">
            <img src={logo} alt="logo" />
        </div>
        <div className="form__data">
            <form className='search'>
                <input type="text" placeholder='Search memes' onChange={(e) => SetInput(e.target.value)}/>
                <button>Search</button>
            </form>
            <div className={input.length >= 2 ? "search_data" : "blank"}>
                <img src={loading} alt="loading" />
            </div>
        </div>
        <div className="image">
            <img src={logo} alt="logo" />
        </div>
    </main>
    </>
  )
}

export default Search