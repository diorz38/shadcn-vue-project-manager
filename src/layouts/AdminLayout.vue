<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Menu,
  User,
  Settings,
  Folder,
  CheckSquare,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  Users,
  Shield,
  Home,
  Table,
} from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

const router = useRouter()
const sidebarOpen = ref(false)
const isDarkMode = ref(false)

const navigationItems = [
  { name: 'Dashboard', icon: Home, path: '/admin' },
  { name: 'Projects', icon: Folder, path: '/admin/projects' },
  { name: 'Tasks', icon: CheckSquare, path: '/admin/tasks' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
  { name: 'Test Table', icon: Table, path: '/admin/test-table' },
]

const user = {
  name: 'Admin User',
  email: 'admin@example.com',
}

const goToProfile = () => {
  router.push('/admin/profile')
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Check for saved theme preference or respect OS preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <div class="flex min-h-screen max-w-full overflow-x-hidden">
    <!-- Mobile sidebar trigger -->
    <div class="fixed top-4 left-4 z-50 md:hidden">
      <Sheet v-model:open="sidebarOpen">
        <SheetTrigger as-child>
          <Button variant="outline" size="icon">
            <Menu class="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="w-64 p-0">
          <SheetHeader class="p-4 border-b">
            <SheetTitle>Admin Panel</SheetTitle>
          </SheetHeader>
          <div class="p-4">
            <nav class="space-y-2">
              <RouterLink
                v-for="item in navigationItems"
                :key="item.name"
                :to="item.path"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                exact-active-class="bg-accent text-accent-foreground"
                @click="sidebarOpen = false"
              >
                <component :is="item.icon" class="h-4 w-4" />
                {{ item.name }}
              </RouterLink>

              <!-- Admin dropdown menu for mobile -->
              <div class="pt-4 mt-4 border-t">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" class="w-full justify-between">
                      <span class="flex items-center gap-3">
                        <Shield class="h-4 w-4" />
                        Admin
                      </span>
                      <ChevronDown class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" class="w-48">
                    <DropdownMenuItem @click="router.push('/admin/users')">
                      <Users class="h-4 w-4 mr-2" />
                      Users
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="router.push('/admin/roles')">
                      <Shield class="h-4 w-4 mr-2" />
                      Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="router.push('/admin/permissions')">
                      <Shield class="h-4 w-4 mr-2" />
                      Permissions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Desktop sidebar -->
    <aside class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div class="flex flex-col flex-grow border-r bg-background">
        <div class="flex items-center h-16 px-4 border-b shrink-0">
          <h1 class="text-lg font-semibold">Admin Panel</h1>
        </div>
        <div class="flex flex-col flex-grow overflow-y-auto">
          <nav class="flex-1 px-2 py-4 space-y-1">
            <RouterLink
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.path"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              exact-active-class="bg-accent text-accent-foreground"
            >
              <component :is="item.icon" class="h-4 w-4" />
              {{ item.name }}
            </RouterLink>

            <!-- Admin dropdown menu for desktop -->
            <div class="pt-4 mt-4 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="w-full justify-between">
                    <span class="flex items-center gap-3">
                      <Shield class="h-4 w-4" />
                      Admin
                    </span>
                    <ChevronDown class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" class="w-48">
                  <DropdownMenuItem @click="router.push('/admin/users')">
                    <Users class="h-4 w-4 mr-2" />
                    Users
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="router.push('/admin/roles')">
                    <Shield class="h-4 w-4 mr-2" />
                    Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="router.push('/admin/permissions')">
                    <Shield class="h-4 w-4 mr-2" />
                    Permissions
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex flex-col flex-1 md:ml-64 max-w-full overflow-x-hidden">
      <!-- Header -->
      <header class="flex items-center justify-between h-16 px-4 border-b shrink-0 sticky top-0 z-40 bg-background md:relative md:top-auto">
        <div></div>
        <!-- Spacer for mobile -->
        <div class="flex items-center gap-4">
          <Button variant="ghost" size="icon" @click="toggleDarkMode">
            <Sun v-if="isDarkMode" class="h-4 w-4" />
            <Moon v-else class="h-4 w-4" />
            <span class="sr-only">Toggle theme</span>
          </Button>
          <div
            class="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md transition-colors"
            @click="goToProfile"
          >
            <div
              class="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
            >
              <User class="h-4 w-4" />
            </div>
            <div class="hidden md:block">
              <p class="text-sm font-medium">{{ user.name }}</p>
              <p class="text-xs text-muted-foreground">{{ user.email }}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut class="h-4 w-4" />
          </Button>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 max-w-full">
        <RouterView />
      </main>
    </div>
  </div>
</template>