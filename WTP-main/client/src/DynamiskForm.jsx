import { useState } from 'react';
import './index.css';

function DynamiskForm() {
  const [companyType, setCompanyType] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    serviceType: '',
    issueType: '',
    message: '',
    registrationNumber: '',
    insuranceType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });
    setIsSubmitting(true);
    
    let endpoint = '';
    let submitData = {};

    switch (companyType) {
      case 'Tele/Bredband':
        endpoint = '/api/tele';
        submitData = {
          FirstName: formData.firstName,
          Email: formData.email,
          ServiceType: formData.serviceType,
          IssueType: formData.issueType,
          Message: formData.message,
          CompanyType: companyType
        };
        break;
      case 'Fordonsservice':
        endpoint = '/api/fordon';
        submitData = {
          FirstName: formData.firstName,
          Email: formData.email,
          RegNummer: formData.registrationNumber,
          IssueType: formData.issueType,
          Message: formData.message,
          CompanyType: companyType
        };
        break;
      case 'Försäkringsärenden':
        endpoint = '/api/forsakring';
        submitData = {
          FirstName: formData.firstName,
          Email: formData.email, 
          InsuranceType: formData.insuranceType,
          IssueType: formData.issueType,
          Message: formData.message,
          CompanyType: companyType
        };
        break;
      default:
        setMessage({ text: 'Välj ett område', isError: true });
        setIsSubmitting(false);
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ 
          text: result.message, 
          isError: false 
        });
        setFormData({
          firstName: '',
          email: '',
          serviceType: '',
          issueType: '',
          message: '',
          registrationNumber: '',
          insuranceType: ''
        });
        setCompanyType('');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Ett fel uppstod' }));
        setMessage({ 
          text: errorData.message || 'Ett fel uppstod vid skickandet av formuläret', 
          isError: true 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        text: 'Ett fel uppstod. Vänligen försök igen eller kontakta oss via telefon.', 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTelecomFields = () => (
    <div className="dynamisk-field-group">
      <label htmlFor="serviceType">Typ av tjänst</label>
      <select
        name="serviceType"
        value={formData.serviceType}
        onChange={handleInputChange}
        required
      >
        <option value="">Välj tjänst</option>
        <option value="Bredband">Bredband</option>
        <option value="Mobiltelefoni">Mobiltelefoni</option>
        <option value="Fast telefoni">Fast telefoni</option>
        <option value="TV-tjänster">TV-tjänster</option>
      </select>

      <label htmlFor="issueType">Vad gäller ditt ärende?</label>
      <select
        name="issueType"
        value={formData.issueType}
        onChange={handleInputChange}
        required
      >
        <option value="">Välj typ av ärende</option>
        <option value="Tekniskt problem">Tekniskt problem</option>
        <option value="Fakturafrågor">Fakturafrågor</option>
        <option value="Ändring av tjänst">Ändring av tjänst</option>
        <option value="Uppsägning">Uppsägning</option>
        <option value="Övrigt">Övrigt</option>
      </select>
    </div>
  );
  
  const renderCarRepairFields = () => (
    <div className="dynamisk-field-group">
      <label htmlFor="registrationNumber">Registreringsnummer</label>
      <input
        type="text"
        name="registrationNumber"
        placeholder="ABC123"
        value={formData.registrationNumber || ''}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="issueType">Vad gäller ditt ärende?</label>
      <select
        name="issueType"
        value={formData.issueType}
        onChange={handleInputChange}
        required
      >
        <option value="">Välj typ av ärende</option>
        <option value="Problem efter reparation">Problem efter reparation</option>
        <option value="Garantiärende">Garantiärende</option>
        <option value="Reklamation">Reklamation</option>
        <option value="Kostnadsförfrågan">Kostnadsförfrågan</option>
        <option value="Reservdelsfrågor">Reservdelsfrågor</option>
        <option value="Övrigt">Övrigt</option>
      </select>
    </div>
  );

  const renderInsuranceFields = () => (
    <div className="dynamisk-field-group">
      <label htmlFor="insuranceType">Typ av försäkring</label>
      <select
        name="insuranceType"
        value={formData.insuranceType || ''}
        onChange={handleInputChange}
        required
      >
        <option value="">Välj försäkringstyp</option>
        <option value="Hemförsäkring">Hemförsäkring</option>
        <option value="Bilförsäkring">Bilförsäkring</option>
        <option value="Livförsäkring">Livförsäkring</option>
        <option value="Olycksfallsförsäkring">Olycksfallsförsäkring</option>
      </select>

      <label htmlFor="issueType">Vad gäller ditt ärende?</label>
      <select
        name="issueType"
        value={formData.issueType}
        onChange={handleInputChange}
        required
      >
        <option value="">Välj typ av ärende</option>
        <option value="Pågående skadeärende">Pågående skadeärende</option>
        <option value="Frågor om försäkringsskydd">Frågor om försäkringsskydd</option>
        <option value="Fakturafrågor">Fakturafrågor</option>
        <option value="Ändring av försäkring">Ändring av försäkring</option>
        <option value="Begäran om försäkringshandlingar">Begäran om försäkringshandlingar</option>
      </select>
    </div>
  );

  return (
    <div className="dynamisk-form-container">
      <div className="dynamisk-form-inner">
        <div className="dynamisk-form-header">
          <h1 className="dynamisk-form-title">Kontakta kundtjänst</h1>
        </div>
        <form className="dynamisk-form" onSubmit={handleSubmit}>
          <div className="dynamisk-field-group">
            <label htmlFor="companyType">Välj Företag</label>
            <select
              name="companyType"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="">Välj område</option>
              <option value="Tele/Bredband">Tele/Bredband</option>
              <option value="Fordonsservice">Fordonsservice</option>
              <option value="Försäkringsärenden">Försäkringsärenden</option>
            </select>
          </div>

          <div className="dynamisk-field-group">
            <label htmlFor="firstName">Namn</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="dynamisk-field-group">
            <label htmlFor="email">E-post</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          {companyType === 'Tele/Bredband' && renderTelecomFields()}
          {companyType === 'Fordonsservice' && renderCarRepairFields()}
          {companyType === 'Försäkringsärenden' && renderInsuranceFields()}

          <div className="dynamisk-field-group">
            <label htmlFor="message">Beskriv ditt ärende</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Beskriv ditt ärende i detalj..."
              required
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            className="dynamisk-form-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Skickar...' : 'Skicka ärende'}
          </button>
          
          {message.text && (
            <div 
              className={`dynamisk-message ${message.isError ? 'error' : 'success'}`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default DynamiskForm;