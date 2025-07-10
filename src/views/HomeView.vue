<template>
	<div class="p-8 max-w-2x1 mx-auto">
		<h1 class="text-3x1 font-bold mb-4">Taskufy</h1>
		<TodoInput @add-task="addTask" />
		<TodoList
			:tasks="tasks"
			@toggle-done="toggleDone"
			@delete-task="deleteTask"
		/>
	</div>
</template>

<script setup>
import { ref } from "vue";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
import { loadTasks, saveTasks } from "../utils/storage";

const tasks = ref(loadTasks());


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
</script>
