// pages/Faq.jsx
import { useNavigate } from "react-router-dom";



function Faq() {

const navigate = useNavigate();



    return (
    <div className="faq-container">
        <h1 className="faqh1">Har du läst vår FAQ?</h1>



          <div className="faq-buttons">
            <button onClick={() => navigate("/dynamisk")}>JA</button>
            <button>Nej</button>
          </div>

        <div className="faq-extra-section">
        </div>
    
    </div>
    );
  }
  
  export default Faq;



