import type {TagMetadata} from '@docusaurus/utils';
import type {Content} from '@theme/BlogPostPage';

export function formatPostDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatReadingTime(minutes?: number): string {
  if (!minutes) {
    return '1 min';
  }

  return `${Math.max(1, Math.round(minutes))} min`;
}

export function collectUniqueTags(items: readonly {readonly content: Content}[]): TagMetadata[] {
  const tagMap = new Map<string, TagMetadata>();

  items.forEach(({content}) => {
    content.metadata.tags.forEach((tag) => {
      if (!tagMap.has(tag.permalink)) {
        tagMap.set(tag.permalink, tag);
      }
    });
  });

  return [...tagMap.values()].sort((left, right) => left.label.localeCompare(right.label, 'zh-Hans'));
}
