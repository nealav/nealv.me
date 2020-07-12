import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import classNames from '../utils/classNames';
import Anchor from './Anchor';

import classes from './css/Brand.module.css';
import './css/BlinkingCursor.css';

class Brand extends React.Component {
  constructor(props) {
    super(props);

    this.phrases = [
      'Programmer',
      'nealv.me',
      'Blogger',
      'Neal Viswanath',
    ];

    this.chars = '!<>-_\\/[]{}—=+*^?#________';

    this.state = {
      counter: 0,
      title: 'Neal Viswanath',
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        const { counter } = this.state;
        this.setText(this.phrases[counter]);
        this.next();
      },
      3000,
    );
  }

  setText = (newText) => {
    const { title } = this.state;
    const oldText = title;
    const length = Math.max(oldText.length, newText.length);
    const queue = [];

    for (let i = 0; i < length; i += 1) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30);
      queue.push({
        from, to, start, end,
      });
    }

    cancelAnimationFrame(this.frameRequest);
    this.update(queue, 0, 0);
  }

  update = (inputQueue, frame) => {
    const queue = inputQueue;
    let output = '';

    for (let i = 0, n = queue.length; i < n; i += 1) {
      const {
        from, to, start, end,
      } = queue[i];
      let { char } = queue[i];
      if (frame >= end) {
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          queue[i].char = char;
        }
        output += `${char}`;
      } else {
        output += from;
      }
    }

    this.setState({
      title: output,
    });

    this.frameRequest = requestAnimationFrame(() => {
      this.update(queue, frame + 1);
    });
  }

  randomChar = () => {
    const random = this.chars[Math.floor(Math.random() * this.chars.length)];
    return random;
  }

  next = () => {
    this.setState(prevState => ({
      counter: (prevState.counter + 1) % this.phrases.length,
    }));
  }

  render() {
    return (
      <StaticQuery
        query={
          graphql`
            query {
              site {
                siteMetadata {
                  title,
                }
              }
            }
          `
        }
        render={() => {
          const { underline, large, className } = this.props;
          const { title } = this.state;

          return (
            <h1
              className={classNames(classes.header, {
                [classes.headerUnderline]: underline,
                [classes.headerLarge]: large,
              }, className)}
            >
              <Anchor
                href="/"
                className={classes.link}
              >
                {`> ${title}`}
              </Anchor>
              <span className="blinking-cursor">|</span>
            </h1>
          );
        }}
      />
    );
  }
}

Brand.propTypes = {
  className: PropTypes.string,
  underline: PropTypes.bool,
  large: PropTypes.bool,
};

Brand.defaultProps = {
  className: '',
  underline: false,
  large: false,
};

export default Brand;
