<template>
	<ul class="mt-2" >
		<TodoItem
			v-for="task in tasks"
			:key="task.id"
			:task="task"
			@toggle-done="$emit('toggle-done', $event)"
			@delete-task="$emit('delete-task', $event)"
		/>
	</ul>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";

defineProps({
	tasks: Array,
});
defineEmits(["toggle-done", "delete-task"]);
</script>
