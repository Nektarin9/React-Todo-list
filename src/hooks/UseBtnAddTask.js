import { useState } from 'react';

export function UseAddTasks(refreshTasks, setRefreshTasks, newTask, tasks, inputRef) {
	const [errorNewTask, setErrorNewTask] = useState(false);
	function btnAddTasks() {
		if (newTask.trim()) {
			setErrorNewTask(false);
			fetch('http://localhost:3005/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: newTask,
					id: Math.random().toString(36).substr(2, 9),
					completed: false,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					setRefreshTasks(!refreshTasks);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setErrorNewTask(true);
			inputRef.current.focus();
		}
	}
	return { btnAddTasks, errorNewTask };
}
