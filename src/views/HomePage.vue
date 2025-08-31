<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Menu,
  User,
  LogIn,
  Home,
  Folder,
  CheckSquare,
  Users,
  Shield,
  Settings,
  Github,
  Sun,
  Moon,
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)
const isDarkMode = ref(false)

const navigationItems = [
  { name: 'Beranda', icon: Home, path: '/' },
  { name: 'Proyek', icon: Folder, path: '/admin/projects' },
  { name: 'Tugas', icon: CheckSquare, path: '/admin/tasks' },
  { name: 'Pengguna', icon: Users, path: '/admin/users' },
]

const adminItems = [
  { name: 'Peran', icon: Shield, path: '/admin/roles' },
  { name: 'Hak Akses', icon: Shield, path: '/admin/permissions' },
  { name: 'Pengaturan', icon: Settings, path: '/admin/settings' },
]

const features = [
  {
    title: 'Manajemen Proyek',
    description: 'Buat, atur, dan pantau semua proyek Anda dalam satu tempat dengan alat yang intuitif.',
    icon: Folder,
  },
  {
    title: 'Pelacakan Tugas',
    description: 'Pecah proyek menjadi tugas-tugas yang dapat dikelola dan pantau kemajuan secara real-time.',
    icon: CheckSquare,
  },
  {
    title: 'Kolaborasi Tim',
    description: 'Berikan tugas, bagikan pembaruan, dan berkomunikasi dengan tim Anda dengan lancar.',
    icon: Users,
  },
]

const techStack = [
  { name: 'Vue 3', category: 'Inti' },
  { name: 'Vite', category: 'Bundler' },
  { name: 'shadcn-vue', category: 'UI' },
  { name: 'TypeScript', category: 'Bahasa' },
  { name: 'Tailwind CSS', category: 'Styling' },
]

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

const goToLogin = () => {
  // Untuk saat ini, kita akan mengarahkan ke dashboard admin sebagai placeholder
  router.push('/admin')
}

