<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { computed } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Globe, FileEdit, LayoutTemplate, Users, Plus, ExternalLink, Pencil, Trash2 } from 'lucide-vue-next';
import { dashboard } from '@/routes';
import { create as pagesCreate, edit as pagesEdit, destroy as pagesDestroy, fromTemplate } from '@/routes/pages';
import { index as templatesIndex } from '@/routes/templates';
import { publicMethod as publicPageShow } from '@/routes/page';

interface Stats {
    totalPages: number;
    publishedPages: number;
    draftPages: number;
    totalTemplates: number;
    totalUsers: number;
}

interface RecentPage {
    id: number;
    title: string;
    slug: string;
    status: 'draft' | 'published';
    created_at: string;
}

interface RecentTemplate {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    thumbnail_url: string | null;
    is_system: boolean;
    preview_html: string | null;
}

interface Props {
    stats: Stats;
    recentPages: RecentPage[];
    recentTemplates: RecentTemplate[];
}

const props = defineProps<Props>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Dashboard',
                href: dashboard(),
            },
        ],
    },
});

const publishedPercent = computed(() => {
    if (props.stats.totalPages === 0) return 0;
    return Math.round((props.stats.publishedPages / props.stats.totalPages) * 100);
});

const donutStyle = computed(() => ({
    background: `conic-gradient(hsl(var(--primary)) 0% ${publishedPercent.value}%, hsl(var(--muted)) ${publishedPercent.value}% 100%)`,
}));

const statCards = computed(() => [
    {
        label: 'Total Pages',
        value: props.stats.totalPages,
        icon: FileText,
        description: 'Pages created',
    },
    {
        label: 'Published',
        value: props.stats.publishedPages,
        icon: Globe,
        description: 'Visible to the public',
    },
    {
        label: 'Drafts',
        value: props.stats.draftPages,
        icon: FileEdit,
        description: 'Not yet published',
    },
    {
        label: 'Templates',
        value: props.stats.totalTemplates,
        icon: LayoutTemplate,
        description: 'Available',
    },
    {
        label: 'Users',
        value: props.stats.totalUsers,
        icon: Users,
        description: 'Registered',
    },
]);

const deletePage = (pageId: number, pageTitle: string) => {
    if (!window.confirm(`Delete page "${pageTitle}"? This action cannot be undone.`)) return;
    router.delete(pagesDestroy({ page: pageId }).url);
};

const createFromTemplate = (templateId: number) => {
    router.post(fromTemplate({ template: templateId }).url);
};
</script>

