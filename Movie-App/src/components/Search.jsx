import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    
        <div className="search">
            <div>
            
            <img src='search.svg' alt='Search'></img>

            <input
            type='text'
            placeholder='Search for Shows and Movies'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            />
             {searchTerm}

             </div>
        </div>
       
    
  )
}

export default Search