import { useState } from 'react';
import { Project, ProjectAccess } from '../types/project';
import { mockProjects } from '../mocks/projects';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const selectProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const createProject = async (project: Partial<Project>) => {
    try {
      setLoading(true);
      const newProject: Project = {
        id: `project-${projects.length + 1}`,
        name: project.name || '',
        description: project.description || '',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium',
        status: 'not_started',
        budget: 0,
        owner: {
          id: 'user-1',
          name: 'Admin User',
          email: 'admin@example.com',
        },
        access: project.access || 'private',
        repositoryUrl: project.repositoryUrl || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'user-1',
        updatedBy: 'user-1',
        version: 1,
        teamId: 'team-1',
        tags: [],
        category: 'other',
        engine: {
          execution: { enabled: true, engine: 'local' },
          reporting: { enabled: true, format: 'pdf' },
          ai: { enabled: true, model: 'gpt-4o' },
          environment: { enabled: true, environment: 'development' },
          integrations: { enabled: true, integrations: [] },
        },
        settings: {
          archived: false,
          allowPublicAccess: false,
          requireCodeReview: true,
          autoRunTests: true,
          notifyOnFailure: true,
          branchProtection: true,
        },
        integrations: {
          github: project.repositoryUrl
            ? {
                repositoryOwner: project.repositoryUrl.split('/')[0],
                repositoryName: project.repositoryUrl.split('/')[1],
                branch: 'main',
                lastSync: new Date().toISOString(),
                status: 'connected',
              }
            : {
                repositoryOwner: '',
                repositoryName: '',
                branch: '',
                lastSync: '',
                status: 'disconnected',
              },
          gitlab: {
            repositoryOwner: '',
            repositoryName: '',
            branch: '',
            lastSync: '',
            status: 'disconnected',
          },
          bitbucket: {
            repositoryOwner: '',
            repositoryName: '',
            branch: '',
            lastSync: '',
            status: 'disconnected',
          },
          azure: {
            repositoryOwner: '',
            repositoryName: '',
            branch: '',
            lastSync: '',
            status: 'disconnected',
          },
          aws: {
            repositoryOwner: '',
            repositoryName: '',
            branch: '',
            lastSync: '',
            status: 'disconnected',
          },
          docker: {
            repositoryOwner: '',
            repositoryName: '',
            branch: '',
            lastSync: '',
            status: 'disconnected',
          },
          kubernetes: {
            repositoryOwner: '',
            repositoryName: '',
            branch: '',
            lastSync: '',
            status: 'disconnected',
          },
        },
        members: [
          {
            id: 'member-1',
            projectId: `project-${projects.length + 1}`,
            userId: 'user-1',
            role: 'owner',
            department: 'Engineering',
            permissions: ['admin'],
            joinedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      };
      setProjects([...projects, newProject]);
      toast({ title: 'Project created successfully', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Failed to create project', status: 'error', duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const archiveProjects = async (projectIds: string[]) => {
    try {
      setLoading(true);
      setProjects((prev) =>
        prev.map((project) =>
          projectIds.includes(project.id) ? { ...project, archived: true } : project
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProjects = async (projectIds: string[]) => {
    setProjects((prev) => prev.filter((project) => !projectIds.includes(project.id)));
    toast({ title: 'Projects deleted successfully', status: 'success', duration: 3000 });
  };

  const updateProjectsAccess = async (projectIds: string[], access: ProjectAccess) => {
    setProjects((prev) =>
      prev.map((project) => (projectIds.includes(project.id) ? { ...project, access } : project))
    );
  };

  const addProjectTag = async (projectIds: string[], tagId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        projectIds.includes(project.id) && !project.tags.some((tag) => tag.id === tagId)
          ? {
              ...project,
              tags: [...project.tags, { id: tagId, name: 'New Tag', color: 'gray' }],
            }
          : project
      )
    );
  };

  return {
    projects,
    loading,
    selectProject,
    createProject,
    archiveProjects,
    deleteProjects,
    updateProjectsAccess,
    addProjectTag,
  };
}
