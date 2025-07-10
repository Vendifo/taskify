<template>
	<li
		class="flex items-center justify-between bg-white shadow-sm hover:shadow-md transition rounded-xl p-4 mb-3 border border-gray-200"
	>
		<div class="flex-1 mr-4">
			<input
				v-if="isEditing"
				v-model="editedText"
				@keyup.enter="saveEdit"
				@blur="saveEdit"
				class="w-full border px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-300"
				autofocus
			/>

			<span
				v-else
				:class="{ 'line-through text-gray-400': task.done, 'cursor-pointer': true}"
				class="text-base font-medium text-gray-800 break-words"
				@click="$emit('start-edit', task.id)"
			>
				{{ task.text }}
			</span>
		</div>

		<div class="flex gap-2">
			<button
				@click="$emit('toggle-done', task.id)"
				class="text-blue-600 hover:bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg text-sm transition"
			>
				{{ task.done ? "Отменить" : "Готово" }}
			</button>

			<button
				@click="$emit('delete-task', task.id)"
				class="text-red-500 hover:bg-red-50 border border-red-200 px-3 py-1 rounded-lg text-sm transition"
			>
				Удалить
			</button>
		</div>
	</li>
</template>

<script setup>
import { ref, toRaw, watch } from "vue";

const props = defineProps({
	task: Object,
	isEditing: Boolean,
});

const emit = defineEmits([
	"toggle-done",
	"delete-task",
	"start-edit",
	"save-edit",
]);

const editedText = ref(props.task.text);

watch(
	() => props.task.text,
	(newText) => {
		editedText.value = newText;
	}
);

function saveEdit() {
	const trimed = editedText.value.trim();
	if (trimed && trimed !== props.task.text) {
		emit("save-edit", { id: props.task.id, text: trimed });
	}
}
</script>
