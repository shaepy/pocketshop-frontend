import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductImageSlider.css";

const ProductImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true, // loops infinitely
    speed: 500,
    slidesToShow: 1, // one image at a time
    slidesToScroll: 1,
    arrows: true, // next/prev arrows
  };

  return (
    <div style={{ maxWidth: "500px", maxHeight: "600px", margin: "0 auto" }}>
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id || img.url}>
            <img className="product-page-large-image" src={img.url} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageSlider;
