import React, { useState, useEffect } from "react";

const ToDoList = () => {
	const [toDoList, setToDoList] = useState([]); //1º
	const [toDoListMap, setToDoListMap] = useState(""); //2º variable para guardar el map

	useEffect(() => {
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
				setToDoList(data); //1º
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const deleteTask = idDelete => {
		setToDoList(toDoList.filter((_, index) => index !== idDelete));
	};

	// 2º
	useEffect(() => {
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
	console.log(toDoListMap);

	// 4º Hacer una función para el post y para el put

	useEffect(() => {
		console.log(toDoList);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kholostyak17", {
			method: "PUT",
			body: JSON.stringify(toDoList),
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
	}, [toDoList]);

	// 3º {toDoListMap} para dibujar la lista que he realizado en el map
	return (
		<div>
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
			<ul>{toDoListMap}</ul>
		</div>
	);
};

export default ToDoList;