// Periksa preferensi tema yang disimpan atau ikuti preferensi OS
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
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md">
      <div class="container max-w-4xl flex h-16 items-center justify-between px-4 mx-auto">
        <!-- Logo/Brand -->
        <div class="flex items-center gap-2">
          <div class="bg-primary p-2 rounded-lg">
            <Home class="h-6 w-6 text-primary-foreground" />
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manajer Proyek
          </span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.path"
            class="text-sm font-medium transition-colors hover:text-primary"
            active-class="text-primary font-semibold"
          >
            {{ item.name }}
          </RouterLink>

          <!-- Admin Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="flex items-center gap-1">
                Admin
                <Shield class="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-48">
              <DropdownMenuItem
                v-for="item in adminItems"
                :key="item.name"
                @click="router.push(item.path)"
                class="cursor-pointer"
              >
                <component :is="item.icon" class="h-4 w-4 mr-2" />
                {{ item.name }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <!-- Right Side Buttons -->
        <div class="flex items-center gap-2">
          <!-- Dark/Light Mode Toggle -->
          <Button @click="toggleDarkMode" variant="ghost" size="icon" class="rounded-full">
            <Sun v-if="isDarkMode" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
            <span class="sr-only">Ubah tema</span>
          </Button>
          
          <!-- Login Button -->
          <Button @click="goToLogin" variant="default" class="hidden md:flex items-center gap-2">
            <LogIn class="h-4 w-4" />
            Masuk
          </Button>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <DropdownMenu v-model:open="isMenuOpen">
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">
                  <Menu class="h-6 w-6" />
                  <span class="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-56">
                <div class="flex flex-col gap-1">
                  <RouterLink
                    v-for="item in navigationItems"
                    :key="item.name"
                    :to="item.path"
                    @click="isMenuOpen = false"
                    class="px-2 py-1 text-sm font-medium rounded hover:bg-accent"
                  >
                    <component :is="item.icon" class="h-4 w-4 inline mr-2" />
                    {{ item.name }}
                  </RouterLink>
                  <div class="border-t my-1"></div>
                  <RouterLink
                    v-for="item in adminItems"
                    :key="item.name"
                    :to="item.path"
                    @click="isMenuOpen = false"
                    class="px-2 py-1 text-sm font-medium rounded hover:bg-accent"
                  >
                    <component :is="item.icon" class="h-4 w-4 inline mr-2" />
                    {{ item.name }}
                  </RouterLink>
                  <div class="border-t my-1"></div>
                  <Button @click="goToLogin" variant="default" class="w-full">
                    <LogIn class="h-4 w-4 mr-2" />
                    Masuk
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content - Centered Layout -->
    <main class="flex-1 flex flex-col items-center justify-center py-12 md:py-24">
      <div class="container max-w-4xl px-4 text-center space-y-12">
        <!-- Hero Section -->
        <div class="space-y-8">
          <div class="space-y-6">
            <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
              Manajemen Proyek Jadi <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mudah</span>
            </h1>
            <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Solusi manajemen proyek yang kuat namun intuitif, dibangun dengan Vue 3, Vite, dan komponen shadcn-vue. 
              Sederhanakan alur kerja Anda dan kolaborasi dengan tim secara efisien.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button @click="goToLogin" size="lg" class="text-base px-8 py-6 rounded-full">
              Memulai
            </Button>
            <Button variant="outline" size="lg" class="text-base px-8 py-6 rounded-full">
              Lihat Demo
            </Button>
          </div>
        </div>

        <!-- Dashboard Preview -->
        <div class="relative w-full max-w-2xl mx-auto">
          <div class="absolute -inset-4 bg-primary/20 rounded-3xl blur-xl opacity-70"></div>
          <div class="relative bg-background border rounded-2xl p-6 space-y-6 shadow-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-red-500"></div>
                <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div class="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div class="text-sm text-muted-foreground">Dasbor Proyek</div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-primary/5 rounded-lg p-4 hover:bg-primary/10 transition-colors">
                <div class="text-2xl font-bold">24</div>
                <div class="text-sm text-muted-foreground">Proyek</div>
              </div>
              <div class="bg-primary/5 rounded-lg p-4 hover:bg-primary/10 transition-colors">
                <div class="text-2xl font-bold">142</div>
                <div class="text-sm text-muted-foreground">Tugas</div>
              </div>
              <div class="bg-primary/5 rounded-lg p-4 hover:bg-primary/10 transition-colors">
                <div class="text-2xl font-bold">18</div>
                <div class="text-sm text-muted-foreground">Anggota Tim</div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="h-3 bg-primary/20 rounded w-full"></div>
              <div class="h-3 bg-primary/20 rounded w-5/6"></div>
              <div class="h-3 bg-primary/20 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div class="space-y-8 pt-12">
          <div class="space-y-4">
            <h2 class="text-3xl font-bold">Semua yang Anda butuhkan untuk mengelola proyek</h2>
            <p class="text-muted-foreground max-w-xl mx-auto">
              Fitur-fitur kuat yang dirancang untuk membantu Anda dan tim tetap terorganisir dan produktif.
            </p>
          </div>
          
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              class="space-y-4 rounded-xl border p-6 text-left hover:shadow-lg transition-all hover:border-primary/30 hover:-translate-y-1"
            >
              <div class="p-3 bg-primary/10 rounded-lg w-fit">
                <component :is="feature.icon" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="text-xl font-bold">{{ feature.title }}</h3>
              <p class="text-muted-foreground">{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <!-- Tech Stack Section -->
        <div class="space-y-8 pt-12 bg-muted/50 rounded-2xl p-8">
          <div class="space-y-4">
            <h2 class="text-3xl font-bold">Dibangun dengan Teknologi Modern</h2>
            <p class="text-muted-foreground max-w-xl mx-auto">
              Memanfaatkan teknologi web terkini untuk kinerja optimal dan pengalaman pengembang.
            </p>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-6">
            <div 
              v-for="(tech, index) in techStack" 
              :key="index"
              class="bg-background border rounded-lg p-4 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow"
            >
              <div class="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Settings class="h-5 w-5 text-primary" />
              </div>
              <div class="font-medium">{{ tech.name }}</div>
              <div class="text-xs text-muted-foreground bg-primary/5 px-2 py-1 rounded">
                {{ tech.category }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t">
      <div class="container max-w-4xl flex flex-col items-center justify-between gap-2 py-4 md:h-16 md:flex-row mx-auto px-4">
        <div class="flex flex-col items-center gap-2 md:flex-row md:gap-2">
          <div class="flex items-center gap-2">
            <div class="bg-primary p-1 rounded-lg">
              <Home class="h-4 w-4 text-primary-foreground" />
            </div>
            <span class="text-lg font-semibold">Manajer Proyek</span>
          </div>
          <p class="text-center text-sm text-muted-foreground md:text-left">
            Dibangun dengan Vue 3 dan shadcn-vue
          </p>
        </div>
        <div class="flex items-center gap-1">
          <Button variant="ghost" size="icon" class="h-8 w-8">
            <Github class="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" class="h-8 w-8">
            <User class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  </div>
</template>