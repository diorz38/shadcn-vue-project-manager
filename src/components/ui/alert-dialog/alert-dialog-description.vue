<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { AlertDialogDescription, type AlertDialogDescriptionProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes['class'] }>(),
  {
    as: 'p',
  },
)
</script>

<template>
  <AlertDialogDescription v-bind="props" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </AlertDialogDescription>
</template>
