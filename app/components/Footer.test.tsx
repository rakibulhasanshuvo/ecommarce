import { JSDOM } from 'jsdom';

// Setup JSDOM globally before importing React and RTL
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
global.window = dom.window as any;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator });

import assert from 'node:assert';
import { test, describe, afterEach } from 'node:test';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './Footer.tsx';

describe('Footer Component', () => {
  afterEach(cleanup);

  test('renders brand name "Luxe"', () => {
    const { getByText } = render(<Footer />);
    assert.ok(getByText(/Luxe/i));
  });

  test('renders shop links', () => {
    const { getByText } = render(<Footer />);
    assert.ok(getByText('All Collections'));
    assert.ok(getByText('Electronics'));
    assert.ok(getByText('Fashion'));
    assert.ok(getByText('Home & Living'));
  });

  test('renders support items', () => {
    const { getByText } = render(<Footer />);
    assert.ok(getByText('Help Center'));
    assert.ok(getByText('Track Order'));
    assert.ok(getByText('Returns & Refunds'));
    assert.ok(getByText('Shipping Information'));
  });

  test('renders newsletter form', () => {
    const { getByPlaceholderText, getByRole } = render(<Footer />);
    assert.ok(getByPlaceholderText('Enter your email'));
    assert.ok(getByRole('button', { name: /subscribe/i }));
  });

  test('renders copyright notice with current year', () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    assert.ok(getByText(new RegExp(currentYear.toString())));
    assert.ok(getByText(/Luxe E-Commerce/));
  });

  test('renders bottom bar links', () => {
    const { getByText } = render(<Footer />);
    assert.ok(getByText('Privacy Policy'));
    assert.ok(getByText('Terms of Service'));
    assert.ok(getByText('Cookie Policy'));
  });
});
