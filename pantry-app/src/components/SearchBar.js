import axios from 'axios';
import React, {useState} from 'react';
const KEY = process.env.REACT_APP_KEY

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        fetchData(search);
    };

    const fetchData = async (searchInput) => {
        console.log('Search Input:', searchInput);
        const URL = `https://www.themealdb.com/api/json/v2/${KEY}/filter.php?i=${searchInput}`;
        try {
            let response = await axios.get(URL)
            let data = response.data
            console.log(data);
            setResult(data);
        } catch (error) {
            console.log('---------------- ERROR ----------------');
            console.log(error);
        };
    };

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="search" />
                    <input type="text" name="search" value={search.value} onChange={handleInput} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
        
            <div>
                
            </div>

        </div>
    )
};


export default SearchBar;