<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<DropdownMenuRootProps & { class?: HTMLAttributes['class'] }>(),
  {
    open: undefined,
  },
)
const emits = defineEmits<DropdownMenuRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DropdownMenuRoot v-bind="delegatedProps" @update:open="emits('update:open', $event)">
    <slot />
  </DropdownMenuRoot>
</template>
