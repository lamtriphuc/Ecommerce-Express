import React, { useEffect, useRef, useState } from 'react'
import CategoryComponent from '../../components/CategoryComponent/CategoryComponent'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import { WrapperProducts, WrapperTypeProduct } from './style'
import slider1 from '../../assets/images/slider1.png'
import slider2 from '../../assets/images/slider2.png'
import CardComponent from '../../components/CardComponent/CardComponent'
import Loading from '../../components/LoadingComponent/Loading'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../../apis/productApi'
import { data } from 'react-router-dom'
import { getAllCategories } from '../../apis/categoryApi'
import { Pagination } from 'antd'

const HomePage = () => {
    const limit = 6;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    // Fetch data
    // All products
    const {
        data: products,
        error: productError,
        isSuccess: isProductsSuccess,
        isError: isProductsError,
        isLoading: isProductsLoading
    } = useQuery({
        queryKey: ['products', page, keyword, category, minPrice, maxPrice],
        queryFn: () => {
            const params = { page, limit };
            if (keyword) params.keyword = keyword;
            if (category) params.category = category;
            if (minPrice != null) params.minPrice = minPrice;
            if (maxPrice != null) params.maxPrice = maxPrice;
            return getAllProducts(params);
        },
        keepPreviousData: true,
    });

    // Cate list
    const {
        data: categories,
        error: categoryError,
        isSuccess: isCategoriessSuccess,
        isError: isCategoriesError,
        isLoading: isCategoriesLoading
    } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })


    // UseEffect
    useEffect(() => {

    }, [])

    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <h3 style={{ margin: '5px 0' }}>Danh mục sản phẩm</h3>
                <WrapperTypeProduct>
                    {categories?.data?.map((category) => {
                        return (
                            <CategoryComponent
                                key={category.slug}
                                name={category.name}
                                slug={category.slug}
                            />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div style={{ width: '100%', minHeight: 'calc(100vh - 156px)' }}>
                <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                    <h3 style={{ margin: '5px 0 10px 0' }}>Sản phẩm mới nhất</h3>
                    <Loading isLoading={isProductsLoading}>
                        <WrapperProducts>
                            {products?.data?.data?.map((product) => {
                                return (
                                    <CardComponent
                                        key={product.id}
                                        id={product.id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.thumbnail}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        discount={product.discount}
                                        sold={product.sold}
                                    />
                                )
                            })}
                        </WrapperProducts>
                        <div style={{ marginTop: '20px' }}>
                            <Pagination
                                align="center"
                                current={page}
                                total={products?.data?.total}
                                pageSize={6}
                                onChange={(curent) => setPage(curent)}
                            />
                        </div>
                    </Loading>
                </div>
            </div >
        </>
    )
}

export default HomePage