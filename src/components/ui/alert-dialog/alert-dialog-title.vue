<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { AlertDialogTitle, type AlertDialogTitleProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<AlertDialogTitleProps & { class?: HTMLAttributes['class'] }>(),
  {
    as: 'h2',
  },
)
</script>

<template>
  <AlertDialogTitle v-bind="props" :class="cn('text-lg font-semibold', props.class)">
    <slot />
  </AlertDialogTitle>
</template>
