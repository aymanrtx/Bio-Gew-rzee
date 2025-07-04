import Container from '@/components/Container';
import HomeBanner from '@/components/HomeBanner';
import ProductGrid from '@/components/ProductGrid';
import React from 'react'
import { getCategories } from '@/sanity/queries';
import HomeCategories from '@/components/HomeCategories';
import ShopByBrand from '@/components/ShopByBrand';
import LatestBlog from '@/components/LatestBlog';


const Home = async () => {
    const categories= await getCategories(6);


  return (
    <Container className="">
       <HomeBanner/>
       <ProductGrid/>
       <HomeCategories categories={categories} />
       <ShopByBrand/>
       <LatestBlog/>
      </Container>
  );
};
 
export default Home;