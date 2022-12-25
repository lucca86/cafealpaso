import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        try {
            const { data } = await axios('/api/categorias')
            setCategorias(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      obtenerCategorias()
    }, [])

    useEffect(() => {
      setCategoriaActual(categorias[0])
    }, [categorias])
    
    useEffect(() => {
      const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
      setTotal(nuevoTotal)
    }, [pedido])
    

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    // Esta sintaxis saca a las propiedades categoríaId del objeto producto
    const handlerAgregarPedido = ({categoriaId, ...producto}) => {
        // Actualiza la cantidad cuandp se selecciona más de una vez el mismo producto
        if(pedido.some(productoState => productoState.id === producto.id)) {
            // Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        } else {

            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }


    const handlerEditarCantidades = id => {
        
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        
        setModal(!modal)
    }
    
    const handlerEliminarProducto = id => {
        
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

        
    const colocarOrden = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', {
                pedido, nombre, total, fecha: Date.now().toString()
            })

            // Resetear la app
            
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido realizado correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000);
            
        } catch (error) {
            console.log(error);
        }


    }



    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleSetProducto,
                producto,
                modal,
                handleChangeModal,
                handlerAgregarPedido,
                pedido,
                handlerEditarCantidades,
                handlerEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            { children }
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext