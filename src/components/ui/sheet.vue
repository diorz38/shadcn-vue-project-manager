<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DialogRoot, type DialogRootEmits, type DialogRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<DialogRootProps & { class?: HTMLAttributes['class'] }>(), {
  open: undefined,
})
const emits = defineEmits<DialogRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogRoot v-bind="delegatedProps" @update:open="emits('update:open', $event)">
    <slot />
  </DialogRoot>
</template>
