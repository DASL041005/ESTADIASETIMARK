// src/components/BannerCarousel.tsx
import React from 'react';
import Slider from 'react-slick';
import './BannerCarousel.css';

// ESTOS 2 IMPORTS SON OBLIGATORIOS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Banner {
  id: number;
  imageUrl: string;
  altText: string;
}

const mockBanners: Banner[] = [
  { id: 1, imageUrl: 'https://m.media-amazon.com/images/I/71d-CZ8GTZL.jpg', altText: 'Rollos de Etiquetas Térmicas' },
  { id: 2, imageUrl: 'https://www.fotomecanica.mx/media/catalog/product/cache/42278286db7a024dd142634a8b52937a/g/4/g4110_as_fr_cl_5_xl.jpg', altText: 'Impresoras en Promoción' },
  { id: 3, imageUrl: 'https://aydai.com/wp-content/uploads/2023/04/dd.jpg', altText: 'Nuevo Software de Gestión' },
];

const BannerCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="banner-carousel-container">
      <Slider {...settings}>
        {mockBanners.map((banner) => (
          <div key={banner.id} className="slide">
            <img src={banner.imageUrl} alt={banner.altText} className="banner-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
