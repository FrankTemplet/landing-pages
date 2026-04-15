<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as pagesIndex, store as pagesStore } from '@/routes/pages';

defineOptions({
  layout: {
    breadcrumbs: [
      {
        title: 'Pages',
        href: pagesIndex(),
      },
      {
        title: 'Create',
      },
    ],
  },
});

const form = useForm({
  title: '',
  slug: '',
});

const generateSlug = () => {
  if (form.title && !form.slug) {
    form.slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};

const submit = () => {
  form.post(pagesStore().url);
};
</script>

<template>
  <Head title="Create Page" />

  <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div class="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Page</CardTitle>
          <CardDescription>
            Start building your landing page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submit" class="space-y-6">
            <div class="space-y-2">
              <Label for="title">Page Title</Label>
              <Input
                id="title"
                v-model="form.title"
                type="text"
                placeholder="e.g., About Us, Contact, Pricing"
                required
                @blur="generateSlug"
              />
              <p v-if="form.errors.title" class="text-sm text-destructive">
                {{ form.errors.title }}
              </p>
            </div>

            <div class="space-y-2">
              <Label for="slug">URL Slug</Label>
              <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground">/</span>
                <Input
                  id="slug"
                  v-model="form.slug"
                  type="text"
                  placeholder="about-us"
                  pattern="[a-z0-9-]+"
                  class="flex-1"
                />
              </div>
              <p class="text-xs text-muted-foreground">
                Leave empty to auto-generate from title. Only lowercase letters, numbers, and hyphens.
              </p>
              <p v-if="form.errors.slug" class="text-sm text-destructive">
                {{ form.errors.slug }}
              </p>
            </div>

            <div class="flex gap-2 justify-end">
              <Button as-child variant="outline" type="button">
                <Link :href="pagesIndex().url">
                  Cancel
                </Link>
              </Button>
              <Button type="submit" :disabled="form.processing">
                {{ form.processing ? 'Creating...' : 'Create Page' }}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
