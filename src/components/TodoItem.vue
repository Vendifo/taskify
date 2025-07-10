<template>
	<li
		class="flex items-center justify-between bg-white shadow-sm hover:shadow-md transition rounded-xl p-4 mb-3 border border-gray-200"
	>
		<!-- Текст задачи -->
		<span
			:class="{ 'line-through text-gray-400': task.done }"
			class="text-base font-medium text-gray-800 max-w-[60%] break-words"
		>
			{{ task.text }}
		</span>

		<!-- Кнопки управления -->
		<div class="flex gap-2">
			<!-- Кнопка "Изменить" -->
			<button
				@click="$emit('toggle-done', task.id)"
				class="text-blue-600 hover:bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg text-sm transition"
			>
				{{ task.done ? "Отменить" : "Готово" }}
			</button>

			<!-- Кнопка "Удалить" -->
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
defineProps({ task: Object })
defineEmits(["toggle-done", "delete-task"])
</script>
