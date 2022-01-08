import axios from "axios";
import React, { useEffect, useContext } from "react";
import {
  RestaurantDetailsStyle,
  RestauranteContainer,
  ElementContainer,
} from "./RestaurantDetailsStyle";

import Header             from "../../components/Header/Header";
import useProtectedPage   from "../../hooks/useProtectedPage"
import { GlobalContext }  from "../../contexts/GlobalContext";
import {useParams}        from "react-router-dom";

import Box                from "@mui/material/Box";
import Button             from '@mui/material/Button';







const RestaurantDetails = () => {
  let pathParams  = useParams();
  let  id         = pathParams.id;



  const {choosedRestaurant, setChoosedRestaurant, newArray, setNewArray, category, setCategory, quantity, carrinho, setCarrinho,  
setFrete} = useContext(GlobalContext);


  useProtectedPage()




  const addItensToCart = (item, entrega) =>{

    let temItem = false
    let itemIndex 
    let temp
    setFrete(entrega)


    if(carrinho.length === 0) {

  
  
      if(temItem === false ){
        carrinho.push({...item,   restaurantId: pathParams.id, quantity: 1})
      }

    } 
    
    else if(carrinho.length > 0) {

        for (let i = 0; i < carrinho.length ; i++) {

          if(carrinho[i].id === item.id){
            temItem = true
            itemIndex = i
          }

        }

      if(temItem === true) {
        temp = carrinho
        temp[itemIndex].quantity = temp[itemIndex].quantity + 1
        setCarrinho( temp )
      }

      if(temItem === false) {
        carrinho.push({...item, restaurantId: pathParams.id, quantity: 1})
      }



      console.log('deu')


  }
    




  
  
  }

  const renderCategorys = () => {
    if(category !== false) {
    return category.map((categoryName) => {
      return (

        <Box sx={{width: '90vw'}}>
          <h2>{categoryName}</h2>


          {newArray? 
          newArray[categoryName].map((item) => {
            return (
              <ElementContainer key={ `${item.id}${categoryName}`  }>

                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  height: '15vh',
                  minWidth: '100%',
                }}>

                  <Box>
                    <img alt="Comida" src={item.photoUrl} />
                  </Box>


                  <Box>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>R$ {handlePrice(item.price)}</p>
                  </Box>


                  <Box >
                    {item.quantity ? (
                      <span> {quantity} </span>
                    ) : (
                      <span style={{ display: "none" }}></span>
                    )}
                    {quantity ? (
                      <span style={{ borderColor: "red", color: "red" }}>
                        <Button size ='small'> remover </Button>
                      </span>
                    ) : (
                      <span>
                        <Button onClick={() => addItensToCart(item, choosedRestaurant[0].shipping)  } size ='small'> adicionar </Button>
                      </span>
                    )}
                  </Box>

                </Box>

              </ElementContainer>
            );
          }) : 'carregando'}
        </Box>

      );
    });
  }
  };

  const handlePrice = (number) =>{
    return number.toFixed(2).replace('.', ',')
  }


  const getDetails = async () => {

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `https://us-central1-missao-newton.cloudfunctions.net/rappi4B/restaurants/${id}`,
        {
          headers: {
            auth: token,
            "Content-Type": "application/json",
          },
        }
      );

      setChoosedRestaurant([response.data.restaurant]);
      var newArray = [];

      for (let i = 0; i < response.data.restaurant.products.length; i++) {
        let category = response.data.restaurant.products[i].category;
        if (!newArray[category]) {
          newArray[category] = [];
        }
        newArray[category].push(response.data.restaurant.products[i]);
      }
      setNewArray(newArray);
      let categorys = Object.keys(newArray);
      setCategory(categorys);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getDetails();
  },);




  return (
    <RestaurantDetailsStyle>
      <Header />
      {choosedRestaurant && newArray && category ? (
        <RestauranteContainer>
          <img alt="logo do restaurante escolhido" src={choosedRestaurant[0].logoUrl} />
          <h3>{choosedRestaurant[0].name}</h3>
          <p>{choosedRestaurant[0].category}</p>
          <div>
            <p>{choosedRestaurant[0].deliveryTime} min</p>
            <p>Frete R${choosedRestaurant[0].shipping},00</p>
          </div>
          <p>{choosedRestaurant[0].address}</p>
        </RestauranteContainer>
      ) : (
        <h1>Carregando...</h1>
      )}

      {choosedRestaurant && newArray && category ? 
      renderCategorys() : null}


      
    <Box sx={{height: '10vh'}} >
    </Box>
    </RestaurantDetailsStyle>

  )
}

export default RestaurantDetails


