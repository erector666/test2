import { HomeIcon, UserIcon, ChartBarIcon, InboxIcon, BellIcon } from '@heroicons/react/24/outline';

const navigation = [
 { name: 'Dashboard', icon: HomeIcon, current: true },
 { name: 'Users', icon: UserIcon, current: false },
 { name: 'Reports', icon: ChartBarIcon, current: false },
 { name: 'Inbox', icon: InboxIcon, current: false },
 { name: 'Notifications', icon: BellIcon, current: false }
];

function classNames(...classes) {
 return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
 return (
<div className="flex h-screen bg-gray-100">
 {/* Sidebar */}
<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
<div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white">
<div className="flex items-center flex-shrink-0 px-4">
<span className="text-xl font-bold text-gray-900">Dashboard</span>
</div>
<div className="mt-5 flex-1 flex flex-col">
<nav className="flex-1 px-2 space-y-1">
 {navigation.map((item) => (
<a
 key={item.name}
 href="#"
 className={classNames(
 item.current
 ? 'bg-blue-50 border-blue-500 text-blue-700'
 : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
 'group flex items-center px-2 py-2 text-sm font-medium rounded-md border-l-4'
 )}
 >
<item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
 {item.name}
</a>
 ))}
</nav>
</div>
</div>
</div>

 {/* Main Content */}
<div className="md:pl-64 flex flex-col flex-1">
<main className="flex-1">
<div className="py-6">
<div className="px-4 sm:px-6">
<h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
</div>
<div className="mt-4">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6">
 {[1,2,3,4].map((i) => (
<div key={i} className="bg-white overflow-hidden shadow rounded-lg">
<div className="px-4 py-5 sm:p-6">
<dt className="text-sm font-medium text-gray-500 truncate">Widget {i}</dt>
<dd className="mt-1 text-2xl font-semibold text-gray-900">12.3K</dd>
</div>
</div>
 ))}
</div>
</div>
<div className="mt-4">
<div className="bg-white overflow-hidden shadow rounded-lg">
<div className="px-4 py-5 sm:p-6">
<div className="flex items-center">
<div className="flex-shrink-0">
<ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
</div>
<div className="ml-5 w-0 flex-1">
<dl>
<dt className="text-sm font-medium text-gray-500 truncate">Performance Metrics</dt>
<dd className="flex items-baseline">
<div className="text-2xl font-semibold text-gray-900">84.7%</dd>
<div className="ml-2 flex items-center text-sm font-medium text-green-600">
<svg
 className="mr-1 h-5 w-5 flex-shrink-0 text-green-500"
 fill="currentColor"
 viewBox="002020"
 >
<path
 fillRule="evenodd"
 d="M5.237.21a.75.750011.06.02L1011.44l4.71-4.24a.75.750111.081.04L10.7512.56l-4.98-4.34a.75.75001-.01-1.05z"
 clipRule="evenodd"
 />
</svg>
12.3% from last month
</div>
</dd>
</dl>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
</div>
 );
}
