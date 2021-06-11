import React, {useState, useEffect} from "react";


const Search = (props) => {
  console.log('Search Page Props: ', props)
  const data = props.history.location.state
  console.log('SEARCH PAGE DATA >>>> ', data);

  const [result, setResult] = useState('');
  
  useEffect(() => {
    setResult(data);
  }, [data]);

  const searchList = data.map((item, index) => {
    return <ul key={index}>{item.strMeal}</ul>
  })

  return (
    <div>
      <p>Search Results Page</p>
      {searchList}
    </div>
  );
};

export default Search;