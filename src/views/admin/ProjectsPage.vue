<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'

// Project data model
interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold'
  createdAt: string
}

// Form data model
interface ProjectForm {
  id?: string
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold'
}

// Sample project data
const projects = ref<Project[]>([
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website with modern UI/UX',
    status: 'active',
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Development of cross-platform mobile application',
    status: 'active',
    createdAt: '2023-02-20',
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integration with third-party payment providers',
    status: 'completed',
    createdAt: '2023-03-10',
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migrate legacy database to cloud infrastructure',
    status: 'on-hold',
    createdAt: '2023-04-05',
  },
])

// Form state
const isModalOpen = ref(false)
const isEditing = ref(false)
const isDeleteConfirmOpen = ref(false)
const projectToDelete = ref<string | null>(null)
const formData = ref<ProjectForm>({
  name: '',
  description: '',
  status: 'active',
})

// Computed properties
const filteredProjects = computed(() => projects.value)

// Methods
const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    name: '',
    description: '',
    status: 'active',
  }
  isModalOpen.value = true
}

const openEditModal = (project: Project) => {
  isEditing.value = true
  formData.value = { ...project }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveProject = () => {
  if (isEditing.value && formData.value.id) {
    // Edit existing project
    const index = projects.value.findIndex((p) => p.id === formData.value.id)
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...formData.value }
    }
  } else {
    // Create new project
    const newProject: Project = {
      id: Date.now().toString(),
      ...formData.value,
      createdAt: new Date().toISOString().split('T')[0],
    }
    projects.value.push(newProject)
  }
  closeModal()
}

const openDeleteConfirm = (id: string) => {
  projectToDelete.value = id
  isDeleteConfirmOpen.value = true
}

const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false
  projectToDelete.value = null
}

const confirmDelete = () => {
  if (projectToDelete.value) {
    deleteProject(projectToDelete.value)
  }
  closeDeleteConfirm()
}

const deleteProject = (id: string) => {
  projects.value = projects.value.filter((project) => project.id !== id)
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    case 'on-hold':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Active'
    case 'completed':
      return 'Completed'
    case 'on-hold':
      return 'On Hold'
    default:
      return status
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold">Projects</h1>
        <p class="text-muted-foreground">Manage your projects and their status</p>
      </div>
      <Button @click="openCreateModal" class="mt-4 md:mt-0">
        <Plus class="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card v-for="project in filteredProjects" :key="project.id" class="flex flex-col">
        <CardHeader>
          <div class="flex justify-between items-start">
            <CardTitle class="text-lg">{{ project.name }}</CardTitle>
            <span :class="['px-2 py-1 rounded-full text-xs', getStatusClass(project.status)]">
              {{ getStatusText(project.status) }}
            </span>
          </div>
          <CardDescription>{{ project.createdAt }}</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
          <p class="text-sm text-muted-foreground">
            {{ project.description }}
          </p>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline" size="sm" @click="openEditModal(project)">
            <Edit class="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" @click="openDeleteConfirm(project.id)">
            <Trash2 class="h-4 w-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>

    <!-- Delete confirmation dialog -->
    <AlertDialog v-model:open="isDeleteConfirmOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the project "{{
              projects.find((p) => p.id === projectToDelete)?.name
            }}" and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="closeDeleteConfirm">Cancel</AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Project modal -->
    <Dialog v-model:open="isModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Edit Project' : 'Add Project' }}</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">Name</Label>
            <Input
              id="name"
              v-model="formData.name"
              class="col-span-3"
              placeholder="Enter project name"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="description" class="text-right">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              class="col-span-3"
              placeholder="Enter project description"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="status" class="text-right">Status</Label>
            <Select v-model="formData.status">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="closeModal">Cancel</Button>
          <Button @click="saveProject">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
