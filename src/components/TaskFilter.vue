<template>
	<div class="flex gap-4 mb-4">
		<button
			v-for="option in options"
			:key="option.value"
			@click="$emit('update:modelValue', option.value)"
			:class="[
				'px-4 py-2 rounded transition-colors duration-300',
				modelValue === option.value
					? 'bg-blue-600 text-white shadow-md'
					: 'bg-gray-200 text-gray-700 hover:bg-blue-100',
			]"
		> {{ option.label }}</button>
	</div>
</template>

<script setup>
defineProps({
	modelValue: String,
})

const options = [
	{label: 'Все', value: 'all'},
	{label: 'Активные', value: 'active'},
	{label: 'Выполненые', value: 'done'},
]
</script>
