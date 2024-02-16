import style from './App.module.css';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ShowTasks } from './components/ShowTasks/ShowTasks.js';
import { UseAddTasks } from './hooks/UseBtnAddTask.js';
import { ModalWindow } from './components/ModalWindow/ModalWindow.js';

let obj_target;

export function App() {
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState('');
	const [refreshTasks, setRefreshTasks] = useState(false);
	const [newTask, setNewTask] = useState('');
	const [stateBtnSort, setStateBtnSort] = useState(false);
	const inputRef = useRef(null);

	const [modal, setModal] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3005/tasks')
			.then((loadedData) => {
				return loadedData.json();
			})
			.then((response) => {
				setTasks(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [refreshTasks]);

	function filterTasks(event) {
		const { target } = event;
		if (target.value) {
			setFilter(target.value);
		} else {
			setFilter('');
		}
	}

	const { btnAddTasks, errorNewTask } = UseAddTasks(
		refreshTasks,
		setRefreshTasks,
		newTask,
		tasks,
		inputRef,
	);

	function selectTask(event) {
		const { target } = event;
		if (target.closest('div') && target.tagName !== 'SECTION') {
			console.log(target);
			setModal(true);
			obj_target = target;
		} else {
			setModal(false);
		}
	}

	return (
		<>
			{modal ? (
				<ModalWindow
					setModal={setModal}
					refreshTasks={refreshTasks}
					setRefreshTasks={setRefreshTasks}
					obj_target={obj_target}
				/>
			) : (
				<></>
			)}
			<h1>Список задач</h1>
			<input
				onChange={filterTasks}
				placeholder="Поиск"
				className={style.input_search}
				type="text"
			></input>
			<div className={style.bnt_container}>
				<button onClick={btnAddTasks} className={style.btn_task}>
					Добавить
				</button>
				<input
					onChange={({ target }) => setNewTask(target.value)}
					ref={inputRef}
					type="text"
					placeholder="Добавить задачу"
					className={
						errorNewTask
							? `${style.input_add} ${style.input_add_error}`
							: style.input_add
					}
				></input>
			</div>
			<button
				onClick={() => setStateBtnSort(!stateBtnSort)}
				className={style.btn_task_sort}
			>
				Сортировать
			</button>
			<section onClick={selectTask} className={style.container_tasks}>
				<ShowTasks stateBtnSort={stateBtnSort} str={filter} tasks={tasks} />
			</section>
		</>
	);
}
