import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Avatar,
  Button,
  Progress,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  SimpleGrid,
  Card,
  CardBody,
  Divider,
  useToast,
  Icon,
} from '@chakra-ui/react';
import {
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  UserPlus,
  MessageSquare,
  Eye,
} from 'lucide-react';
import { TestReview, ReviewStatus } from '../../types/collaboration';

const statusColors: Record<ReviewStatus, string> = {
  pending: 'yellow',
  in_progress: 'blue',
  approved: 'green',
  rejected: 'red',
};

const statusIcons: Record<ReviewStatus, any> = {
  pending: Clock,
  in_progress: AlertTriangle,
  approved: CheckCircle,
  rejected: XCircle,
};

const mockReviews: TestReview[] = [
  {
    id: '1',
    title: 'Authentication Flow Tests',
    description: 'Review new test cases for user authentication',
    status: 'in_progress',
    author: {
      id: '1',
      name: 'John Doe',
      avatar: '',
    },
    reviewers: [
      { id: '2', name: 'Jane Smith', avatar: '' },
      { id: '3', name: 'Bob Wilson', avatar: '' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: 5,
    approvals: 1,
    requiredApprovals: 2,
    changes: [
      { id: '1', file: 'auth.test.ts', additions: 45, deletions: 12 },
      { id: '2', file: 'login.test.ts', additions: 23, deletions: 8 },
    ],
  },
  // Add more mock reviews
];

export function ReviewWorkflow() {
  const toast = useToast();

  const handleAction = (reviewId: string, action: 'approve' | 'reject') => {
    toast({
      id: reviewId,
      title: `Review ${action === 'approve' ? 'approved' : 'rejected'}`,
      status: action === 'approve' ? 'success' : 'error',
      duration: 3000,
    });
  };

  const handleAddReviewer = (reviewId: string) => {
    toast({
      id: reviewId,
      title: 'Reviewer added',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardBody>
              <VStack align='stretch' spacing={4}>
                <HStack justify='space-between'>
                  <HStack>
                    <Icon
                      as={statusIcons[review.status]}
                      color={`${statusColors[review.status]}.400`}
                    />
                    <Text fontWeight='medium'>{review.title}</Text>
                  </HStack>
                  <Badge colorScheme={statusColors[review.status]}>
                    {review.status.replace('_', ' ')}
                  </Badge>
                </HStack>

                <Text color='gray.400'>{review.description}</Text>

                <HStack justify='space-between'>
                  <HStack>
                    <Avatar size='sm' name={review.author.name} src={review.author.avatar} />
                    <Box>
                      <Text fontSize='sm'>Created by</Text>
                      <Text fontWeight='medium'>{review.author.name}</Text>
                    </Box>
                  </HStack>
                  <Box>
                    <Text fontSize='sm' color='gray.400'>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Text>
                  </Box>
                </HStack>

                <Divider />

                <VStack align='stretch' spacing={2}>
                  <HStack justify='space-between'>
                    <Text fontSize='sm'>Reviewers</Text>
                    <IconButton
                      aria-label='Add reviewer'
                      icon={<UserPlus size={16} />}
                      size='sm'
                      variant='ghost'
                      onClick={() => handleAddReviewer(review.id)}
                    />
                  </HStack>
                  <HStack>
                    <Avatar size='sm' name={review.author.name} src={review.author.avatar} />
                    {review.reviewers.map((reviewer) => (
                      <Tooltip key={reviewer.id} label={reviewer.name}>
                        <Avatar size='sm' name={reviewer.name} src={reviewer.avatar} />
                      </Tooltip>
                    ))}
                  </HStack>
                </VStack>

                <Box>
                  <Text fontSize='sm' mb={2}>
                    Approvals ({review.approvals}/{review.requiredApprovals})
                  </Text>
                  <Progress
                    value={(review.approvals / review.requiredApprovals) * 100}
                    colorScheme='green'
                    borderRadius='full'
                  />
                </Box>

                <HStack justify='space-between'>
                  <HStack spacing={4}>
                    <HStack>
                      <Icon as={MessageSquare} size={16} />
                      <Text fontSize='sm'>{review.comments}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={Eye} size={16} />
                      <Text fontSize='sm'>
                        {review.changes.reduce(
                          (acc, change) => acc + change.additions + change.deletions,
                          0
                        )}{' '}
                        changes
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack>
                    <Button
                      size='sm'
                      colorScheme='green'
                      leftIcon={<CheckCircle size={16} />}
                      onClick={() => handleAction(review.id, 'approve')}>
                      Approve
                    </Button>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<MoreVertical size={16} />}
                        variant='ghost'
                        size='sm'
                      />
                      <MenuList>
                        <MenuItem
                          icon={<XCircle size={16} />}
                          onClick={() => handleAction(review.id, 'reject')}>
                          Request Changes
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
