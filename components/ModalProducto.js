import Image from "next/image"
import { useEffect, useState } from "react"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const ModalProducto = () => {

    const { producto, handleChangeModal, handlerAgregarPedido, pedido } = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)


    useEffect(() => {
        //Comprobar si el Modal actual está en el pedido
        if(pedido.some((pedidoState) => pedidoState.id === producto.id)) {

            const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)

            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
        } 
      
    }, [producto, pedido])
    



    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <Image
                    width={300}
                    height={400}
                    alt={`imagen producto ${producto.nombre}`}
                    src={`/assets/img/${producto.imagen}.jpg`}
                />
            </div>
            <div className="md:w-2/3">
                <div className="text-3xl font-bold mt-5">
                    <div className="flex justify-end">
                        <button
                            onClick={handleChangeModal}
                        >
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                >
                                </path>
                            </svg>
                        </button>
                    </div>
                    <h1>{producto.nombre}</h1>
                    <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(producto.precio)}</p>
                    <div className="flex gap-4 mt-5">
                        <button 
                            type='button'
                            onClick={() => {
                                if(cantidad <= 1) return
                                setCantidad(cantidad -1)
                            }}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={2} 
                                stroke="currentColor" 
                                className="w-7 h-7"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>

                        </button>

                            <p className="text-3xl">{cantidad}</p>

                        <button
                            type='button'
                            onClick={() => {
                                if(cantidad >= 5) return
                                setCantidad(cantidad +1)
                            }}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={2} 
                                stroke="currentColor" 
                                className="w-7 h-7"
                            >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                            </svg>


                        </button>
                    </div>
                    <button
                        onClick={() => handlerAgregarPedido({...producto, cantidad})} 
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white uppercase rounded text-xl w-full"
                    >
                        {edicion ? 'Guardar Cambios' : 'agregar al pedido'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalProducto