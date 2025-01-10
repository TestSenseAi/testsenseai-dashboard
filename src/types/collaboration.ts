export interface User {
  id: string;
  name: string;
  avatar: string;
}

export type CommentStatus = 'active' | 'resolved';

export interface Comment {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  status: CommentStatus;
  replies?: Comment[];
}

export type ArticleCategory =
  | 'test-patterns'
  | 'best-practices'
  | 'troubleshooting'
  | 'setup-guide'
  | 'faq';

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
}

export type ReviewStatus = 'pending' | 'in_progress' | 'approved' | 'rejected';

export interface TestReview {
  id: string;
  title: string;
  description: string;
  status: ReviewStatus;
  author: User;
  reviewers: User[];
  createdAt: string;
  updatedAt: string;
  comments: number;
  approvals: number;
  requiredApprovals: number;
  changes: Array<{
    id: string;
    file: string;
    additions: number;
    deletions: number;
  }>;
}