<template>
    <Head title="Dashboard" />

    <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">

        <!-- Stats Cards -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card v-for="card in statCards" :key="card.label">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-muted-foreground">{{ card.label }}</CardTitle>
                    <component :is="card.icon" class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-3xl font-bold">{{ card.value }}</div>
                    <p class="text-xs text-muted-foreground mt-1">{{ card.description }}</p>
                </CardContent>
            </Card>
        </div>

        <!-- Donut Chart + Quick Action -->
        <div class="grid gap-4 md:grid-cols-2">
            <!-- Donut Chart -->
            <Card>
                <CardHeader>
                    <CardTitle>Page Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div v-if="stats.totalPages === 0" class="flex flex-col items-center justify-center py-8 text-center">
                        <FileText class="h-10 w-10 text-muted-foreground mb-3" />
                        <p class="text-sm text-muted-foreground">No pages created yet.</p>
                        <Button as-child size="sm" class="mt-4">
                            <Link :href="pagesCreate().url">
                                <Plus class="h-4 w-4 mr-2" /> Create first page
                            </Link>
                        </Button>
                    </div>
                    <div v-else class="flex items-center gap-8">
                        <!-- Donut -->
                        <div class="relative flex-shrink-0 w-28 h-28">
                            <div
                                class="w-28 h-28 rounded-full"
                                :style="donutStyle"
                            />
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-16 h-16 rounded-full bg-background flex items-center justify-center">
                                    <span class="text-sm font-bold">{{ publishedPercent }}%</span>
                                </div>
                            </div>
                        </div>
                        <!-- Legend -->
                        <div class="flex flex-col gap-3">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-primary" />
                                <span class="text-sm">Published</span>
                                <span class="ml-auto text-sm font-semibold">{{ stats.publishedPages }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-muted-foreground/30" />
                                <span class="text-sm">Drafts</span>
                                <span class="ml-auto text-sm font-semibold">{{ stats.draftPages }}</span>
                            </div>
                            <div class="flex items-center gap-2 pt-1 border-t border-border">
                                <span class="text-sm text-muted-foreground">Total</span>
                                <span class="ml-auto text-sm font-semibold">{{ stats.totalPages }}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Quick Actions -->
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent class="flex flex-col gap-3">
                    <Button as-child class="w-full justify-start">
                        <Link :href="pagesCreate().url">
                            <Plus class="h-4 w-4 mr-2" /> New page
                        </Link>
                    </Button>
                    <Button as-child variant="outline" class="w-full justify-start">
                        <Link :href="templatesIndex().url">
                            <LayoutTemplate class="h-4 w-4 mr-2" /> Browse templates
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <!-- Recent Pages Table -->
        <Card>
            <CardHeader class="flex flex-row items-center justify-between">
                <CardTitle>Recent Pages</CardTitle>
                <Button as-child variant="ghost" size="sm">
                    <Link :href="pagesCreate().url">View all</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div v-if="recentPages.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
                    <FileText class="h-10 w-10 text-muted-foreground mb-3" />
                    <p class="text-sm text-muted-foreground mb-4">No pages yet.</p>
                    <Button as-child size="sm">
                        <Link :href="pagesCreate().url">
                            <Plus class="h-4 w-4 mr-2" /> Create page
                        </Link>
                    </Button>
                </div>
                <div v-else class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-border">
                                <th class="pb-3 text-left font-medium text-muted-foreground">Title</th>
                                <th class="pb-3 text-left font-medium text-muted-foreground">Status</th>
                                <th class="pb-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Slug</th>
                                <th class="pb-3 text-left font-medium text-muted-foreground hidden md:table-cell">Created</th>
                                <th class="pb-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr v-for="page in recentPages" :key="page.id" class="group">
                                <td class="py-3 pr-4 font-medium max-w-[200px] truncate">{{ page.title }}</td>
                                <td class="py-3 pr-4">
                                    <Badge :variant="page.status === 'published' ? 'default' : 'secondary'">
                                        {{ page.status === 'published' ? 'Published' : 'Draft' }}
                                    </Badge>
                                </td>
                                <td class="py-3 pr-4 text-muted-foreground hidden sm:table-cell max-w-[160px] truncate">/{{ page.slug }}</td>
                                <td class="py-3 pr-4 text-muted-foreground hidden md:table-cell">{{ page.created_at }}</td>
                                <td class="py-3">
                                    <div class="flex items-center justify-end gap-1">
                                        <Button as-child variant="ghost" size="icon" class="h-8 w-8">
                                            <Link :href="pagesEdit({ page: page.id }).url">
                                                <Pencil class="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            v-if="page.status === 'published'"
                                            as-child
                                            variant="ghost"
                                            size="icon"
                                            class="h-8 w-8"
                                        >
                                            <a :href="publicPageShow({ slug: page.slug }).url" target="_blank" rel="noopener noreferrer">
                                                <ExternalLink class="h-4 w-4" />
                                            </a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            class="h-8 w-8 text-destructive hover:text-destructive"
                                            @click="deletePage(page.id, page.title)"
                                        >
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <!-- Templates Grid -->
        <Card>
            <CardHeader class="flex flex-row items-center justify-between">
                <CardTitle>Available Templates</CardTitle>
                <Button as-child variant="ghost" size="sm">
                    <Link :href="templatesIndex().url">View all</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div v-if="recentTemplates.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
                    <LayoutTemplate class="h-10 w-10 text-muted-foreground mb-3" />
                    <p class="text-sm text-muted-foreground">No templates available.</p>
                </div>
                <div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div
                        v-for="template in recentTemplates"
                        :key="template.id"
                        class="rounded-lg border border-border overflow-hidden group"
                    >
                        <!-- Thumbnail -->
                        <div class="aspect-video bg-muted overflow-hidden relative">
                            <img
                                v-if="template.thumbnail_url"
                                :src="template.thumbnail_url"
                                :alt="template.name"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div v-else-if="template.preview_html" class="template-preview-wrapper">
                                <iframe
                                    :srcdoc="template.preview_html"
                                    sandbox="allow-same-origin"
                                    scrolling="no"
                                    class="template-preview-frame"
                                    loading="lazy"
                                />
                            </div>
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <LayoutTemplate class="h-8 w-8 text-muted-foreground/50" />
                            </div>
                            <!-- Hover overlay with Use Template button -->
                            <div class="template-overlay">
                                <Button
                                    size="sm"
                                    class="shadow-lg"
                                    @click="createFromTemplate(template.id)"
                                >
                                    <Plus class="h-4 w-4 mr-1" /> Use Template
                                </Button>
                            </div>
                        </div>
                        <!-- Info -->
                        <div class="p-3">
                            <div class="flex items-start justify-between gap-2">
                                <p class="text-sm font-medium truncate">{{ template.name }}</p>
                                <Badge v-if="template.is_system" variant="outline" class="text-xs flex-shrink-0">System</Badge>
                            </div>
                            <p v-if="template.description" class="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {{ template.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

    </div>
</template>

<style scoped>
.template-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.group:hover .template-overlay {
    opacity: 1;
}

.template-preview-wrapper {
    position: absolute;
    inset: 0;
    overflow: hidden;
}

.template-preview-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 400%;
    height: 400%;
    transform: scale(0.25);
    transform-origin: top left;
    border: none;
    pointer-events: none;
    background: white;
}
</style>
