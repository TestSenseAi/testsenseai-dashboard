import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { InviteModalProps, UserRole } from '../../types/team';
import { RoleSelector } from './RoleSelector';

export function InviteModal({ isOpen, onClose, onInvite }: InviteModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('member');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    setIsSubmitting(true);
    try {
      await onInvite(email, role);
      onClose();
      setEmail('');
      setRole('member');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg='gray.800'>
        <ModalHeader>Invite Team Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='colleague@company.com'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <RoleSelector value={role} onChange={setRole} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='brand' onClick={handleSubmit} isLoading={isSubmitting}>
            Send Invitation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
