import React from 'react'
import './Banner.scss'
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

function Banner() {
    return (
        <div className='banner'>
            <img src="https://media.cntraveler.com/photos/5db1d0dd11c1e500092e7133/master/pass/airbnb-ski-aspen-28328347.jpg" alt="house"/>
            <div className='banner__info'>
                <h1>Find your perfect Roomies!!</h1>
                <h5>
                    Uncover the best accomodation nearby with the people of your liking.
                </h5>
                <Link to="/search">
                    <Button variant='outlined'>Explore Nearby</Button>
                </Link>
            </div>
        </div>
    )
}

export default Banner;
