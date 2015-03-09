'use strict';

export default [
  {
    label: 'Item 1'
  },
  {
    label: 'Item 2',
    children: [
      {
        label: 'Item 2A',
        children: [
          {
            label: 'Item 2A-1'
          },
          {
            label: 'Item 2A-2',
            selected: true
          },
          {
            label: 'Item 2A-3'
          }
        ]
      },
      {
        label: 'Item 2B'
      }
    ]
  },
  {
    label: 'Item 3'
  }
];
