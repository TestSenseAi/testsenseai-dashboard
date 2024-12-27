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
import { Integration, IntegrationConfig } from '../../types/integration';
import { getIntegrationConfig } from '../../utils/integration';

interface IntegrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  integration: Integration;
  onUpdate: (id: string, config: Record<string, string>) => void;
}

export function IntegrationForm({ isOpen, onClose, integration, onUpdate }: IntegrationFormProps) {
  const [config, setConfig] = useState(integration.config);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const integrationConfig: IntegrationConfig = getIntegrationConfig(integration.type);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onUpdate(integration.id, config);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent bg='gray.800'>
        <ModalHeader>Configure {integration.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {integrationConfig.fields.map((field) => (
              <FormControl key={field.key} isRequired={field.required}>
                <FormLabel>{field.name}</FormLabel>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={config[field.key] || ''}
                  onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                />
              </FormControl>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='brand' onClick={handleSubmit} isLoading={isSubmitting}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
