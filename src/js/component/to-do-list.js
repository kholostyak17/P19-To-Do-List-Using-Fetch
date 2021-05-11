import React, { useState, useEffect } from "react";

const ToDoList = () => {
	const [todos, setTodos] = useState([]); //1º
	const [todosMap, setTodosMap] = useState(""); //2º variable para guardar el map

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kholostyak17", {
			method: "GET"
			//	body: JSON.stringify(todos),
			//headers: {
			//	"Content-Type": "application/json"
			//
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
				setTodos(data); //1º
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const deleteTask = idDelete => {
		setTodos(todos.filter((_, index) => index !== idDelete));
	};

	// 2º
	useEffect(() => {
		setTodosMap(
			todos.map((task, index) => {
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
	}, [todos]);
	console.log(todosMap);

	// 4º Hacer una función para el post y para el put

	useEffect(() => {
		console.log(todos);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kholostyak17", {
			method: "PUT",
			body: JSON.stringify(todos),
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
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data, "holaaaaaaaa"); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				console.log(error);
			});
	}, [todos]);

	// 3º {todosMap} para dibujar la lista que he realizado en el map
	return (
		<div>
			<input
				type="text"
				onKeyPress={event => {
					if (event.key == "Enter") {
						setTodos([
							...todos,
							{ label: event.target.value, done: false }
						]);
						event.target.value = "";
					}
				}}
			/>
			<ul>{todosMap}</ul>
		</div>
	);
};

export default ToDoList;
