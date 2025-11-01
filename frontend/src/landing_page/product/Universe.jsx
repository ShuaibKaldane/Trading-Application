function Universe({ imageURL }) {
  return (
    <div className="container">
      <div className="row text-center">
        <h1 className="mt-2">The Zerodha Universe</h1>
        <p className="mt-3">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3 mt-5">
          <img src="media/smallcaseLogo.png" alt="" />
          <p className="text-muted text-small">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/streakLogo.png" alt="" style={{width : "45%"}} />
          <p className="text-muted text-small">Algo & Strategy Platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/sensibullLogo.svg" alt=""style={{width : "55%"}}  />
          <p className="text-muted text-small mt-2">Options and Trading Platform </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/zerodhaFundhouse.png" alt="" style={{width : "55%"}} />
          <p className="text-muted text-small mt-3">Asset Management</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/goldenpiLogo.png" alt="" style = {{width : "55%"}} />
          <p className="text-muted text-small mt-3">Bonds trading Platform</p>
        </div>
        <div className="col-4 p-3 mt-5 ">
          <img src="media/dittoLogo.png" alt="" style = {{width : "45%"}}/>
          <p className="text-muted text-small mt-3">Insurance</p>
        </div>
        <button className="p-2 btn btn-primary fs-5 mb-5 mt-3" style={{width : "18%" , margin : "0 auto"}}>Sign up for free</button>
      </div>
    </div>
  );
}

export default Universe;
