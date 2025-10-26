import { useState } from "react";
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
import { LibraryProgress, CircularProgress } from "@/components/library/progress";
import { LibrarySlider } from "@/components/library/slider";
import { HoverTooltip } from "@/components/library/tooltip";
import { LibraryAvatar } from "@/components/library/avatar";
import { LibraryDropdown } from "@/components/library/dropdown";
import { LibraryStepper } from "@/components/library/stepper";
import { LibraryChip } from "@/components/library/chip";
import { LibraryTimeline } from "@/components/library/timeline";
import { LibrarySpinner } from "@/components/library/spinner";
import { LibraryCalendar } from "@/components/library/calendar";
import { LibraryRating } from "@/components/library/rating";
import { SimpleToast } from "@/components/library/toast";
import { LibraryCollapse } from "@/components/library/collapse";
import { LibraryDivider } from "@/components/library/divider";
import { LibraryList } from "@/components/library/list";
import { LibrarySnackbar } from "@/components/library/snackbar";
import { LibrarySwitch } from "@/components/library/switch";
import { LibraryDrawer } from "@/components/library/drawer";
import { LibraryFileUpload } from "@/components/library/file-upload";
import { LibraryTableOfContents } from "@/components/library/table-of-contents";
import { LibraryCountdownTimer } from "@/components/library/countdown-timer";
import { LibraryColorPicker } from "@/components/library/color-picker";
import { LibraryStickyNote } from "@/components/library/sticky-note";
import { LibraryFab } from "@/components/library/fab";
import { Save, Trash2, Bell } from "lucide-react";

type ComponentType = "button" | "accordion" | "carousel" | "container" | "navigation" | "card" | "search-bar" | "modal" | "form" | "table" | "tabs" | "alert" | "badge" | "breadcrumb" | "pagination" | "progress" | "slider" | "tooltip" | "avatar" | "dropdown" | "stepper" | "chip" | "timeline" | "spinner" | "calendar" | "rating" | "toast" | "collapse" | "divider" | "list" | "snackbar" | "switch" | "drawer" | "file-upload" | "table-of-contents" | "countdown-timer" | "color-picker" | "sticky-note" | "fab";

