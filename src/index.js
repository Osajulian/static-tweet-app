import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import './index.css';

const Tweet = ({ tweet }) => {
  return (
    <div className="tweet">
      <Avatar hash={tweet.gravatar} />
      <div className="content">
        <Author author={tweet.author} />
        <Time time={tweet.timestamp} />
        <Message message={tweet.message} />

        <div className="buttons">
          <ReplyButton />
          <RetweetButton count={tweet.retweets} />
          <LikeButton count={tweet.likes} />
          <MoreOptionsButton />
        </div>
      </div>
    </div>
  );
};

const testTweet = {
  message: 'Closure is the bew black.',
  gravatar: 'xyz',
  author: {
    handle: 'osajulian',
    name: 'JavaScript Sensei Person'
  },
  likes: 7,
  retweets: 77,
  timestamp: '2017-12-07 21:24:37'
};

const Avatar = ({ hash }) => {
  const url = `https://www.gravatar.com/avatar/${hash}`;
  return <img src={url} className="avatar" alt="avatar" />;
};

function Message({ text }) {
  return <div className="message">{text}</div>;
}
function Author({ author }) {
  const { name, handle } = author;
  return (
    <span className="author">
      <span className="name">{name}</span>
      <span className="handle">@{handle}</span>
    </span>
  );
}

const Time = ({ time }) => (
  <span className="time">{moment(time).fromNow()}</span>
);
const ReplyButton = () => <i className="fa fa-reply reply-button" />;

const getRetweetCount = count => {
  if (count > 0) {
    return <span className="retweet-count">{count}</span>;
  } else {
    return null;
  }
};

const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className="fa fa-retweet retweet-button" />
    {getRetweetCount(count)}
  </span>
);
const LikeButton = ({ count }) => (
  <span className="like-button">
    <i className="fa fa-heart like-button" />
    {count > 0 && <span className="like-count">{count}</span>}
  </span>
);

const MoreOptionsButton = () => (
  <i className="fa fa-ellipsis-h more-options-button" />
);

LikeButton.propTypes = {
  count: PropTypes.number
};

RetweetButton.propTypes = {
  count: PropTypes.number
};

Message.propTypes = {
  count: PropTypes.string
};

Time.propTypes = {
  count: PropTypes.string
};
Avatar.propTypes = {
  count: PropTypes.string
};

Author.propTypes = {
  author: PropTypes.shape({
    handle: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

// It’s also good to follow the DRY (Don’t Repeat Yourself) principle.
// If you have an explicit object shape required in one place, for instance
//  in Author, there’s little value in duplicating the shape in the parent
// Tweet component. If the shape of author changes some day, there will be
// two places to update code. Having that second check doesn’t buy you anything,
// and instead, could actually cost you time in the future.
Tweet.propTypes = {
  tweet: PropTypes.shape({
    message: PropTypes.string.isRequired,
    gravatar: PropTypes.string.isRequired,
    author: PropTypes.shape({
      handle: PropTypes.string.isRequired
    })
  }).isRequired
};

ReactDOM.render(<Tweet tweet={testTweet} />, document.querySelector('#root'));
