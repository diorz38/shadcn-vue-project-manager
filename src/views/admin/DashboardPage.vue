<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

// Sample data for charts
const revenueChartOptions = ref({
  chart: {
    type: 'area' as const,
    height: 350,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth' as const,
  },
  xaxis: {
    type: 'datetime' as const,
    categories: [
      '2023-01-01',
      '2023-02-01',
      '2023-03-01',
      '2023-04-01',
      '2023-05-01',
      '2023-06-01',
      '2023-07-01',
      '2023-08-01',
      '2023-09-01',
      '2023-10-01',
      '2023-11-01',
      '2023-12-01',
    ],
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
  colors: ['#3b82f6'],
})

const revenueChartSeries = ref([
  {
    name: 'Revenue',
    data: [31000, 40000, 28000, 51000, 42000, 70000, 65000, 72000, 80000, 85000, 90000, 110000],
  },
])

const userChartOptions = ref({
  chart: {
    type: 'bar' as const,
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  fill: {
    opacity: 1,
  },
  colors: ['#10b981', '#3b82f6'],
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + ' users'
      },
    },
  },
})

const userChartSeries = ref([
  {
    name: 'New Users',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 75, 80],
  },
  {
    name: 'Active Users',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 100, 110, 120],
  },
])

// Sample data for tables
const recentProjects = ref([
  { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 75, team: 5 },
  { id: 2, name: 'Mobile App', status: 'Completed', progress: 100, team: 3 },
  { id: 3, name: 'API Integration', status: 'Pending', progress: 20, team: 2 },
  { id: 4, name: 'Database Migration', status: 'In Progress', progress: 60, team: 4 },
  { id: 5, name: 'Security Audit', status: 'Not Started', progress: 0, team: 2 },
])

const recentTasks = ref([
  {
    id: 1,
    title: 'Create wireframes',
    assignee: 'John Doe',
    priority: 'High',
    dueDate: '2023-06-15',
  },
  {
    id: 2,
    title: 'Implement auth',
    assignee: 'Jane Smith',
    priority: 'High',
    dueDate: '2023-06-20',
  },
  {
    id: 3,
    title: 'Write documentation',
    assignee: 'Robert Johnson',
    priority: 'Medium',
    dueDate: '2023-06-25',
  },
  {
    id: 4,
    title: 'Fix bug reports',
    assignee: 'Alice Brown',
    priority: 'Low',
    dueDate: '2023-06-30',
  },
  {
    id: 5,
    title: 'Performance testing',
    assignee: 'Charlie Wilson',
    priority: 'Medium',
    dueDate: '2023-07-05',
  },
])

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'In Progress':
      return 'bg-blue-100 text-blue-800'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Not Started':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'Low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground">Welcome to your admin dashboard</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2 mr-4">
          <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
          <div class="h-4 w-4 text-muted-foreground">$</div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">$45,231.89</div>
          <p class="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2 mr-4">
          <CardTitle class="text-sm font-medium">Subscriptions</CardTitle>
          <div class="h-4 w-4 text-muted-foreground">1256</div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+2350</div>
          <p class="text-xs text-muted-foreground">+180.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2 mr-4">
          <CardTitle class="text-sm font-medium">Sales</CardTitle>
          <div class="h-4 w-4 text-muted-foreground">_CART</div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+12,234</div>
          <p class="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2 mr-4">
          <CardTitle class="text-sm font-medium">Active Now</CardTitle>
          <div class="h-4 w-4 text-muted-foreground">_ACTIVITY</div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+573</div>
          <p class="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue for the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <VueApexCharts
            type="area"
            height="350"
            :options="revenueChartOptions"
            :series="revenueChartSeries"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>New vs Active users per month</CardDescription>
        </CardHeader>
        <CardContent>
          <VueApexCharts
            type="bar"
            height="350"
            :options="userChartOptions"
            :series="userChartSeries"
          />
        </CardContent>
      </Card>
    </div>

    <!-- Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Latest project updates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Team</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="project in recentProjects" :key="project.id">
                <TableCell class="font-medium">{{ project.name }}</TableCell>
                <TableCell>
                  <span :class="['px-2 py-1 rounded-full text-xs', getStatusClass(project.status)]">
                    {{ project.status }}
                  </span>
                </TableCell>
                <TableCell>
                  <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        class="bg-primary h-2 rounded-full"
                        :style="{ width: project.progress + '%' }"
                      ></div>
                    </div>
                    <span class="text-xs">{{ project.progress }}%</span>
                  </div>
                </TableCell>
                <TableCell>{{ project.team }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>Latest task assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="task in recentTasks" :key="task.id">
                <TableCell class="font-medium">{{ task.title }}</TableCell>
                <TableCell>{{ task.assignee }}</TableCell>
                <TableCell>
                  <span
                    :class="['px-2 py-1 rounded-full text-xs', getPriorityClass(task.priority)]"
                  >
                    {{ task.priority }}
                  </span>
                </TableCell>
                <TableCell>{{ task.dueDate }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
