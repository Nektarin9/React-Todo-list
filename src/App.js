import style from './App.module.css';
import React from 'react';
import { useEffect, useState } from 'react';

export const App = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => {
				return loadedData.json();
			})
			.then((response) => {
				console.log(response);
				setTasks(response);
			});
	}, []);

	return (
		<>
			<h1>Список задач</h1>
			<section className={style.app}>
				{tasks.map((item) => (
					<div
						key={item.id}
						className={
							item.completed
								? `${style.task} ${style.task_completed_true}`
								: `${style.task} ${style.task_completed_false}`
						}
					>
						{item.title}
					</div>
				))}
			</section>
		</>
	);
};
