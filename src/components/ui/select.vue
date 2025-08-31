<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectRoot, type SelectRootEmits, type SelectRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<SelectRootProps & { class?: HTMLAttributes['class'] }>(), {
  open: undefined,
  defaultValue: undefined,
})
const emits = defineEmits<SelectRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <SelectRoot
    v-bind="delegatedProps"
    @update:model-value="emits('update:modelValue', $event)"
    @update:open="emits('update:open', $event)"
  >
    <slot />
  </SelectRoot>
</template>
