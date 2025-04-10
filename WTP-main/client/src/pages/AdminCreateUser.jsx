import { useState } from 'react';

function AdminCreateUser() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    password: '',
    company: '',
    role: 'staff',
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          password: formData.password,
          company: formData.company,
          role: formData.role,
          email: formData.email,
        })
      });

      // Log raw response for debugging
      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response body:', result);

      if (response.ok) {
        setMessage('Användare skapades framgångsrikt!');
        setFormData({
          email: '',
          firstName: '',
          password: '',
          company: '',
          role: 'staff',
        });
      } else {
        // Log and display detailed error
        console.error('Error response:', result);
        setMessage(result.message || JSON.stringify(result));
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Ett fel uppstod vid anslutning till servern.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-border">
      <form onSubmit={handleSubmit} className="login-container">
        <h1 className="admin-login">Skapa användare</h1>
        <input type="text"
        name='email'
        placeholder='Ange en e-postadress'
        value={formData.email}
        onChange={handleInputChange}
        className="login-bar"
        required
        
        />

        <input
          type="text"
          name="firstName"
          placeholder="Ange ett användarnamn"
          value={formData.firstName}
          onChange={handleInputChange}
          className="login-bar"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Ange ett lösenord"
          value={formData.password}
          onChange={handleInputChange}
          className="login-bar"
          required
        />

        <select
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="login-bar"
          required
        >
          <option value="">Välj företag</option>
          <option value="fordon">Fordonsservice</option>
          <option value="tele">Tele/Bredband</option>
          <option value="forsakring">Försäkringsärenden</option>
        </select>

        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="login-bar"
          required
        >
          <option value="staff">Kundtjänst</option>
          <option value="user">Företags-admin</option>
          <option value="admin">Super-admin</option>
        </select>

        {message && (
          <div className={message.includes('fel') ? 'error-message' : 'success-message'}>
            {message}
          </div>
        )}

        <div className="login-knapp">
          <button
            type="submit"
            className="bla"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Skapar användare...' : 'Skapa användare'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminCreateUser;