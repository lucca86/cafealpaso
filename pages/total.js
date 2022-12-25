import { useCallback, useEffect } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";


export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

    const ComprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    }, [pedido, nombre])
    
    useEffect(() => {
      ComprobarPedido()
    }, [pedido, ComprobarPedido])
    
    


    return (
        <Layout
            pagina='Total y Confirmar pedido'
        >
            <h1 className="text-4xl font-black">Total y Confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form 
                onSubmit={colocarOrden}
            > 
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold ">Nombre</label>
                    <input 
                        type="text" 
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        id="nombre" 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: {''} <span className='font-bold'>{formatearDinero(total)}</span></p>
                </div>
                <div className="mt-5">
                    <input 
                        className={`${ComprobarPedido() ? 'bg-indigo-300 text-blue-800' : 'bg-indigo-600 hover:bg-indigo-800 '}text-center cursor-pointer w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white `}
                        type="submit" 
                        name="" 
                        value="Confirmar Pedido" 
                        disabled={ComprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}