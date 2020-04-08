import React from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';

import { theme } from '../theme/Theme';
import classes from './css/ProjectCard.module.css';

function ProjectCard({
  name,
  shortDescription,
  techStack,
  gitHubUrl,
  imageUrl,
}) {
  return (
    <div
      className={
        classNames(
          classes.card,
          theme.button,
        )
      }
      style={{
        backgroundImage: `url(${imageUrl})`, backgroundColor: 'rgba(255, 255, 255, 0.8)', backgroundBlendMode: 'lighten', backgroundPosition: '0% 22%',
      }}
    >
      {gitHubUrl && (
        <a href={gitHubUrl}>
          <h2 className={classNames(classes.name, theme.primary)}>
            {name}
          </h2>
        </a>
      )}
      <p className={classes.shortDescription}>
        {shortDescription}
      </p>
      <p className={classes.techStack}>
        {techStack.join(', ')}
      </p>
      {/* <div className={classes.links}>
        <a className={classes.link} href={homepageUrl}>
          homepage
        </a>
        <a className={classes.link} href={gitHubUrl}>
          code
        </a>
      </div> */}
    </div>
  );
}

ProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
  gitHubUrl: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ProjectCard;
