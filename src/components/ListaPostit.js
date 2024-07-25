import React, {useRef, useState, useEffect} from "react";
import {v4 as uuid} from "uuid";
import ItemPostit from "./ItemPostit";

const ListaPostit = () => {
	const [notas, setNotas] = useState([]);
	const tituloRef = useRef();
	const descripcionRef = useRef();
	const importanteRef = useRef();

	//la clave/KEY es para guardar las notas en el local storage
	const KEY = "notas-app-notas";

	//recupera las notas guardadas del localstorage para "setearlas" al entrar en la página
	useEffect(() => {
		const notasGuardadas = JSON.parse(localStorage.getItem(KEY));
		if (notasGuardadas) {
			setNotas(notasGuardadas);
		}
	}, []);

	//convierte las notas en JSON y las guarda en el localstorage
	useEffect(() => {
		const json = JSON.stringify(notas);
		localStorage.setItem(KEY, json);
	}, [notas]);

	//obtiene los valores ingresados y valida la descripción obligatoria
	const agregarNota = (e) => {
		e.preventDefault();
		const titulo = tituloRef.current.value;
		const descripcion = descripcionRef.current.value;
		const importante = importanteRef.current.checked;

		if (descripcion.trim() === "") {
			alert("La descripción es obligatoria");
			return;
		}
	//crea una nueva nota con los valores, la agrega al array de setNotas y limpia los campos de input
		const nuevaNota = {id: uuid(), titulo, descripcion, importante};
		setNotas((prev) => [...prev, nuevaNota]);

		tituloRef.current.value = "";
		descripcionRef.current.value = "";
		importanteRef.current.checked = false;
	};

	//elimina la nota por su ID
	const eliminarNota = (id) => {
		setNotas(notas.filter((nota) => nota.id !== id));
	};

	return (
		<div className="container">
			<h1>¡Simulador de Post-It!</h1>
			<form onSubmit={agregarNota} className="nota-formulario d-flex justify-content-center align-items-center mb-4">
				<input type="text" placeholder="Título" ref={tituloRef} className="form-control me-2" />
				<input type="text" placeholder="Descripción" ref={descripcionRef} className="form-control me-2" />
				<label className="form-check-label me-2">
					¿Importante?
					<input type="checkbox" ref={importanteRef} className="form-check-input ms-2"/>
				</label>
				<button type="submit" className="btn btn-dark">Agregar</button>
			</form>
			<div className="row">
				{notas.map((nota, index) => (
					<ItemPostit key={nota.id} nota={nota} eliminarNota={eliminarNota} index={index} /> //Renderiza las notas 
				))}
			</div>
		</div>
	);
};

export default ListaPostit;
