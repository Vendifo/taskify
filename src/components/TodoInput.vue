<template>
	<form @submit.prevent="submitTask" class="flex gap-2 mb4">
		<input
			v-model="text"
			type="text"
			placeholder="Новая задача..."
			class="flex-1 p-2 border rounded"
		/>
		<button class="bg-blue-500 text-white px-4 py-2 rounded">
			Добавить задачу
		</button>
	</form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["add-task"]);
const text = ref("");

function submitTask() {
	if (text.value.trim()) {
		emit("add-task", text.value);
		text.value = "";
	}
}
</script>
