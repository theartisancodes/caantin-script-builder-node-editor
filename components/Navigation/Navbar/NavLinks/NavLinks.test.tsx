import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import NavLinks from '@components/Navigation/Navbar/NavLinks/index';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

jest.mock('@/constants', () => ({
  sidebarLinks: [
    {
      route: '/home',
      label: 'Home',
      imgURL: '/icons/home.svg'
    },
    {
      route: '/profile',
      label: 'Profile',
      imgURL: '/icons/profile.svg'
    }
  ]
}));

describe('NavLinks Component', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/home');
  });

  it('renders navigation links', () => {
    render(<NavLinks />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('applies active styles to current path', () => {
    render(<NavLinks />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveClass('primary-gradient');
  });
});
