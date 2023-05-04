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

    const windowSize = useWindowSize(); //getting windowSize from useWindowSize() custom hook

    const { 
        state: {cart}, //for getting the cart data
        dispatch //for updating the data
    } = CartState(); 

    const {theme, setTheme} = useTheme(); //getting the current theme from ThemeContext

    const {visible, setVisible} = useFilterBarState(); //visibility status of the sidebar

    const [searchBarVisible, setsearchBarVisible] = useState(false); //searchbar (below searchbar- the one on smaller screen) visibility status 

    const themeHandler = () => { //toggles theme
        let bodyBg = 'white';
        if(theme === 'light') {
            setTheme('dark');
            bodyBg = 'var(--pitchDark)';
        }
        else {
            setTheme('light');
        }
        document.body.style.background = bodyBg;
    }

    return (
        <>
            <div className='header'>
                {/* Top navbar STARTS ------------ */}
                <Navbar style={{height: 80}} className={`${theme === 'light' ? 'lightHeader' : 'darkHeader'}`}>
                    <Container>
                        <div className='navLeftItems'>
                            {/* Containg the logo */}
                            <Navbar.Brand style={{color: theme === 'dark' && 'white'}}>
                                <Link to='/'>
                                    <AiOutlineShoppingCart fontSize='50px'/> ShopX
                                </Link>
                            </Navbar.Brand>
                        </div>

                        {/* only show the searchabr on larger screen (width > 1100px) */}
                        {
                            windowSize.width > 1100 && <SearchBar classes='searchBar' />
                        }

                        {/* Containg the cart icon with dropdown of all the products in the cart */}
                        <Nav className='navIcons'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success">
                                    <FaShoppingCart color='white' fontSize='25px' />
                                    <Badge bg='success'>{cart.length}</Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ minWidth: 370, left: '-17.7rem', zIndex: 2 }}>
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
                {/* ------------ Top navbar ENDS */}

                {/* Lower navbar STARTS ------------ */}
                <Navbar bg='dark' variant='dark' className="lowerNav">

                    <Container>

                        {/* - Hamberger icon for sidebar toggling on smaller sceen
                            - Only visible on smaller sceen ( width < 1100) */}
                        <div 
                            className='navLeftItems filterMenuIcon' 
                            style={{display: windowSize.width > 1100 && 'none'}} 
                            onClick={() => setVisible(!visible)}
                        >
                            <FaBars fontSize='25px' />
                        </div>

                        {/* Containing the search bar / search icon, home button and theme button */}
                        <Nav className='navIcons'>

                            {/* - Search bar for smaller screen
                                - Only visible on smaller sceen and when searchBarVisible = true  */}
                            {
                                searchBarVisible && windowSize.width <= 1100 && <SearchBar />
                            }

                            {/* search button */}
                            <span className='searchIcon m-auto' onClick={() => setsearchBarVisible(!searchBarVisible)}>
                                {
                                    !searchBarVisible ? 
                                    <FaSearch fontSize='20px' /> :
                                    <span style={{ fontSize: 20 }}>X</span>
                                }
                    
                            </span>

                            {/* Home button */}
                            <Link to='/'>
                                <FaHome fontSize='25px' className='ms-3 mt-2' />
                            </Link>
                            
                            {/* Theme button */}
                            <span onClick={themeHandler} className='themeLogo ms-3 mt-1'>
                            {
                                theme === 'light' ? <FaMoon /> : <FaSun />
                            }
                            </span>

                        </Nav>
                    </Container>
                </Navbar>
                {/* ------------ Lower navbar ENDS */}
            </div>
        </>
    )
}

export default Header