//importamos el TYpe
import type { Guitar } from "../types"

//Le damos un tipo de dato de GUITAR - por parte del addToCart es una FUNCION que es Guitar pero que no retorna nada
type GuitarProps = {
    guitar : Guitar, 
    addToCart : (item: Guitar) => void
}

function Guitar({guitar, addToCart} : GuitarProps){ //Se hace destructuring al props

    const {name,image, price, description} = guitar //Segundo destructurin
    
    return(
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>${description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    //Mandamos la guitarra que estamos presionndo
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}

export default Guitar
