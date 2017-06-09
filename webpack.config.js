module.exports = {
    context: `${__dirname}/resources/assets/webpack`,
    entry: {
        app: './app.js',
        voice_two_peers: './voiceCall/two_peers',
        voice_conference: './voiceCall/conference',
        conference: `./conference/index.js`,
        conversation: `./conversation/index.js`,
        videocall: `./videocall/index.js`,
        cinema: './cinema/index.js',
        fileTransfer: './file_transfer/index.js',
        friends: './friends/index.js',
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