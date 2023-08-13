import React from 'react';
import { createRoot } from 'react-dom/client';

import Panel from './Panel';
import './index.css';

const container = document.getElementById('app-container');
//@ts-ignore
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Panel />);
