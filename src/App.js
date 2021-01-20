import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import Recipe from './Recipe';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    margin: '10px auto',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));


function App() {
  const classes = useStyles();
  const APP_ID ="8d85d133";
  const APP_KEY ="a93bc110119f9a485124b638c65fb128";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('banana');
  useEffect(() =>{
    getRecipe();
  },[query]);
  const getRecipe = async() =>{
    const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  }

  const updateSearch = (e) =>{
    setSearch(e.target.value)
  }
 const updateQuery =(e) =>{
   e.preventDefault();
   setQuery(search);
   setSearch("")
 }
  return (
    <div className="App">
    <Paper onSubmit={updateQuery} component="form" className={classes.root}>
      <InputBase
        type="text"
        value={search}
        onChange={updateSearch}
        className={classes.input}
        placeholder="Search Recipes"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>

    <div style={{margin:'15px'}}>
      <Grid container>
        {recipes.map((recipe) =>(
          <Grid item xs={3} >
            <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          </Grid>
        ))}
      </Grid>
      </div>
    </div>
  );
}

export default App;
