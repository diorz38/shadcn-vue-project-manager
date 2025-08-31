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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import Textarea from '@/components/ui/textarea.vue'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'

// Role data model
interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  createdAt: string
}

// Form data model
interface RoleForm {
  id?: string
  name: string
  description: string
  permissions: string[]
}

// Sample role data
const roles = ref<Role[]>([
  {
    id: '1',
    name: 'Admin',
    description: 'Full access to all system features',
    permissions: ['user:create', 'user:edit', 'user:delete', 'role:manage'],
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can create and edit content',
    permissions: ['content:create', 'content:edit'],
    createdAt: '2023-02-20',
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Can only view content',
    permissions: ['content:view'],
    createdAt: '2023-03-10',
  },
])

// Sample permissions data
const permissions = ref([
  { id: '1', name: 'user:create', description: 'Create users' },
  { id: '2', name: 'user:edit', description: 'Edit users' },
  { id: '3', name: 'user:delete', description: 'Delete users' },
  { id: '4', name: 'role:manage', description: 'Manage roles' },
  { id: '5', name: 'content:create', description: 'Create content' },
  { id: '6', name: 'content:edit', description: 'Edit content' },
  { id: '7', name: 'content:view', description: 'View content' },
])

// Form state
const isModalOpen = ref(false)
const isEditing = ref(false)
const isDeleteConfirmOpen = ref(false)
const roleToDelete = ref<string | null>(null)
const formData = ref<RoleForm>({
  name: '',
  description: '',
  permissions: [],
})

// Computed properties
const filteredRoles = computed(() => roles.value)

// Methods
const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    name: '',
    description: '',
    permissions: [],
  }
  isModalOpen.value = true
}

const openEditModal = (role: Role) => {
  isEditing.value = true
  formData.value = { ...role }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveRole = () => {
  if (isEditing.value && formData.value.id) {
    // Edit existing role
    const index = roles.value.findIndex((r) => r.id === formData.value.id)
    if (index !== -1) {
      roles.value[index] = { ...roles.value[index], ...formData.value }
    }
  } else {
    // Create new role
    const newRole: Role = {
      id: Date.now().toString(),
      ...formData.value,
      createdAt: new Date().toISOString().split('T')[0],
    }
    roles.value.push(newRole)
  }
  closeModal()
}

const openDeleteConfirm = (id: string) => {
  roleToDelete.value = id
  isDeleteConfirmOpen.value = true
}

const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false
  roleToDelete.value = null
}

const confirmDelete = () => {
  if (roleToDelete.value) {
    deleteRole(roleToDelete.value)
  }
  closeDeleteConfirm()
}

const deleteRole = (id: string) => {
  roles.value = roles.value.filter((role) => role.id !== id)
}

const togglePermission = (permission: string) => {
  const index = formData.value.permissions.indexOf(permission)
  if (index > -1) {
    formData.value.permissions.splice(index, 1)
  } else {
    formData.value.permissions.push(permission)
  }
}

const isPermissionSelected = (permission: string) => {
  return formData.value.permissions.includes(permission)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold">Roles</h1>
        <p class="text-muted-foreground">Manage user roles and permissions</p>
      </div>
      <Button @click="openCreateModal" class="mt-4 md:mt-0">
        <Plus class="h-4 w-4 mr-2" />
        Add Role
      </Button>
    </div>

    <!-- Roles table -->
    <div class="border rounded-lg overflow-x-auto max-w-full">
      <Table class="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead class="table-cell-nowrap">Name</TableHead>
            <TableHead class="table-cell-nowrap">Description</TableHead>
            <TableHead class="table-cell-nowrap">Permissions</TableHead>
            <TableHead class="table-cell-nowrap">Created</TableHead>
            <TableHead class="text-right table-cell-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="role in filteredRoles" :key="role.id">
            <TableCell class="font-medium table-cell-nowrap">{{ role.name }}</TableCell>
            <TableCell class="table-cell-nowrap">{{ role.description }}</TableCell>
            <TableCell>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="permission in role.permissions.slice(0, 3)"
                  :key="permission"
                  class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded table-cell-nowrap"
                >
                  {{ permission }}
                </span>
                <span
                  v-if="role.permissions.length > 3"
                  class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded table-cell-nowrap"
                >
                  +{{ role.permissions.length - 3 }} more
                </span>
              </div>
            </TableCell>
            <TableCell class="table-cell-nowrap">{{ role.createdAt }}</TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <Button variant="outline" size="sm" @click="openEditModal(role)">
                  <Edit class="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" @click="openDeleteConfirm(role.id)">
                  <Trash2 class="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Delete confirmation dialog -->
    <AlertDialog v-model:open="isDeleteConfirmOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the role "{{
              roles.find((r) => r.id === roleToDelete)?.name
            }}" and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="closeDeleteConfirm">Cancel</AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Role modal -->
    <Dialog v-model:open="isModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Edit Role' : 'Add Role' }}</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">Name</Label>
            <Input
              id="name"
              v-model="formData.name"
              class="col-span-3"
              placeholder="Enter role name"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="description" class="text-right">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              class="col-span-3"
              placeholder="Enter role description"
            />
          </div>
          <div class="grid grid-cols-4 items-start gap-4">
            <Label class="text-right pt-2">Permissions</Label>
            <div class="col-span-3 space-y-2">
              <div
                v-for="permission in permissions"
                :key="permission.id"
                class="flex items-center space-x-2"
              >
                <input
                  :id="`permission-${permission.id}`"
                  type="checkbox"
                  :checked="isPermissionSelected(permission.name)"
                  @change="togglePermission(permission.name)"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label :for="`permission-${permission.id}`" class="font-normal">
                  {{ permission.name }} - {{ permission.description }}
                </Label>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="closeModal">Cancel</Button>
          <Button @click="saveRole">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
