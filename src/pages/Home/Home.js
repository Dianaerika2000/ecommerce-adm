import slide1 from '../../assets/images/slide1.png';
import slide2 from '../../assets/images/slide2.png';
import slide3 from '../../assets/images/slide3.png';
export default function Home() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      {/* indicadores */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      {/* Diapositivas */}
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="1000">
          <img src={slide1} className="d-block w-100 img-fluid" alt="slide 1" />
          <div className="carousel-caption d-none d-md-block text-end">
            <h5>Majadito Batido</h5>
            <p>Disfruta de un delicioso majadito.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="3000">
          <img src={slide2} className="d-block w-100 img-fluid" alt="slide 2" />
          <div className="carousel-caption d-none d-md-block text-end">
            <h5>Picante Mixto</h5>
            <p>Disfruta de un delicioso pincante mixto.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img src={slide3} className="d-block w-100 img-fluid" alt="slide 3" />
          <div className="carousel-caption d-none d-md-block text-end">
            <h5>Rapi</h5>
            <p>Disfruta de un delicioso rapi al jugo.</p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
