function Awards() {
    return ( 
     
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6 p-5">
                        <img src="media/largestBroker.svg" alt="image" />
                    </div>
                    <div className="col-6 p-5 mt-3">
                        <h1>Largest Stock Broker in India</h1>
                        <p>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.</p>
                        <div className="row">
                            <div className="col-6">
                            <ul>
                                <li>Future and Options</li>
                                <li>Commidity and derivates</li>
                                <li>Currency and derivates</li>
                            </ul>

                        </div>
                        <div className="col-6">
                             <ul>
                                <li>Stocks and Ipo</li>
                                <li>Direct Mutual funds</li>
                                <li>Bonds and Goverment Securities</li>
                            </ul>

                        </div>
                        </div>
                        <img src="media\pressLogos.png" alt="image" style={{width : "90%"}} />
                        

                    </div>
                </div>
            </div>
      
     );
}

export default Awards;