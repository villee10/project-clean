import { useState } from 'react';

function TeleTest() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Test 1: Med ISO datetime format
  const handleTestISO = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    const testData = {
      Id: 0,
      FirstName: "Test",
      Email: "test@example.com",
      ServiceType: "broadband",
      IssueType: "technical",
      Message: "Detta är ett test",
      CompanyType: "Tele/Bredband",
      ChatToken: "",
      SubmittedAt: new Date().toISOString(),
      IsChatActive: true
    };
    
    await sendRequest('/api/tele', testData, 'Test 1: ISO datetime');
    setIsLoading(false);
  };

  // Test 2: Med lokalt datetime format
  const handleTestLocal = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    const testData = {
      Id: 0,
      FirstName: "Test",
      Email: "test@example.com",
      ServiceType: "broadband",
      IssueType: "technical",
      Message: "Detta är ett test",
      CompanyType: "Tele/Bredband",
      ChatToken: "",
      SubmittedAt: new Date().toString(), // Lokalt format
      IsChatActive: true
    };
    
    await sendRequest('/api/tele', testData, 'Test 2: Local datetime');
    setIsLoading(false);
  };

  // Test 3: Utan datetime
  const handleTestNoDatetime = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    const testData = {
      Id: 0,
      FirstName: "Test",
      Email: "test@example.com",
      ServiceType: "broadband",
      IssueType: "technical",
      Message: "Detta är ett test",
      CompanyType: "Tele/Bredband",
      ChatToken: "",
      // Ingen SubmittedAt
      IsChatActive: true
    };
    
    await sendRequest('/api/tele', testData, 'Test 3: No datetime');
    setIsLoading(false);
  };

  // Test 4: Minimal test
  const handleTestMinimal = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    const testData = {
      FirstName: "Test",
      Email: "test@example.com",
      ServiceType: "broadband",
      IssueType: "technical",
      Message: "Test"
    };
    
    await sendRequest('/api/tele', testData, 'Test 4: Minimal data');
    setIsLoading(false);
  };

  // Test 5: Med FormData istället för JSON
  const handleTestFormData = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    const formData = new FormData();
    formData.append('Id', 0);
    formData.append('FirstName', 'Test');
    formData.append('Email', 'test@example.com');
    formData.append('ServiceType', 'broadband');
    formData.append('IssueType', 'technical');
    formData.append('Message', 'Detta är ett test');
    formData.append('CompanyType', 'Tele/Bredband');
    formData.append('ChatToken', '');
    formData.append('IsChatActive', true);
    
    try {
      const response = await fetch('/api/tele', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult({ test: 'Test 5: FormData', data });
      } else {
        let errorText = "";
        try {
          const errorData = await response.json();
          errorText = JSON.stringify(errorData);
        } catch (e) {
          errorText = "Kunde inte läsa svaret från servern";
        }
        setError({ test: 'Test 5: FormData', error: `Fel ${response.status}: ${errorText}` });
      }
    } catch (err) {
      setError({ test: 'Test 5: FormData', error: `Nätverksfel: ${err.message}` });
    }
  };

  // Gemensam funktion för att skicka begäran
  const sendRequest = async (url, data, testName) => {
    try {
      console.log(`${testName} - Sending:`, JSON.stringify(data));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log(`${testName} - Success:`, responseData);
        setResult({ test: testName, data: responseData });
      } else {
        let errorText = "";
        try {
          const errorData = await response.json();
          errorText = JSON.stringify(errorData);
          console.log(`${testName} - Error:`, errorData);
        } catch (e) {
          errorText = "Kunde inte läsa svaret från servern";
          console.log(`${testName} - Parse Error:`, e);
        }
        setError({ test: testName, error: `Fel ${response.status}: ${errorText}` });
      }
    } catch (err) {
      console.log(`${testName} - Network Error:`, err);
      setError({ test: testName, error: `Nätverksfel: ${err.message}` });
    }
  };
  
  return (
    <div style={{padding: '20px'}}>
      <h2>Tester för Teleformulär</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px'}}>
        <button 
          onClick={handleTestISO}
          disabled={isLoading}
          style={{
            padding: '10px',
            backgroundColor: '#4F76AC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test 1: ISO Datetime
        </button>
        
        <button 
          onClick={handleTestLocal}
          disabled={isLoading}
          style={{
            padding: '10px',
            backgroundColor: '#4F76AC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test 2: Lokalt Datetime
        </button>
        
        <button 
          onClick={handleTestNoDatetime}
          disabled={isLoading}
          style={{
            padding: '10px',
            backgroundColor: '#4F76AC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test 3: Utan Datetime
        </button>
        
        <button 
          onClick={handleTestMinimal}
          disabled={isLoading}
          style={{
            padding: '10px',
            backgroundColor: '#4F76AC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test 4: Minimal Data
        </button>
        
        <button 
          onClick={handleTestFormData}
          disabled={isLoading}
          style={{
            padding: '10px',
            backgroundColor: '#4F76AC',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test 5: FormData
        </button>
      </div>
      
      {isLoading && (
        <div style={{marginTop: '20px'}}>Testar...</div>
      )}
      
      {error && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fee2e2',
          borderRadius: '4px',
          color: '#dc2626'
        }}>
          <strong>{error.test}</strong>
          <p>{error.error}</p>
        </div>
      )}
      
      {result && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#dcfce7',
          borderRadius: '4px',
          color: '#16a34a'
        }}>
          <strong>{result.test} - Framgång!</strong>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default TeleTest;