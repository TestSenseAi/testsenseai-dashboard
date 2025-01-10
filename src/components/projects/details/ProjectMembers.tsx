import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { MoreVertical } from 'lucide-react';
import { Project, ProjectMember } from '../../../types/project';
import { useTeamMembers } from '../../../hooks/useTeamMembers';

interface ProjectMembersProps {
  project: Project;
  onUpdateRole: (memberId: string, role: ProjectMember['role']) => void;
  onRemoveMember: (memberId: string) => void;
}

export function ProjectMembers({ project, onUpdateRole, onRemoveMember }: ProjectMembersProps) {
  const { getMemberDetails } = useTeamMembers();

  return (
    <Box overflowX='auto'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Member</Th>
            <Th>Role</Th>
            <Th>Added</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {project.members.map((member) => {
            const details = getMemberDetails(member.userId);
            return (
              <Tr key={member.userId}>
                <Td>
                  <Avatar size='sm' name={details?.name} src={details?.avatar} mr={3} />
                  <Text display='inline-block'>{details?.name}</Text>
                </Td>
                <Td>{member.role}</Td>
                <Td>{new Date(member.addedAt).toLocaleDateString()}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<MoreVertical size={16} />}
                      variant='ghost'
                      size='sm'
                    />
                    <MenuList>
                      <MenuItem onClick={() => onUpdateRole(member.userId, 'admin')}>
                        Make Admin
                      </MenuItem>
                      <MenuItem onClick={() => onUpdateRole(member.userId, 'developer')}>
                        Make Developer
                      </MenuItem>
                      <MenuItem onClick={() => onUpdateRole(member.userId, 'viewer')}>
                        Make Viewer
                      </MenuItem>
                      <MenuItem onClick={() => onRemoveMember(member.userId)} color='red.400'>
                        Remove
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
