module.exports = {
    context: `${__dirname}/resources/assets/webpack`,
    entry: {
        conference: `./conference/index.js`,
        conversation: `./conversation/index.js`,
        videocall: `./videocall/index.js`,
        workers: './workers/index.js',
        file_reader: './workers/file_reader.js',
        file_receiver: './workers/file_receiver.js'
    },
    output: {
        path: `${__dirname}/public/js/app`,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};