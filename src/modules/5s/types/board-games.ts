import { chooseTools } from '@/modules/5s/types/tools'
import { BoardGame } from '@/modules/5s/types/workshop'

export const boardGames: BoardGame[] = [
  {
    name: 'Chess',
    parts: [
      {
        name: 'Chessboard Engraving',
        tasks: [
          { name: 'Cut the board base', tools: chooseTools('cutter') },
          {
            name: 'Apply lamination',
            tools: chooseTools('laminator', 'painter')
          }
        ]
      },
      {
        name: 'Piece Creation',
        tasks: [
          {
            name: 'Mold pieces',
            tools: chooseTools('mini-mold', 'cutter')
          },
          {
            name: 'Paint pieces',
            tools: chooseTools('painter')
          }
        ]
      },
      {
        name: 'Packaging',
        tasks: [
          {
            name: 'Assemble box',
            tools: chooseTools('box-asm', 'laminator')
          },
          {
            name: 'Insert rulebook',
            tools: chooseTools('rulebook-dzn', 'box-asm')
          }
        ]
      }
    ]
  },
  {
    name: 'Dungeon Quest',
    parts: [
      {
        name: 'Hero Cards',
        tasks: [
          {
            name: 'Print ability cards',
            tools: chooseTools('card-printer', 'laminator')
          },
          {
            name: 'Paint character cards',
            tools: chooseTools('painter')
          }
        ]
      },
      {
        name: 'Dungeon Tiles',
        tasks: [
          {
            name: 'Cut dungeon tiles',
            tools: chooseTools('cutter', 'laminator')
          }
        ]
      }
    ]
  },
  {
    name: 'Alien Invasion',
    parts: [
      {
        name: 'Scenario Cards',
        tasks: [
          {
            name: 'Print scenario deck',
            tools: chooseTools('card-prisnter', 'rulebook-dzn')
          },
          {
            name: 'Apply finish',
            tools: chooseTools('laminator')
          }
        ]
      }
    ]
  },
  {
    name: 'Treasure Isles',
    parts: [
      {
        name: 'Treasure Tokens',
        tasks: [
          {
            name: 'Mold tokens',
            tools: chooseTools('mini-mold', 'painter')
          },
          {
            name: 'Engrave serials',
            tools: chooseTools('dice-engraver', 'laminator', 'painter')
          }
        ]
      },
      {
        name: 'Map Boards',
        tasks: [
          {
            name: 'Print map base',
            tools: chooseTools('cutter', 'laminator')
          },
          {
            name: 'Add compass',
            tools: chooseTools('painter')
          },
          {
            name: 'Seal map edges',
            tools: chooseTools('laminator')
          }
        ]
      },
      {
        name: 'Game Guide',
        tasks: [
          {
            name: 'Design instructions',
            tools: chooseTools('rulebook-dzn')
          }
        ]
      }
    ]
  },
  {
    name: 'Galaxy Merchant',
    parts: [
      {
        name: 'Trade Deck',
        tasks: [
          {
            name: 'Print trade cards',
            tools: chooseTools('card-printer', 'laminator')
          },
          {
            name: 'Apply protective coating',
            tools: chooseTools('laminator')
          }
        ]
      },
      {
        name: 'Ship Miniatures',
        tasks: [
          {
            name: 'Mold ship pieces',
            tools: chooseTools('mini-mold', 'painter')
          }
        ]
      }
    ]
  },
  {
    name: 'Jungle Mayhem',
    parts: [
      {
        name: 'Board Creation',
        tasks: [
          {
            name: 'Print jungle layout',
            tools: chooseTools('cutter', 'painter')
          },
          {
            name: 'Seal board',
            tools: chooseTools('laminator')
          }
        ]
      }
    ]
  },
  {
    name: 'Cursed Relics',
    parts: [
      {
        name: 'Relic Tokens',
        tasks: [
          {
            name: 'Craft relics',
            tools: chooseTools('mini-mold', 'dice-engraver')
          }
        ]
      },
      {
        name: 'Curse Deck',
        tasks: [
          {
            name: 'Design curse cards',
            tools: chooseTools('card-printer', 'laminator')
          },
          {
            name: 'Apply paint',
            tools: chooseTools('painter')
          }
        ]
      }
    ]
  },
  {
    name: 'Castle Siege',
    parts: [
      {
        name: 'Wall Tiles',
        tasks: [
          {
            name: 'Cut castle walls',
            tools: chooseTools('cutter', 'painter')
          },
          {
            name: 'Reinforce walls',
            tools: chooseTools('laminator')
          }
        ]
      },
      {
        name: 'Defender Miniatures',
        tasks: [
          {
            name: 'Mold defenders',
            tools: chooseTools('mini-mold', 'painter', 'laminator')
          },
          {
            name: 'Paint coats',
            tools: chooseTools('painter')
          }
        ]
      },
      {
        name: 'Rulebook',
        tasks: [
          {
            name: 'Write siege rules',
            tools: chooseTools('rulebook-dzn')
          }
        ]
      }
    ]
  },
  {
    name: 'Fate Dice',
    parts: [
      {
        name: 'Dice Production',
        tasks: [
          {
            name: 'Engrave fate symbols',
            tools: chooseTools('dice-engraver', 'painter')
          },
          {
            name: 'Color dice faces',
            tools: chooseTools('painter')
          }
        ]
      }
    ]
  }
]
