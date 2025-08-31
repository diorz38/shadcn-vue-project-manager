<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import Textarea from '@/components/ui/textarea.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Office data model
interface Office {
  id: string
  name: string
  address: string
  phone: string
  email: string
  headOfficerId: string
  logo?: string
}

// User data model (for head officer selection)
interface User {
  id: string
  name: string
  email: string
}

// Form data model
interface OfficeForm {
  name: string
  address: string
  phone: string
  email: string
  headOfficerId: string
  logo?: string
}

// Sample user data (in a real app, this would come from an API)
const users = ref<User[]>([
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com' },
])

// Office data
const officeData = ref<Office>({
  id: '1',
  name: 'Headquarters',
  address: '123 Business Street, Suite 100, City, State 12345',
  phone: '(555) 123-4567',
  email: 'info@company.com',
  headOfficerId: '1',
  logo: '',
})

// Form state
const formData = ref<OfficeForm>({
  name: '',
  address: '',
  phone: '',
  email: '',
  headOfficerId: '',
  logo: '',
})

// Initialize form with office data
onMounted(() => {
  formData.value = { ...officeData.value }
})

// Methods
const saveSettings = () => {
  // In a real app, this would save to an API
  officeData.value = { ...formData.value, id: officeData.value.id }

  // Show success message (in a real app, you might use a toast notification)
  alert('Settings saved successfully!')
}

const getHeadOfficerName = (userId: string) => {
  const user = users.value.find((u) => u.id === userId)
  return user ? user.name : 'Unknown User'
}

const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    // In a real app, you would upload the file to a server
    // For now, we'll just store the file name
    formData.value.logo = target.files[0].name
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Settings</h1>
      <p class="text-muted-foreground">Configure office information</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Office Information</CardTitle>
        <CardDescription>Manage your office details and contact information</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-6">
          <!-- Logo Upload -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="logo" class="text-right">Logo</Label>
            <div class="col-span-3">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                @change="handleLogoUpload"
                class="mb-2"
              />
              <div v-if="formData.logo" class="text-sm text-muted-foreground">
                Selected: {{ formData.logo }}
              </div>
            </div>
          </div>

          <!-- Office Name -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">Office Name</Label>
            <Input
              id="name"
              v-model="formData.name"
              class="col-span-3"
              placeholder="Enter office name"
            />
          </div>

          <!-- Address -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="address" class="text-right">Address</Label>
            <Textarea
              id="address"
              v-model="formData.address"
              class="col-span-3"
              placeholder="Enter office address"
              rows="3"
            />
          </div>

          <!-- Phone -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="phone" class="text-right">Phone</Label>
            <Input
              id="phone"
              v-model="formData.phone"
              class="col-span-3"
              placeholder="Enter phone number"
            />
          </div>

          <!-- Email -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="email" class="text-right">Email</Label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              class="col-span-3"
              placeholder="Enter email address"
            />
          </div>

          <!-- Head Officer -->
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="headOfficer" class="text-right">Head Officer</Label>
            <Select v-model="formData.headOfficerId">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select head officer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end">
            <Button @click="saveSettings">Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Preview Section -->
    <Card>
      <CardHeader>
        <CardTitle>Office Preview</CardTitle>
        <CardDescription>How your office information will appear</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="border rounded-lg p-6">
          <div class="flex items-start gap-4">
            <div
              v-if="formData.logo"
              class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center"
            >
              <span class="text-xs text-gray-500">Logo</span>
            </div>
            <div
              v-else
              class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center"
            >
              <span class="text-xs text-gray-500">No Logo</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ formData.name || 'Office Name' }}</h3>
              <p class="text-muted-foreground">{{ formData.address || 'Office Address' }}</p>
              <div class="mt-2 space-y-1">
                <p class="text-sm">Phone: {{ formData.phone || 'Phone Number' }}</p>
                <p class="text-sm">Email: {{ formData.email || 'Email Address' }}</p>
                <p class="text-sm">
                  Head Officer:
                  {{ getHeadOfficerName(formData.headOfficerId) || 'Head Officer Name' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
