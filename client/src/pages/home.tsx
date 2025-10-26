import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ComponentPlayground from "@/components/playground/component-playground";
import { LibraryButton } from "@/components/library/button";
import { LibraryAccordion } from "@/components/library/accordion";
import { LibraryCarousel } from "@/components/library/carousel";
import { LibraryContainer } from "@/components/library/container";
import { LibraryNavigation } from "@/components/library/navigation";
import { LibraryCard } from "@/components/library/card";
import { LibrarySearchBar } from "@/components/library/search-bar";
import { LibraryModal } from "@/components/library/modal";
import { LibraryForm, FormField, FormLabel, Input } from "@/components/library/form";
import { LibraryTable } from "@/components/library/table";
import { SimpleTabs } from "@/components/library/tabs";
import { LibraryAlert } from "@/components/library/alert";
import { LibraryBadge } from "@/components/library/badge";
import { LibraryBreadcrumb } from "@/components/library/breadcrumb";
import { LibraryPagination } from "@/components/library/pagination";
import { LibraryProgress } from "@/components/library/progress";
import { LibrarySlider } from "@/components/library/slider";
import { HoverTooltip } from "@/components/library/tooltip";
import { LibraryAvatar } from "@/components/library/avatar";
import { ScrollToTopFab } from "@/components/library/fab";
import { Box, Save, Trash2, ChevronRight, CreditCard, Search, FileText, Grid3x3, AlertCircle, Badge, Layers, Navigation, Gauge, Settings, MessageSquare, UserCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for table
  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  const tableColumns = [
    { key: "name", title: "Name", dataIndex: "name" as const },
    { key: "email", title: "Email", dataIndex: "email" as const },
    { key: "role", title: "Role", dataIndex: "role" as const },
  ];

  const tabItems = [
    { label: "Tab 1", value: "tab1", content: <div className="p-4">Content for Tab 1</div> },
    { label: "Tab 2", value: "tab2", content: <div className="p-4">Content for Tab 2</div> },
  ];

  const scrollToComponents = () => {
    const element = document.getElementById("components");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-dxp-light">
      <Header />
      
      {/* Hero Section */}
      <section className="dxp-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">React Component Library</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Professional, reusable components built with TypeScript and modern React patterns. 
              Designed for enterprise applications with accessibility and performance in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToComponents}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Explore Components
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16" id="components">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Component Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">39</div>
              <div className="text-gray-600 font-medium">Components</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <div className="text-gray-600 font-medium">Variants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600 font-medium">TypeScript</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">WCAG</div>
              <div className="text-gray-600 font-medium">Compliant</div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Component Library</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of production-ready React components designed for scalability, 
              accessibility, and seamless integration into your applications.
            </p>
          </div>

          {/* Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Button Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Button</h3>
                <div className="component-tag">Interactive</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Versatile button component with multiple variants including primary, secondary, 
                save, and delete actions. Supports loading states and icons.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  <LibraryButton variant="primary">Primary</LibraryButton>
                  <LibraryButton variant="secondary">Secondary</LibraryButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  <LibraryButton variant="success" icon={<Save className="w-4 h-4" />}>
                    Save
                  </LibraryButton>
                  <LibraryButton variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                    Delete
                  </LibraryButton>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">4 variants</span>
                <Link href="/component/button" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Accordion Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Accordion</h3>
                <div className="component-tag">Layout</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Collapsible content panels with smooth animations. Supports single or multiple 
                panel expansion with customizable icons and styling.
              </p>
              
              <div className="mb-6">
                <LibraryAccordion
                  items={[
                    {
                      title: "Getting Started",
                      content: "This panel contains information about getting started with the component library."
                    },
                    {
                      title: "Advanced Usage",
                      content: "Learn about advanced features and customization options."
                    }
                  ]}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Animated transitions</span>
                <Link href="/component/accordion" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Carousel Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Carousel</h3>
                <div className="component-tag">Media</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Image and content carousel with navigation controls, auto-play functionality, 
                and touch/swipe support for mobile devices.
              </p>
              
              <div className="mb-6">
                <LibraryCarousel
                  items={[
                    {
                      type: "image",
                      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200",
                      alt: "Modern office workspace"
                    },
                    {
                      type: "image",
                      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200",
                      alt: "Team collaboration"
                    },
                    {
                      type: "image", 
                      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200",
                      alt: "Digital interface on tablet"
                    }
                  ]}
                  className="h-32"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Auto-play supported</span>
                <Link href="/component/carousel" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Container Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Container</h3>
                <div className="component-tag">Layout</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Flexible layout container with responsive grid system. Supports various 
                spacing options, background styles, and content alignment.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-2">Grid Layout</div>
                  <LibraryContainer layout="grid" cols={3} gap="sm">
                    <div className="bg-blue-50 rounded h-8 flex items-center justify-center text-xs text-blue-600">1</div>
                    <div className="bg-blue-50 rounded h-8 flex items-center justify-center text-xs text-blue-600">2</div>
                    <div className="bg-blue-50 rounded h-8 flex items-center justify-center text-xs text-blue-600">3</div>
                  </LibraryContainer>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-2">Flex Layout</div>
                  <LibraryContainer layout="flex" gap="sm">
                    <div className="bg-blue-50 rounded h-8 flex-1 flex items-center justify-center text-xs text-blue-600">Auto</div>
                    <div className="bg-blue-50 rounded h-8 px-3 flex items-center justify-center text-xs text-blue-600">Fixed</div>
                  </LibraryContainer>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Responsive grid</span>
                <Link href="/component/container" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Navigation Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Navigation</h3>
                <div className="component-tag">Structure</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Responsive navigation component with dropdown menus, mobile hamburger menu, 
                and breadcrumb support. Includes accessibility features.
              </p>
              
              <div className="border border-gray-200 rounded-lg mb-6">
                <LibraryNavigation
                  logo="Logo"
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "About", href: "/about" }
                  ]}
                  breadcrumbs={["Home", "Components", "Navigation"]}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Mobile responsive</span>
                <Link href="/component/navigation" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Card Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Card</h3>
                <div className="component-tag">Display</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Flexible card container for displaying content with optional headers, footers, 
                images, and interactive elements. Multiple variants and sizes available.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <LibraryCard
                  variant="elevated"
                  title="Sample Card"
                  subtitle="This is a subtitle"
                  actions={
                    <div className="flex gap-2">
                      <LibraryButton size="sm" variant="primary">Action</LibraryButton>
                      <LibraryButton size="sm" variant="secondary">Cancel</LibraryButton>
                    </div>
                  }
                >
                  <p className="text-gray-600 text-sm">Card content goes here with sample text to show how it displays.</p>
                </LibraryCard>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">4 variants</span>
                <Link href="/component/card" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Search Bar Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Search Bar</h3>
                <div className="component-tag">Input</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Advanced search input with autocomplete, filters, and customizable styling. 
                Supports suggestions and various search patterns.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <LibrarySearchBar
                  placeholder="Search components..."
                  value={searchValue}
                  onChange={setSearchValue}
                  showFilter={true}
                  suggestions={["Button", "Card", "Modal", "Table"]}
                  autoComplete={true}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Auto-complete support</span>
                <Link href="/component/search-bar" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Modal Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Modal</h3>
                <div className="component-tag">Overlay</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Accessible modal dialogs with backdrop blur, focus management, 
                and keyboard navigation. Multiple sizes and overlay styles.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <LibraryButton onClick={() => setIsModalOpen(true)}>
                  Open Modal Demo
                </LibraryButton>
                <LibraryModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Demo Modal"
                  description="This is a sample modal dialog"
                >
                  <p className="text-gray-600">Modal content goes here. You can add forms, images, or any other content.</p>
                </LibraryModal>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">5 sizes</span>
                <Link href="/component/modal" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Form Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Form</h3>
                <div className="component-tag">Input</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Complete form system with validation, error handling, and various input types. 
                Includes checkbox, radio, select, and textarea components.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <LibraryForm className="space-y-3">
                  <FormField>
                    <FormLabel htmlFor="demo-name">Name</FormLabel>
                    <Input id="demo-name" placeholder="Enter your name" />
                  </FormField>
                  <FormField>
                    <FormLabel htmlFor="demo-email">Email</FormLabel>
                    <Input id="demo-email" type="email" placeholder="Enter your email" />
                  </FormField>
                </LibraryForm>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">8 input types</span>
                <Link href="/component/form" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Table Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Table</h3>
                <div className="component-tag">Display</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Feature-rich data table with sorting, pagination, row selection, 
                and responsive design. Perfect for displaying structured data.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6 overflow-hidden">
                <LibraryTable
                  columns={tableColumns}
                  data={tableData}
                  size="sm"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Sorting & pagination</span>
                <Link href="/component/table" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Tabs Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Tabs</h3>
                <div className="component-tag">Navigation</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Accessible tab component with keyboard navigation and multiple styles. 
                Supports horizontal and vertical orientations.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <SimpleTabs
                  items={tabItems}
                  variant="pills"
                  className="text-sm"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">4 variants</span>
                <Link href="/component/tabs" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Alert Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Alert</h3>
                <div className="component-tag">Feedback</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Alert messages for user notifications with multiple severity levels. 
                Supports dismissible alerts and custom actions.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6 space-y-2">
                <LibraryAlert variant="success" title="Success!" size="sm">
                  Your changes have been saved successfully.
                </LibraryAlert>
                <LibraryAlert variant="warning" title="Warning" size="sm">
                  Please review your input before continuing.
                </LibraryAlert>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">5 types</span>
                <Link href="/component/alert" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Badge Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Badge</h3>
                <div className="component-tag">Indicator</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Small status indicators and count badges for UI elements. 
                Supports dot indicators, number counts, and various color variants.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex items-center gap-3">
                  <LibraryBadge variant="success">Active</LibraryBadge>
                  <LibraryBadge variant="warning">Pending</LibraryBadge>
                  <LibraryBadge variant="destructive">Error</LibraryBadge>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">7 variants</span>
                <Link href="/component/badge" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Breadcrumb Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Breadcrumb</h3>
                <div className="component-tag">Navigation</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Navigation breadcrumb for showing current page location. 
                Supports custom separators and home icon display.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <LibraryBreadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Components" }
                  ]}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Customizable</span>
                <Link href="/component/breadcrumb" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Pagination Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Pagination</h3>
                <div className="component-tag">Navigation</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Page navigation component with first/last buttons and ellipsis for large datasets. 
                Supports multiple sizes and variants.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6 flex justify-center">
                <LibraryPagination
                  currentPage={2}
                  totalPages={5}
                  onPageChange={() => {}}
                  size="sm"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Responsive</span>
                <Link href="/component/pagination" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Progress Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Progress</h3>
                <div className="component-tag">Feedback</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Progress indicators for loading states and task completion. 
                Includes linear, circular, and step progress variants.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6 space-y-3">
                <LibraryProgress value={65} size="sm" />
                <LibraryProgress value={85} variant="success" size="sm" />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">3 types</span>
                <Link href="/component/progress" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Slider Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Slider</h3>
                <div className="component-tag">Input</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Interactive slider for value selection with range support. 
                Includes vertical orientation and custom marks.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <LibrarySlider
                  value={40}
                  min={0}
                  max={100}
                  className="max-w-48 mx-auto"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Range support</span>
                <Link href="/component/slider" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Tooltip Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Tooltip</h3>
                <div className="component-tag">Overlay</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Contextual tooltips with multiple placement options. 
                Supports hover, click, and focus triggers.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6 flex justify-center">
                <HoverTooltip content="Helpful information">
                  <LibraryButton size="sm">Hover me</LibraryButton>
                </HoverTooltip>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">4 positions</span>
                <Link href="/component/tooltip" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Avatar Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Avatar</h3>
                <div className="component-tag">Display</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                User avatar component with fallback initials and status badges. 
                Supports multiple sizes and avatar groups.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <LibraryAvatar size="sm" fallback="JS" showBadge badgeColor="green" />
                  <LibraryAvatar size="md" fallback="AD" />
                  <LibraryAvatar size="lg" fallback="MK" showBadge badgeColor="red" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">6 sizes</span>
                <Link href="/component/avatar" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>



            {/* Dropdown Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Dropdown</h3>
                <div className="component-tag">Interactive</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Flexible dropdown menus with search, multi-select, and custom options.
                Perfect for forms and action menus.
              </p>
              
              <div className="flex justify-center mb-6">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  Select Option
                  <ChevronRight className="w-4 h-4 transform rotate-90" />
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Multi-select</span>
                <Link href="/component/dropdown" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Stepper Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Stepper</h3>
                <div className="component-tag">Navigation</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Multi-step navigation component for wizards and processes.
                Shows progress through sequential steps with validation.
              </p>
              
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <div className="w-8 h-0.5 bg-blue-600"></div>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Process flows</span>
                <Link href="/component/stepper" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Chip Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Chip</h3>
                <div className="component-tag">Display</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Compact elements for tags, filters, and selected options.
                Supports deletable chips and custom styling.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">React</div>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">TypeScript</div>
                <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center gap-1">
                  Tailwind
                  <button className="w-4 h-4 text-purple-600 hover:bg-purple-200 rounded-full">×</button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Deletable</span>
                <Link href="/component/chip" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Timeline Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Timeline</h3>
                <div className="component-tag">Display</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Visual timeline for displaying chronological events and processes.
                Supports different orientations and custom styling.
              </p>
              
              <div className="mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-medium">Project Started</div>
                      <div className="text-gray-500 text-xs">Jan 15, 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-medium">Development Phase</div>
                      <div className="text-gray-500 text-xs">Feb 1, 2024</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Horizontal & vertical</span>
                <Link href="/component/timeline" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Spinner Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Spinner</h3>
                <div className="component-tag">Feedback</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Loading indicators for async operations and data fetching.
                Multiple sizes and animation styles available.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Multiple sizes</span>
                <Link href="/component/spinner" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Calendar Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Calendar</h3>
                <div className="component-tag">Input</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Date selection component with month navigation and event support.
                Supports date ranges and custom highlighting.
              </p>
              
              <div className="flex justify-center mb-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-2">December 2024</div>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    <div className="text-gray-400">S</div>
                    <div className="text-gray-400">M</div>
                    <div className="text-gray-400">T</div>
                    <div className="text-gray-400">W</div>
                    <div className="text-gray-400">T</div>
                    <div className="text-gray-400">F</div>
                    <div className="text-gray-400">S</div>
                    <div className="p-1">1</div>
                    <div className="p-1">2</div>
                    <div className="p-1">3</div>
                    <div className="p-1">4</div>
                    <div className="p-1">5</div>
                    <div className="p-1">6</div>
                    <div className="p-1">7</div>
                    <div className="p-1">8</div>
                    <div className="p-1">9</div>
                    <div className="p-1">10</div>
                    <div className="p-1">11</div>
                    <div className="p-1 bg-blue-600 text-white rounded">12</div>
                    <div className="p-1">13</div>
                    <div className="p-1">14</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Date ranges</span>
                <Link href="/component/calendar" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Rating Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Rating</h3>
                <div className="component-tag">Input</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Star rating component for reviews and feedback.
                Supports half-stars and custom icons.
              </p>
              
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-lg">★★★★☆</span>
                  <span className="text-sm text-gray-500 ml-2">4.0 out of 5</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Half-star support</span>
                <Link href="/component/rating" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Toast Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Toast</h3>
                <div className="component-tag">Feedback</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Temporary notification messages that appear at screen edges.
                Support success, error, warning, and info variants.
              </p>
              
              <div className="relative bg-gray-50 rounded border h-16 mb-6 overflow-hidden">
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-2 rounded text-sm">
                  ✓ Success message
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Auto-dismiss</span>
                <Link href="/component/toast" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Collapse Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Collapse</h3>
                <div className="component-tag">Layout</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Collapsible content panels with smooth animations.
                Perfect for FAQs, content sections, and space-saving layouts.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="border border-gray-200 rounded">
                  <div className="p-3 bg-gray-50 flex items-center justify-between">
                    <span className="font-medium text-sm">Show Details</span>
                    <ChevronRight className="w-4 h-4 transform rotate-90" />
                  </div>
                  <div className="p-3 text-sm text-gray-600">
                    Content is now visible when expanded.
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Smooth transitions</span>
                <Link href="/component/collapse" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Divider Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Divider</h3>
                <div className="component-tag">Layout</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Visual separators for content sections and layout organization.
                Horizontal and vertical orientations with custom styling.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-gray-600">Section 1</div>
                  <hr className="my-2 border-gray-300" />
                  <div className="text-sm text-gray-600">Section 2</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Left</span>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <span className="text-sm text-gray-600">Right</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Horizontal & vertical</span>
                <Link href="/component/divider" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* List Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">List</h3>
                <div className="component-tag">Display</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Flexible list component with icons, actions, and custom styling.
                Supports various layouts and interactive elements.
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <UserCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-500">Administrator</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <UserCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">Jane Smith</div>
                    <div className="text-xs text-gray-500">Editor</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Interactive items</span>
                <Link href="/component/list" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Snackbar Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Snackbar</h3>
                <div className="component-tag">Feedback</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Brief notification messages that appear at the bottom of the screen.
                Ideal for user feedback and status updates.
              </p>
              
              <div className="relative bg-gray-50 rounded border h-16 mb-6 overflow-hidden">
                <div className="absolute bottom-2 left-2 right-2 bg-gray-800 text-white px-3 py-2 rounded text-sm flex items-center justify-between">
                  <span>Action completed successfully</span>
                  <button className="text-white hover:bg-gray-700 px-2 py-1 rounded text-xs">UNDO</button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Action buttons</span>
                <Link href="/component/snackbar" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Switch Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Switch</h3>
                <div className="component-tag">Input</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Toggle switch for binary choices and settings.
                Supports different sizes and disabled states.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                  </div>
                  <span className="text-sm">Notifications enabled</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                  </div>
                  <span className="text-sm text-gray-500">Dark mode disabled</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Smooth animations</span>
                <Link href="/component/switch" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Drawer Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Drawer</h3>
                <div className="component-tag">Overlay</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Side panel that slides in from screen edges.
                Perfect for navigation menus and supplementary content.
              </p>
              
              <div className="relative bg-gray-50 rounded border h-20 mb-6 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-white border-r shadow-sm flex flex-col p-2">
                  <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Left, right, top, bottom</span>
                <Link href="/component/drawer" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* File Upload Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">File Upload</h3>
                <div className="component-tag">Input</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Drag-and-drop file upload with progress indicators and validation.
                Supports multiple files and custom file type restrictions.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
                <div className="text-gray-400 mb-2">📁</div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </div>
                <div className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Progress tracking</span>
                <Link href="/component/file-upload" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Table of Contents Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Table of Contents</h3>
                <div className="component-tag">Navigation</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Auto-generated navigation for long content with smooth scrolling.
                Highlights active sections as user scrolls through content.
              </p>
              
              <div className="space-y-2 mb-6 text-sm">
                <div className="text-blue-600 font-medium border-l-2 border-blue-600 pl-3">1. Introduction</div>
                <div className="text-gray-600 pl-3">2. Getting Started</div>
                <div className="text-gray-600 pl-5">2.1 Installation</div>
                <div className="text-gray-600 pl-5">2.2 Configuration</div>
                <div className="text-gray-600 pl-3">3. Advanced Usage</div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Auto-scroll tracking</span>
                <Link href="/component/table-of-contents" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Countdown Timer Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Countdown Timer</h3>
                <div className="component-tag">Display</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Real-time countdown timer with customizable formats and events.
                Perfect for sales, events, and deadline tracking.
              </p>
              
              <div className="text-center mb-6">
                <div className="text-2xl font-mono font-bold text-blue-600 mb-2">
                  02:15:30
                </div>
                <div className="flex justify-center gap-2 text-xs text-gray-500">
                  <span>HOURS</span>
                  <span>MINUTES</span>
                  <span>SECONDS</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Custom events</span>
                <Link href="/component/countdown-timer" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Color Picker Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Color Picker</h3>
                <div className="component-tag">Input</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Interactive color selection with multiple format outputs.
                Supports hex, RGB, HSL, and color palette presets.
              </p>
              
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                  <span className="text-sm font-mono">#3B82F6</span>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <div className="w-6 h-6 bg-blue-500 rounded border-2 border-gray-800"></div>
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Multiple formats</span>
                <Link href="/component/color-picker" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Sticky Note Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Sticky Note</h3>
                <div className="component-tag">Interactive</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Draggable sticky notes for annotations and reminders.
                Supports different colors, sizes, and persistence options.
              </p>
              
              <div className="relative mb-6">
                <div className="bg-yellow-100 border border-yellow-200 p-3 rounded shadow-sm transform rotate-1">
                  <div className="text-sm text-gray-800 mb-2">📝 Remember to...</div>
                  <div className="text-xs text-gray-600">Update the documentation</div>
                </div>
                <div className="bg-blue-100 border border-blue-200 p-3 rounded shadow-sm transform -rotate-1 absolute -right-2 -bottom-2">
                  <div className="text-sm text-gray-800">💡 Idea</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Draggable & persistent</span>
                <Link href="/component/sticky-note" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* FAB Component Card */}
            <div className="component-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">FAB</h3>
                <div className="component-tag">Action</div>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Floating Action Button for primary actions. Includes scroll-to-top functionality
                and appears in bottom-right corner for optimal user experience.
              </p>
              
              <div className="relative h-16 bg-gray-50 rounded border mb-6 overflow-hidden">
                <div className="absolute bottom-2 right-2">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    ↑
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Scroll to top</span>
                <Link href="/component/fab" className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Component Playground */}
          <ComponentPlayground />
        </div>
      </main>

      <Footer />
      
      {/* Scroll to Top FAB */}
      <ScrollToTopFab showAt={400} />
    </div>
  );
}
