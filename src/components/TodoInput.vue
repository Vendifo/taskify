<template>
	<form @submit.prevent="submitTask" class="flex gap-2 mb-4">
		<input
			v-model="text"
			type="text"
			placeholder="Новая задача..."
			class="flex-1 p-2 border rounded"
		/>
		<div class="flex">
			
			<select
				id="priority"
				v-model="priority"
				class="border rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
			>
				<option class="text-green-600" value="low">Низкий</option>
				<option class="text-yellow-600" value="medium">Средний</option>
				<option class="text-red-600" value="high">Высокий</option>
			</select>
		</div>
		<button class="bg-blue-500 text-white px-4 py-2 rounded">
			Добавить задачу
		</button>
	</form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["add-task"]);

const text = ref("");
const priority = ref("low");

function submitTask() {
	if (text.value.trim()) {
		emit("add-task", { text: text.value, priority: priority.value });
		text.value = "";
		priority.value = "low";
	}
}
</script>
