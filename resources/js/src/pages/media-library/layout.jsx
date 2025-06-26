import { Outlet } from 'react-router-dom'
import { Header } from '../../components/media-library/header'
import React from 'react'

const MediaLibraryLayout = () => {
    return (
        <div>
            <Header />
            <div className="min-h-screen container mx-auto p-3">
                <Outlet />
            </div>
        </div>
    )
}

export default MediaLibraryLayout
