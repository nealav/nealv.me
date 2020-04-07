module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.nealv.me',
    title: 'Neal Viswanath',
    contact: {
      name: 'Neal Viswanath',
      email: 'neal.viswanath@gmail.com',
      displayedEmail: 'nealviswanath [at] gmail.com',
      resumeUrl: '/neal_viswanath_resume_2020.pdf',
    },
    social: {
      github: 'nealav',
      linkedin: 'nealviswanath',
      twitter: '@neal_v'
    },
  },
  plugins: [
    'gatsby-plugin-sitemap', 
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.nealv.me',
        sitemap: 'https://www.nealv.me/sitemap.xml',
        policy: [{
          userAgent: '*',
          allow: '/',
        }],
      },
    }, 
    'gatsby-plugin-eslint',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sharp`,
    'gatsby-transformer-json', 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/posts`,
        name: 'posts',
        ignore: process.env.NODE_ENV === 'production' && ['**/_drafts/**'],
      },
    }, 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/projects/projects.json`,
        name: 'projects',
      },
    }, 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/about/about.md`,
        name: 'about',
      },
    }, 
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        // File excerpts will start at the beginning
        // and end at the custom separator.
        excerpt_separator: '<!-- end -->',
        plugins: [{
          // IMPORTANT: This must be before `prism`.
          // See: https://github.com/gatsbyjs/gatsby/issues/5764
          resolve: 'gatsby-remark-autolink-headers',
        }, {
          resolve: 'gatsby-remark-prismjs',
        }, {
          resolve: 'gatsby-remark-images',
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 590,
            // Quality level of generated images (1-100).
            // The default is 50.
            quality: 100,
            backgroundColor: 'transparent',
            // Wrapper <div> styles.
            wrapperStyle:
              'margin: 1rem;',
          },
        }, {
          // Adds support for custom Markdown blocks.
          resolve: 'gatsby-remark-custom-blocks',
          options: {
            blocks: {
              boxShadow: {
                classes: 'box-shadow',
              },
            },
          },
        },
        ],
      },
    },
  ],
};
