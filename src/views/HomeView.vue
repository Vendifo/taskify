<template>
	<div class="p-8 max-w-2x1 mx-auto">
		<h1 class="text-3x1 font-bold mb-4">Taskufy</h1>
		<TaskFilter v-model="filter" />

		<TodoInput @add-task="addTask" />
		<TodoList
			:tasks="filteredTasks"
			@toggle-done="toggleDone"
			@delete-task="deleteTask"
			@save-edit="saveEdit"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
import TaskFilter from "../components/TaskFilter.vue";
import { loadTasks, saveTasks } from "../utils/storage";

const tasks = ref(loadTasks());

const filter = ref("all");

const filteredTasks = computed(() => {
	if (filter.value === "active") {
		return tasks.value.filter((task) => !task.done);
	}
	if (filter.value === "done") {
		return tasks.value.filter((task) => task.done);
	}
	return tasks.value;
});

function addTask(taskText) {
	if (taskText.trim()) {
		tasks.value.push({
			id: Date.now(),
			text: taskText,
			done: false,
		});
		saveTasks(tasks.value);
	}
}

function toggleDone(taskId) {
	const task = tasks.value.find((t) => t.id === taskId);
	if (task) {
		task.done = !task.done;
		saveTasks(tasks.value);
	}
}

function deleteTask(taskId) {
	tasks.value = tasks.value.filter((t) => t.id !== taskId);
	saveTasks(tasks.value);
}


function saveEdit({ id, text}) {
	const task = tasks.value.find((t) => t.id === id) 
	if (task) {
		task.text = text
		saveTasks(tasks.value)
	}
}
</script>
