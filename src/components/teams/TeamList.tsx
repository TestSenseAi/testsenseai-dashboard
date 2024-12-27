import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { MoreVertical } from 'lucide-react';
import { TeamListProps } from '../../types/team';
import { RoleSelector } from './RoleSelector';

export function TeamList({ members, onUpdateRole, onRemoveMember }: TeamListProps) {
  return (
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Member</Th>
          <Th>Role</Th>
          <Th>Last Active</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {members.map((member) => (
          <Tr key={member.id}>
            <Td>
              <HStack spacing={3}>
                <Avatar size='sm' name={member.name} src={member.avatar} />
                <div>
                  <Text fontWeight='medium'>{member.name}</Text>
                  <Text fontSize='sm' color='gray.400'>
                    {member.email}
                  </Text>
                </div>
              </HStack>
            </Td>
            <Td>
              <RoleSelector
                value={member.role}
                onChange={(role) => onUpdateRole(member.id, role)}
              />
            </Td>
            <Td>
              <Text fontSize='sm' color='gray.400'>
                {member.lastActive ? new Date(member.lastActive).toLocaleDateString() : 'Never'}
              </Text>
            </Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MoreVertical size={16} />}
                  variant='ghost'
                  size='sm'
                />
                <MenuList>
                  <MenuItem onClick={() => onRemoveMember(member.id)}>Remove Member</MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
