import { SimpleGrid, Text, VStack, Checkbox, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './filters/ProjectFilters';
import { BulkActions } from './bulk/BulkActions';
import { useProjectList } from '../../hooks/useProjectList';
import { useProjects } from '../../hooks/useProjects';
import { ProjectCategory, ProjectTag } from '../../types/project';

export function ProjectList() {
  const {
    projects,
    search,
    setSearch,
    selectedTags,
    setSelectedTags,
    selectedCategories,
    setSelectedCategories,
    showArchived,
    setShowArchived,
  } = useProjectList();

  const { selectProject, archiveProjects, deleteProjects, updateProjectsAccess, addProjectTag } =
    useProjects();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Mock tags for now - in real app, fetch from API
  const availableTags: ProjectTag[] = [
    { id: '1', name: 'Frontend', color: 'blue' },
    { id: '2', name: 'Backend', color: 'green' },
    { id: '3', name: 'Mobile', color: 'purple' },
    { id: '4', name: 'High Priority', color: 'red' },
  ];

  const handleTagChange = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleCategoryChange = (category: ProjectCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setSelectedCategories([]);
    setShowArchived(false);
  };

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  const availableCategories: ProjectCategory[] = [
    { id: '1', name: 'Web', color: 'blue' },
    { id: '2', name: 'Mobile', color: 'green' },
    { id: '3', name: 'AI', color: 'purple' },
  ];

  return (
    <VStack spacing={6} align='stretch'>
      <ProjectFilters
        search={search}
        onSearchChange={setSearch}
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        showArchived={showArchived}
        onArchivedChange={setShowArchived}
        availableTags={availableTags}
        onClearFilters={clearFilters}
        availableCategories={availableCategories}
      />

      <HStack justify='space-between'>
        <BulkActions
          selectedProjects={selectedProjects}
          onArchive={archiveProjects}
          onDelete={deleteProjects}
          onUpdateAccess={updateProjectsAccess}
          onAddTag={addProjectTag}
        />
      </HStack>

      {projects.length === 0 ? (
        <Text color='gray.400' textAlign='center' py={8}>
          No projects found matching your criteria
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {projects.map((project) => (
            <HStack key={project.id} align='start' spacing={3}>
              <Checkbox
                isChecked={selectedProjects.includes(project.id)}
                onChange={() => toggleProjectSelection(project.id)}
                mt={2}
              />
              <ProjectCard project={project} onSelect={selectProject} />
            </HStack>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}
