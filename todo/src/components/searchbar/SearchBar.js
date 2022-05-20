import React from 'react'
import '../searchbar/searchbar.css'


function SearchBar() {


    return (
        <div className='outer-box'>
            <form id="form" role="search">
                <input className='search-text' type="search" id="query" name="q"
                    placeholder="Search..."
                    aria-label="Search through site content" />
                <button>Search</button>
            </form>
        </div>
    )
}
export default SearchBar
