import React, { useState, useEffect } from 'react';
import { Card, Button, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Quotes.scss';

const quotes = [
  'Productivity is never letting time control you, but taking control of your time. – Brian Tracy',
  'The key to productivity is learning how to manage your energy, not just your time. – Jim Kwik',
  'The secret to getting ahead is getting started. – Mark Twain',
  'Do today what others won’t do, do tomorrow what others can’t do. – Jerry Rice',
  'Success is the sum of small efforts, repeated day in and day out. – Robert Collier',
  'The future depends on what we do in the present. – Mahatma Gandhi',
  'Don’t watch the clock; do what it does. Keep going. – Sam Levenson',
  'The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh',
  'Don’t wait for opportunity. Create it. – Anonymous',
];

const Quotes = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleNewQuote = () => {
    setLoading(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setLoading(false);
    }, 500);
  };

  return (
    <div className="quotes">
      <div className="quotes-button">
        <Button type="primary" onClick={handleNewQuote} icon={<DownOutlined />}>
          New Quote
        </Button>
      </div>
      <div className="loading">
        <p style={{ fontStyle: 'italic', fontSize: '16px', color: '#555' }}>
          "{quote}"
        </p>
      </div>
    </div>
  );
};

export default Quotes;
