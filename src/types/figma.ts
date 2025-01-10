import { TestCase } from './test';

export interface FigmaFile {
  id: string;
  name: string;
  lastModified: string;
  thumbnail: string;
  components: FigmaComponent[];
}

export interface FigmaComponent {
  id: string;
  name: string;
  type: 'FRAME' | 'COMPONENT' | 'INSTANCE';
  description?: string;
  constraints: {
    accessibility?: string[];
    interactions?: string[];
  };
}

export interface FigmaTestGeneration {
  fileId: string;
  components: string[];
  options: {
    includeVisualTests: boolean;
    includeAccessibilityTests: boolean;
    targetBrowsers: string[];
  };
}

export interface FigmaIntegrationAPI {
  getRecentFiles: () => Promise<FigmaFile[]>;
  importFile: (fileId: string) => Promise<FigmaFile>;
  generateTests: (config: FigmaTestGeneration) => Promise<TestCase[]>;
}
