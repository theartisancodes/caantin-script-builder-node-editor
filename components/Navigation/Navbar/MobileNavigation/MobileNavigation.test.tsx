import React from 'react';
import { render, screen } from '@testing-library/react';
import MobileNavigation from '@components/Navigation/Navbar/MobileNavigation/index';

jest.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
    setTheme: jest.fn()
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}));

describe('MobileNavigation Component', () => {
  it('renders hamburger menu icon', () => {
    render(<MobileNavigation />);

    const menuIcon = screen.getByAltText('menu');
    expect(menuIcon).toBeInTheDocument();
  });
});
