import React, {useState} from 'react';
import uniqid from 'uniqid';


const ListadoNombres =() => {

    const [nombre,setNombre] = useState('')
    const [listaNombres,setListaNombres]=useState([])
    const [modoEdicion, setModoEdicion]=useState(false)
    const [id,setId]=useState('')
    const [error, setError]=useState(null)

    const añadirNombre=(e) =>{
        e.preventDefault()
        if(!nombre.trim()){
            setError('El Campo Nombre Esta Vacio')
            return
        }
        const nuevoNombre = {            
             id:uniqid(),
            name:nombre
        }
        setListaNombres([...listaNombres,nuevoNombre])
        setNombre('')
        setError(null)
    }

    const borrarNombre =(id) =>{
        const nuevoArray = listaNombres.filter(item=>item.id !== id)
        setListaNombres(nuevoArray)
    }

    const editar =(item) =>{
        setModoEdicion(true)
        setNombre(item.name)
        setId(item.id)
    }

    const editarNombre=(e) =>{
        e.preventDefault()
        if(!nombre.trim()){
            setError('El Campo Nombre Esta Vacio')
            return
        }
        const nuevoArray2 =listaNombres.map(item=> item.id=== id ? {id:id, name:nombre} : item)
        setListaNombres(nuevoArray2)
        setNombre('')
        setModoEdicion(false)
        setError(null)
    }



    return(
        <div className="container-sm">
            <h1 className="text-center bg-dark text-white pb-2 mt-3 "> Aplicación CRUD Básico</h1>
        <div className="row mt-5">
            <div className="col">
                <h2>Listado De Nombres</h2>
                    <ul className="list-group">
                        {
                            listaNombres.map(item =>
                                <li 
                                key={item.id} 
                                className="list-group-item"> 
                                {item.name}

                                <button 
                                onClick={()=>{borrarNombre(item.id)}}
                                className="btn btn-danger float-right ml-1">Borrar
                                </button>

                                 <button 
                                onClick={()=>{editar(item)}}
                                className="btn btn-warning float-right ">Editar
                                </button>

                                </li>
                            )
                        }
                    </ul>
            </div>
            <div className="col">
                <h2>Añadir Nombres</h2>
                <form onSubmit={ modoEdicion ? editarNombre: añadirNombre } className="form-group">
                    <input
                    onChange={(e)=>{setNombre(e.target.value)}} 
                    className="form-control mb-3" 
                    type="text" 
                    placeholder="Introducir Nombre"
                    value={nombre}
                    />

                    <input 
                    className="btn btn-info btn-block" 
                    type="submit" 
                    value= {modoEdicion ? 'Editar Nombre' : 'Registrar Nombre'}                   
                    />
                </form>

                {
                    error != null ? (
                        <div className="alert alert-danger">
                            {error}
                        </div>

                    ):
                    (
                        <div></div>
                    )
                }
            
            </div>
        </div>
        
        </div>
    )
}

export default ListadoNombres;