export default function ComponentPlayground() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("button");
  
  // Button states
  const [buttonVariant, setButtonVariant] = useState<"primary" | "secondary" | "success" | "danger">("primary");
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("md");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonIcon, setButtonIcon] = useState(false);

  // Accordion states
  const [accordionMultiple, setAccordionMultiple] = useState(false);

  // Carousel states
  const [carouselAutoPlay, setCarouselAutoPlay] = useState(false);
  const [carouselShowControls, setCarouselShowControls] = useState(true);
  const [carouselShowIndicators, setCarouselShowIndicators] = useState(true);

  // Container states
  const [containerLayout, setContainerLayout] = useState<"flex" | "grid" | "block">("flex");
  const [containerCols, setContainerCols] = useState<1 | 2 | 3 | 4 | 6 | 12>(3);
  const [containerGap, setContainerGap] = useState<"none" | "xs" | "sm" | "md" | "lg" | "xl">("md");
  const [containerJustify, setContainerJustify] = useState<"start" | "center" | "end" | "between" | "around" | "evenly">("start");

  // Navigation states
  const [navigationBreadcrumbs, setNavigationBreadcrumbs] = useState(true);

  // Card states
  const [cardVariant, setCardVariant] = useState<"default" | "elevated" | "outlined" | "filled">("default");
  const [cardInteractive, setCardInteractive] = useState(false);
  const [cardTitle, setCardTitle] = useState("Sample Card");

  // Search Bar states
  const [searchBarValue, setSearchBarValue] = useState("");
  const [searchBarVariant, setSearchBarVariant] = useState<"default" | "filled" | "outlined">("default");
  const [searchBarShowFilter, setSearchBarShowFilter] = useState(false);

  // Modal states
  const [modalSize, setModalSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [playgroundModalOpen, setPlaygroundModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");

  // Table states
  const [tableVariant, setTableVariant] = useState<"default" | "bordered" | "striped">("default");

  // Tabs states
  const [tabsVariant, setTabsVariant] = useState<"default" | "pills" | "underline" | "enclosed">("default");

  // Alert states
  const [alertVariant, setAlertVariant] = useState<"default" | "success" | "warning" | "error" | "info">("success");
  const [alertDismissible, setAlertDismissible] = useState(false);

  // New component states
  const [badgeVariant, setBadgeVariant] = useState<"default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info">("default");
  const [badgeCount, setBadgeCount] = useState<number | undefined>(5);
  const [playgroundCurrentPage, setPlaygroundCurrentPage] = useState(1);
  const [playgroundProgressValue, setPlaygroundProgressValue] = useState(60);
  const [playgroundSliderValue, setPlaygroundSliderValue] = useState(50);
  const [avatarSize, setAvatarSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("md");
  const [avatarShowBadge, setAvatarShowBadge] = useState(true);

  // New component states for 10 additional components
  const [dropdownSearchable, setDropdownSearchable] = useState(false);
  const [dropdownMultiple, setDropdownMultiple] = useState(false);
  const [stepperOrientation, setStepperOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [stepperVariant, setStepperVariant] = useState<"default" | "numbered" | "dots">("default");
  const [stepperCurrentStep, setStepperCurrentStep] = useState(1);
  const [chipVariant, setChipVariant] = useState<"default" | "primary" | "success" | "warning" | "error">("default");
  const [chipSize, setChipSize] = useState<"sm" | "md" | "lg">("md");
  const [chipDeletable, setChipDeletable] = useState(false);
  const [timelineVariant, setTimelineVariant] = useState<"default" | "compact" | "alternate">("default");
  const [timelineOrientation, setTimelineOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [spinnerSize, setSpinnerSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
  const [spinnerVariant, setSpinnerVariant] = useState<"default" | "primary" | "secondary" | "success" | "warning" | "error">("default");
  const [calendarHighlightToday, setCalendarHighlightToday] = useState(true);
  const [ratingMax, setRatingMax] = useState(5);
  const [ratingVariant, setRatingVariant] = useState<"star" | "heart" | "thumb">("star");
  const [ratingSize, setRatingSize] = useState<"sm" | "md" | "lg">("md");
  const [ratingReadonly, setRatingReadonly] = useState(false);
  const [ratingShowValue, setRatingShowValue] = useState(false);
  const [toastVariant, setToastVariant] = useState<"default" | "success" | "warning" | "error" | "info">("default");
  const [toastVisible, setToastVisible] = useState(true);
  const [collapseExpanded, setCollapseExpanded] = useState(false);
  const [collapseShowArrow, setCollapseShowArrow] = useState(true);
  const [collapseVariant, setCollapseVariant] = useState<"default" | "bordered" | "shadow">("default");
  const [dividerOrientation, setDividerOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [dividerVariant, setDividerVariant] = useState<"solid" | "dashed" | "dotted">("solid");
  const [dividerWithText, setDividerWithText] = useState(false);
  const [dividerColor, setDividerColor] = useState<"default" | "primary" | "success" | "warning" | "error">("default");

  // States for 10 additional new components
  const [listVariant, setListVariant] = useState<"default" | "bordered" | "divided" | "card">("default");
  const [listInteractive, setListInteractive] = useState(true);
  const [snackbarVariant, setSnackbarVariant] = useState<"default" | "success" | "error" | "warning" | "info">("default");
  const [snackbarVisible, setSnackbarVisible] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [switchSize, setSwitchSize] = useState<"sm" | "md" | "lg">("md");
  const [switchVariant, setSwitchVariant] = useState<"default" | "success" | "warning" | "error">("default");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState<"left" | "right" | "top" | "bottom">("right");
  const [fileUploadMultiple, setFileUploadMultiple] = useState(false);
  const [fileUploadVariant, setFileUploadVariant] = useState<"default" | "compact" | "minimal">("default");
  const [tocVariant, setTocVariant] = useState<"default" | "compact" | "sidebar">("default");
  const [timerDuration, setTimerDuration] = useState(300);
  const [timerVariant, setTimerVariant] = useState<"default" | "compact" | "circular" | "minimal">("default");
  const [colorPickerVariant, setColorPickerVariant] = useState<"default" | "compact" | "swatch" | "advanced">("default");
  const [stickyNoteColor, setStickyNoteColor] = useState<"yellow" | "pink" | "blue" | "green" | "orange" | "purple">("yellow");
  const [stickyNoteSize, setStickyNoteSize] = useState<"sm" | "md" | "lg">("md");
  const [fabVariant, setFabVariant] = useState<"default" | "extended" | "mini">("default");
  const [fabPosition, setFabPosition] = useState<"bottom-right" | "bottom-left" | "top-right" | "top-left">("bottom-right");

  const renderComponentPreview = () => {
    switch (selectedComponent) {
      case "button":
        return (
          <LibraryButton
            variant={buttonVariant}
            size={buttonSize}
            disabled={buttonDisabled}
            loading={buttonLoading}
            icon={buttonIcon ? (buttonVariant === "success" ? <Save className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />) : undefined}
          >
            Interactive Button
          </LibraryButton>
        );

      case "accordion":
        return (
          <LibraryAccordion
            allowMultiple={accordionMultiple}
            items={[
              {
                title: "First Panel",
                content: "This is the content of the first accordion panel. You can customize the behavior using the controls."
              },
              {
                title: "Second Panel", 
                content: "This is the content of the second accordion panel. Toggle 'Allow Multiple' to see the difference."
              },
              {
                title: "Third Panel",
                content: "This is the content of the third accordion panel. Great for organizing content sections."
              }
            ]}
          />
        );

      case "carousel":
        return (
          <LibraryCarousel
            autoPlay={carouselAutoPlay}
            showControls={carouselShowControls}
            showIndicators={carouselShowIndicators}
            autoPlayInterval={3000}
            className="h-48"
            items={[
              {
                type: "content",
                content: <div className="text-center p-8 bg-blue-50"><h4 className="text-lg font-bold mb-2">Slide 1</h4><p>First carousel slide</p></div>
              },
              {
                type: "content",
                content: <div className="text-center p-8 bg-green-50"><h4 className="text-lg font-bold mb-2">Slide 2</h4><p>Second carousel slide</p></div>
              },
              {
                type: "content",
                content: <div className="text-center p-8 bg-purple-50"><h4 className="text-lg font-bold mb-2">Slide 3</h4><p>Third carousel slide</p></div>
              }
            ]}
          />
        );

      case "container":
        return (
          <LibraryContainer
            layout={containerLayout}
            cols={containerLayout === "grid" ? containerCols : undefined}
            gap={containerGap}
            justify={containerJustify}
            className="border border-gray-300 rounded-lg p-4"
          >
            <div className="bg-blue-100 p-3 rounded text-center text-sm">Item 1</div>
            <div className="bg-green-100 p-3 rounded text-center text-sm">Item 2</div>
            <div className="bg-purple-100 p-3 rounded text-center text-sm">Item 3</div>
            {containerLayout === "grid" && containerCols > 3 && (
              <>
                <div className="bg-yellow-100 p-3 rounded text-center text-sm">Item 4</div>
                {containerCols > 4 && <div className="bg-pink-100 p-3 rounded text-center text-sm">Item 5</div>}
                {containerCols > 5 && <div className="bg-indigo-100 p-3 rounded text-center text-sm">Item 6</div>}
              </>
            )}
          </LibraryContainer>
        );

      case "navigation":
        return (
          <div className="border border-gray-200 rounded-lg">
            <LibraryNavigation
              logo="Demo App"
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "About", href: "/about" }
              ]}
              breadcrumbs={navigationBreadcrumbs ? ["Home", "Components", "Navigation"] : undefined}
            />
          </div>
        );

      case "card":
        return (
          <LibraryCard
            variant={cardVariant}
            interactive={cardInteractive}
            title={cardTitle}
            subtitle="This is a subtitle"
            actions={
              <div className="flex gap-2">
                <LibraryButton size="sm" variant="primary">Action</LibraryButton>
                <LibraryButton size="sm" variant="secondary">Cancel</LibraryButton>
              </div>
            }
          >
            <p className="text-gray-600 text-sm">Card content goes here with customizable properties.</p>
          </LibraryCard>
        );

      case "search-bar":
        return (
          <LibrarySearchBar
            variant={searchBarVariant}
            placeholder="Search components..."
            value={searchBarValue}
            onChange={setSearchBarValue}
            showFilter={searchBarShowFilter}
            suggestions={["Button", "Card", "Modal", "Table"]}
            autoComplete={true}
          />
        );

      case "modal":
        return (
          <div>
            <LibraryButton onClick={() => setPlaygroundModalOpen(true)}>
              Open Demo Modal
            </LibraryButton>
            <LibraryModal
              isOpen={playgroundModalOpen}
              onClose={() => setPlaygroundModalOpen(false)}
              size={modalSize}
              title="Demo Modal"
              description="This is a sample modal dialog"
            >
              <p className="text-gray-600">Modal content with customizable size and properties.</p>
            </LibraryModal>
          </div>
        );

      case "form":
        return (
          <LibraryForm className="space-y-4">
            <FormField>
              <FormLabel htmlFor="playground-name">Name</FormLabel>
              <Input 
                id="playground-name"
                placeholder="Enter your name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </FormField>
            <FormField>
              <FormLabel htmlFor="playground-email">Email</FormLabel>
              <Input 
                id="playground-email"
                type="email"
                placeholder="Enter your email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </FormField>
            <div className="flex gap-2">
              <LibraryButton size="sm" variant="primary">Submit</LibraryButton>
              <LibraryButton size="sm" variant="secondary">Reset</LibraryButton>
            </div>
          </LibraryForm>
        );

      case "table":
        const sampleData = [
          { id: 1, name: "John Doe", role: "Admin" },
          { id: 2, name: "Jane Smith", role: "User" }
        ];
        const sampleColumns = [
          { key: "name", title: "Name", dataIndex: "name" },
          { key: "role", title: "Role", dataIndex: "role" }
        ];
        
        return (
          <LibraryTable
            columns={sampleColumns}
            data={sampleData}
            variant={tableVariant}
            size="sm"
          />
        );

      case "tabs":
        const sampleTabs = [
          { label: "Tab 1", value: "tab1", content: <div className="p-3 text-sm">Content for Tab 1</div> },
          { label: "Tab 2", value: "tab2", content: <div className="p-3 text-sm">Content for Tab 2</div> }
        ];
        
        return (
          <SimpleTabs
            items={sampleTabs}
            variant={tabsVariant}
            className="text-sm"
          />
        );

      case "alert":
        return (
          <LibraryAlert
            variant={alertVariant}
            title="Alert Title"
            dismissible={alertDismissible}
            onDismiss={alertDismissible ? () => alert("Alert dismissed!") : undefined}
          >
            This is a sample alert message with customizable variant and dismissible option.
          </LibraryAlert>
        );

      case "badge":
        return badgeCount !== undefined ? (
          <LibraryBadge count={badgeCount}>
            <Bell className="w-6 h-6" />
          </LibraryBadge>
        ) : (
          <LibraryBadge variant={badgeVariant}>Sample Badge</LibraryBadge>
        );

      case "breadcrumb":
        return (
          <LibraryBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Breadcrumb" }
            ]}
          />
        );

      case "pagination":
        return (
          <LibraryPagination
            currentPage={playgroundCurrentPage}
            totalPages={8}
            onPageChange={setPlaygroundCurrentPage}
            size="sm"
          />
        );

      case "progress":
        return (
          <div className="space-y-4 w-full">
            <LibraryProgress 
              value={playgroundProgressValue} 
              showLabel 
              label="Loading..."
            />
            <div className="flex justify-center">
              <CircularProgress 
                value={playgroundProgressValue} 
                size={60}
              />
            </div>
          </div>
        );

      case "slider":
        return (
          <div className="w-full max-w-md">
            <div className="mb-2 text-sm text-gray-600">
              Value: {playgroundSliderValue}
            </div>
            <LibrarySlider
              value={playgroundSliderValue}
              onChange={(value) => setPlaygroundSliderValue(Array.isArray(value) ? value[0] : value)}
              min={0}
              max={100}
            />
          </div>
        );

      case "tooltip":
        return (
          <HoverTooltip content="This is a tooltip example">
            <LibraryButton>Hover for tooltip</LibraryButton>
          </HoverTooltip>
        );

      case "avatar":
        return (
          <LibraryAvatar
            size={avatarSize}
            fallback="JD"
            showBadge={avatarShowBadge}
            badgeColor="green"
          />
        );

      case "dropdown":
        const dropdownOptions = [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "orange", label: "Orange" },
          { value: "grape", label: "Grape" }
        ];
        return (
          <LibraryDropdown
            options={dropdownOptions}
            placeholder="Select a fruit..."
            searchable={dropdownSearchable}
            multiple={dropdownMultiple}
            className="w-64"
          />
        );

      case "stepper":
        const stepperSteps = [
          { title: "Setup", description: "Initial configuration", status: "completed" as const },
          { title: "Progress", description: "Work in progress", status: "current" as const },
          { title: "Review", description: "Final review", status: "pending" as const },
          { title: "Complete", description: "All done", status: "pending" as const }
        ];
        return (
          <LibraryStepper
            steps={stepperSteps}
            currentStep={stepperCurrentStep}
            orientation={stepperOrientation}
            variant={stepperVariant}
            className="w-full"
          />
        );

      case "chip":
        return (
          <div className="flex flex-wrap gap-2">
            <LibraryChip
              label="Interactive Chip"
              variant={chipVariant}
              size={chipSize}
              deletable={chipDeletable}
              onDelete={() => {}}
            />
            <LibraryChip
              label="Another Chip"
              variant={chipVariant}
              size={chipSize}
            />
          </div>
        );

      case "timeline":
        const timelineItems = [
          {
            id: "1",
            title: "Started Project",
            description: "Project initialization",
            timestamp: "2024-01-15",
            status: "completed" as const
          },
          {
            id: "2",
            title: "Development Phase",
            description: "Building core features",
            timestamp: "2024-01-20",
            status: "current" as const
          },
          {
            id: "3",
            title: "Testing",
            description: "Quality assurance",
            timestamp: "2024-02-01",
            status: "upcoming" as const
          }
        ];
        return (
          <LibraryTimeline
            items={timelineItems}
            variant={timelineVariant}
            orientation={timelineOrientation}
            className="max-w-lg"
          />
        );

      case "spinner":
        return (
          <div className="flex items-center gap-4">
            <LibrarySpinner
              size={spinnerSize}
              variant={spinnerVariant}
            />
            <span className="text-sm text-gray-600">Loading...</span>
          </div>
        );

      case "calendar":
        return (
          <LibraryCalendar
            highlightToday={calendarHighlightToday}
            className="max-w-sm"
          />
        );

      case "rating":
        return (
          <LibraryRating
            max={ratingMax}
            variant={ratingVariant}
            size={ratingSize}
            readonly={ratingReadonly}
            showValue={ratingShowValue}
            defaultValue={3}
          />
        );

      case "toast":
        return (
          <SimpleToast
            title="Playground Toast"
            description="This is a sample toast notification"
            variant={toastVariant}
            visible={toastVisible}
            onClose={() => setToastVisible(false)}
          />
        );

      case "collapse":
        return (
          <LibraryCollapse
            title="Collapsible Content"
            expanded={collapseExpanded}
            showArrow={collapseShowArrow}
            variant={collapseVariant}
            onToggle={setCollapseExpanded}
          >
            <p className="text-gray-600">
              This is the collapsible content that can be expanded or collapsed.
              Use the controls to customize the behavior.
            </p>
          </LibraryCollapse>
        );

      case "divider":
        return (
          <div className="space-y-4">
            <div>Sample content above</div>
            <LibraryDivider
              orientation={dividerOrientation}
              variant={dividerVariant}
              color={dividerColor}
            >
              {dividerWithText ? "Divider Text" : undefined}
            </LibraryDivider>
            <div>Sample content below</div>
          </div>
        );

      case "list":
        const listItems = [
          { id: "1", title: "First Item", description: "Description for first item" },
          { id: "2", title: "Second Item", description: "Description for second item" },
          { id: "3", title: "Third Item", description: "Description for third item" }
        ];
        return (
          <LibraryList 
            items={listItems} 
            variant={listVariant}
            interactive={listInteractive}
          />
        );

      case "snackbar":
        return (
          <LibrarySnackbar
            message="This is a sample notification"
            variant={snackbarVariant}
            visible={snackbarVisible}
            onClose={() => setSnackbarVisible(false)}
          />
        );

      case "switch":
        return (
          <LibrarySwitch
            checked={switchChecked}
            onChange={setSwitchChecked}
            size={switchSize}
            variant={switchVariant}
            label="Toggle switch"
          />
        );

      case "drawer":
        return (
          <div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Open Drawer
            </button>
            <LibraryDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              position={drawerPosition}
              title="Sample Drawer"
            >
              <div className="p-4">
                <p>This is the drawer content.</p>
              </div>
            </LibraryDrawer>
          </div>
        );

      case "file-upload":
        return (
          <LibraryFileUpload
            multiple={fileUploadMultiple}
            variant={fileUploadVariant}
          />
        );

      case "table-of-contents":
        const tocItems = [
          { id: "1", title: "Introduction", level: 1 },
          { id: "2", title: "Setup", level: 2 },
          { id: "3", title: "Usage", level: 1 }
        ];
        return (
          <div className="max-w-md">
            <LibraryTableOfContents
              items={tocItems}
              variant={tocVariant}
            />
          </div>
        );

      case "countdown-timer":
        return (
          <LibraryCountdownTimer
            duration={timerDuration}
            variant={timerVariant}
          />
        );

      case "color-picker":
        return (
          <LibraryColorPicker
            variant={colorPickerVariant}
          />
        );

      case "sticky-note":
        return (
          <div className="relative h-64">
            <LibraryStickyNote
              content="This is a sample sticky note"
              title="Sample Note"
              color={stickyNoteColor}
              size={stickyNoteSize}
              position={{ x: 50, y: 50 }}
              draggable={false}
            />
          </div>
        );

      case "fab":
        return (
          <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              <LibraryFab
                variant={fabVariant}
                position="bottom-right"
                label={fabVariant === "extended" ? "Scroll to Top" : undefined}
                icon={<span className="text-xl font-bold">↑</span>}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  console.log("Scrolling to top!");
                }}
              />
            </div>
            <div className="absolute top-4 left-4 text-sm text-gray-600 font-medium">
              Scroll to Top FAB
            </div>
            <div className="absolute top-8 left-4 text-xs text-gray-500 max-w-48">
              Click the FAB to scroll to the top of the page. Appears automatically when user scrolls down.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderControls = () => {
    switch (selectedComponent) {
      case "button":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={buttonVariant}
                onChange={(e) => setButtonVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="danger">Danger</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={buttonSize}
                onChange={(e) => setButtonSize(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="buttonDisabled"
                  checked={buttonDisabled}
                  onChange={(e) => setButtonDisabled(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="buttonDisabled" className="text-sm text-gray-700">Disabled</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="buttonLoading"
                  checked={buttonLoading}
                  onChange={(e) => setButtonLoading(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="buttonLoading" className="text-sm text-gray-700">Loading</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="buttonIcon"
                  checked={buttonIcon}
                  onChange={(e) => setButtonIcon(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="buttonIcon" className="text-sm text-gray-700">Show Icon</label>
              </div>
            </div>
          </div>
        );

      case "accordion":
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="accordionMultiple"
                checked={accordionMultiple}
                onChange={(e) => setAccordionMultiple(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="accordionMultiple" className="text-sm text-gray-700">Allow Multiple Open</label>
            </div>
          </div>
        );

      case "carousel":
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="carouselAutoPlay"
                checked={carouselAutoPlay}
                onChange={(e) => setCarouselAutoPlay(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="carouselAutoPlay" className="text-sm text-gray-700">Auto Play</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="carouselShowControls"
                checked={carouselShowControls}
                onChange={(e) => setCarouselShowControls(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="carouselShowControls" className="text-sm text-gray-700">Show Controls</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="carouselShowIndicators"
                checked={carouselShowIndicators}
                onChange={(e) => setCarouselShowIndicators(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="carouselShowIndicators" className="text-sm text-gray-700">Show Indicators</label>
            </div>
          </div>
        );

      case "container":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
              <select
                value={containerLayout}
                onChange={(e) => setContainerLayout(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
                <option value="block">Block</option>
              </select>
            </div>

            {containerLayout === "grid" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
                <select
                  value={containerCols}
                  onChange={(e) => setContainerCols(Number(e.target.value) as any)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gap</label>
              <select
                value={containerGap}
                onChange={(e) => setContainerGap(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">None</option>
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>

            {containerLayout === "flex" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Justify</label>
                <select
                  value={containerJustify}
                  onChange={(e) => setContainerJustify(e.target.value as any)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="start">Start</option>
                  <option value="center">Center</option>
                  <option value="end">End</option>
                  <option value="between">Between</option>
                  <option value="around">Around</option>
                  <option value="evenly">Evenly</option>
                </select>
              </div>
            )}
          </div>
        );

      case "navigation":
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="navigationBreadcrumbs"
                checked={navigationBreadcrumbs}
                onChange={(e) => setNavigationBreadcrumbs(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="navigationBreadcrumbs" className="text-sm text-gray-700">Show Breadcrumbs</label>
            </div>
          </div>
        );

      case "card":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={cardVariant}
                onChange={(e) => setCardVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="elevated">Elevated</option>
                <option value="outlined">Outlined</option>
                <option value="filled">Filled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cardInteractive"
                checked={cardInteractive}
                onChange={(e) => setCardInteractive(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="cardInteractive" className="text-sm text-gray-700">Interactive</label>
            </div>
          </div>
        );

      case "search-bar":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={searchBarVariant}
                onChange={(e) => setSearchBarVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="filled">Filled</option>
                <option value="outlined">Outlined</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="searchBarShowFilter"
                checked={searchBarShowFilter}
                onChange={(e) => setSearchBarShowFilter(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="searchBarShowFilter" className="text-sm text-gray-700">Show Filter</label>
            </div>
          </div>
        );

      case "modal":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={modalSize}
                onChange={(e) => setModalSize(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
          </div>
        );

      case "form":
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Form controls are interactive in the preview above. Try typing in the fields.
            </div>
          </div>
        );

      case "table":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={tableVariant}
                onChange={(e) => setTableVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="bordered">Bordered</option>
                <option value="striped">Striped</option>
              </select>
            </div>
          </div>
        );

      case "tabs":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={tabsVariant}
                onChange={(e) => setTabsVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="pills">Pills</option>
                <option value="underline">Underline</option>
                <option value="enclosed">Enclosed</option>
              </select>
            </div>
          </div>
        );

      case "alert":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={alertVariant}
                onChange={(e) => setAlertVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="alertDismissible"
                checked={alertDismissible}
                onChange={(e) => setAlertDismissible(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="alertDismissible" className="text-sm text-gray-700">Dismissible</label>
            </div>
          </div>
        );

      case "badge":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={badgeCount !== undefined ? "count" : "text"}
                onChange={(e) => setBadgeCount(e.target.value === "count" ? 5 : undefined)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text">Text Badge</option>
                <option value="count">Count Badge</option>
              </select>
            </div>
            {badgeCount === undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
                <select
                  value={badgeVariant}
                  onChange={(e) => setBadgeVariant(e.target.value as any)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">Default</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                  <option value="destructive">Destructive</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
            )}
            {badgeCount !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                <input
                  type="number"
                  value={badgeCount}
                  onChange={(e) => setBadgeCount(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="999"
                />
              </div>
            )}
          </div>
        );

      case "breadcrumb":
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Breadcrumb navigation with Home → Components → Breadcrumb path.
            </div>
          </div>
        );

      case "pagination":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Page: {playgroundCurrentPage}
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={playgroundCurrentPage}
                onChange={(e) => setPlaygroundCurrentPage(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Progress: {playgroundProgressValue}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={playgroundProgressValue}
                onChange={(e) => setPlaygroundProgressValue(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        );

      case "slider":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slider Value: {playgroundSliderValue}
              </label>
              <div className="text-sm text-gray-600">
                Interactive slider component. Drag the handle to change the value.
              </div>
            </div>
          </div>
        );

      case "tooltip":
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Hover over the button to see the tooltip. Tooltips can be positioned on any side.
            </div>
          </div>
        );

      case "avatar":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={avatarSize}
                onChange={(e) => setAvatarSize(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="2xl">2X Large</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="avatarShowBadge"
                checked={avatarShowBadge}
                onChange={(e) => setAvatarShowBadge(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="avatarShowBadge" className="text-sm text-gray-700">Show Badge</label>
            </div>
          </div>
        );

      case "dropdown":
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dropdownSearchable"
                checked={dropdownSearchable}
                onChange={(e) => setDropdownSearchable(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="dropdownSearchable" className="text-sm text-gray-700">Searchable</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dropdownMultiple"
                checked={dropdownMultiple}
                onChange={(e) => setDropdownMultiple(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="dropdownMultiple" className="text-sm text-gray-700">Multiple Selection</label>
            </div>
          </div>
        );

      case "stepper":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
              <select
                value={stepperOrientation}
                onChange={(e) => setStepperOrientation(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={stepperVariant}
                onChange={(e) => setStepperVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="numbered">Numbered</option>
                <option value="dots">Dots</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Step: {stepperCurrentStep}</label>
              <input
                type="range"
                min="0"
                max="3"
                value={stepperCurrentStep}
                onChange={(e) => setStepperCurrentStep(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        );

      case "chip":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={chipVariant}
                onChange={(e) => setChipVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={chipSize}
                onChange={(e) => setChipSize(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="chipDeletable"
                checked={chipDeletable}
                onChange={(e) => setChipDeletable(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="chipDeletable" className="text-sm text-gray-700">Deletable</label>
            </div>
          </div>
        );

      case "timeline":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={timelineVariant}
                onChange={(e) => setTimelineVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="compact">Compact</option>
                <option value="alternate">Alternate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
              <select
                value={timelineOrientation}
                onChange={(e) => setTimelineOrientation(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
          </div>
        );

      case "spinner":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={spinnerSize}
                onChange={(e) => setSpinnerSize(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={spinnerVariant}
                onChange={(e) => setSpinnerVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        );

      case "calendar":
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="calendarHighlightToday"
                checked={calendarHighlightToday}
                onChange={(e) => setCalendarHighlightToday(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="calendarHighlightToday" className="text-sm text-gray-700">Highlight Today</label>
            </div>
          </div>
        );

      case "rating":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Stars: {ratingMax}</label>
              <input
                type="range"
                min="3"
                max="10"
                value={ratingMax}
                onChange={(e) => setRatingMax(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={ratingVariant}
                onChange={(e) => setRatingVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="star">Star</option>
                <option value="heart">Heart</option>
                <option value="thumb">Thumb</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={ratingSize}
                onChange={(e) => setRatingSize(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ratingReadonly"
                checked={ratingReadonly}
                onChange={(e) => setRatingReadonly(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="ratingReadonly" className="text-sm text-gray-700">Read Only</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ratingShowValue"
                checked={ratingShowValue}
                onChange={(e) => setRatingShowValue(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="ratingShowValue" className="text-sm text-gray-700">Show Value</label>
            </div>
          </div>
        );

      case "toast":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={toastVariant}
                onChange={(e) => setToastVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="toastVisible"
                checked={toastVisible}
                onChange={(e) => setToastVisible(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="toastVisible" className="text-sm text-gray-700">Visible</label>
            </div>
          </div>
        );

      case "collapse":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={collapseVariant}
                onChange={(e) => setCollapseVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="bordered">Bordered</option>
                <option value="shadow">Shadow</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="collapseExpanded"
                checked={collapseExpanded}
                onChange={(e) => setCollapseExpanded(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="collapseExpanded" className="text-sm text-gray-700">Expanded</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="collapseShowArrow"
                checked={collapseShowArrow}
                onChange={(e) => setCollapseShowArrow(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="collapseShowArrow" className="text-sm text-gray-700">Show Arrow</label>
            </div>
          </div>
        );

      case "divider":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
              <select
                value={dividerOrientation}
                onChange={(e) => setDividerOrientation(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={dividerVariant}
                onChange={(e) => setDividerVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <select
                value={dividerColor}
                onChange={(e) => setDividerColor(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dividerWithText"
                checked={dividerWithText}
                onChange={(e) => setDividerWithText(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="dividerWithText" className="text-sm text-gray-700">With Text</label>
            </div>
          </div>
        );

      case "list":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={listVariant}
                onChange={(e) => setListVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="bulleted">Bulleted</option>
                <option value="numbered">Numbered</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="listInteractive"
                checked={listInteractive}
                onChange={(e) => setListInteractive(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="listInteractive" className="text-sm text-gray-700">Interactive</label>
            </div>
          </div>
        );

      case "snackbar":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={snackbarVariant}
                onChange={(e) => setSnackbarVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="snackbarVisible"
                checked={snackbarVisible}
                onChange={(e) => setSnackbarVisible(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="snackbarVisible" className="text-sm text-gray-700">Visible</label>
            </div>
          </div>
        );

      case "switch":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={switchSize}
                onChange={(e) => setSwitchSize(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={switchVariant}
                onChange={(e) => setSwitchVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="success">Success</option>
                <option value="primary">Primary</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="switchChecked"
                checked={switchChecked}
                onChange={(e) => setSwitchChecked(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="switchChecked" className="text-sm text-gray-700">Checked</label>
            </div>
          </div>
        );

      case "drawer":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                value={drawerPosition}
                onChange={(e) => setDrawerPosition(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="drawerOpen"
                checked={drawerOpen}
                onChange={(e) => setDrawerOpen(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="drawerOpen" className="text-sm text-gray-700">Open</label>
            </div>
          </div>
        );

      case "file-upload":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={fileUploadVariant}
                onChange={(e) => setFileUploadVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="drag-drop">Drag & Drop</option>
                <option value="compact">Compact</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fileUploadMultiple"
                checked={fileUploadMultiple}
                onChange={(e) => setFileUploadMultiple(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="fileUploadMultiple" className="text-sm text-gray-700">Multiple Files</label>
            </div>
          </div>
        );

      case "table-of-contents":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={tocVariant}
                onChange={(e) => setTocVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="minimal">Minimal</option>
                <option value="sidebar">Sidebar</option>
              </select>
            </div>
          </div>
        );

      case "countdown-timer":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
              <input
                type="number"
                value={timerDuration}
                onChange={(e) => setTimerDuration(parseInt(e.target.value) || 60)}
                min={1}
                max={3600}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={timerVariant}
                onChange={(e) => setTimerVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="compact">Compact</option>
                <option value="circular">Circular</option>
              </select>
            </div>
          </div>
        );

      case "color-picker":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={colorPickerVariant}
                onChange={(e) => setColorPickerVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="compact">Compact</option>
                <option value="palette">Palette</option>
              </select>
            </div>
          </div>
        );

      case "sticky-note":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <select
                value={stickyNoteColor}
                onChange={(e) => setStickyNoteColor(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="yellow">Yellow</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="pink">Pink</option>
                <option value="orange">Orange</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={stickyNoteSize}
                onChange={(e) => setStickyNoteSize(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
        );

      case "fab":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select
                value={fabVariant}
                onChange={(e) => setFabVariant(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="extended">Extended</option>
                <option value="mini">Mini</option>
              </select>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <span className="text-blue-600">↑</span>
                <span className="font-medium">Scroll to Top Function</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                This FAB provides "scroll to top" functionality. It appears when users scroll down and smoothly takes them back to the top when clicked.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const generateCode = () => {
    switch (selectedComponent) {
      case "button":
        return `<LibraryButton
  variant="${buttonVariant}"
  size="${buttonSize}"${buttonDisabled ? '\n  disabled' : ''}${buttonLoading ? '\n  loading' : ''}${buttonIcon ? '\n  icon={<Save className="w-4 h-4" />}' : ''}
>
  Interactive Button
</LibraryButton>`;

      case "accordion":
        return `<LibraryAccordion${accordionMultiple ? '\n  allowMultiple' : ''}
  items={[
    {
      title: "Panel Title",
      content: "Panel content goes here..."
    }
  ]}
/>`;

      case "carousel":
        return `<LibraryCarousel${carouselAutoPlay ? '\n  autoPlay' : ''}${!carouselShowControls ? '\n  showControls={false}' : ''}${!carouselShowIndicators ? '\n  showIndicators={false}' : ''}
  items={[
    {
      type: "content",
      content: <div>Slide content</div>
    }
  ]}
/>`;

      case "container":
        return `<LibraryContainer
  layout="${containerLayout}"${containerLayout === "grid" ? `\n  cols={${containerCols}}` : ''}
  gap="${containerGap}"${containerLayout === "flex" ? `\n  justify="${containerJustify}"` : ''}
>
  {/* Your content here */}
</LibraryContainer>`;

      case "navigation":
        return `<LibraryNavigation
  logo="Your App"
  items={[
    { label: "Home", href: "/" },
    { label: "About", href: "/about" }
  ]}${navigationBreadcrumbs ? '\n  breadcrumbs={["Home", "Page"]}' : ''}
/>`;

      case "card":
        return `<LibraryCard
  variant="${cardVariant}"${cardInteractive ? '\n  interactive' : ''}
  title="${cardTitle}"
  subtitle="Subtitle text"
>
  Card content goes here
</LibraryCard>`;

      case "search-bar":
        return `<LibrarySearchBar
  variant="${searchBarVariant}"
  placeholder="Search..."${searchBarShowFilter ? '\n  showFilter' : ''}
  suggestions={["Option 1", "Option 2"]}
/>`;

      case "modal":
        return `<LibraryModal
  isOpen={isOpen}
  onClose={handleClose}
  size="${modalSize}"
  title="Modal Title"
>
  Modal content here
</LibraryModal>`;

      case "form":
        return `<LibraryForm>
  <FormField>
    <FormLabel>Name</FormLabel>
    <Input placeholder="Enter name" />
  </FormField>
  <LibraryButton type="submit">Submit</LibraryButton>
</LibraryForm>`;

      case "table":
        return `<LibraryTable
  variant="${tableVariant}"
  columns={[
    { key: "name", title: "Name", dataIndex: "name" }
  ]}
  data={[{ name: "John Doe" }]}
/>`;

      case "tabs":
        return `<SimpleTabs
  variant="${tabsVariant}"
  items={[
    { label: "Tab 1", value: "tab1", content: <div>Content 1</div> }
  ]}
/>`;

      case "alert":
        return `<LibraryAlert
  variant="${alertVariant}"
  title="Alert Title"${alertDismissible ? '\n  dismissible' : ''}
>
  Alert message
</LibraryAlert>`;

      case "badge":
        return badgeCount !== undefined 
          ? `<LibraryBadge count={${badgeCount}}>
  <Bell className="w-6 h-6" />
</LibraryBadge>`
          : `<LibraryBadge variant="${badgeVariant}">
  Badge Text
</LibraryBadge>`;

      case "breadcrumb":
        return `<LibraryBreadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" }
  ]}
/>`;

      case "pagination":
        return `<LibraryPagination
  currentPage={${playgroundCurrentPage}}
  totalPages={8}
  onPageChange={setCurrentPage}
/>`;

      case "progress":
        return `<LibraryProgress
  value={${playgroundProgressValue}}
  showLabel
  label="Loading..."
/>`;

      case "slider":
        return `<LibrarySlider
  value={${playgroundSliderValue}}
  onChange={setValue}
  min={0}
  max={100}
/>`;

      case "tooltip":
        return `<HoverTooltip content="Tooltip text">
  <Button>Hover me</Button>
</HoverTooltip>`;

      case "avatar":
        return `<LibraryAvatar
  size="${avatarSize}"
  fallback="JD"${avatarShowBadge ? '\n  showBadge\n  badgeColor="green"' : ''}
/>`;

      case "dropdown":
        return `<LibraryDropdown
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" }
  ]}
  placeholder="Select a fruit..."${dropdownSearchable ? '\n  searchable' : ''}${dropdownMultiple ? '\n  multiple' : ''}
/>`;

      case "stepper":
        return `<LibraryStepper
  steps={[
    { title: "Setup", description: "Configuration", status: "completed" },
    { title: "Progress", description: "In progress", status: "current" },
    { title: "Review", description: "Final review", status: "pending" },
    { title: "Complete", description: "All done", status: "pending" }
  ]}
  currentStep={${stepperCurrentStep}}
  orientation="${stepperOrientation}"${stepperVariant !== 'default' ? `\n  variant="${stepperVariant}"` : ''}
/>`;

      case "chip":
        return `<LibraryChip
  label="Interactive Chip"${chipVariant !== 'default' ? `\n  variant="${chipVariant}"` : ''}${chipSize !== 'md' ? `\n  size="${chipSize}"` : ''}${chipDeletable ? '\n  deletable\n  onDelete={() => {}}' : ''}
/>`;

      case "timeline":
        return `<LibraryTimeline
  items={[
    {
      id: "1",
      title: "Started Project",
      description: "Project initialization",
      timestamp: "2024-01-15",
      status: "completed"
    },
    {
      id: "2",
      title: "Development Phase", 
      description: "Building features",
      timestamp: "2024-01-20",
      status: "current"
    }
  ]}${timelineVariant !== 'default' ? `\n  variant="${timelineVariant}"` : ''}${timelineOrientation !== 'vertical' ? `\n  orientation="${timelineOrientation}"` : ''}
/>`;

      case "spinner":
        return `<LibrarySpinner${spinnerSize !== 'md' ? `\n  size="${spinnerSize}"` : ''}${spinnerVariant !== 'default' ? `\n  variant="${spinnerVariant}"` : ''}
/>`;

      case "calendar":
        return `<LibraryCalendar${!calendarHighlightToday ? '\n  highlightToday={false}' : ''}
/>`;

      case "rating":
        return `<LibraryRating${ratingMax !== 5 ? `\n  max={${ratingMax}}` : ''}${ratingVariant !== 'star' ? `\n  variant="${ratingVariant}"` : ''}${ratingSize !== 'md' ? `\n  size="${ratingSize}"` : ''}${ratingReadonly ? '\n  readonly' : ''}${ratingShowValue ? '\n  showValue' : ''}
  defaultValue={3}
/>`;

      case "toast":
        return `<SimpleToast
  title="Toast Title"
  description="Toast message content"${toastVariant !== 'default' ? `\n  variant="${toastVariant}"` : ''}
  visible={${toastVisible}}
  onClose={() => setVisible(false)}
/>`;

      case "collapse":
        return `<LibraryCollapse
  title="Collapsible Content"${collapseExpanded ? '\n  expanded' : ''}${collapseShowArrow ? '\n  showArrow' : ''}${collapseVariant !== 'default' ? `\n  variant="${collapseVariant}"` : ''}
  onToggle={setExpanded}
>
  <p>This is the collapsible content.</p>
</LibraryCollapse>`;

      case "divider":
        return `<LibraryDivider${dividerOrientation !== 'horizontal' ? `\n  orientation="${dividerOrientation}"` : ''}${dividerVariant !== 'solid' ? `\n  variant="${dividerVariant}"` : ''}${dividerColor !== 'default' ? `\n  color="${dividerColor}"` : ''}${dividerWithText ? '\n>\n  Divider Text\n</LibraryDivider>' : ' />'}`;

      case "list":
        return `<LibraryList
  items={[
    { id: "1", title: "First Item", description: "Description for first item" },
    { id: "2", title: "Second Item", description: "Description for second item" },
    { id: "3", title: "Third Item", description: "Description for third item" }
  ]}${listVariant !== 'default' ? `\n  variant="${listVariant}"` : ''}${listInteractive ? '\n  interactive' : ''}
/>`;

      case "snackbar":
        return `<LibrarySnackbar
  message="This is a sample notification"${snackbarVariant !== 'default' ? `\n  variant="${snackbarVariant}"` : ''}
  visible={${snackbarVisible}}
  onClose={() => setVisible(false)}
/>`;

      case "switch":
        return `<LibrarySwitch
  checked={${switchChecked}}
  onChange={setChecked}${switchSize !== 'md' ? `\n  size="${switchSize}"` : ''}${switchVariant !== 'default' ? `\n  variant="${switchVariant}"` : ''}
  label="Toggle switch"
/>`;

      case "drawer":
        return `<LibraryDrawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}${drawerPosition !== 'right' ? `\n  position="${drawerPosition}"` : ''}
  title="Sample Drawer"
>
  <div className="p-4">
    <p>This is the drawer content.</p>
  </div>
</LibraryDrawer>`;

      case "file-upload":
        return `<LibraryFileUpload${fileUploadMultiple ? '\n  multiple' : ''}${fileUploadVariant !== 'default' ? `\n  variant="${fileUploadVariant}"` : ''}
/>`;

      case "table-of-contents":
        return `<LibraryTableOfContents
  items={[
    { id: "1", title: "Introduction", level: 1 },
    { id: "2", title: "Setup", level: 2 },
    { id: "3", title: "Usage", level: 1 }
  ]}${tocVariant !== 'default' ? `\n  variant="${tocVariant}"` : ''}
/>`;

      case "countdown-timer":
        return `<LibraryCountdownTimer
  duration={${timerDuration}}${timerVariant !== 'default' ? `\n  variant="${timerVariant}"` : ''}
/>`;

      case "color-picker":
        return `<LibraryColorPicker${colorPickerVariant !== 'default' ? `\n  variant="${colorPickerVariant}"` : ''}
/>`;

      case "sticky-note":
        return `<LibraryStickyNote
  content="This is a sample sticky note"
  title="Sample Note"${stickyNoteColor !== 'yellow' ? `\n  color="${stickyNoteColor}"` : ''}${stickyNoteSize !== 'md' ? `\n  size="${stickyNoteSize}"` : ''}
  position={{ x: 50, y: 50 }}
  draggable={false}
/>`;

      case "fab":
        return `// Import the ScrollToTopFab for automatic scroll functionality
import { ScrollToTopFab } from "@/components/library/fab";

// Add to your page component
<ScrollToTopFab 
  showAt={400} 
  position="bottom-right"
/>

// Or use the basic FAB with custom scroll function
<LibraryFab${fabVariant !== 'default' ? `\n  variant="${fabVariant}"` : ''}
  position="bottom-right"${fabVariant === 'extended' ? '\n  label="Scroll to Top"' : ''}
  icon={<span className="text-xl font-bold">↑</span>}
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
/>`;

      default:
        return '';
    }
  };

  return (
    <div className="mt-20 bg-white rounded-xl shadow-sm border border-gray-200 p-8" id="playground">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Playground</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Test and customize all components in real-time. Switch between components and 
          experiment with different properties to see the changes immediately.
        </p>
      </div>

      {/* Component Selector */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Select Component</h4>
        <div className="flex flex-wrap gap-2">
          {(["button", "accordion", "carousel", "container", "navigation", "card", "search-bar", "modal", "form", "table", "tabs", "alert", "badge", "breadcrumb", "pagination", "progress", "slider", "tooltip", "avatar", "dropdown", "stepper", "chip", "timeline", "spinner", "calendar", "rating", "toast", "collapse", "divider", "list", "snackbar", "switch", "drawer", "file-upload", "table-of-contents", "countdown-timer", "color-picker", "sticky-note", "fab"] as const).map((component) => (
            <button
              key={component}
              onClick={() => setSelectedComponent(component)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedComponent === component
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {component}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Component Preview</h4>
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 flex items-center justify-center min-h-[200px]">
            {renderComponentPreview()}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Properties Panel</h4>
          {renderControls()}
          
          {/* Code Preview */}
          <div className="mt-6">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Generated Code</h5>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto">
              <pre>{generateCode()}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
