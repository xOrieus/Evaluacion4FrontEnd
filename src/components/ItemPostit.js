import React from "react";

const ItemPostit = ({nota, eliminarNota, index}) => {
	return (
		<div className="col-12 col-lg-3 mb-4 d-flex justify-content-center">
		<div className={`nota ${nota.importante ? "importante" : ""} ${index % 2 === 0 ? 'even' : 'odd'}`}>
			<h2>{nota.titulo}</h2>
			<p>{nota.descripcion}</p>
			<button className="eliminar-boton" onClick={() => eliminarNota(nota.id)}>
				Eliminar
			</button>
			</div>
		</div>
	);
};

export default ItemPostit;
