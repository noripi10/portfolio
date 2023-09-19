import fs from 'node:fs/promises';
import Parser from 'rss-parser';
import dayjs from '../libs/day';

const parser = new Parser();

const parse = async () => {
  const feed = await parser.parseURL('https://zenn.dev/noripi10/feed');

  const items = feed.items.map((item) => ({
    id: item.guid.split('/').pop(),
    title: item.title,
    link: item.link,
    isoData: dayjs(item.isoDate).format('YYYY/MM/DD(ddd) HH:mm'),
    contentSnippet: item.contentSnippet.replace(/\n/g, ''),
    og: item.enclosure.url,
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
    await fs.rm('./src/constants/rss', { recursive: true, force: true });
    await fs.mkdir('./src/constants/rss');
    const json = JSON.stringify(rss, null, 2);
    fs.writeFile('./src/constants/rss/rss.json', json);
  } catch (error) {
    console.error('[Error] rss file create');
  }
});
