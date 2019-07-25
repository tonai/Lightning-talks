import React from 'react';
import logo from './logo.svg';
import './App.css';

export default function Header({ title }) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">{title}</h1>
    </header>
  );
}
