import { useState, useEffect } from 'react';

function UpdateUserInfo() {
  const [formData, setFormData] = useState({
    firstName: '',
    password: '',
    confirmPassword: ''
  });
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get the current user's auth status
    const checkAuthStatus = async () => {
      const response = await fetch('/api/chat/auth-status');
      const data = await response.json();
      if (data.isLoggedIn) {
        setFormData(prev => ({
          ...prev,
          firstName: data.firstName
        }));
      }
    };
    checkAuthStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Lösenorden matchar inte');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get current user's ID from auth status
      const authResponse = await fetch('/api/chat/auth-status');
      const authData = await authResponse.json();
      
      const response = await fetch(`/api/users/${authData.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          password: formData.password
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Uppgifterna uppdaterades framgångsrikt!');
        setFormData(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      } else {
        setMessage(result.message || 'Ett fel uppstod vid uppdateringen');
      }
    } catch (error) {
      setMessage('Ett fel uppstod vid anslutning till servern');
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
        <h1 className="admin-login">Uppdatera användaruppgifter</h1>

        <input
          type="text"
          name="firstName"
          placeholder="Nytt användarnamn"
          value={formData.firstName}
          onChange={handleInputChange}
          className="login-bar"
        />

        <input
          type="password"
          name="password"
          placeholder="Nytt lösenord"
          value={formData.password}
          onChange={handleInputChange}
          className="login-bar"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Bekräfta nytt lösenord"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="login-bar"
        />

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
            {isSubmitting ? 'Uppdaterar...' : 'Uppdatera'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserInfo;
