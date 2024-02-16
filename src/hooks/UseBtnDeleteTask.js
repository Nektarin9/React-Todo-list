export function UseBtnDeleteTask(id, refreshTasks, setRefreshTasks, setModal) {
	fetch(`http://localhost:3005/tasks/${id}`, {
		method: 'DELETE',
	})
		.then((rawResponse) => rawResponse.json())
		.then((response) => {
			setRefreshTasks(!refreshTasks);
			setModal(false);
		})
		.catch((error) => {
			console.error(error);
		});
}
