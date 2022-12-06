import React, {useState, useEffect} from 'react'
import {Box, Button, Stack, TextField, Typography} from '@mui/material'

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercise = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(`${baseUrl}/bodyPartList`, exerciseOptions);
      setBodyParts(['all', ...bodyPartsData])
    }

    fetchExercisesData();
  }, [])
  
  const baseUrl = "https://exercisedb.p.rapidapi.com/exercises";
  const handleSearch = async () => {
    if(search){
      const exerciseData = await fetchData(baseUrl, exerciseOptions);

      const searchExercises = exerciseData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search)
        || exercise.target.toLowerCase().includes(search)
        || exercise.equipment.toLowerCase().includes(search)
        || exercise.bodyPart.toLowerCase().includes(search)
      );
      
      setSearch('');
      setExercises(searchExercises);
    }

  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      p='20px'
      mt='37px'
    >
      <Typography
        fontWeight={700}
        sx={{fontSize: { lg: '44px', xs: '30px'}}}
        mb='50px'
        textAlign="center"
      >
        Awesome Exercises You Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
        sx={{
          input: {
            fontWeight: "700", 
            border: 'none', 
            BorderRadius: "4px"
          }, 
          width: {lg: '800px', xs: '350px'},
          backgroundColor: '#fff',
          borderRadius: '40px'
        }}
        type="text"
        height="76px"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        placeholder="Search Exercises"
        />
        <Button className='Search-btn'
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: 'none',
            width: {lg: '175px', xs: '80px'},
            fontSize: {lg: '20px', xs:'14px'},
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{position: 'relative', width: '100%', p: '20px'}}>
        <HorizontalScrollbar 
          data={bodyParts}
          bodyPart = {bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  )
}

export default SearchExercise