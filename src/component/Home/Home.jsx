import React from 'react';
import style from './Home.module.css';
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';


export default function Home() {
  return <>
  <Helmet>
        <title>Fresh cart</title>
        <meta name="description" content="Helmet application" />
    </Helmet>

  <MainSlider/>
  <CategorySlider/>
    <FeaturedProduct/>
  </>
}