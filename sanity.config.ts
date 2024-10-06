import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { projectId, dataset } from './sanity/lib/api';
import { resolve } from './sanity/plugins/resolve';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
    name: 'default',
    title: 'archytech',
    projectId,
    dataset,
    plugins: [
        structureTool(),
        presentationTool({
            previewUrl: location.origin,
            resolve,
        }),
    ],
    schema: {
        types: schemaTypes,
    },
});
