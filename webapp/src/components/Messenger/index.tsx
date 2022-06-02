import React from 'react';
import MessageList from '../MessageList';
import './Messenger.css';

export default function Messenger({option, setOption, options}: any) {
    return (
      <div className="messenger">
        <div className="scrollable content">
          <MessageList option={option} setOption={setOption} options={options} />
        </div>
      </div>
    );
}