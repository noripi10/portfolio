import chalk from 'chalk';
import { parseArgs } from 'node:util';
import sharp from 'sharp';

const imageChange = async () => {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      input: { type: 'string', short: 'i' },
      out: { type: 'string', short: 'o' },
    },
  });

  if (!values.input || !values.out) {
    throw new Error('--input and --out are required');
  }

  await sharp(values.input).toFile(values.out);
};

imageChange()
  .then(() => {
    console.log(chalk.green('Sharp export image success.'));
    process.exit(0);
  })
  .catch((error) => {
    console.log(chalk.red(error));
    process.exit(1);
  });
