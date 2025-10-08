import React from 'react'
import { useNavigate } from 'react-router-dom'

const CategoryComponent = ({ name, slug }) => {
    const navigate = useNavigate()

    const handleNavigateSlug = (slug) => {
        navigate(`/product/${slug}`, { state: slug })
    }

    return (
        <div style={{
            padding: '5px 5px',
            cursor: 'pointer',
            background: '#fff',
            borderRadius: '6px'
        }} onClick={() => handleNavigateSlug(slug)} >{name}</div>
    )
}

export default CategoryComponent