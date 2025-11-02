function Pricing() {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-4">
          <h1 className="mb-3 fs-2">Unbeatable Pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See Pricing <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6 mb-5">
          <div className="row text-center">
            <div className="col  p-3">
              <img src="media/pricingEquity.svg" alt="" style={{height : "50%"}}/>
              <p>Free account opening</p>
            </div>
            <div className="col p-3">
               <img src="media/intradayTrades.svg" alt="" style={{height : "50%"}}/>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
