import {
  Box,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Icon,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Search, Plus, Book } from 'lucide-react';
import { useState } from 'react';
import { KnowledgeArticle, ArticleCategory } from '../../types/collaboration';

const categories: ArticleCategory[] = [
  'test-patterns',
  'best-practices',
  'troubleshooting',
  'setup-guide',
  'faq',
];

const mockArticles: KnowledgeArticle[] = [
  {
    id: '1',
    title: 'Best Practices for Test Organization',
    content: 'Detailed guide on organizing test suites effectively...',
    category: 'best-practices',
    tags: ['organization', 'structure', 'maintenance'],
    author: {
      id: '1',
      name: 'John Doe',
      avatar: '',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock articles
];

export function KnowledgeBase() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    category: 'best-practices' as ArticleCategory,
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !newArticle.tags.includes(newTag)) {
      setNewArticle({
        ...newArticle,
        tags: [...newArticle.tags, newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewArticle({
      ...newArticle,
      tags: newArticle.tags.filter((t) => t !== tag),
    });
  };

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <HStack mb={6} spacing={4}>
        <InputGroup>
          <InputLeftElement>
            <Search size={18} />
          </InputLeftElement>
          <Input
            placeholder='Search knowledge base...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ArticleCategory | 'all')}
          w='200px'>
          <option value='all'>All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </option>
          ))}
        </Select>
        <Button leftIcon={<Plus size={18} />} colorScheme='brand' onClick={onOpen}>
          New Article
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <CardBody>
              <VStack align='stretch' spacing={3}>
                <HStack justify='space-between'>
                  <Icon as={Book} color='brand.400' />
                  <Badge>{article.category}</Badge>
                </HStack>
                <Text fontWeight='medium'>{article.title}</Text>
                <Text noOfLines={3} color='gray.400'>
                  {article.content}
                </Text>
                <HStack wrap='wrap' spacing={2}>
                  {article.tags.map((tag) => (
                    <Tag key={tag} size='sm' colorScheme='brand' borderRadius='full'>
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
                <HStack justify='space-between' fontSize='sm' color='gray.400'>
                  <Text>By {article.author.name}</Text>
                  <Text>{new Date(article.updatedAt).toLocaleDateString()}</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent bg='gray.800'>
          <ModalHeader>New Knowledge Base Article</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={newArticle.title}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      title: e.target.value,
                    })
                  }
                  placeholder='Article title...'
                />
              </FormControl>

              <FormControl>
                <FormLabel>Content</FormLabel>
                <Textarea
                  value={newArticle.content}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      content: e.target.value,
                    })
                  }
                  placeholder='Article content...'
                  rows={10}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  value={newArticle.category}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      category: e.target.value as ArticleCategory,
                    })
                  }>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Tags</FormLabel>
                <HStack mb={2}>
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder='Add tags...'
                  />
                  <IconButton
                    aria-label='Add tag'
                    icon={<Plus size={18} />}
                    onClick={handleAddTag}
                  />
                </HStack>
                <HStack wrap='wrap' spacing={2}>
                  {newArticle.tags.map((tag) => (
                    <Tag
                      key={tag}
                      size='md'
                      borderRadius='full'
                      variant='solid'
                      colorScheme='brand'>
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  ))}
                </HStack>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='brand'>Create Article</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
