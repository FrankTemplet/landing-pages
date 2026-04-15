<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { index as pagesIndex, create as pagesCreate, fromTemplate as pagesFromTemplate } from '@/routes/pages';
import { index as templatesIndex } from '@/routes/templates';

interface Template {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  is_system: boolean;
  created_at: string;
}

interface Props {
  templates: Template[];
}

const props = defineProps<Props>();

defineOptions({
  layout: {
    breadcrumbs: [
      {
        title: 'Pages',
        href: pagesIndex(),
      },
      {
        title: 'Templates',
        href: templatesIndex(),
      },
    ],
  },
});

const useTemplate = (templateId: number) => {
  router.post(pagesFromTemplate({ template: templateId }).url);
};
</script>

<template>
  <Head title="Templates" />

  <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div class="flex items-center justify-between mb-2">
      <div>
        <h1 class="text-3xl font-bold">Page Templates</h1>
        <p class="text-muted-foreground mt-2">
          Start with a pre-built template or create from scratch
        </p>
      </div>
      <Button as-child variant="outline">
        <Link :href="pagesIndex().url">
          ← Back to Pages
        </Link>
      </Button>
    </div>

    <div class="mb-4">
      <Button as-child>
        <Link :href="pagesCreate().url">
          Start from Blank Page
        </Link>
      </Button>
    </div>

    <div v-if="templates.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">No templates available yet.</p>
    </div>

    <div v-else class="space-y-8">
      <!-- System Templates -->
      <div v-if="templates.some(t => t.is_system)">
        <h2 class="text-xl font-semibold mb-4">Pre-built Templates</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="template in templates.filter(t => t.is_system)" :key="template.id">
            <CardHeader>
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <CardTitle class="truncate">{{ template.name }}</CardTitle>
                  <CardDescription v-if="template.description" class="line-clamp-2">
                    {{ template.description }}
                  </CardDescription>
                </div>
                <Badge variant="secondary">System</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div v-if="template.thumbnail_url" class="mb-4">
                <img
                  :src="template.thumbnail_url"
                  :alt="template.name"
                  class="w-full h-40 object-cover rounded border"
                />
              </div>
              <Button class="w-full" @click="useTemplate(template.id)">
                Use Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- User Templates -->
      <div v-if="templates.some(t => !t.is_system)">
        <h2 class="text-xl font-semibold mb-4">Your Templates</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="template in templates.filter(t => !t.is_system)" :key="template.id">
            <CardHeader>
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <CardTitle class="truncate">{{ template.name }}</CardTitle>
                  <CardDescription v-if="template.description" class="line-clamp-2">
                    {{ template.description }}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div v-if="template.thumbnail_url" class="mb-4">
                <img
                  :src="template.thumbnail_url"
                  :alt="template.name"
                  class="w-full h-40 object-cover rounded border"
                />
              </div>
              <div class="text-sm text-muted-foreground mb-3">
                Created: {{ template.created_at }}
              </div>
              <Button class="w-full" @click="useTemplate(template.id)">
                Use Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
