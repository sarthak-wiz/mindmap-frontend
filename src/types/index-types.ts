export interface NotificationsProps {
  _count: {
    notifications: number;
  };
}

export interface Note {
  id: string;
  title: string | null;
  content: string | null;
  workspaceId: string;
  userId: string;
  createdAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  createdAt: Date;
  clerkid: string;
  image: string | null;
}

export interface WorkspaceProps {
  status: number;
  data: Workspace[];
}

export interface WorkspaceNotesProps {
  status: number;
  data: Note[];
}
