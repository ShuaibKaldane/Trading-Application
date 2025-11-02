function LeftSection({imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore}) {
  return (
    <div className="container">
        <div className="row mt-5 ">
            <div className="col-6 p-5">
              <img src={imageURL } alt="" />
            </div>
            <div className="col-6 p-5 mt-5">
              <h1>{productName}</h1>
              <p>{productDescription}</p>
              <div>
                <a href={tryDemo} style={{marginLeft : "10px"}}> Try Demo <i class="fa-solid fa-arrow-right"></i></a>
              <a href={learnMore} style={{marginLeft : "100px"}}>Learn More <i class="fa-solid fa-arrow-right"></i></a>
              </div>
              <div className="mt-4 ">
                <a href={googlePlay}> <img src="media/googlePlayBadge.svg" alt="" /></a>
              <a href={appStore}> <img src="media/appstoreBadge.svg" alt=""  style={{marginLeft : "50px"}} /></a>
             

              </div>
              

            </div>
        </div>
    </div>
  )
}

export default LeftSection