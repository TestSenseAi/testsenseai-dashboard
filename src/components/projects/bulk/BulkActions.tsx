import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { MoreHorizontal, Archive, Trash, Tags, Lock } from 'lucide-react';
import { useRef } from 'react';

interface BulkActionsProps {
  selectedProjects: string[];
  onArchive: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
  onUpdateAccess: (ids: string[], access: 'private' | 'public') => void;
  onAddTag: (ids: string[], tagId: string) => void;
}

export function BulkActions({
  selectedProjects,
  onArchive,
  onDelete,
  onUpdateAccess,
  onAddTag,
}: BulkActionsProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleAction = (action: () => void, successMessage: string) => {
    action();
    toast({
      title: 'Success',
      description: successMessage,
      status: 'success',
      duration: 3000,
    });
  };

  if (selectedProjects.length === 0) return null;

  return (
    <>
      <Menu>
        <MenuButton as={Button} leftIcon={<MoreHorizontal size={16} />} variant='outline' size='sm'>
          Bulk Actions ({selectedProjects.length})
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<Archive size={16} />}
            onClick={() =>
              handleAction(() => onArchive(selectedProjects), 'Projects archived successfully')
            }>
            Archive Selected
          </MenuItem>
          <MenuItem
            icon={<Lock size={16} />}
            onClick={() =>
              handleAction(
                () => onUpdateAccess(selectedProjects, 'private'),
                'Access updated successfully'
              )
            }>
            Make Private
          </MenuItem>
          <MenuItem
            icon={<Tags size={16} />}
            onClick={() =>
              handleAction(() => onAddTag(selectedProjects, 'new-tag'), 'Tags added successfully')
            }>
            Add Tag
          </MenuItem>
          <MenuItem icon={<Trash size={16} />} color='red.400' onClick={onOpen}>
            Delete Selected
          </MenuItem>
        </MenuList>
      </Menu>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Projects</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete {selectedProjects.length} projects? This action cannot
              be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  onDelete(selectedProjects);
                  onClose();
                  toast({
                    title: 'Success',
                    description: 'Projects deleted successfully',
                    status: 'success',
                    duration: 3000,
                  });
                }}
                ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
