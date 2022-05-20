import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './Card.css'

const Card = ({item}) => {
    const [modalOpen, setModalOpen] = useState(false)

    function toggleModal() {
        setModalOpen(!modalOpen)
    }
    
    return (
        <div className='card'>
            <div className='about'>
                <p className='category'>{item.category}</p>
                <h2>{item.name}</h2>
            </div>
            <div className='blockPrice'>
                <div className='price'>    
                <span>$</span>
                <h1>{item.price}</h1>
                </div>
                <button onClick={toggleModal}>BUY</button>
            </div>
            {modalOpen ? <Modal toggleModal={toggleModal} name={item.name} category={item.category} price={item.price} /> : null}
        </div>
    );
};

export default Card;