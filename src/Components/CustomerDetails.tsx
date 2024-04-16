import React, { useState, useEffect } from "react";
import { Customer } from './types';
import { MY_API_KEY } from "./config";

type Props = {
  customer: Customer | null;
};

const CustomerDetails: React.FC<Props> = ({ customer }) => {
  const [images, setImages] = useState<string[]>([]);
  const [lowerIndex, setLowerIndex] = useState<number>(0);
  const [upperIndex, setUpperIndex] = useState<number>(9);

  useEffect(() => {
    const fetchInitialImages = async () => {
      try {
        const response = await fetchImages();
        const initialImages = await response.json();
        setImages(initialImages.hits.map((hit: any) => hit.largeImageURL).slice(lowerIndex,upperIndex)); // Limit to 9 images
      } catch (error) {
        console.error("Error fetching initial images:", error);
      }
    };

    fetchInitialImages();

    const intervalId = setInterval(async () => {
      try {
        setLowerIndex(lowerIndex + 9);
        setUpperIndex(upperIndex + 9);
        const response = await fetchImages();
        const newData = await response.json();
        setImages(newData.hits.map((hit: any) => hit.largeImageURL).slice(lowerIndex,upperIndex));
      } catch (error) {
        console.error("Error fetching new images:", error);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchImages = async () => {
    return fetch(`https://pixabay.com/api/?key=${MY_API_KEY}&per_page=90&total=1000`);
  };

  return (
    <div className="customer-details">
      {customer ? (
        <>
          <h2>{customer.title}. {customer.name}</h2>
          <p>Title: {customer.title}</p>
          <p>Address: {customer.address}</p>

          <div className="photo-grid">
            {images.map((imageUrl, index) => (
              <img
                className="image"
                key={imageUrl}
                src={imageUrl}
                alt={`Photo ${index}`}
                style={{ display: "block" }} // Display all images
              />
            ))}
          </div>
        </>
      ) : (
        <p>Loading details....</p>
      )}
    </div>
  );
};

export default CustomerDetails;
