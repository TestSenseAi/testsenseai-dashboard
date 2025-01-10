import { Select } from '@chakra-ui/react';
import { UserRole } from '../../types/team';

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}

const roles: { value: UserRole; label: string }[] = [
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' },
  { value: 'viewer', label: 'Viewer' },
];

export function RoleSelector({ value, onChange, disabled }: RoleSelectorProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as UserRole)}
      size='sm'
      width='150px'
      isDisabled={disabled}>
      {roles.map((role) => (
        <option key={role.value} value={role.value}>
          {role.label}
        </option>
      ))}
    </Select>
  );
}
