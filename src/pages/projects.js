import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

import PageLayout from '../layouts/PageLayout';
import ProjectCard from '../components/ProjectCard';
import classes from './css/Projects.module.css';

function Projects({ data = {} }) {
  const {
    allProjectsJson: {
      edges = [],
    } = {},
    site: {
      siteMetadata: {
        title,
      } = {},
    } = {},
  } = data;

  const projects = edges.length === 1
    ? edges[0].node.projects
    : [];

  return (
    <PageLayout
      title="projects"
      titleHref="/projects"
      pageTitle={`${title} - Projects`}
      pageDescription="Neal Viswanath's Projects."
    >
      <section className={classes.projects}>
        {projects.map(project => <ProjectCard key={project.name} {...project} />)}
      </section>
    </PageLayout>
  );
}

Projects.propTypes = {
  data: PropTypes.shape({
    allProjectsJson: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          projects: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            shortDescription: PropTypes.string.isRequired,
            techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
            gitHubUrl: PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Projects;

export const pageQuery = graphql`
  query {
    allProjectsJson {
      edges {
        node {
          projects {
            name
            shortDescription
            techStack
            gitHubUrl
            imageUrl
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
