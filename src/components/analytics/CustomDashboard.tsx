import {
  Box,
  Button,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Badge,
  Tooltip,
  VStack,
  Divider,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import {
  Plus,
  MoreVertical,
  Download,
  Share2,
  BarChart2,
  LineChart,
  PieChart,
  Activity,
  Maximize2,
  Minimize2,
  Settings,
  RefreshCw,
  Lock,
  Unlock,
  Trash,
  Move,
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { ExportService } from '../../services/export';

interface Widget {
  id: string;
  name: string;
  type: 'chart' | 'metric' | 'table';
  icon: any;
  size: 'small' | 'medium' | 'large';
  isLocked?: boolean;
  isExpanded?: boolean;
  value?: number;
  change?: number;
}

const availableWidgets: Widget[] = [
  {
    id: 'coverage',
    name: 'Coverage Trend',
    type: 'chart',
    icon: LineChart,
    size: 'medium',
    value: 85,
    change: 1.5,
  },
  {
    id: 'duration',
    name: 'Test Duration',
    type: 'chart',
    icon: BarChart2,
    size: 'medium',
    value: 10,
    change: 0.5,
  },
  {
    id: 'risk',
    name: 'Risk Analysis',
    type: 'metric',
    icon: Activity,
    size: 'small',
    value: 70,
    change: 2.0,
  },
  {
    id: 'distribution',
    name: 'Test Distribution',
    type: 'chart',
    icon: PieChart,
    size: 'medium',
    value: 80,
    change: 1.0,
  },
];

export function CustomDashboard() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  const handleExport = async (exportFormat: 'pdf' | 'excel' | 'csv') => {
    try {
      // Prepare data for export
      const exportData = {
        widgets: widgets.map((widget: Widget) => ({
          name: widget.name,
          type: widget.type,
          data:
            widget.type === 'metric'
              ? {
                  value: widget.value,
                  change: widget.change,
                }
              : {
                  headers: ['Metric', 'Value', 'Change'],
                  rows: [[widget.name, widget.value, widget.change]],
                },
        })),
      };

      await ExportService.exportMetrics(exportData, exportFormat);
      toast({
        title: 'Export Successful',
        description: `Dashboard exported as ${exportFormat.toUpperCase()}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export dashboard data',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast({
      title: 'Dashboard Refreshed',
      status: 'success',
      duration: 2000,
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWidgets(items);
  };

  const handleAddWidget = (widget: Widget) => {
    setWidgets([...widgets, { ...widget, isExpanded: false, isLocked: false }]);
    onClose();
    toast({
      title: 'Widget Added',
      description: `${widget.name} has been added to your dashboard`,
      status: 'success',
      duration: 2000,
    });
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets(widgets.filter((w) => w.id !== widgetId));
    toast({
      title: 'Widget Removed',
      status: 'info',
      duration: 2000,
    });
  };

  const handleToggleLock = (widgetId: string) => {
    setWidgets(widgets.map((w) => (w.id === widgetId ? { ...w, isLocked: !w.isLocked } : w)));
  };

  const handleToggleExpand = (widgetId: string) => {
    setWidgets(widgets.map((w) => (w.id === widgetId ? { ...w, isExpanded: !w.isExpanded } : w)));
  };

  return (
    <Box>
      <VStack spacing={6} align='stretch'>
        <HStack justify='space-between' mb={6}>
          <HStack spacing={4}>
            <Text fontSize='lg' fontWeight='medium'>
              Custom Dashboard
            </Text>
            <Badge colorScheme={isEditing ? 'orange' : 'gray'}>
              {isEditing ? 'Editing' : 'Viewing'}
            </Badge>
          </HStack>
          <HStack spacing={2}>
            <Tooltip label='Refresh Dashboard'>
              <IconButton
                aria-label='Refresh dashboard'
                icon={<RefreshCw size={16} />}
                size='sm'
                variant='ghost'
                isLoading={isRefreshing}
                onClick={handleRefresh}
              />
            </Tooltip>
            <Button leftIcon={<Plus size={16} />} size='sm' variant='outline' onClick={onOpen}>
              Add Widget
            </Button>
            <Button
              leftIcon={isEditing ? <Lock size={16} /> : <Settings size={16} />}
              size='sm'
              variant='outline'
              onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Lock Layout' : 'Edit Layout'}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<MoreVertical size={16} />}
                size='sm'
                variant='outline'>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem icon={<Download size={16} />} onClick={() => handleExport('pdf')}>
                  Export as PDF
                </MenuItem>
                <MenuItem icon={<Download size={16} />} onClick={() => handleExport('csv')}>
                  Export as CSV
                </MenuItem>
                <MenuItem icon={<Download size={16} />} onClick={() => handleExport('excel')}>
                  Export as Excel
                </MenuItem>
                <MenuItem icon={<Share2 size={16} />}>Share Dashboard</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='dashboard'>
            {(provided) => (
              <Grid
                templateColumns='repeat(12, 1fr)'
                gap={6}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {widgets.map((widget, index) => (
                  <Draggable
                    key={widget.id}
                    draggableId={widget.id}
                    index={index}
                    isDragDisabled={!isEditing || widget.isLocked}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        gridColumn={`span ${
                          widget.isExpanded
                            ? 12
                            : widget.size === 'small'
                            ? 4
                            : widget.size === 'medium'
                            ? 6
                            : 12
                        }`}
                        transition='all 0.2s'
                        opacity={snapshot.isDragging ? 0.8 : 1}>
                        <Card
                          bg={bgColor}
                          borderWidth='1px'
                          borderColor={borderColor}
                          borderStyle={snapshot.isDragging ? 'dashed' : 'solid'}
                          _hover={{ borderColor: 'brand.500' }}>
                          <CardBody>
                            <VStack spacing={4} align='stretch'>
                              <HStack justify='space-between'>
                                <HStack {...provided.dragHandleProps}>
                                  {isEditing && <Icon as={Move} size={16} color='gray.400' />}
                                  <Icon as={widget.icon} color='brand.500' />
                                  <Text fontWeight='medium'>{widget.name}</Text>
                                </HStack>
                                <HStack>
                                  {isEditing ? (
                                    <>
                                      <Tooltip
                                        label={widget.isLocked ? 'Unlock Widget' : 'Lock Widget'}>
                                        <IconButton
                                          aria-label='Toggle lock'
                                          icon={
                                            widget.isLocked ? (
                                              <Lock size={16} />
                                            ) : (
                                              <Unlock size={16} />
                                            )
                                          }
                                          size='sm'
                                          variant='ghost'
                                          onClick={() => handleToggleLock(widget.id)}
                                        />
                                      </Tooltip>
                                      <Tooltip label='Remove Widget'>
                                        <IconButton
                                          aria-label='Remove widget'
                                          icon={<Trash size={16} />}
                                          size='sm'
                                          variant='ghost'
                                          colorScheme='red'
                                          onClick={() => handleRemoveWidget(widget.id)}
                                        />
                                      </Tooltip>
                                    </>
                                  ) : (
                                    <Tooltip label={widget.isExpanded ? 'Collapse' : 'Expand'}>
                                      <IconButton
                                        aria-label='Toggle expand'
                                        icon={
                                          widget.isExpanded ? (
                                            <Minimize2 size={16} />
                                          ) : (
                                            <Maximize2 size={16} />
                                          )
                                        }
                                        size='sm'
                                        variant='ghost'
                                        onClick={() => handleToggleExpand(widget.id)}
                                      />
                                    </Tooltip>
                                  )}
                                </HStack>
                              </HStack>
                              <Divider />
                              {/* Widget content would go here */}
                              <Box
                                h={widget.isExpanded ? '400px' : '200px'}
                                bg='gray.700'
                                borderRadius='md'
                              />
                            </VStack>
                          </CardBody>
                        </Card>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>

        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay />
          <ModalContent bg={bgColor}>
            <ModalHeader>Add Widget</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <SimpleGrid columns={2} spacing={4}>
                {availableWidgets.map((widget) => (
                  <Card
                    key={widget.id}
                    cursor='pointer'
                    _hover={{ bg: hoverBg }}
                    onClick={() => handleAddWidget(widget)}>
                    <CardBody>
                      <HStack>
                        <Icon as={widget.icon} boxSize={5} color='brand.500' />
                        <VStack align='start' spacing={0}>
                          <Text fontWeight='medium'>{widget.name}</Text>
                          <Text fontSize='sm' color='gray.500'>
                            {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)}
                          </Text>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}
