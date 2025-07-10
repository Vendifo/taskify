<template>
	<ul class="mt-2">
		<TodoItem
			v-for="task in tasks"
			:key="task.id"
			:task="task"
			:isEditing="editingTaskId === task.id"
			@toggle-done="$emit('toggle-done', $event)"
			@delete-task="$emit('delete-task', $event)"
			@start-edit="(id) => (editingTaskId = id)"
			@save-edit="
				(data) => {
					if (data) {
						emit('save-edit', data);
					}
					editingTaskId = null;
				}
			"
		/>
	</ul>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";

import { ref } from "vue";

const editingTaskId = ref(null);

defineProps({
	tasks: Array,
});
const emit = defineEmits(["toggle-done", "delete-task", "save-edit"]);
</script>
