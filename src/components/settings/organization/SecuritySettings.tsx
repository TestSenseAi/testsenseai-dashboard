import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Input,
  Button,
  Text,
  Card,
  CardBody,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  IconButton,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react';
import { Plus, Save, Shield, Key, Globe, History } from 'lucide-react';
import { useState } from 'react';
import { SecuritySettings as SecuritySettingsType } from '../../../types/organization';

interface SecuritySettingsProps {
  settings: SecuritySettingsType;
  onUpdate: (settings: SecuritySettingsType) => void;
}

export function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
  const [newDomain, setNewDomain] = useState('');
  const [newIp, setNewIp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleAddDomain = () => {
    if (!newDomain) return;

    const domain = newDomain.toLowerCase().trim();
    if (settings.authentication.sso.domains.includes(domain)) {
      toast({
        title: 'Domain already exists',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    onUpdate({
      ...settings,
      authentication: {
        ...settings.authentication,
        sso: {
          ...settings.authentication.sso,
          domains: [...settings.authentication.sso.domains, domain],
        },
      },
    });
    setNewDomain('');
  };

  const handleRemoveDomain = (domain: string) => {
    onUpdate({
      ...settings,
      authentication: {
        ...settings.authentication,
        sso: {
          ...settings.authentication.sso,
          domains: settings.authentication.sso.domains.filter((d) => d !== domain),
        },
      },
    });
  };

  const handleAddIp = () => {
    if (!newIp) return;

    if (settings.access.ipWhitelist.includes(newIp)) {
      toast({
        title: 'IP already exists',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    onUpdate({
      ...settings,
      access: {
        ...settings.access,
        ipWhitelist: [...settings.access.ipWhitelist, newIp],
      },
    });
    setNewIp('');
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onUpdate(settings);
      toast({
        title: 'Success',
        description: 'Security settings updated successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update security settings',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VStack spacing={6} align='stretch'>
      <Card>
        <CardBody>
          <VStack spacing={6} align='stretch'>
            <HStack>
              <Shield size={20} />
              <Text fontSize='lg' fontWeight='medium'>
                Authentication
              </Text>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl>
                <FormLabel>Multi-Factor Authentication</FormLabel>
                <Select
                  value={settings.authentication.requireMFA ? 'required' : 'optional'}
                  onChange={(e) =>
                    onUpdate({
                      ...settings,
                      authentication: {
                        ...settings.authentication,
                        requireMFA: e.target.value === 'required',
                      },
                    })
                  }>
                  <option value='required'>Required for all users</option>
                  <option value='optional'>Optional</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>MFA Methods</FormLabel>
                <SimpleGrid columns={2} spacing={4}>
                  {['authenticator', 'sms', 'email'].map((method) => (
                    <HStack key={method}>
                      <Switch
                        isChecked={settings.authentication.mfaMethods.includes(method as any)}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            authentication: {
                              ...settings.authentication,
                              mfaMethods: e.target.checked
                                ? [...settings.authentication.mfaMethods, method as any]
                                : settings.authentication.mfaMethods.filter((m) => m !== method),
                            },
                          })
                        }
                      />
                      <Text>{method.charAt(0).toUpperCase() + method.slice(1)}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </FormControl>
            </SimpleGrid>

            <Divider />

            <Text fontWeight='medium'>Password Policy</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl>
                <FormLabel>Minimum Length</FormLabel>
                <NumberInput
                  value={settings.authentication.passwordPolicy.minLength}
                  onChange={(_, value) =>
                    onUpdate({
                      ...settings,
                      authentication: {
                        ...settings.authentication,
                        passwordPolicy: {
                          ...settings.authentication.passwordPolicy,
                          minLength: value,
                        },
                      },
                    })
                  }
                  min={8}
                  max={32}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Password Expiry (days)</FormLabel>
                <NumberInput
                  value={settings.authentication.passwordPolicy.expiryDays}
                  onChange={(_, value) =>
                    onUpdate({
                      ...settings,
                      authentication: {
                        ...settings.authentication,
                        passwordPolicy: {
                          ...settings.authentication.passwordPolicy,
                          expiryDays: value,
                        },
                      },
                    })
                  }
                  min={0}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <SimpleGrid columns={2} spacing={4}>
                {[
                  { key: 'requireNumbers', label: 'Require Numbers' },
                  { key: 'requireSymbols', label: 'Require Symbols' },
                  { key: 'requireUppercase', label: 'Require Uppercase' },
                ].map(({ key, label }) => (
                  <FormControl key={key}>
                    <FormLabel>{label}</FormLabel>
                    <Switch
                      isChecked={Boolean(
                        settings.authentication.passwordPolicy[
                          key as keyof typeof settings.authentication.passwordPolicy
                        ]
                      )}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          authentication: {
                            ...settings.authentication,
                            passwordPolicy: {
                              ...settings.authentication.passwordPolicy,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                    />
                  </FormControl>
                ))}
              </SimpleGrid>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <VStack spacing={6} align='stretch'>
            <HStack>
              <Key size={20} />
              <Text fontSize='lg' fontWeight='medium'>
                Single Sign-On
              </Text>
            </HStack>

            <FormControl>
              <FormLabel>SSO Status</FormLabel>
              <Select
                value={
                  settings.authentication.sso.enabled
                    ? settings.authentication.sso.enforced
                      ? 'enforced'
                      : 'enabled'
                    : 'disabled'
                }
                onChange={(e) =>
                  onUpdate({
                    ...settings,
                    authentication: {
                      ...settings.authentication,
                      sso: {
                        ...settings.authentication.sso,
                        enabled: e.target.value !== 'disabled',
                        enforced: e.target.value === 'enforced',
                      },
                    },
                  })
                }>
                <option value='disabled'>Disabled</option>
                <option value='enabled'>Enabled (Optional)</option>
                <option value='enforced'>Enforced (Required)</option>
              </Select>
            </FormControl>

            {settings.authentication.sso.enabled && (
              <>
                <FormControl>
                  <FormLabel>SSO Provider</FormLabel>
                  <Select
                    value={settings.authentication.sso.provider}
                    onChange={(e) =>
                      onUpdate({
                        ...settings,
                        authentication: {
                          ...settings.authentication,
                          sso: {
                            ...settings.authentication.sso,
                            provider: e.target.value as any,
                          },
                        },
                      })
                    }>
                    <option value='google'>Google Workspace</option>
                    <option value='okta'>Okta</option>
                    <option value='azure'>Azure AD</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Allowed Domains</FormLabel>
                  <HStack mb={2}>
                    <Input
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value)}
                      placeholder='example.com'
                    />
                    <IconButton
                      aria-label='Add domain'
                      icon={<Plus size={16} />}
                      onClick={handleAddDomain}
                    />
                  </HStack>
                  <HStack wrap='wrap' spacing={2}>
                    {settings.authentication.sso.domains.map((domain) => (
                      <Tag
                        key={domain}
                        size='md'
                        borderRadius='full'
                        variant='solid'
                        colorScheme='blue'>
                        <TagLabel>{domain}</TagLabel>
                        <TagCloseButton onClick={() => handleRemoveDomain(domain)} />
                      </Tag>
                    ))}
                  </HStack>
                </FormControl>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <VStack spacing={6} align='stretch'>
            <HStack>
              <Globe size={20} />
              <Text fontSize='lg' fontWeight='medium'>
                Access Control
              </Text>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl>
                <FormLabel>IP Whitelist</FormLabel>
                <HStack mb={2}>
                  <Input
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                    placeholder='192.168.1.1'
                  />
                  <IconButton aria-label='Add IP' icon={<Plus size={16} />} onClick={handleAddIp} />
                </HStack>
                <HStack wrap='wrap' spacing={2}>
                  {settings.access.ipWhitelist.map((ip) => (
                    <Tag key={ip} size='md' borderRadius='full' variant='solid' colorScheme='green'>
                      <TagLabel>{ip}</TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          onUpdate({
                            ...settings,
                            access: {
                              ...settings.access,
                              ipWhitelist: settings.access.ipWhitelist.filter((i) => i !== ip),
                            },
                          })
                        }
                      />
                    </Tag>
                  ))}
                </HStack>
              </FormControl>

              <FormControl>
                <FormLabel>Geo-Restrictions</FormLabel>
                <Select
                  value={settings.access.restrictOutsideAccess ? 'restricted' : 'unrestricted'}
                  onChange={(e) =>
                    onUpdate({
                      ...settings,
                      access: {
                        ...settings.access,
                        restrictOutsideAccess: e.target.value === 'restricted',
                      },
                    })
                  }>
                  <option value='unrestricted'>No restrictions</option>
                  <option value='restricted'>Restrict to allowed countries</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <VStack spacing={6} align='stretch'>
            <HStack>
              <History size={20} />
              <Text fontSize='lg' fontWeight='medium'>
                Audit Logging
              </Text>
            </HStack>

            <FormControl>
              <FormLabel>Audit Log Status</FormLabel>
              <Switch
                isChecked={settings.audit.enabled}
                onChange={(e) =>
                  onUpdate({
                    ...settings,
                    audit: {
                      ...settings.audit,
                      enabled: e.target.checked,
                    },
                  })
                }
              />
            </FormControl>

            {settings.audit.enabled && (
              <>
                <FormControl>
                  <FormLabel>Retention Period (days)</FormLabel>
                  <NumberInput
                    value={settings.audit.retentionDays}
                    onChange={(_, value) =>
                      onUpdate({
                        ...settings,
                        audit: {
                          ...settings.audit,
                          retentionDays: value,
                        },
                      })
                    }
                    min={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Log Types</FormLabel>
                  <SimpleGrid columns={2} spacing={4}>
                    {['auth', 'billing', 'projects', 'teams', 'api'].map((type) => (
                      <HStack key={type}>
                        <Switch
                          isChecked={settings.audit.logTypes.includes(type as any)}
                          onChange={(e) =>
                            onUpdate({
                              ...settings,
                              audit: {
                                ...settings.audit,
                                logTypes: e.target.checked
                                  ? [...settings.audit.logTypes, type as any]
                                  : settings.audit.logTypes.filter((t) => t !== type),
                              },
                            })
                          }
                        />
                        <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </FormControl>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        onClick={handleSave}
        isLoading={isSubmitting}>
        Save Security Settings
      </Button>
    </VStack>
  );
}
