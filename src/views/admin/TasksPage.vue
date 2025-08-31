<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'

// Task data model
interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  project_id: string
  user_id: string
  createdAt: string
  dueDate?: string
}

// Form data model
interface TaskForm {
  id?: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  project_id: string
  user_id: string
  dueDate?: string
}

// Project data model (for dropdown)
interface Project {
  id: string
  name: string
}

// User data model (for dropdown)
interface User {
  id: string
  name: string
}

// Sample project data
const projects = ref<Project[]>([
  { id: '1', name: 'Website Redesign' },
  { id: '2', name: 'Mobile App Development' },
  { id: '3', name: 'API Integration' },
  { id: '4', name: 'Database Migration' },
])

// Sample user data
const users = ref<User[]>([
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Robert Johnson' },
])

// Sample task data
const tasks = ref<Task[]>([
  {
    id: '1',
    title: 'Create wireframes',
    description: 'Design wireframes for the new homepage layout',
    status: 'completed',
    priority: 'high',
    project_id: '1',
    user_id: '1',
    createdAt: '2023-01-15',
    dueDate: '2023-01-20',
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Add user authentication to the mobile app',
    status: 'in-progress',
    priority: 'high',
    project_id: '2',
    user_id: '2',
    createdAt: '2023-02-20',
    dueDate: '2023-03-15',
  },
  {
    id: '3',
    title: 'Database optimization',
    description: 'Optimize database queries for better performance',
    status: 'todo',
    priority: 'medium',
    project_id: '4',
    user_id: '3',
    createdAt: '2023-03-10',
    dueDate: '2023-04-05',
  },
  {
    id: '4',
    title: 'API documentation',
    description: 'Write comprehensive documentation for the payment API',
    status: 'in-progress',
    priority: 'low',
    project_id: '3',
    user_id: '1',
    createdAt: '2023-04-05',
    dueDate: '2023-04-20',
  },
])

// Form state
const isModalOpen = ref(false)
const isEditing = ref(false)
const isDeleteConfirmOpen = ref(false)
const taskToDelete = ref<string | null>(null)
const formData = ref<TaskForm>({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  project_id: '',
  user_id: '',
  dueDate: '',
})

// Computed properties
const filteredTasks = computed(() => tasks.value)

// Methods
const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    project_id: '',
    user_id: '',
    dueDate: '',
  }
  isModalOpen.value = true
}

const openEditModal = (task: Task) => {
  isEditing.value = true
  formData.value = { ...task }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveTask = () => {
  if (isEditing.value && formData.value.id) {
    // Edit existing task
    const index = tasks.value.findIndex((t) => t.id === formData.value.id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...formData.value }
    }
  } else {
    // Create new task
    const newTask: Task = {
      id: Date.now().toString(),
      ...formData.value,
      createdAt: new Date().toISOString().split('T')[0],
    }
    tasks.value.push(newTask)
  }
  closeModal()
}

const openDeleteConfirm = (id: string) => {
  taskToDelete.value = id
  isDeleteConfirmOpen.value = true
}

const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false
  taskToDelete.value = null
}

const confirmDelete = () => {
  if (taskToDelete.value) {
    deleteTask(taskToDelete.value)
  }
  closeDeleteConfirm()
}

const deleteTask = (id: string) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'todo':
      return 'bg-gray-100 text-gray-800'
    case 'in-progress':
      return 'bg-blue-100 text-blue-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'todo':
      return 'To Do'
    case 'in-progress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    case 'cancelled':
      return 'Cancelled'
    default:
      return status
  }
}

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'bg-green-100 text-green-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'high':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getProjectName = (projectId: string) => {
  const project = projects.value.find((p) => p.id === projectId)
  return project ? project.name : 'Unknown Project'
}

const getUserName = (userId: string) => {
  const user = users.value.find((u) => u.id === userId)
  return user ? user.name : 'Unknown User'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold">Tasks</h1>
        <p class="text-muted-foreground">Manage tasks and assignments</p>
      </div>
      <Button @click="openCreateModal" class="mt-4 md:mt-0">
        <Plus class="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </div>

    <!-- Tasks grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card v-for="task in filteredTasks" :key="task.id" class="flex flex-col">
        <CardHeader>
          <div class="flex justify-between items-start">
            <CardTitle class="text-lg">{{ task.title }}</CardTitle>
            <span :class="['px-2 py-1 rounded-full text-xs', getStatusClass(task.status)]">
              {{ getStatusText(task.status) }}
            </span>
          </div>
          <CardDescription>{{ task.createdAt }}</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
          <p class="text-sm text-muted-foreground">
            {{ task.description }}
          </p>
          <div class="mt-4 space-y-2">
            <div class="flex items-center text-sm">
              <span class="font-medium mr-2">Project:</span>
              <span>{{ getProjectName(task.project_id) }}</span>
            </div>
            <div class="flex items-center text-sm">
              <span class="font-medium mr-2">Assignee:</span>
              <span>{{ getUserName(task.user_id) }}</span>
            </div>
            <div class="flex items-center text-sm">
              <span class="font-medium mr-2">Priority:</span>
              <span :class="['px-2 py-1 rounded-full text-xs', getPriorityClass(task.priority)]">
                {{ task.priority }}
              </span>
            </div>
            <div v-if="task.dueDate" class="flex items-center text-sm">
              <span class="font-medium mr-2">Due:</span>
              <span>{{ task.dueDate }}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline" size="sm" @click="openEditModal(task)">
            <Edit class="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" @click="openDeleteConfirm(task.id)">
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
            This action cannot be undone. This will permanently delete the task "{{
              tasks.find((t) => t.id === taskToDelete)?.title
            }}" and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="closeDeleteConfirm">Cancel</AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Task modal -->
    <Dialog v-model:open="isModalOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Edit Task' : 'Add Task' }}</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="title" class="text-right">Title</Label>
            <Input
              id="title"
              v-model="formData.title"
              class="col-span-3"
              placeholder="Enter task title"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="description" class="text-right">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              class="col-span-3"
              placeholder="Enter task description"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="project" class="text-right">Project</Label>
            <Select v-model="formData.project_id">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="project in projects" :key="project.id" :value="project.id">
                  {{ project.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="assignee" class="text-right">Assignee</Label>
            <Select v-model="formData.user_id">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }}
                </SelectItem>
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
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="priority" class="text-right">Priority</Label>
            <Select v-model="formData.priority">
              <SelectTrigger class="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="dueDate" class="text-right">Due Date</Label>
            <Input id="dueDate" v-model="formData.dueDate" type="date" class="col-span-3" />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="closeModal">Cancel</Button>
          <Button @click="saveTask">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
