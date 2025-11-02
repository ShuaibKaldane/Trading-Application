function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row align-items-center ">
        <div className="col-6 p-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div>
            <a href={learnMore} style={{ marginLeft: "10px" }}>
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          
        
        </div>
        <div className="col-6 p-5">
          <img src={imageURL} alt="" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
