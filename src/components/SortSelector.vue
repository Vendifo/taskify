<template>
	<div class="mb-4">
			<label for="sort" class="mr-2 font-semibold">Сортировка по:</label>
			<select id="sort" v-model="modelValue" @change="$emit('update:modelValue', modelValue)"  class="border rounded px-2 py-1" >
				<option value="createdAtDesc">Дате (новые сверху)</option>
				<option value="createdAtAsc">Дате (старые сверху)</option>
				<option value="priority">Приоритету</option>
				<option value="alphabet">Алфавиту</option>
			</select>
		</div>
</template>


<script setup>
import { ref } from 'vue';

const props = defineProps({
	modelValue: String
});
defineEmits(['update:modelValue'])

const modelValue = ref('');
</script>