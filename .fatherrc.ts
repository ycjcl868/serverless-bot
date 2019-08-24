module.exports = {
  entry: ['src/index.ts'],
  target: 'node',
  umd: { name: 'index', file: 'index', minFile: false },
  disableTypeCheck: true,
  typescriptOpts: {
    check: false,
  }
}
