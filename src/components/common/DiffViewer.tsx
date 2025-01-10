import {
  Box,
  Text,
  HStack,
  VStack,
  Badge,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { Copy, Plus, Minus } from 'lucide-react';
import { useMemo } from 'react';
import { diffLines, Change } from 'diff';

interface DiffViewerProps {
  oldCode: string;
  newCode: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
}

export function DiffViewer({
  oldCode,
  newCode,
  language = 'typescript',
  showLineNumbers = true,
  title,
}: DiffViewerProps) {
  const addedBg = useColorModeValue('green.50', 'green.900');
  const removedBg = useColorModeValue('red.50', 'red.900');
  const addedColor = useColorModeValue('green.800', 'green.200');
  const removedColor = useColorModeValue('red.800', 'red.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const diff = useMemo(() => {
    return diffLines(oldCode, newCode);
  }, [oldCode, newCode]);

  const handleCopyLine = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const renderDiffLine = (line: Change, index: number) => {
    const isAddition = line.added;
    const isDeletion = line.removed;
    const lineContent = line.value.replace(/\n$/, '');

    return (
      <Tr
        key={index}
        bg={isAddition ? addedBg : isDeletion ? removedBg : 'transparent'}
        _hover={{ bg: isAddition ? 'green.100' : isDeletion ? 'red.100' : 'gray.100' }}>
        {showLineNumbers && (
          <Td width='1%' whiteSpace='nowrap' py={1} px={4} borderColor={borderColor}>
            <Text fontSize='sm' color='gray.500' fontFamily='mono'>
              {isAddition ? '+' : isDeletion ? '-' : ' '}
            </Text>
          </Td>
        )}
        <Td py={1} px={4} borderColor={borderColor}>
          <HStack justify='space-between'>
            <Text
              fontSize='sm'
              fontFamily='mono'
              color={isAddition ? addedColor : isDeletion ? removedColor : 'inherit'}
              whiteSpace='pre-wrap'>
              {lineContent}
            </Text>
            <Tooltip label='Copy line'>
              <IconButton
                aria-label='Copy line'
                icon={<Copy size={14} />}
                size='xs'
                variant='ghost'
                onClick={() => handleCopyLine(lineContent)}
                visibility='hidden'
                _groupHover={{ visibility: 'visible' }}
              />
            </Tooltip>
          </HStack>
        </Td>
      </Tr>
    );
  };

  const stats = useMemo(() => {
    return diff.reduce(
      (acc: { additions: number; deletions: number }, line: Change) => {
        if (line.added) acc.additions += line.count || 0;
        if (line.removed) acc.deletions += line.count || 0;
        return acc;
      },
      { additions: 0, deletions: 0 }
    );
  }, [diff]);

  return (
    <Card variant='outline'>
      <CardBody p={0}>
        <VStack align='stretch' spacing={0}>
          {(title || stats.additions > 0 || stats.deletions > 0) && (
            <Box p={4} borderBottomWidth={1} borderColor={borderColor}>
              <HStack justify='space-between'>
                {title && (
                  <Text fontWeight='medium' fontSize='sm'>
                    {title}
                  </Text>
                )}
                <HStack spacing={4}>
                  {stats.additions > 0 && (
                    <HStack>
                      <Plus size={14} color='green' />
                      <Badge colorScheme='green' variant='subtle'>
                        {stats.additions} addition{stats.additions !== 1 ? 's' : ''}
                      </Badge>
                    </HStack>
                  )}
                  {stats.deletions > 0 && (
                    <HStack>
                      <Minus size={14} color='red' />
                      <Badge colorScheme='red' variant='subtle'>
                        {stats.deletions} deletion{stats.deletions !== 1 ? 's' : ''}
                      </Badge>
                    </HStack>
                  )}
                </HStack>
              </HStack>
            </Box>
          )}

          <Box overflowX='auto'>
            <Table size='sm' role='group'>
              <Thead>
                <Tr>
                  {showLineNumbers && <Th width='1%' px={4}></Th>}
                  <Th px={4}>{language}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {diff.map((line: Change, index: number) => renderDiffLine(line, index))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
}
