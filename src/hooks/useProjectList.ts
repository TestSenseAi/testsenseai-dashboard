import { useState, useMemo } from 'react';
import { useProjects } from './useProjects';
import { ProjectCategory } from '../types/project';

export function useProjectList() {
  const { projects } = useProjects();
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tagId) => project.tags.some((tag) => tag.id === tagId));

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => project.category === category.name);

      // Archived filter
      const matchesArchived = showArchived || !project.settings.archived;

      return matchesSearch && matchesTags && matchesCategory && matchesArchived;
    });
  }, [projects, search, selectedTags, selectedCategories, showArchived]);

  return {
    projects: filteredProjects,
    search,
    setSearch,
    selectedTags,
    setSelectedTags,
    selectedCategories,
    setSelectedCategories,
    showArchived,
    setShowArchived,
  };
}
