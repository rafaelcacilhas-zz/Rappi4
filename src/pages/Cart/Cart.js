import React            from "react";
import { useContext }   from "react";
import { useEffect }    from "react";
import {GlobalContext}  from "../../contexts/GlobalContext";

import Box              from '@mui/material/Box';
import Button           from '@mui/material/Button';
import Typography       from '@mui/material/Typography';
import Radio            from '@mui/material/Radio';
import RadioGroup       from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl      from '@mui/material/FormControl';

import CardContent      from '@mui/material/CardContent';
import CardMedia        from '@mui/material/CardMedia';
import Endereco         from '../../components/Endereco';
import useProtectedPage from "../../hooks/useProtectedPage";


const Cart = () => {
    useProtectedPage()



    const { carrinho, userAddress,getFullAddress,frete } = useContext(GlobalContext);
    let temCarrinho 
    carrinho? temCarrinho = true : temCarrinho = false

    let display = []

    display = carrinho.map( (item) => (
        <Box key = {item.id} sx={{ 
        marginTop:      '8px',
        marginBottom:   '8px',
        display:        'flex', 
        height:         '17vh', 
        width:          '90vw', 
        border:         '1px solid black',
        borderRadius:   '8px',
        borderColor:    'fundoCinza.contrastText',
        }}>




            <Box sx={{height: '17vh', width: '25vw'}} >
                <CardMedia
                    border-radius= '8px'
                    component="img"
                    image={item.photoUrl}
                    alt="comida"
                />
            </Box>

                <Box sx={{ 
                    height: '17vh',
                    width:  '65vw',
                }}>

                    <CardContent>

                            <Box sx={{
                                marginRight: '0px',
                                display:'flex',
                                width:'61vw', 
                                justifyContent:'space-between',
                            }}>

                                <Typography gutterBottom variant="body1" component="div" color='primary.main'>
                                    {item.name}
                                </Typography>

                                <Box sx={{
                                    marginTop: '-17px',
                                    width: '9vw',
                                    height: '5vh',
                                    border: '1px solid', 
                                    borderRadius: '8px',
                                    borderColor: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                
                                    }}> 

                                    <Typography gutterBottom variant="body1" component="div" color='primary.main'>
                                    {item.quantity}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>   
                            </Box>

                            <Box sx={{display:'flex', width:'230px', justifyContent:'space-between'}}>

                                    <Typography variant="body1" >
                                        R${item.price},00
                                    </Typography> 

                                    
                                    <Button variant = 'outlined' sx={{
                                        marginTop:      '18px', 
                                        marginRight:    '1px', 
                                        borderRadius:   '8px', 
                                        width:          '24vw', 
                                        height:         '5vh'
                                    }} > 

                                        <Typography variant='body1'>
                                            remover
                                        </Typography>
                                    </Button>                           
                            </Box>

                        </CardContent>


                </Box>
        </Box>

    
    
    
    
    )    )

    useEffect(() => {
        getFullAddress()
    })
    

    const calculaTotal = () => {
        let sub = 0

        for(let i=0; i< carrinho.length;i++){
            sub = sub + carrinho[i].quantity*carrinho[i].price 
        }
        return sub + frete
    }
    
    
    return (

        <Box 
        sx={{
            display:        'flex',
            marginRight:    '0px',
            marginBottom:   '16px',
            flexDirection:  'column',
            alignItems:     'center',
            bgcolor:        'primary.lighter',
            maxWidth:       '98.5vw',
            minHeight:      '110vh'
        }}>
    
            <Box
            sx={{
                marginTop:      '-2vh',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                width:          '100vw',
                height:         '64px',
                display:        'flex',
            }}>
                <Typography  color = "textPrimary" variant="h6"> 
                    Meu carrinho 
                </Typography> 
            </Box>


            <Box
            sx={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'flex-start',
                justifyContent: 'center',
                bgcolor:        "fundoCinza.main",
                width:          '100%',
                height:         '76px',
                paddingLeft:    '4.5vw',
            }}>
                <Typography color='fundoCinza.contrastText'>
                    Endereço de entrega
                </Typography>

                <Typography variant='bold'>
                    {userAddress? 
                    (userAddress.street? `${userAddress.street}, ${userAddress.number} - ${userAddress.neighbourhood}`: 'Carregando...')
                    : 'Carregando...'}   
                </Typography>
            </Box>

            <Box
            sx={{
                flexDirection:  'column',
                alignItems:     'center',
                width:          '100%',
                minHeight:      '42px',
                display:        'flex',
                marginTop:      '8px',
            }}>

                {temCarrinho?             
                (<Box> <Endereco /> {display}  </Box> ):
                <Typography  color = "textPrimary" variant="body1"> 
                    Carrinho vazio 
                </Typography>
                }





            </Box>

            <Box
            sx={{
                flexDirection:  'column',
                alignItems:     'flex-end',
                width:          '100%',
                height:         '18px',
                display:        'flex',
                marginRight:    '16px',
                marginBottom:   '18px',
                marginTop:      '33px',

            }}>
                <Typography  color = "textPrimary" variant="body1"> 
                    Frete R${frete},00
                </Typography>
            </Box>

            <Box
            sx={{
                justifyContent:     'space-between',
                width:          '100%',
                height:         '18px',
                display:        'flex',
            }}>
                <Box sx={{     marginLeft: '8px'}}>                
                    <Typography  color = "textPrimary" variant="body1"> 
                        SUBTOTAL 
                    </Typography>
                </Box>

                <Box sx={{       marginRight: '8px'}}>                
                    <Typography  color = "primary" variant="body1"> 
                        R${calculaTotal()},00 
                    </Typography>
                </Box>
            </Box>


            

            <Box
            sx={{
                flexDirection:  'column',
                alignItems:     'flex-start',
                width:          '92vw',
                height:         '20vh',
                display:        'flex',
                marginTop:      '24px',
            }}>

                
                <Typography  color = "textPrimary" variant="body1"> 
                    Forma de pagamento: 
                </Typography>

                <Box sx={{ 
                    marginBottom:'3px', 
                    width: 'inherit',  
                    height: '1px', 
                    border: '1px solid black'}}
                    >

                </Box>
                
                <FormControl component="fieldset">
                    <RadioGroup>
                        <FormControlLabel value="Dinheiro" control={<Radio />} label="Dinheiro" />
                        <FormControlLabel value="Cartão" control={<Radio />} label="Cartão" />
                    </RadioGroup>
                </FormControl>

            </Box>
            
            <Button style={{minWidth: '323px'}} variant='contained' color='primary'>
                <Typography variant='button'>    
                    Confirmar
                </Typography>
            </Button>

        </Box>
    );
};
    

export default Cart;
