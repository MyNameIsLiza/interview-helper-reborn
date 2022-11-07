import { createContext } from 'react';

import type { TopicsFormContextType } from './types';

const TopicsFormContext = createContext<TopicsFormContextType | null>(null);

export default TopicsFormContext;
