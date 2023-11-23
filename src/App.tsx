import React from 'react';
import jData from './data-1.json';
import { CustomTable, CustomTableProps } from './custom-table';

export const App: React.FC = () => {
  return (<CustomTable items={jData as CustomTableProps['items']}/>);
};
