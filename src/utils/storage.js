const STORAGE_KEY = 'tasks';

export function loadTasks() {
	const saved = localStorage.getItem(STORAGE_KEY);
	return saved ? JSON.parse(saved) : [];
}

export function saveTasks(tasks) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}