import React, { useState, useEffect } from "react";

const ToDoList = () => {
	const [toDoList, setToDoList] = useState([]);
	const [toDoListMap, setToDoListMap] = useState("");

	useEffect(() => {
		//primer fetch de descarga al recargar la pagina
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kholostyak17", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
				setToDoList(data); //guardamos en nuestra lista lo que se encuentra en el servidor
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		// aqui renderizamos la lista cada vez que esta sea modificada
		setToDoListMap(
			toDoList.map((task, index) => {
				return (
					<li id={index} key={index.toString()}>
						{task.label}
						<button
							onClick={() => {
								deleteTask(index);
							}}>
							X
						</button>
					</li>
				);
			})
		);
	}, [toDoList]);

	const deleteTask = indexDelete => {
		// función que devuelve una nueva lista sin el elemento que vayamos a borrar
		setToDoList(toDoList.filter((_, index) => index !== indexDelete));
	};

	useEffect(() => {
		// fetch put para modificar la lista
		console.log(toDoList);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kholostyak17", {
			method: "PUT",
			body: JSON.stringify(toDoList), // aquí se incluye nuestra nueva lista (modificada) en el servidor
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [toDoList]);

	return (
		<div className="ListBox ">
			<div className="inputBox">
				<input
					type="text"
					onKeyPress={event => {
						if (event.key == "Enter") {
							setToDoList([
								...toDoList,
								{ label: event.target.value, done: false }
							]);
							event.target.value = "";
						}
					}}
				/>
			</div>
			<ul>{toDoListMap}</ul>
		</div>
	);
};

export default ToDoList;
