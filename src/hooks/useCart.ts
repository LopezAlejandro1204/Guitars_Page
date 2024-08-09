import {useState, useEffect, useMemo} from 'react'
import { db } from  '../data/db.ts'
//importando el type
import type {Guitar, CarItem } from '../types'
const useCart = () => {
    //revisando el carrito inicial
    const initialCart = () : CarItem []=>{
        const localStorageCart = localStorage.getItem('cart')
        if(localStorageCart){
            return JSON.parse(localStorageCart)
        }
        else{
            return []
        }
    }

    //State
    const [data] = useState(db) //State de la informacion
    const [cart, setCart] = useState(initialCart) //State del carrito de compras Lo pasamos como props

    const MAX_ITEMS = 5 //numeros maximos de elemntos del carrito
    const MIN_ITEMS = 1

    //cada que cart cambie se ejecuta funcion
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart)) //identificador, y lo que se almacena en STRING
    }, [cart])


    //Le mandamos el Type con su tipo de dato
    function addToCart(item : Guitar){
        //Esto itera sobre los items 
        const itemExists = cart.findIndex((guitar)=> guitar.id === item.id ) //Retorna -1 si no existe el elemento

        if (itemExists >= 0){
            if(cart[itemExists].quantity <MAX_ITEMS){
                const updatedCart = [...cart] //Agarramos una copia para no mutarlo directaente
                updatedCart[itemExists].quantity++ //Agregamos la cantidad
                setCart(updatedCart) //Actualizamos con el set
            }
        }else{
            //Se castea para que no hay errores
            const newItem : CarItem = {...item, quantity : 1}
            setCart([...cart, newItem])
        }

        
    }

    function removeFromCart(id : Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))

    }

    function increaseQuantity(id : Guitar['id']){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return{
                    ...item, //mantenemos
                    quantity: item.quantity + 1 //incrementamos
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decrementQuantity(id : Guitar['id']){
        const updatedCart =  cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return{
                    ...item, //una copia
                    quantity: item.quantity - 1 //decrementar
                }
            }
            
            return item
            
        })
        setCart(updatedCart)
    }

    function clearCart(){
        console.log('Limpiando carrito')
        setCart([])
    }


    //State Derivado
    //useMemo sirve para no hacer un render completo del proyecto a no ser que cambie algun parametro en especifico
    //En este caso sera para cuando el carrito cambie, es decir solo se ejecuta cuando pasa el cambio en el carrito 
    const isEmpty = useMemo( () => cart.length === 0, [cart])

    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart] )
    //Los parametros usados son el total y el elemento, decimos qu ele total debe ser sumado por la multiplicacion
    //de la cantidad y del precio. luego el valor inicial es 0

    //retornamos las cosas del hook
    return {
        data: data,
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        decrementQuantity: decrementQuantity,
        increaseQuantity: increaseQuantity,
        clearCart: clearCart,
        isEmpty,
        cartTotal
    }
}

export {
    useCart
}