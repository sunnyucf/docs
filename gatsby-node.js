/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

/**
 * Customise webpack config.
 */
exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /.jsonc$/,
          use: [
            {
              loader: `jsonc-loader`,
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@data': path.resolve(__dirname, 'src/data'),
        '@locales': path.resolve(__dirname, 'src/locales'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@atoms': path.resolve(__dirname, 'src/atoms'),
        '@css': path.resolve(__dirname, 'src/css'),
      },
    },
  });
};

/**
 * Create docs pages.
 */
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createRedirect } = actions;

  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            title
            path
            redirect_from
            locale
          }
          tableOfContents(maxDepth: 3)
          timeToRead
          excerpt
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create posts ', result.errors);
  }
  const pages = result.data.allMdx.nodes;

  pages.forEach((page) => {
    const {
      frontmatter: { redirect_from, title, path: pagePath, locale },
      tableOfContents,
      timeToRead,
      excerpt,
      id,
    } = page;

    // Create all redirects that are defined in frontmatter
    if (redirect_from) {
      if (Array.isArray(redirect_from)) {
        redirect_from.forEach((redirect) => {
          createRedirect({
            fromPath: redirect,
            toPath: page.frontmatter.path,
            redirectInBrowser: true,
            isPermanent: true,
          });
        });
      }
    }

    actions.createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/DocsPageTemplate.tsx`),

      context: { id, locale, path: pagePath, title, tableOfContents, timeToRead, excerpt },
    });
  });
};
