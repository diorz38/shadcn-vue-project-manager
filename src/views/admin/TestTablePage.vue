<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { onMounted } from 'vue'

// Sample data
const testData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    status: 'Active',
    createdAt: '2023-01-15',
    description: 'This is a very long description that might cause overflow issues on mobile devices'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2023-02-20',
    description: 'Another long description to test overflow handling'
  }
]

onMounted(() => {
  // Debug function to check element widths
  const debugWidths = () => {
    console.log('=== Width Debugging ===')
    
    const body = document.body
    const html = document.documentElement
    const viewportWidth = window.innerWidth
    
    console.log('Viewport width:', viewportWidth)
    console.log('Body scrollWidth:', body.scrollWidth)
    console.log('HTML scrollWidth:', html.scrollWidth)
    
    const tableContainer = document.querySelector('.overflow-x-auto')
    const tableWrapper = document.querySelector('.relative.w-full.overflow-auto')
    const table = document.querySelector('table')
    
    if (tableContainer) {
      console.log('Table container offsetWidth:', tableContainer.offsetWidth)
      console.log('Table container scrollWidth:', tableContainer.scrollWidth)
    }
    
    if (tableWrapper) {
      console.log('Table wrapper offsetWidth:', tableWrapper.offsetWidth)
      console.log('Table wrapper scrollWidth:', tableWrapper.scrollWidth)
    }
    
    if (table) {
      console.log('Table offsetWidth:', table.offsetWidth)
      console.log('Table scrollWidth:', table.scrollWidth)
    }
    
    // Check for overflow
    if (body.scrollWidth > viewportWidth) {
      console.log('Body is causing horizontal overflow')
    }
    
    if (html.scrollWidth > viewportWidth) {
      console.log('HTML is causing horizontal overflow')
    }
    
    if (table && table.scrollWidth > viewportWidth) {
      console.log('Table is wider than viewport')
    }
  }
  
  // Run debug immediately and after a short delay
  debugWidths()
  setTimeout(debugWidths, 1000)
  
  // Also run on window resize
  window.addEventListener('resize', debugWidths)
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Test Table</h1>
      <p class="text-muted-foreground">Testing table overflow handling</p>
    </div>

    <!-- Test table with strict containment -->
    <div class="border rounded-lg overflow-x-auto max-w-full">
      <Table class="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead class="whitespace-nowrap">Name</TableHead>
            <TableHead class="whitespace-nowrap">Email</TableHead>
            <TableHead class="whitespace-nowrap">Role</TableHead>
            <TableHead class="whitespace-nowrap">Status</TableHead>
            <TableHead class="whitespace-nowrap">Created</TableHead>
            <TableHead class="whitespace-nowrap">Description</TableHead>
            <TableHead class="text-right whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in testData" :key="item.id">
            <TableCell class="font-medium whitespace-nowrap">{{ item.name }}</TableCell>
            <TableCell class="whitespace-nowrap">{{ item.email }}</TableCell>
            <TableCell class="whitespace-nowrap">{{ item.role }}</TableCell>
            <TableCell class="whitespace-nowrap">{{ item.status }}</TableCell>
            <TableCell class="whitespace-nowrap">{{ item.createdAt }}</TableCell>
            <TableCell class="whitespace-nowrap">{{ item.description }}</TableCell>
            <TableCell class="text-right whitespace-nowrap">
              <Button variant="outline" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>