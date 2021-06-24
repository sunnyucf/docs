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
        '@templates': path.resolve(__dirname, 'src/templates'),
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
          frontmatter {
            title
            path
            redirect_from
            locale
          }

          parent {
            ... on File {
              modifiedTime
            }
          }

          id
          body
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
      frontmatter,
      parent: { modifiedTime },
      tableOfContents,
      timeToRead,
      excerpt,
      id,
      body,
    } = page;

    // Create all redirects that are defined in frontmatter
    if (frontmatter.redirect_from) {
      if (Array.isArray(frontmatter.redirect_from)) {
        frontmatter.redirect_from.forEach((redirect) => {
          createRedirect({
            fromPath: redirect,
            toPath: page.frontmatter.path,
            redirectInBrowser: true,
            isPermanent: true,
          });
        });
      } else {
        throw '`redirect_from` in MDX frontmatter must either be an array of paths, or not defined';
      }
    }

    actions.createPage({
      path: frontmatter.path,
      component: path.resolve(`./src/templates/DocsPageTemplate.tsx`),

      context: { id, tableOfContents, timeToRead, excerpt, lastModified: new Date(modifiedTime), body, frontmatter },
    });
  });
};
