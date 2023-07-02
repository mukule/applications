import React from 'react'
import Logo from './countylogo.png'

export default function AdminHeader() {
    return (
        <div className="admin-header">
            <div style={{display:"flex",flexDirection:"column",textAlign:"center"}}>
                <img className='Logo' src={Logo} alt="avator" />
                <span>County Government of  Baringo</span>
            </div>
            <span>BCPSB CAPTURED DATA</span>
        </div>
    )
}
