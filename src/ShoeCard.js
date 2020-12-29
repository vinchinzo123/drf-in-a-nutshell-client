import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShoeCard = ({ shoe }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shoeInfo, setShoeInfo] = useState([]);
  useEffect(() => {
    const getShoeInfo = async () => {

      const [color, manufactuer, type] = await Promise.all([
        axios.get(shoe.color[0]),
        axios.get(shoe.manufactuer[0]),
        axios.get(shoe.shoe_type[0])]
      )
      setIsLoaded(true)
      setShoeInfo({ color: color.data.color_name, manufactuer: manufactuer.data.name, type: type.data.style })
    }
    try {
      getShoeInfo()
    } catch (error) {
      setIsLoaded(true)
      setError(error)
    }
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div style={{ border: "green solid 1px" }}>{shoe.brand}
        <div>ID: {shoe.id}</div>
        <div>COLOR: {shoeInfo.color}</div>
        <div>FASTEN: {shoe.fasten_type}</div>
        <div>MATERIAL: {shoe.material}</div>
        <div>MANUFACTURED: {shoeInfo.manufactuer}</div>
        <div>TYPE: {shoeInfo.type}</div>
        <div>SIZE: {shoe.size}</div>
      </div>
    )
  }
}

export default ShoeCard
