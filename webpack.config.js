module.exports = {
    context: `${__dirname}/resources/assets/webpack`,
    entry: {
        conference: `./conference/index.js`,
        conversation: `./conversation/index.js`,
        videocall: `./videocall/index.js`,
        cinema: './cinema/index.js',
        fileTransfer: './file_transfer/index.js',
        friends: './friends/index.js',
        app: './app.js'
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