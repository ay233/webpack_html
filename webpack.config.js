const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//解除相互占用err
const CircularDependencyPlugin = require('circular-dependency-plugin');
module.exports = {
    context: __dirname, //基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    mode: 'production', //或者production  这里选择模式（会影响生成js的结构）
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'outPutPage'),
        filename: 'js/pt_bundle.js',
    },
    devServer: {
        'contentBase': "./outPutPage",
        'inline': true, //不让显示inline信息（server连接信息）
        'port': '8888',
        // 'host': '0.0.0.0',//开发手机端
        // hot: true, // 热更新  需要new webpack.HotModuleReplacementPlugin()
        open: true, //启动自动打开浏览器（open: 'Google Chrome'）,写true打开默认浏览器
        openPage: '', //打开导航的页面
        overlay: { //当存在编译器错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。
            warnings: true,
            errors: true
        },
        proxy: { //代理
            "/api": {
                target: "http://192.168.123.77:9092",
                changeOrgin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            //可以多个代理
        },

    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "src")
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                query: {
                    minimize: true
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: ['url-loader?limit=200000000&name=assets/[name]-[hash:5].[ext]',
                    'image-webpack-loader'
                ],

            },
        ]
    },
    plugins: [
        //css分离插件 
        new ExtractTextPlugin('css/style.css'),
        //html模板 与html-loader冲突 改模板名为.ejs
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.ejs',
            title:'anyao_html',
            "files": {
                "css": ["style.css"],
                "js": ["pt_bundle.js"],
                "chunks": {
                    "head": {
                        "css": ["style.css"]
                    },
                    "main": {
                        "entry": "pt_bundle.js",
                        "css": []
                    },
                }
            }
        }),
        //静态资源放入
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'public'),
            to: 'public',
            ignore: ['.*']
        }]),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })

    ],
    performance: { //做一些限制
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }
    },


};