import { type SchemaTypeDefinition } from 'sanity'

const phase: SchemaTypeDefinition = {
  name: 'phase',
  type: 'document',
  title: 'Editing Phase',
  fields: [
    { name: 'phaseId', type: 'number', title: 'Phase ID (1, 2, 3, or 4)' },
    { name: 'word', type: 'string', title: 'Title' },
    { name: 'price', type: 'string', title: 'Price' },
    { name: 'desc', type: 'string', title: 'Description' },
    { name: 'type', type: 'string', title: 'Video Type (instagram or youtube)' },
    { name: 'reels', type: 'array', of: [{type: 'string'}], title: 'Video IDs' }
  ]
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [phase],
}