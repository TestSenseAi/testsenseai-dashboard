import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { Check, X } from 'lucide-react';
import { useTeam } from '../../../hooks/useTeam';

export function PlanSettings() {
  const { organization } = useTeam();

  if (!organization) return null;

  return (
    <Box>
      <Heading size='sm' mb={4}>
        Plan & Features
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box>
          <Text mb={2}>Current Plan</Text>
          <Badge colorScheme='brand' fontSize='md' px={3} py={1}>
            {organization.plan.toUpperCase()}
          </Badge>
        </Box>
        <Box>
          <Text mb={2}>Features</Text>
          <List spacing={2}>
            {organization.features.map((feature) => (
              <ListItem key={feature.name} display='flex' alignItems='center'>
                <ListIcon
                  as={feature.enabled ? Check : X}
                  color={feature.enabled ? 'green.400' : 'red.400'}
                />
                <Text>{feature.name}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      </SimpleGrid>
      <Button mt={4} size='sm' colorScheme='brand'>
        Upgrade Plan
      </Button>
    </Box>
  );
}
