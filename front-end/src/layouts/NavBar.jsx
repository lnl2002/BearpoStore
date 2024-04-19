import React from 'react'
import logoCopy from '../assets/logo_copy.png';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbFilterSearch } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addKeySearch } from '../redux/ProductReducer';
function NavBar() {
    const dispatch = useDispatch();
    const searchProduct = useSelector(state => state.product.search);
    const handleSearch = (e) => {
        const { name, value } = e.target;
        if (!value.startsWith(" ")) {
            dispatch(addKeySearch(value));
        }
    };
    console.log(searchProduct);
    return (
        <div className='row d-flex justify-content-center align-items-center h-20 py-4 sticky-top bg-white'>
            <div className='col-sm-4 text-center'>
                <img src={logoCopy} className='img-fluid ' alt="Example Image" />
            </div>
            <div className='col-md-8 d-flex justify-content-end'>
                <div className='w-75 d-flex align-items-center' style={{ lineHeight: "2em", position: "relative" }}>
                    {/* <input type='text' placeholder='Hôm nay bạn muốn ăn gì?' className='w-50' /> */}
                    <Form className='w-50'>
                        <FormControl onChange={handleSearch} type="text" placeholder="Hôm nay bạn muốn ăn gì?" className="w-100" />
                        <CiSearch type='submit' style={{ position: "absolute", top: "6%", left: "46%", fontSize: "30px" }} />
                    </Form>
                    <HiOutlineShoppingBag className='mx-4' style={{ fontSize: "26px" }} />
                    <button className='text-white btn' style={{ backgroundColor: "#057130" }}><TbFilterSearch style={{ fontSize: "20px", lineHeight: "2em" }} /> <span className='ml-1'>Bộ lọc</span></button>
                </div>
            </div>
        </div>
    )
}

export default NavBar