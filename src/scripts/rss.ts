import fs from 'node:fs/promises';
import Parser from 'rss-parser';

const parser = new Parser();

const parse = async () => {
  console.info('rss parser');

  const feed = await parser.parseURL('https://zenn.dev/noripi10/feed');

  const items = feed.items.map((item) => ({
    id: item.guid.split('/').pop(),
    title: item.title,
    link: item.link,
    isoData: item.isoDate,
    contentSnippet: item.contentSnippet.replace(/\n/g, ''),
  }));

  items.sort((a, b) => {
    const dateA = new Date(a.isoData).getTime();
    const dataB = new Date(b.isoData).getTime();

    return dateA - dataB;
  });

  return items;
};

parse().then(async (rss) => {
  try {
    await fs.rm('./assets/rss', { recursive: true, force: true });
    await fs.mkdir('./assets/rss');
    const json = JSON.stringify(rss, null, 2);
    fs.writeFile('./assets/rss/rss.json', json);
  } catch (error) {
    console.error('[Error] rss file create');
  }
});
