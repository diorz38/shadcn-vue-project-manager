<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>(),
  {
    as: 'button',
  },
)
</script>

<template>
  <AlertDialogAction v-bind="props" :class="cn(buttonVariants(), props.class)">
    <slot />
  </AlertDialogAction>
</template>
