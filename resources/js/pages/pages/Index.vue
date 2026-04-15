<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { publicMethod as publicPageShow } from '@/routes/page';
import { index as pagesIndex, create as pagesCreate, edit as pagesEdit, duplicate as pagesDuplicate, destroy as pagesDestroy, unpublish as pagesUnpublish } from '@/routes/pages';
import { index as templatesIndex } from '@/routes/templates';

interface Page {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  published_at: string | null;
  updated_at: string;
}

interface Props {
  pages: Page[];
}

defineProps<Props>();

defineOptions({
  layout: {
    breadcrumbs: [
      {
        title: 'Pages',
        href: pagesIndex(),
      },
    ],
  },
});

const getStatusColor = (status: string) => {
  return status === 'published' ? 'default' : 'secondary';
};

const duplicatePage = (pageId: number) => {
  router.post(pagesDuplicate({ page: pageId }).url);
};

const unpublishPage = (pageId: number) => {
  router.post(pagesUnpublish({ page: pageId }).url);
};

const deletePage = (pageId: number, pageTitle: string) => {
  if (!window.confirm(`Delete page "${pageTitle}"? This action cannot be undone.`)) {
    return;
  }

  router.delete(pagesDestroy({ page: pageId }).url);
};
</script>

<template>
  <Head title="Pages" />

  <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div class="flex items-center justify-between mb-2">
      <div>
        <h1 class="text-3xl font-bold">Pages</h1>
        <p class="text-muted-foreground mt-2">
          Manage your landing pages
        </p>
      </div>
      <div class="flex gap-2">
        <Button as-child variant="outline">
          <Link :href="templatesIndex().url">
            Browse Templates
          </Link>
        </Button>
        <Button as-child>
          <Link :href="pagesCreate().url">
            Create New Page
          </Link>
        </Button>
      </div>
    </div>

    <div v-if="pages.length === 0" class="text-center py-12">
      <p class="text-muted-foreground mb-4">No pages yet. Create your first page!</p>
      <Button as-child>
        <Link :href="pagesCreate().url">
          Create Page
        </Link>
      </Button>
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="page in pages" :key="page.id">
        <CardHeader>
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <CardTitle class="truncate">{{ page.title }}</CardTitle>
              <CardDescription class="truncate">
                /{{ page.slug }}
              </CardDescription>
            </div>
            <Badge :variant="getStatusColor(page.status)">
              {{ page.status }}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-sm text-muted-foreground mb-4">
            <div v-if="page.published_at">
              Published: {{ page.published_at }}
            </div>
            <div>Updated: {{ page.updated_at }}</div>
          </div>
          <div class="flex gap-2">
            <Button v-if="page.status !== 'published'" as-child size="sm" variant="outline" class="flex-1">
              <Link :href="pagesEdit({ page: page.id }).url">
                Edit
              </Link>
            </Button>
            <Button
              v-if="page.status === 'published'"
              size="sm"
              variant="outline"
              class="flex-1"
              @click="unpublishPage(page.id)"
            >
              Unpublish
            </Button>
            <Button
              size="sm"
              variant="outline"
              @click="duplicatePage(page.id)"
            >
              Duplicate
            </Button>
            <Button
              v-if="page.status === 'published'"
              as-child
              size="sm"
              variant="outline"
            >
              <a :href="publicPageShow({ slug: page.slug }).url" target="_blank">
                View
              </a>
            </Button>
            <Button
              size="sm"
              variant="destructive"
              @click="deletePage(page.id, page.title)"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
