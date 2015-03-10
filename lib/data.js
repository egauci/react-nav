'use strict';

export default {
  selId: 'm4',
  nodes: [
    {
      label: 'Item 1',
      id: 'm1'
    },
    {
      label: 'Item 2',
      id: 'm2',
      children: [
        {
          label: 'Item 2A',
          id: 'm3',
          children: [
            {
              label: 'Item 2A-1',
              id: 'm4',
            },
            {
              label: 'Item 2A-2',
              id: 'm5'
            },
            {
              label: 'Item 2A-3',
              id: 'm6'
            }
          ]
        },
        {
          label: 'Item 2B',
          id: 'm7'
        }
      ]
    },
    {
      label: 'Item 3',
      id: 'm8'
    }
  ]
};
