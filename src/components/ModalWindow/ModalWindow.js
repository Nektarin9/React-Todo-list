import style from './ModalWindow.module.css';
import { UseBtnDeleteTask } from '../../hooks/UseBtnDeleteTask';
import { useState } from 'react';
import { UseBtnChangeTask } from '../../hooks/UseBtnChangeTask';

export function ModalWindow({ setModal, obj_target, refreshTasks, setRefreshTasks }) {
	const [inputChangeValue, setInputChangeValue] = useState('');
	const [inputError, setInputError] = useState(false);
	function changeTask() {
		if (inputChangeValue.trim() !== '') {
			UseBtnChangeTask(
				obj_target.attributes[0].textContent,
				refreshTasks,
				setRefreshTasks,
				setModal,
				inputChangeValue,
				false,
			);
		} else {
			setInputError(true);
		}
	}

	return (
		<section className={style.background_modal}>
			<span onClick={() => setModal(false)} className={style.close}>
				Закрыть
			</span>
			<div className={style.modal_container}>
				<div className={style.task}>{obj_target.innerHTML}</div>
				<div className={style.bnt_container}>
					<input
						onChange={({ target }) => setInputChangeValue(target.value)}
						placeholder="Изменить задачу"
						type="text"
						className={inputError ? `${style.input_change} ${style.input_add_error}` : style.input_change}
					></input>
					<button onClick={changeTask} className={style.btn_task}>
						Изменить
					</button>
					<button
						className={style.btn_task_completed}
						onClick={() =>
							UseBtnChangeTask(
								obj_target.attributes[0].textContent,
								refreshTasks,
								setRefreshTasks,
								setModal,
								obj_target.innerHTML,
								true,
							)
						}
					>
						Выполнена
					</button>
					<button
						className={style.btn_task_completed_false}
						onClick={() =>
							UseBtnChangeTask(
								obj_target.attributes[0].textContent,
								refreshTasks,
								setRefreshTasks,
								setModal,
								obj_target.innerHTML,
								false,
							)
						}
					>
						Не выполнена
					</button>

					<button
						onClick={() =>
							UseBtnDeleteTask(
								obj_target.attributes[0].textContent,
								refreshTasks,
								setRefreshTasks,
								setModal,
							)
						}
						className={style.btn_task_del}
					>
						Удалить
					</button>
				</div>
			</div>
		</section>
	);
}
