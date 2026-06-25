const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  target: 'node',
  format: 'esm',
});

if (!result.success) {
  console.error('Bun JS build failed.');
  for (let e of result.logs) {
    console.log(e);
  }
  process.exit(1);
}
