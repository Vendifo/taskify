<template>
  <li
    class="flex items-center justify-between bg-white shadow rounded-xl p-4 mb-3 border border-gray-200 
           hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
  >
    <div class="flex-1 mr-4">
      <input
        v-if="isEditing"
        v-model="editedText"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
        class="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        autofocus
      />

      <span
        v-else
        :class="[
          'text-base font-medium break-words cursor-pointer transition-colors duration-300',
          task.done ? 'line-through text-gray-400' : 'text-gray-800 hover:text-blue-600 font-semibold',
        ]"
        @click="$emit('start-edit', task.id)"
      >
        {{ task.text }}
      </span>
    </div>

    <!-- Приоритет с возможностью смены -->
    <select
      v-model="localPriority"
      @change="changePriority"
      class="px-3 py-1 rounded-full text-white text-xs font-semibold select-none
             transition-colors duration-300 cursor-pointer
             border-0 appearance-none focus:outline-none"
      :class="priorityBgColor"
    >
      <option value="low" class="bg-green-500 text-white rounded-full">Низкий</option>
      <option value="medium" class="bg-yellow-400 text-black">Средний</option>
      <option value="high" class="bg-red-500 text-white">Высокий</option>
    </select>

    <div class="flex gap-2 ml-4">
      <button
        @click="$emit('toggle-done', task.id)"
        class="flex items-center gap-1 text-blue-600 border border-blue-300 px-3 py-1 rounded-lg text-sm 
               hover:bg-blue-100 transition"
        aria-label="Toggle done"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 13l4 4L19 7" />
        </svg>
        {{ task.done ? "Отменить" : "Готово" }}
      </button>

      <button
        @click="$emit('delete-task', task.id)"
        class="flex items-center gap-1 text-red-600 border border-red-300 px-3 py-1 rounded-lg text-sm
               hover:bg-red-100 transition"
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
        Удалить
      </button>
    </div>
  </li>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  task: Object,
  isEditing: Boolean,
});

const emit = defineEmits([
  "toggle-done",
  "delete-task",
  "start-edit",
  "save-edit",
  "update-priority",
]);

const editedText = ref(props.task.text);
const localPriority = ref(props.task.priority);

watch(
  () => props.task.text,
  (newText) => {
    editedText.value = newText;
  }
);

watch(
  () => props.task.priority,
  (newPriority) => {
    localPriority.value = newPriority;
  }
);

function saveEdit() {
  const trimmed = editedText.value.trim();
  if (!trimmed) {
    emit("save-edit", null);
    return;
  }
  if (trimmed !== props.task.text) {
    emit("save-edit", { id: props.task.id, text: trimmed });
  } else {
    emit("save-edit", null);
  }
}

function changePriority() {
  emit("update-priority", { id: props.task.id, priority: localPriority.value });
}

const priorityBgColor = computed(() => {
  return {
    "bg-green-500 text-white rounded-full": localPriority.value === "low",
    "bg-yellow-400 text-black rounded-full": localPriority.value === "medium",
    "bg-red-500 text-white rounded-full": localPriority.value === "high",
  };
});
</script>
