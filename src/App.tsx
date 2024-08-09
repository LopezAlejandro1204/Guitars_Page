

import Header from "./Components/Header.tsx"
import Guitar from "./Components/Guitar.tsx"

//Importamos nuestro hook
import { useCart } from './hooks/useCart.ts'

function App() {

    const  {data, cart, addToCart, removeFromCart ,decrementQuantity, increaseQuantity, clearCart, isEmpty, cartTotal} = useCart()


    return (
        <>
            <Header 
                cart={cart} //El prop lo pasamos
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decrementQuantity={decrementQuantity}
                clearCart = {clearCart}
                isEmpty = {isEmpty}
                cartTotal = {cartTotal}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {/* Aqui se itera para la cantidad de elementos obtenidos */}
                    {data.map((guitar)=>{
                        return(
                            <Guitar     
                                key ={guitar.id}
                                guitar={guitar}               
                            
                                addToCart={addToCart}
                            />
                        )
                    })}

                    

                    
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>

        </>
    )
}

export default App
