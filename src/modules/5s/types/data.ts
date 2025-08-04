// ----------------------
// Outils globaux (16)
// ----------------------

import { Deliverable, Tool, Work } from '@/modules/5s/types/workshop'

export const tools: Tool[] = [
  { name: 'Drill', alias: 'power drill', cooldown: 2 },
  { name: 'Screwdriver', alias: 'driver', cooldown: 1 },
  { name: 'Measuring Tape', alias: 'tape', cooldown: 1 },
  { name: 'Pencil', alias: 'marker', cooldown: 1 },
  { name: 'Glue Gun', alias: 'hot glue', cooldown: 1 },
  { name: 'Clamps', alias: 'fasteners', cooldown: 1 },
  { name: 'Scissors', alias: 'cutter', cooldown: 1 },
  { name: 'Ruler', alias: 'straight edge', cooldown: 1 },
  { name: 'Pruning Shears', alias: 'secateurs', cooldown: 1 },
  { name: 'Watering Can', alias: 'can', cooldown: 1 },
  { name: 'Trowel', alias: 'hand shovel', cooldown: 1 },
  { name: 'Hammer', alias: 'mallet', cooldown: 1 },
  { name: 'Saw', alias: 'handsaw', cooldown: 2 },
  { name: 'Hole Punch', alias: 'punch', cooldown: 1 },
  { name: 'Laminator', alias: 'cover sealer', cooldown: 2 },
  { name: 'Stapler', alias: 'binder', cooldown: 1 }
]

// ----------------------
// GARDENING (7 outils max)
// Outils utilisés : 0, 2, 3, 4, 5, 8, 10
// ----------------------

export const gardening: Work = {
  name: 'gardening',
  deliverables: [
    {
      name: 'Vegetable Patch',
      activities: [
        {
          name: 'Soil Preparation',
          tasks: [
            {
              name: 'Loosen soil and compost',
              tools: [tools[10], tools[4]]
            }
          ]
        },
        {
          name: 'Plot Planning',
          tasks: [
            {
              name: 'Mark row layout',
              tools: [tools[2], tools[3]]
            }
          ]
        }
      ]
    },
    {
      name: 'Compost Bin Assembly',
      activities: [
        {
          name: 'Cut Panels',
          tasks: [
            {
              name: 'Drill and shape wood panels',
              tools: [tools[0], tools[5]]
            }
          ]
        }
      ]
    },
    {
      name: 'Shrub Pruning',
      activities: [
        {
          name: 'Dead Branch Removal',
          tasks: [
            {
              name: 'Cut branches cleanly',
              tools: [tools[8]]
            }
          ]
        }
      ]
    },
    {
      name: 'Raised Garden Bed',
      activities: [
        {
          name: 'Frame Layout',
          tasks: [
            {
              name: 'Measure garden bed size',
              tools: [tools[2], tools[3]]
            }
          ]
        },
        {
          name: 'Frame Assembly',
          tasks: [
            {
              name: 'Join corners with clamps',
              tools: [tools[0], tools[5]]
            }
          ]
        },
        {
          name: 'Soil Filling',
          tasks: [
            {
              name: 'Add compost and soil',
              tools: [tools[10]]
            }
          ]
        }
      ]
    },
    {
      name: 'Herb Garden Planters',
      activities: [
        {
          name: 'Trough Installation',
          tasks: [
            {
              name: 'Fix containers to wall',
              tools: [tools[0], tools[4]]
            }
          ]
        }
      ]
    },
    {
      name: 'Watering Routine',
      activities: [
        {
          name: 'Daily Watering',
          tasks: [
            {
              name: 'Irrigate each section',
              tools: [tools[9]]
            }
          ]
        }
      ]
    },
    {
      name: 'Garden Signposts',
      activities: [
        {
          name: 'Label Creation',
          tasks: [
            {
              name: 'Write and install plant tags',
              tools: [tools[3], tools[0]]
            }
          ]
        }
      ]
    }
  ]
}

// ----------------------
// CABINETMAKING (7 outils max)
// Outils utilisés : 0, 1, 2, 3, 4, 5, 12
// ----------------------

