<template>
	<div class="p-8 max-w-2x1 mx-auto">
		<h1 class="text-3x1 font-bold mb-4">Taskufy</h1>
		<TaskFilter v-model="filter" />

		<SortSelector v-model="sortKey" />

		<TodoInput @add-task="addTask" />
		<TodoList
			:tasks="sortedTasks"
			@toggle-done="toggleDone"
			@delete-task="deleteTask"
			@save-edit="saveEdit"
			 @update-priority="updatePriority"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
import TaskFilter from "../components/TaskFilter.vue";
import SortSelector from "../components/SortSelector.vue";
import { loadTasks, saveTasks } from "../utils/storage";

const tasks = ref(loadTasks());

const filter = ref("all");

const sortKey = ref("createdAtDesc")

const filteredTasks = computed(() => {
	if (filter.value === "active") {
		return tasks.value.filter((task) => !task.done);
	}
	if (filter.value === "done") {
		return tasks.value.filter((task) => task.done);
	}
	return tasks.value;
});


const sortedTasks = computed(() => {
	let sorted = [...filteredTasks.value];
	switch (sortKey.value) {
		case "createdAtAsc":
			sorted.sort((a, b) => new Date(a.createdAt ) - new Date(b.createdAt ));
			break
		case "createdAtDesc":
			sorted.sort((a, b) => new Date(b.createdAt ) - new Date(a.createdAt ));
			break
		case "priority":
			const priorityOrder = { high: 3, medium: 2, low: 1 };
			sorted.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0 ));
			break
		case "alphabet":
			sorted.sort((a, b) => a.text.localeCompare(b.text));
			break;
	}
	return sorted;
}
)

function addTask({ text, priority }) {
	if (text.trim()) {
		tasks.value.push({
			id: Date.now(),
			text,
			done: false,
			createdAt: new Date().toISOString(),
			priority
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

function updatePriority({ id, priority }) {
  const task = tasks.value.find(t => t.id === id);
  if (task) {
    task.priority = priority;
    saveTasks(tasks.value);
  }
}
</script>
