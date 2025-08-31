<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Input from '@/components/ui/input.vue'
import Checkbox from '@/components/ui/checkbox.vue'
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold">shadcn-vue Demo</h1>
    <p class="text-muted-foreground">This is a demo page showcasing shadcn-vue components.</p>

    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Buttons</h2>

      <div class="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <div class="flex flex-wrap gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">+</Button>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Inputs</h2>

      <div class="flex flex-wrap gap-4">
        <Input type="text" placeholder="Text" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Checkbox</h2>

      <div class="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Cards</h2>

      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Card Footer</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
