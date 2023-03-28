import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY
import DATA from "/data.json"

function App() {
  const [list, setList] = useState(null)
  const [newList, setNewList] = useState(list)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState('')
  const [averageId, setAverageId] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [cuisine, setCuisine] = useState('')
  const [diet, setDiet] = useState('')

  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=25&cuisine=${cuisine}&diet=${diet}`)
      const json = await response.json()
      // const json = DATA
      // console.log()
      setTotalResults(json && json.totalResults)
      setList(json && Object.entries(json.results))
      setNewList(json && Object.entries(json.results))
      // handleTitleSearch()
    }
    fetchRecipeData().catch(console.error)
  }, [cuisine, diet])
  // if (list) {
  //   // Object.entries(list.results).map((recipe) => console.log(recipe))
  //   console.log(totalResults)
  //   // console.log(list.results[1].title)
  // }
  let sum = 0

  const handleTitleSearch = () => {
    // setSearch(value)
    setNewList(list && list.filter((recipe) => {
      return recipe[1].title.toLowerCase().includes(search.toLowerCase())
    }))
    // console.log(list)
  }
  // if (list) {
  //   console.log(recipe[1].title)
  // }
  
  const handleIDSearch = () => {
    setNewList(list && list.filter((recipe) => {
      return recipe[1].id.toString().includes(search.toString())
    }))
    console.log(newList)
  }

  const handleAverageId = () => {
    {newList && newList.map((recipe) => {
      return sum += recipe[1].id
    })}
    return sum / (newList && newList.length)
  }
  
  return (
    <div className="App">
      {/* <div>{API_KEY}</div> */}
      <h1>My Recipe List</h1>
      <div className='dashboard'>
        <div className='card'>
          <h5>Number of recipes displayed</h5>
          <div>{newList && newList.length}</div>
        </div>
        <div className='card'>
          <h5>Total number of recipes retrieved</h5>
          <div>{totalResults}</div>
        </div>
        <div className='card'>
          <h5>Average ID</h5>
          {newList && newList.map((recipe) => {
            sum += recipe[1].id
          })}
          <div> {sum / (newList && newList.length)} </div>
        </div>
      </div>
      <div>
        <input value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className='search-button' onClick={() => {
          handleTitleSearch();
          handleAverageId();
        }}>Search by title</button>
        <button className='search-button' onClick={() => {
          handleIDSearch();
          handleAverageId();
        }}>Search by ID</button>
      </div>
      <div className='filters'>
        <div>Filter API Call</div>
        <div className='filter-1'>
          <div>{`Cuisine: ${cuisine}`}</div>
          <div className='options'>
            <button onClick={() => setCuisine('Italian')}>Italian</button>
            <button onClick={() => setCuisine('Mediterranean')}>Mediterranean</button>
            <button onClick={() => setCuisine('American')}>American</button>
            <button onClick={() => setCuisine('')}>Reset</button>
          </div>
        </div>
        <div className='filter-2'>
          <div>{`Diet: ${diet}`}</div>
          <div className='options'>
            <button onClick={() => setDiet('Vegetarian')}>Vegetarian</button>
            <button onClick={() => setDiet('Vegan')}>Vegan</button>
            <button onClick={() => setDiet('')}>Reset</button>
          </div>
        </div>
        {/* <button>Call New Results</button> */}
      </div>
      <div className="whole-page">
        <div className='header'>
          <div className='col-1'>Image</div>
          <div className='col-2'>Title</div>
          <div className='col-3'>ID</div>
        </div>
        <div className='column'>
          {newList && newList.map((recipe) =>
            <div className='row'>
              <img key={recipe[1].id} src={recipe[1].image} className='col-1'/>
              <div className='titles col-2'>{recipe[1].title}</div>
              <div className='col-3'>{recipe[1].id}</div>
            </div>
          )} 
        </div>
        {/* <div className='column'> 
          <div className='header row'>Title</div>
        </div> */}
      </div>
    </div>
  )
}

export default App