export const cabinetmaking: Deliverable[] = [
  {
    name: 'Bookshelf',
    activities: [
      {
        name: 'Cut & Layout',
        tasks: [
          {
            name: 'Measure and saw planks',
            tools: [tools[2], tools[12]]
          }
        ]
      },
      {
        name: 'Assemble Frame',
        tasks: [
          {
            name: 'Join pieces with clamps',
            tools: [tools[0], tools[5]]
          }
        ]
      }
    ]
  },
  {
    name: 'Wall Cabinet',
    activities: [
      {
        name: 'Support Fixing',
        tasks: [
          {
            name: 'Drill mount points',
            tools: [tools[0], tools[1]]
          }
        ]
      },
      {
        name: 'Structure Framing',
        tasks: [
          {
            name: 'Align and glue panels',
            tools: [tools[3], tools[4]]
          }
        ]
      }
    ]
  },
  {
    name: 'Work Bench',
    activities: [
      {
        name: 'Surface Prep',
        tasks: [
          {
            name: 'Saw and place top',
            tools: [tools[12], tools[2]]
          }
        ]
      },
      {
        name: 'Legs Mounting',
        tasks: [
          {
            name: 'Drill and screw base',
            tools: [tools[0], tools[1]]
          }
        ]
      },
      {
        name: 'Clamping Rails',
        tasks: [
          {
            name: 'Fix side clamps',
            tools: [tools[5]]
          }
        ]
      }
    ]
  },
  {
    name: 'Drawer Unit',
    activities: [
      {
        name: 'Slide Installation',
        tasks: [
          {
            name: 'Screw rails to sides',
            tools: [tools[0], tools[1]]
          }
        ]
      }
    ]
  },
  {
    name: 'Wooden Crate',
    activities: [
      {
        name: 'Handle Mounting',
        tasks: [
          {
            name: 'Mark and screw side handles',
            tools: [tools[2], tools[1]]
          }
        ]
      }
    ]
  },
  {
    name: 'Desk Frame',
    activities: [
      {
        name: 'Joint Assembly',
        tasks: [
          {
            name: 'Glue and press legs',
            tools: [tools[4], tools[5]]
          }
        ]
      }
    ]
  },
  {
    name: 'Tool Wall Board',
    activities: [
      {
        name: 'Peg Layout',
        tasks: [
          {
            name: 'Drill holes for pegs',
            tools: [tools[0], tools[3]]
          }
        ]
      }
    ]
  }
]

// ----------------------
// STATIONERY (7 outils max)
// Outils utilisés : 3, 4, 6, 7, 13, 14, 15
// ----------------------

export const stationery: Deliverable[] = [
  {
    name: 'Notebook',
    activities: [
      {
        name: 'Cover Cutting',
        tasks: [
          {
            name: 'Trim cover edges',
            tools: [tools[6], tools[7]]
          }
        ]
      },
      {
        name: 'Punch & Staple',
        tasks: [
          {
            name: 'Assemble pages',
            tools: [tools[13], tools[15]]
          }
        ]
      }
    ]
  },
  {
    name: 'Greeting Card Pack',
    activities: [
      {
        name: 'Card Folding',
        tasks: [
          {
            name: 'Score and fold paper',
            tools: [tools[3], tools[7]]
          }
        ]
      }
    ]
  },
  {
    name: 'Planner',
    activities: [
      {
        name: 'Cover Lamination',
        tasks: [
          {
            name: 'Laminate front and back',
            tools: [tools[14]]
          }
        ]
      },
      {
        name: 'Hole Punching',
        tasks: [
          {
            name: 'Align and punch sheets',
            tools: [tools[13]]
          }
        ]
      }
    ]
  },
  {
    name: 'Scrapbook Kit',
    activities: [
      {
        name: 'Element Gluing',
        tasks: [
          {
            name: 'Place and fix items',
            tools: [tools[4]]
          }
        ]
      }
    ]
  },
  {
    name: 'Bookmark Set',
    activities: [
      {
        name: 'Cutting & Decorating',
        tasks: [
          {
            name: 'Shape and draw marks',
            tools: [tools[6], tools[3]]
          }
        ]
      }
    ]
  },
  {
    name: 'Envelope Set',
    activities: [
      {
        name: 'Flap Assembly',
        tasks: [
          {
            name: 'Trim, glue, and fold',
            tools: [tools[6], tools[4]]
          }
        ]
      }
    ]
  },
  {
    name: 'Filing Labels',
    activities: [
      {
        name: 'Layout & Cutting',
        tasks: [
          {
            name: 'Mark and cut tabs',
            tools: [tools[3], tools[6]]
          }
        ]
      }
    ]
  }
]
