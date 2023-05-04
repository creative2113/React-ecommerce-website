import React, { useState } from 'react';
import { Button, Collapse, Table } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContextProvider';
import { FaClipboard, FaCheck } from 'react-icons/fa'

const TestCards = () => {
    const [open, setOpen] = useState(false);
    const testCardNumbers = [
        '4242424242424242',
        '4000056655665556',
        '5555555555554444',
        '6011111111111117'
    ]

    const { theme } = useTheme();

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        document.getElementById(text).style.display = 'none';
        document.getElementById(text+'Check').style.display = 'unset';
        setTimeout(() => {
            document.getElementById(text).style.display = 'unset';
            document.getElementById(text+'Check').style.display = 'none';
        }, 2000);
    }

    return (
        <div className='testCardsContainer'>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="testCardInfo"
                aria-expanded={open}
                className='mb-4'
            >
            {open ? 'Hide' : 'Show'} test cards
            </Button>
            <Collapse in={open}>
                <div id="testCardInfo">
                    <Table striped bordered hover variant={theme}>
                        <thead>
                            <tr>
                                <th>Card No.</th>
                                <th>CSV</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            testCardNumbers.map(cardNumber => 
                                <tr key={cardNumber}>
                                    <td>
                                        <span>{cardNumber.substring(0, 4)}</span>
                                        <span>{cardNumber.substring(4, 8)}</span>
                                        <span>{cardNumber.substring(8, 12)}</span>
                                        <span>{cardNumber.substring(12)}</span>
                                        <span style={{margin: 0}}>
                                            <FaClipboard 
                                                color='grey' 
                                                cursor='pointer'
                                                onClick={() => handleCopy(cardNumber)}
                                                id={cardNumber}
                                            />
                                            <FaCheck color='grey' display='none' id={cardNumber+'Check'} />
                                        </span>
                                    </td>
                                    <td>Any 3 digits</td>
                                    <td>Any future date</td>
                                </tr>
                            )
                        }
                            
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        </div>
    )
}

export default TestCards