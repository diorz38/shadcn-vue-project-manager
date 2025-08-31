<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Plus, Edit, Trash2 } from 'lucide-vue-next'

// User data model
interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

// Form data model
interface UserForm {
  id?: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

// Sample user data
const users = ref<User[]>([
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    createdAt: '2023-02-20',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'User',
    status: 'inactive',
    createdAt: '2023-03-10',
  },
])

// Form state
const isModalOpen = ref(false)
const isEditing = ref(false)
const formData = ref<UserForm>({
  name: '',
  email: '',
  role: 'User',
  status: 'active',
})

// Computed properties
const filteredUsers = computed(() => users.value)

// Methods
const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    name: '',
    email: '',
    role: 'User',
    status: 'active',
  }
  isModalOpen.value = true
}

const openEditModal = (user: User) => {
  isEditing.value = true
  formData.value = { ...user }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveUser = () => {
  if (isEditing.value && formData.value.id) {
    // Edit existing user
    const index = users.value.findIndex((u) => u.id === formData.value.id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...formData.value }
    }
  } else {
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      ...formData.value,
      createdAt: new Date().toISOString().split('T')[0],
    }
    users.value.push(newUser)
  }
  closeModal()
}

const deleteUser = (id: string) => {
  users.value = users.value.filter((user) => user.id !== id)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold">Users</h1>
        <p class="text-muted-foreground">Manage user accounts and permissions</p>
      </div>
      <Button @click="openCreateModal" class="mt-4 md:mt-0">
        <Plus class="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>

    <!-- Users table -->
    <div class="border rounded-lg overflow-x-auto max-w-full">
      <Table class="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead class="table-cell-nowrap">Name</TableHead>
            <TableHead class="table-cell-nowrap">Email</TableHead>
            <TableHead class="table-cell-nowrap">Role</TableHead>
            <TableHead class="table-cell-nowrap">Status</TableHead>
            <TableHead class="table-cell-nowrap">Created</TableHead>
            <TableHead class="text-right table-cell-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="user in filteredUsers" :key="user.id">
            <TableCell class="font-medium table-cell-nowrap">{{ user.name }}</TableCell>
            <TableCell class="table-cell-nowrap">{{ user.email }}</TableCell>
            <TableCell class="table-cell-nowrap">{{ user.role }}</TableCell>
            <TableCell>
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs table-cell-nowrap',
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                ]"
              >
                {{ user.status }}
              </span>
            </TableCell>
            <TableCell class="table-cell-nowrap">{{ user.createdAt }}</TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="openEditModal(user)">
                    <Edit class="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="deleteUser(user.id)">
                    <Trash2 class="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- User modal -->
    <Dialog v-model:open="isModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Edit User' : 'Add User' }}</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">Name</Label>
            <Input id="name" v-model="formData.name" class="col-span-3" placeholder="Enter name" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="email" class="text-right">Email</Label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              class="col-span-3"
              placeholder="Enter email"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="role" class="text-right">Role</Label>
            <Select v-model="formData.role">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="status" class="text-right">Status</Label>
            <Select v-model="formData.status">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="closeModal">Cancel</Button>
          <Button @click="saveUser">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
