const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../src/stories/**/*.stories.(tsx|mdx)'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          transpileOnly: true
        }
      }
    },
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-links',
    '@storybook/addon-contexts/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /\.stories\.(tsx|mdx)$/
        },
        loaderOptions: {
          parser: 'typescript',
          prettierConfig: {
            semi: false,
            singleQuote: true
          }
        }
      }
    },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    }
  ],
  webpackFinal: config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    // ========================================================
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

    // Add Babel rules
    // ========================================================
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve('babel-loader')

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env')
    ]

    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve('@babel/plugin-proposal-class-properties'),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve('babel-plugin-remove-graphql-queries')
    ]

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    // ========================================================
    config.resolve.mainFields = ['browser', 'module', 'main']

    // Add Webpack rules for TypeScript
    // ========================================================
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
        plugins: [
          require.resolve('@babel/plugin-proposal-class-properties'),
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve('babel-plugin-remove-graphql-queries')
        ]
      }
    })

    config.resolve.extensions.push('.ts', '.tsx')

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json')
      })
    )

    return config
  }
}
