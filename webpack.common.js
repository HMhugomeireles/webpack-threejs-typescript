const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require( 'path' );

module.exports = {
    // entry files
    entry: path.resolve(__dirname, './src/index.ts'),
    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.[hash].js',
    },
    // generate source maps
    devtool: 'source-map',
    plugins: [
      new ForkTsCheckerWebpackPlugin(), // run TSC on a separate thread
      new CopyWebpackPlugin({
        patterns: [
            { from: path.resolve(__dirname, './public/assets') }
        ]
      }),
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './public/index.html'),
          minify: true
      }),
      new MiniCSSExtractPlugin()
    ],
    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    }
                },
                exclude: /node_modules/,
            },
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
              // CSS
              {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    }
};