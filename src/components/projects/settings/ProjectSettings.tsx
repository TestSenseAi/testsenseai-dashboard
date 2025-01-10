import {
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Divider,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { Project } from '../../../types/project';

interface ProjectSettingsProps {
  project: Project;
  onUpdate: (settings: Project['settings']) => void;
}

export function ProjectSettings({ project, onUpdate }: ProjectSettingsProps) {
  const toast = useToast();

  const handleSave = () => {
    onUpdate(project.settings);
    toast({
      title: 'Success',
      description: 'Project settings updated successfully',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack spacing={6} align='stretch'>
      <FormControl display='flex' alignItems='start' justifyContent='space-between'>
        <div>
          <FormLabel mb={0}>Public Access</FormLabel>
          <Text fontSize='sm' color='gray.400'>
            Allow public access to project details and test results
          </Text>
        </div>
        <Switch
          isChecked={project.settings.allowPublicAccess}
          onChange={(e) =>
            onUpdate({
              ...project.settings,
              allowPublicAccess: e.target.checked,
            })
          }
        />
      </FormControl>

      <Divider />

      <FormControl display='flex' alignItems='start' justifyContent='space-between'>
        <div>
          <FormLabel mb={0}>Code Review</FormLabel>
          <Text fontSize='sm' color='gray.400'>
            Require code review before merging test changes
          </Text>
        </div>
        <Switch
          isChecked={project.settings.requireCodeReview}
          onChange={(e) =>
            onUpdate({
              ...project.settings,
              requireCodeReview: e.target.checked,
            })
          }
        />
      </FormControl>

      <Divider />

      <FormControl display='flex' alignItems='start' justifyContent='space-between'>
        <div>
          <FormLabel mb={0}>Auto-run Tests</FormLabel>
          <Text fontSize='sm' color='gray.400'>
            Automatically run tests on code changes
          </Text>
        </div>
        <Switch
          isChecked={project.settings.autoRunTests}
          onChange={(e) =>
            onUpdate({
              ...project.settings,
              autoRunTests: e.target.checked,
            })
          }
        />
      </FormControl>

      <Divider />

      <FormControl display='flex' alignItems='start' justifyContent='space-between'>
        <div>
          <FormLabel mb={0}>Failure Notifications</FormLabel>
          <Text fontSize='sm' color='gray.400'>
            Send notifications when tests fail
          </Text>
        </div>
        <Switch
          isChecked={project.settings.notifyOnFailure}
          onChange={(e) =>
            onUpdate({
              ...project.settings,
              notifyOnFailure: e.target.checked,
            })
          }
        />
      </FormControl>

      <Divider />

      <FormControl display='flex' alignItems='start' justifyContent='space-between'>
        <div>
          <FormLabel mb={0}>Branch Protection</FormLabel>
          <Text fontSize='sm' color='gray.400'>
            Enforce branch protection rules
          </Text>
        </div>
        <Switch
          isChecked={project.settings.branchProtection}
          onChange={(e) =>
            onUpdate({
              ...project.settings,
              branchProtection: e.target.checked,
            })
          }
        />
      </FormControl>

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        onClick={handleSave}
        alignSelf='flex-end'>
        Save Settings
      </Button>
    </VStack>
  );
}
