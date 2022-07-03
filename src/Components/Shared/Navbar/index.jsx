import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../../../images/Logo.jpg';
import { RiShoppingBagFill, RiAccountCircleLine } from 'react-icons/ri';

const Index = () => {
  const location = useLocation();
  const [url, setUrl] = useState(null);

  const pages = ['Shop', 'About us', 'Contact us'];
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      <Navbar
        id='navbar'
        className='navBarSection'
        collapseOnSelect
        expand='lg'
      >
        <Container className='justify-content-between'>
          <Navbar.Brand expand='lg' fixed='top' className='col-3'>
            <Link to='/'>
              <img src={Logo} className='logo' alt='Splash By Noor.' />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav col-9'>
            <Nav className='me-auto pt-3 pb-3'>
              <Nav.Link eventKey={1}>
                <Link
                  to='/'
                  className={'highlight' + (url === '/' ? ' active' : '')}
                >
                  Home
                </Link>
              </Nav.Link>
              <NavDropdown.Divider />
              {pages.map((page, index) => {
                return (
                  <>
                    <Nav.Link eventKey={index + 2}>
                      <Link
                        to={`/${page.toLowerCase().replace(/ /g, '-')}`}
                        className={
                          'highlight' +
                          (url === `/${page.toLowerCase().replace(/ /g, '-')}`
                            ? ' active'
                            : '')
                        }
                      >
                        {page}
                      </Link>
                    </Nav.Link>
                    <NavDropdown.Divider />
                  </>
                );
              })}

              {user ? (
                <>
                  <Nav.Link
                    eventKey={pages.length + 2}
                    className='responsiveShow'
                  >
                    <Link
                      to='/account'
                      className={
                        'highlight' + (url === '/account' ? ' active' : '')
                      }
                    >
                      Profile
                    </Link>
                  </Nav.Link>
                  <NavDropdown.Divider />
                  <Nav.Link
                    eventKey={pages.length + 3}
                    className='responsiveShow'
                  >
                    <Link
                      to='/cart'
                      className={
                        'highlight' + (url === '/cart' ? ' active' : '')
                      }
                    >
                      Cart
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  eventKey={pages.length + 2}
                  className='responsiveShow'
                >
                  <Link to='/login' className='highlight'>
                    <button className='loginButton'>Login / Signup</button>
                  </Link>
                </Nav.Link>
              )}
            </Nav>
            <Nav className='responsiveNone'>
              <Nav.Link eventKey={pages.length + 2}>
                {user ? (
                  <>
                    <Link
                      to='/account'
                      className={
                        'highlight' + (url === '/account' ? ' active' : '')
                      }
                    >
                      <RiAccountCircleLine className='icon' size='4rem' />
                    </Link>
                    <Link
                      to='/cart'
                      className={
                        'highlight' + (url === '/cart' ? ' active' : '')
                      }
                    >
                      <RiShoppingBagFill className='icon' size='4rem' />
                    </Link>
                  </>
                ) : (
                  <Link to='/login' className='highlight buttonHighlight'>
                    <button className='loginButton'>Login / Signup</button>
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Index;
