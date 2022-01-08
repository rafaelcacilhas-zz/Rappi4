import {
  SearchContainerStyle,
  RestauranteContainer,
  CategroysStyle,
}                         from "./HomeStyle";

import React              from "react";
import { useEffect}       from "react";
import { useContext}      from "react";
import { useHistory}      from "react-router-dom";


import { GlobalContext }  from "../../contexts/GlobalContext";
import Header             from "../../components/Header/Header";
import {goToDetails}      from '../../routes/coordinator';
import useProtectedPage   from "../../hooks/useProtectedPage";

import Box                from "@mui/material/Box";
import SearchIcon         from "@mui/icons-material/Search";
import Typography         from '@mui/material/Typography';
import TextField          from "@mui/material/TextField";
import Button             from '@mui/material/Button';


const Home = () => {
  useProtectedPage();

  const history = useHistory();


  const {
    form,
    onChange,
    getListOfRestaurants,
    choosedCategory,
    setChoosedCategory,
    foundRestaurants,
    serachInputOnFocus,
    setSerachInputOnFocus,
  } = useContext(GlobalContext);


  useEffect(() => {
    getListOfRestaurants(foundRestaurants);
  });

  const handlePrice = (number) => {
    return number.toFixed(2).replace(".", ",");
  };

  const renderCategories = () => {

    let objectOfCategories = [];

    for (let i = 0; i < foundRestaurants.length; i++){
      if (!objectOfCategories[foundRestaurants[i].category]) {
        objectOfCategories[foundRestaurants[i].category] = [];
        objectOfCategories[foundRestaurants[i].category].push(foundRestaurants[i].category);
      }
    }


    let newArray = Object.keys(objectOfCategories);
    return newArray.map((category) => {
      return (
        <Typography
          key={category}
          onClick={(event) => {
            event.stopPropagation();
            handleChooseCategory(category);
          }}
        >
          {category}
        </Typography>
      );
    });

  };

  const handleChooseCategory = (category) => {
    if (!choosedCategory || category !== choosedCategory) {
      setChoosedCategory(category);
    }
    if (choosedCategory === category) {
      setChoosedCategory("");
    }

  };

  const renderMain = () => {

    let restaurants =  foundRestaurants
      .filter( (restaurant) => {
        return restaurant.name
          .toLowerCase()
          .includes(form.searchInput.toLowerCase());
      })
      .filter(  (restaurant) => {
        if (
          restaurant.category === choosedCategory ||
          !choosedCategory ||
          form.searchInput
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((restaurant) => {
        return (    
          <RestauranteContainer
            key={restaurant.id}
          >

            <img alt="Restaurant" src={restaurant.logoUrl} />
            <Box sx={{ width: '90%'}} >
              <Button  style={{minWidth: '80vw', }} size = 'small' variant="text" onClick={() => { goToDetails(history, restaurant.id) }} > 
                <h3>{restaurant.name}</h3> 
              </Button>
            </Box>



            <div>
              <p>{restaurant.deliveryTime} min</p>
              <p>Frete R$ {handlePrice(restaurant.shipping)}</p>
            </div>
          </RestauranteContainer>
        );
      })

    return(
      <SearchContainerStyle
            onClick={() => {
              setSerachInputOnFocus(false);
            }}
          >

            <Header />

            <Box
              sx={{
                display:        "flex",
                flexDirection:  "column",
                marginTop:      '2vh',
                marginBottom:   '2vh',
              }}
              >


              <TextField
                label="Busca"
                type="text"
                variant="outlined"
                name={"searchInput"}
                placeholder={'Busca'}
                value={form.searchInput}
                onChange={(event) => {
                    setSerachInputOnFocus(!false);
                    onChange(event);
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSerachInputOnFocus(true);
                  }}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon /> 
                    ),
                  }}
              />


            </Box>


            <CategroysStyle>
              {renderCategories()}
            </CategroysStyle>

            {serachInputOnFocus && !form.searchInput ? (
                  <Typography color="primary.main" variant="body1"> 
                    Digite o nome do restaurante! 
                  </Typography>        ) : restaurants.length > 0 ? (
                restaurants
              ) : (
                <Typography color="primary.main" variant="body1"> 
                  Carregando...
                </Typography>
            )}

          <Box sx={{height: '10vh'}} ></Box>

      </SearchContainerStyle>
    )

  }

  return ( 
  
    <Box>
      
      {foundRestaurants? 
        (
          <Box>  
            { renderMain()  } 
          </Box>

        )
        :
        ( 
            <h1>
              carregando
            </h1> 
        )}

    </Box>
  );
};

export default Home;

