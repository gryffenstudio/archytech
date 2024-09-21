import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schema';
export default defineConfig({
    name: 'default',
    title: 'archytech',
    projectId: 'bpernsxq',
    dataset: 'production',
    plugins: [structureTool()],
    schema: {
        types: schemaTypes,
    },
});
