import React, {useState, useEffect} from 'react';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import './Cards.css'

const Cards = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    
    useEffect(() => {
        fetchData()
    }, [])

    const toggleModal = () =>  {
        setModalOpen(!modalOpen)
    }

    const fetchData = async () => {
        const resp = await fetch('https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e')
        const data = await resp.json()
        setData(data)
        setLoading(false)
    }

    let lowPrice = []
    data.map(item => {
      return   lowPrice.push(item)
    })

   lowPrice.sort((a, b) => a.price > b.price ? 1 : -1)

    return (
        <div className='mainBlock'>
            <div className='blockCards'>
                {loading ? <h2 className='loadText'>LOADING...</h2> : null}
                {data.map(item => (
                    <Card item={item} key={item.name}/>
                ))}
            </div>
           <button className='cheapest' onClick={toggleModal}>Buy cheapest</button>
           {modalOpen ? <Modal toggleModal={toggleModal} name={lowPrice[0].name} category={lowPrice[0].category} price={lowPrice[0].price} setModalOpen={setModalOpen} /> : null}
        </div>
    );
};

export default Cards;