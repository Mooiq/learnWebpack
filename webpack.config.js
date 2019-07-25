const path = require('path');
module.exports = function(env, argv){
    env = env || {development: true}
    
    return {
        entry: './src/index.js',
        ...env.production ? require('./config/webpack.production') : require('./config/webpack.development'),
        module: {
            rules: [
                // 图片
                // {test: /\.(jpg|png|git)$/i, use: {
                //     loader: 'file-loader',
                //     options: {
                //         outputPath: 'imgs/', // 相对output.path
                //         publicPath: 'dist/imgs' // 输出到css路径
                //     }
                // }},
                {test: /\.(jpg|png|git)$/i, use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'imgs/', // 相对output.path
                        // publicPath: 'dist/imgs', // 输出到css路径
                        limit: 8*1024, // 小于转base64
                    }
                }},
                // 字体
                {test: /\.(eot|svg|woff|woff2)$/i, use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'fonts/',
                        // publicPath: 'dist/fonts',
                        limit: 8*1024,
                    }
                }},
                // css
                {test: /\.css$/i, use:
                    [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    ]
                },
                // less
                {test: /\.less$/i, use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]},
                // js
                {test: /\.(js|jsx)$/i, use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env','@babel/preset-react'],
                            plugins: ['@babel/transform-runtime']
                        }
                    }],
                    exclude: /node_modules/,
                },
                // vue
                {test: /\.vue$/i,use: 'vue-loader'},
                // eslint
                // {test: /\.(js|jsx)$/i, use: {
                //     loader: 'eslint-loader',
                //     exclude: /node_modules/,
                // }},
            ]
        },
        resolve: {
            alias: {
                'vue': 'vue/dist/vue.esm',
                '@': path.resolve(__dirname,'./src/'),
            }
        }
    }

}

/*
module.exports={
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            // 图片
            // {test: /\.(jpg|png|git)$/i, use: {
            //     loader: 'file-loader',
            //     options: {
            //         outputPath: 'imgs/', // 相对output.path
            //         publicPath: 'dist/imgs' // 输出到css路径
            //     }
            // }},
            {test: /\.(jpg|png|git)$/i, use: {
                loader: 'url-loader',
                options: {
                    outputPath: 'imgs/', // 相对output.path
                    publicPath: 'dist/imgs', // 输出到css路径
                    limit: 8*1024, // 小于转base64
                }
            }},
            // 字体
            {test: /\.(eot|svg|woff|woff2)$/i, use: {
                loader: 'url-loader',
                options: {
                    outputPath: 'fonts/',
                    publicPath: 'dist/fonts',
                    limit: 8*1024,
                }
            }},
            // css
            {test: /\.css$/i, use:
                [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            },
            // less
            {test: /\.less$/i, use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ]},
            // js
            {test: /\.(js|jsx)$/i, use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }},
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: ''
        })
    ]
};
*/