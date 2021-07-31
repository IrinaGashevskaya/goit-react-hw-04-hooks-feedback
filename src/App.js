import React from 'react';
import Section from './components/Section/Section';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Statistic from './components/Statistic/Statistic';
import Notification from './components/Notification/Notification';
import { useState } from 'react';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    const percentage = (good * 100) / countTotalFeedback();
    if (isNaN(percentage)) {
      return 0;
    }
    return Math.round(percentage);
  };

  const onLeaveFeedback = e => {
    switch (e.target.name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistic">
        {countTotalFeedback() === 0 ? (
          <Notification message="No feedback given"></Notification>
        ) : (
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
}
