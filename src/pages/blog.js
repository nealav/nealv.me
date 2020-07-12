import { graphql } from 'gatsby';

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import Anchor from '../components/Anchor';
import BlogLayout from '../layouts/BlogLayout';

import classes from './css/Blog.module.css';

function BlogPostPreview({
  excerpt,
  path,
  date,
  title,
}) {
  return (
    <div className={classes.preview}>
      <h1 className={classes.previewTitle}>
        <Anchor
          href={path}
        >
          {title}
        </Anchor>
      </h1>
      <div className={classes.previewDate}>
        <FontAwesomeIcon
          icon={faCalendar}
          style={{
            margin: '-1px 0.5em 0 0',
          }}
        />
        <span>{date}</span>
      </div>
      <div className={classes.previewExcerpt}>
        {excerpt}
      </div>
    </div>
  );
}

BlogPostPreview.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

function Blog({
  data = {},
}) {
  const {
    allMarkdownRemark: {
      edges: posts = [],
    } = {},
    site: {
      siteMetadata: {
        title: siteTitle,
      } = {},
    } = {},
  } = data;

  const pageTitle = `${siteTitle} - Blog`;
  const pageDescription = "Neal Viswanath's Blog";

  const nonEmptyPosts = posts
    .filter(post => post.node.frontmatter.title.length > 0);

  return (
    <BlogLayout pageTitle={pageTitle} pageDescription={pageDescription}>
      <div>
        {nonEmptyPosts
          .map(({ node: post }) => {
            const {
              id,
              excerpt,
              frontmatter: {
                path,
                date,
                title,
              },
            } = post;

            return (
              <BlogPostPreview
                key={id}
                excerpt={excerpt}
                path={path}
                date={date}
                title={title}
              />
            );
          })}
      </div>
    </BlogLayout>
  );
}

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          frontmatter: PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Blog;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: {
        order: DESC, fields: [frontmatter___date]
      }
    ) {
      edges {
        node {
          excerpt
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
    site {
      siteMetadata {
        title,
      }
    }
  }
`;
