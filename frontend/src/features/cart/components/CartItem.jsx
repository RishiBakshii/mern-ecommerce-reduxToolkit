import { Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from '../CartSlice';

export const CartItem = ({id,thumbnail,title,category,brand,price,quantity,stockQuantity}) => {


    const dispatch=useDispatch()

    const handleAddQty=()=>{
        const update={_id:id,quantity:quantity+1}
        dispatch(updateCartItemByIdAsync(update))
    }
    const handleRemoveQty=()=>{
        if(quantity===1){
            dispatch(deleteCartItemByIdAsync(id))
        }
        else{
            const update={_id:id,quantity:quantity-1}
            dispatch(updateCartItemByIdAsync(update))
        }
    }

    const handleProductRemove=()=>{
        dispatch(deleteCartItemByIdAsync(id))
    }


  return (
    <Stack mt={1}  p={2} flexDirection={'row'} width={'100%'} component={Paper} justifyContent={'space-between'} alignItems={'center'}>
        
        {/* image and details */}
        <Stack  flexDirection={'row'} alignItems={'center'} columnGap={2}>

            <Stack  width={'200px'} height={'200px'}>
                <img style={{height:"100%",objectFit:'contain'}} src={thumbnail} alt={`${title} image unavailabe`} />
            </Stack>

            <Stack>
                <Typography variant='h6' fontWeight={500}>{title}</Typography>
                <Typography variant='body2' color={'text.secondary'}>{brand}</Typography>
                <Typography mt={1}>Quantity</Typography>
                <Stack flexDirection={'row'} alignItems={'center'}>
                    <IconButton onClick={handleRemoveQty}><RemoveIcon fontSize='small'/></IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton onClick={handleAddQty}><AddIcon fontSize='small'/></IconButton>
                </Stack>
            </Stack>
        </Stack>

        {/* price and remove button */}
        <Stack  justifyContent={'space-evenly'} height={'100%'} alignItems={'flex-end'}>
            <Typography variant='body2'>${price}</Typography>
            <Button onClick={handleProductRemove} variant='contained'>Remove</Button>
        </Stack>
    </Stack>
  )
}
