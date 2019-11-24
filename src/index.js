import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
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

ReactDOM.render(<Tweet tweet={testTweet} />, document.querySelector('#root'));
