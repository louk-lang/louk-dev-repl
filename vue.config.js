module.exports = {
    chainWebpack: config => {
    config.module
        .rule('input')
        .test(/\.louk$/)
        .use("raw-loader")
            .loader("raw-loader")
            .end()
    }
}
