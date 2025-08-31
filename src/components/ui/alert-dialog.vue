<script setup lang="ts">
import { computed } from 'vue'
import { AlertDialogRoot } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    open?: boolean
    defaultOpen?: boolean
    modal?: boolean
    class?: string
  }>(),
  {
    open: undefined,
    defaultOpen: false,
    modal: true,
  },
)

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <AlertDialogRoot v-bind="delegatedProps" @update:open="emits('update:open', $event)">
    <slot />
  </AlertDialogRoot>
</template>
