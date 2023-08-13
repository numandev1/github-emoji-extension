import React from 'react';
import { createRoot } from 'react-dom/client';

import Newtab from './Newtab';
import './index.css';

const container = document.getElementById('app-container');
//@ts-ignore
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Newtab />);
