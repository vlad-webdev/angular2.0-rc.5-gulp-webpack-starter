var config = {
  projectFilesRoot: './src',
  tsFilesPath: './src/app/',
  tsEntryFileName: 'boot',
  jsMainFileName: 'js/main.js',
}

module.exports = {
  entry: config.tsFilesPath + config.tsEntryFileName,
  output: {
    filename: config.jsMainFileName,
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    root: config.projectFilesRoot,
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint' },
    ],
    loaders: [
      { test: /\.html$/, loaders: ["raw"] },
      { test: /\.scss$/, loaders: ["raw", "sass", 'autoprefixer?{browsers:["> 0%"]}'] },
      { test: /\.ts$/, loader: 'ts' },
    ],
  },
  sassLoader: {
    outputStyle: 'compressed'
  },
  // tslint: {
  //   emitErrors: true,
  //   failOnHint: true,
  // }
}
