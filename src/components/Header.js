import React, { useState } from 'react'
import { Dropdown, Badge, Container, Nav, Navbar, Button } from 'react-bootstrap'
import { FaShoppingCart, FaHome, FaMoon, FaSun, FaBars, FaSearch } from 'react-icons/fa';
import { AiFillDelete, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CartState } from '../context/CartContext';
import { useTheme } from '../context/ThemeContextProvider';
import { useWindowSize } from '../hooks/useWindowSize';
import { useFilterBarState } from '../context/FilterBar';
import SearchBar from './SearchBar';

const Header = () => {

    const windowSize = useWindowSize();

    const { 
        state: {cart}, 
        dispatch
    } = CartState();

    const {theme, setTheme} = useTheme();

    const themeHandler = () => {
        if(theme === 'light') {
            setTheme('dark');
            return;
        }
        setTheme('light');
    }

    const {visible, setVisible} = useFilterBarState();

    const [searchBarVisible, setsearchBarVisible] = useState(false);

    return (
        <>
            <div className='header'>
                <Navbar style={{height: 80}} className={`${theme === 'light' ? 'lightHeader' : 'darkHeader'}`}>
                    <Container>
                        <div className='navLeftItems'>
                            {/* <span  
                                style={{display: windowSize.width > 965 && 'none'}} 
                                className='filterMenuIcon' 
                                onClick={() => setVisible(!visible)}
                            >
                                <FaBars fontSize='25px' />
                            </span> */}
                            <Navbar.Brand style={{color: theme === 'dark' && 'white'}}>
                                <Link to='/'><AiOutlineShoppingCart fontSize='50px'/>ShopX</Link>
                            </Navbar.Brand>
                        </div>

                        {
                            windowSize.width > 965 && <SearchBar classes='searchBar' />
                        }

                        <Nav className='navIcons'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success">
                                    <FaShoppingCart color='white' fontSize='25px' />
                                    <Badge bg='success'>{cart.length}</Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ minWidth: 370, left: '-17.7rem' }}>
                                    {
                                        cart.length > 0 ? 
                                        (
                                            <>
                                                {
                                                    cart.map( prod => (
                                                        <span className='cartItem' key={prod.id}>
                                                            <img 
                                                                src={prod.image}
                                                                className='cartItemImg'
                                                                alt={prod.name}
                                                            />
                                                            <div className="cartItemDetail">
                                                                <span>{prod.name}</span>
                                                                <span>₹ {prod.price.split('.')[0]}</span>
                                                            </div>
                                                            <AiFillDelete
                                                                fontSize='20px'
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => 
                                                                    dispatch({
                                                                        type: 'REMOVE_FROM_CART',
                                                                        payload: prod
                                                                    })
                                                                }
                                                            />
                                                        </span>
                                                    ))
                                                }
                                                <Link to='/cart'>
                                                    <Button style={{ width: '95%', margin: '0 10px' }}>
                                                        Go To Cart
                                                    </Button>
                                                </Link>
                                            </>
                                        ) :
                                        (
                                            <span style={{ padding: 10 }}>Cart is Empty!</span>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Container>
                </Navbar>

                <Navbar bg='dark' variant='dark' className="lowerNav">
                    <Container>

                        <div 
                            style={{display: windowSize.width > 965 && 'none'}} 
                            className='navLeftItems filterMenuIcon' 
                            onClick={() => setVisible(!visible)}
                        >
                            <FaBars fontSize='25px' />
                        </div>
                        <Nav className='navIcons'>
                            {
                                searchBarVisible && windowSize.width <= 965 && <SearchBar />
                            }
                            <span className='searchIcon m-auto' onClick={() => setsearchBarVisible(!searchBarVisible)}>
                                {
                                    !searchBarVisible ? 
                                    <FaSearch fontSize='20px' /> :
                                    <span style={{ fontSize: 20 }}>X</span>
                                }
                    
                            </span>
                            <Link to='/'>
                                <FaHome fontSize='25px' className='ms-3 mt-2' />
                            </Link>
                            
                            <span onClick={themeHandler} className='themeLogo ms-3 mt-1'>
                            {
                                theme === 'light' ? <FaMoon  /> : <FaSun  />
                            }
                            </span>

                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Header