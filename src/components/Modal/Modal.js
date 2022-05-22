import React, { useState } from 'react';
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Modal = ({toggleModal, name, category, price}) => {
    const [show, setShow] = useState(false)
    const [inputName, setInputName] = useState('')
    const [inputNumber, setInputNumber] = useState('')
    const [nameNoticed, setNameNoticed] = useState(false)
    const [numberNoticed, setNumberNoticed] = useState(false)
    const [nameError, setNameError] = useState("This field in required")
    const [numberError, setNumberError] = useState("This field in required")

    const submitHandler = (e) => {
        e.preventDefault()
        if(nameError || numberError) {
          return false
        } else {
            console.log("Name:", inputName);
            console.log("Number", inputNumber);
        }
    }

    const nameHandler = (e) => {
        setInputName(e.target.value)

        let reg = /[0-9]/

        if(!reg.test(e.target.value)) {
            setNameError("")
        } else {
            setNameError("Only letters allowed")
        }

        if(!e.target.value) {
            setNameError("This field in required")
        }
    }

    const numberHandler = (e) => {
        setInputNumber(e.target.value)

        let reg = /[a-zA-Z]/

        if(!reg.test(e.target.value)) {
            setNumberError('')
        } 
        
        if(reg.test(e.target.value)) {
            setNumberError('Only numbers allowed')
        }

        if(!e.target.value) {
            setNumberError('This field in required"')
        }

        if(e.target.value.length < 12) {
            setNumberError("Should contain 12 characters")
        }
    }
    
    const blurHandler = (e) => {
        switch(e.target.name) {
            case 'name' :
                setNameNoticed(true)
                break
            case 'number' :
                setNumberNoticed(true)
                break
            default: 
            break
        }
    }

    return (
        <div className='overlay'>
            <div className='modal'>
                <div className='close-modal' onClick={toggleModal}>
                    <span>&#215;</span>
                </div>
                <div className='modal-description'>
                    <p className='category'>{category}</p>
                    <p className='name'>{name}</p>
                    <div className='modal-price-block'>
                        <span>$</span>
                        <p>{price}</p>
                    </div>
                </div>
                <div className='modal-form'>
                    <form id='modal-form' onSubmit={submitHandler}>
                        <input onChange={nameHandler} value={inputName} required={true} onBlur={blurHandler}  type="text" name='name' placeholder='Name' style={(nameNoticed && nameError )? {border: '1px solid #E43F3F'} : null}/>
                        {(nameNoticed && nameError ) ?  <span className='cross' onClick={() => setInputName("")}>&#215;</span> : null }
                        {(nameNoticed && nameError) && <div className='error'>{nameError}</div>}
                        <input onChange={numberHandler} value={inputNumber} onBlur={e => blurHandler(e)} required={true}  type="text" name='number' maxLength='12'  pattern='[0-9]+' placeholder='Number' style={(numberNoticed && numberError) ? {border: '1px solid #E43F3F'} : null} />
                        {(numberNoticed && numberError) ?  <span className='cross' onClick={() => setInputNumber("")}>&#215;</span> : null }
                        {(numberNoticed && numberError) && <div className='error'>{numberError}</div>}
                    </form>
                </div>
                <div className='modal-button'>
                    <button  type='submit' form='modal-form' className='modal-btn' onMouseMove={() => setShow(true)} onMouseLeave={() => setShow(false)}>Order {show ? <FontAwesomeIcon icon={faArrowRight}/> : null}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;