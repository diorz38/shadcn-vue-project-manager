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

// Permission data model
interface Permission {
  id: string
  name: string
  description: string
  createdAt: string
}

// Form data model
interface PermissionForm {
  id?: string
  name: string
  description: string
}

// Sample permission data
const permissions = ref<Permission[]>([
  {
    id: '1',
    name: 'user:create',
    description: 'Allow creating new users',
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'user:edit',
    description: 'Allow editing existing users',
    createdAt: '2023-01-15',
  },
  {
    id: '3',
    name: 'user:delete',
    description: 'Allow deleting users',
    createdAt: '2023-01-15',
  },
  {
    id: '4',
    name: 'role:manage',
    description: 'Allow managing roles',
    createdAt: '2023-01-15',
  },
  {
    id: '5',
    name: 'content:create',
    description: 'Allow creating content',
    createdAt: '2023-02-20',
  },
  {
    id: '6',
    name: 'content:edit',
    description: 'Allow editing content',
    createdAt: '2023-02-20',
  },
  {
    id: '7',
    name: 'content:view',
    description: 'Allow viewing content',
    createdAt: '2023-02-20',
  },
])

// Form state
const isModalOpen = ref(false)
const isEditing = ref(false)
const isDeleteConfirmOpen = ref(false)
const permissionToDelete = ref<string | null>(null)
const formData = ref<PermissionForm>({
  name: '',
  description: '',
})

// Computed properties
const filteredPermissions = computed(() => permissions.value)

// Methods
const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    name: '',
    description: '',
  }
  isModalOpen.value = true
}

const openEditModal = (permission: Permission) => {
  isEditing.value = true
  formData.value = { ...permission }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const savePermission = () => {
  if (isEditing.value && formData.value.id) {
    // Edit existing permission
    const index = permissions.value.findIndex((p) => p.id === formData.value.id)
    if (index !== -1) {
      permissions.value[index] = { ...permissions.value[index], ...formData.value }
    }
  } else {
    // Create new permission
    const newPermission: Permission = {
      id: Date.now().toString(),
      ...formData.value,
      createdAt: new Date().toISOString().split('T')[0],
    }
    permissions.value.push(newPermission)
  }
  closeModal()
}

const openDeleteConfirm = (id: string) => {
  permissionToDelete.value = id
  isDeleteConfirmOpen.value = true
}

const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false
  permissionToDelete.value = null
}

const confirmDelete = () => {
  if (permissionToDelete.value) {
    deletePermission(permissionToDelete.value)
  }
  closeDeleteConfirm()
}

const deletePermission = (id: string) => {
  permissions.value = permissions.value.filter((permission) => permission.id !== id)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold">Permissions</h1>
        <p class="text-muted-foreground">Manage system permissions</p>
      </div>
      <Button @click="openCreateModal" class="mt-4 md:mt-0">
        <Plus class="h-4 w-4 mr-2" />
        Add Permission
      </Button>
    </div>

    <!-- Permissions table -->
    <div class="border rounded-lg overflow-x-auto max-w-full">
      <Table class="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead class="table-cell-nowrap">Name</TableHead>
            <TableHead class="table-cell-nowrap">Description</TableHead>
            <TableHead class="table-cell-nowrap">Created</TableHead>
            <TableHead class="text-right table-cell-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="permission in filteredPermissions" :key="permission.id">
            <TableCell class="font-medium table-cell-nowrap">{{ permission.name }}</TableCell>
            <TableCell class="table-cell-nowrap">{{ permission.description }}</TableCell>
            <TableCell class="table-cell-nowrap">{{ permission.createdAt }}</TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <Button variant="outline" size="sm" @click="openEditModal(permission)">
                  <Edit class="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" @click="openDeleteConfirm(permission.id)">
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
            This action cannot be undone. This will permanently delete the permission "{{
              permissions.find((p) => p.id === permissionToDelete)?.name
            }}" and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="closeDeleteConfirm">Cancel</AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Permission modal -->
    <Dialog v-model:open="isModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Edit Permission' : 'Add Permission' }}</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">Name</Label>
            <Input
              id="name"
              v-model="formData.name"
              class="col-span-3"
              placeholder="Enter permission name"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="description" class="text-right">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              class="col-span-3"
              placeholder="Enter permission description"
            />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="closeModal">Cancel</Button>
          <Button @click="savePermission">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
