import type { Topic } from '../../types';

export interface TopicsFormContextType {
  setTopic: (category: Topic | null) => void;
  setOpen: (open: boolean) => void;
  topic: Topic | null;
}
