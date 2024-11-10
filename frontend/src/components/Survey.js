import React, { useState } from 'react';

const Survey = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    energyUsageDescription: [],
    energySourceDescription: [],
    vehicleTypeDescription: [],
    transportationHabits: [],
    flightHabits: [],
    dietDescription: [],
    wasteManagementDescription: [],
    heatingUsageDescription: [],
    coolingUsageDescription: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    let updatedField = [...formData[field]];

    if (checked) {
      updatedField.push(value);
    } else {
      updatedField = updatedField.filter(item => item !== value);
    }

    setFormData({ ...formData, [field]: updatedField });
  };

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock calculation for carbon footprint
    const carbonFootprint = calculateCarbonFootprint(formData);
    const suggestions = generateSuggestions(carbonFootprint);

    setResultMessage(`Your estimated carbon footprint is ${carbonFootprint} tons per year. ${suggestions}`);
    setSubmitted(true);
  };

  const calculateCarbonFootprint = (data) => {
    // Mock logic for calculation, can be replaced with real logic
    return (Math.random() * 10).toFixed(2); // returns a random carbon footprint
  };

  const generateSuggestions = (carbonFootprint) => {
    // Suggestions based on the estimated carbon footprint
    if (carbonFootprint < 2) {
      return "Excellent! Your carbon footprint is significantly below average. Keep up the great work! Consider exploring further ways to reduce waste, like zero-waste lifestyle practices.";
    } else if (carbonFootprint < 3) {
      return "Outstanding! You're doing a fantastic job with your environmental impact. To further lower your footprint, try reducing your energy consumption and use more public transport.";
    } else if (carbonFootprint < 4) {
      return "Great job! You're already making an effort to reduce your impact. Consider switching to a fully electric vehicle and reducing air travel for even bigger changes.";
    } else if (carbonFootprint < 5) {
      return "Good effort! To further reduce your footprint, consider using renewable energy sources or reducing air travel. Making sustainable food choices could also help.";
    } else if (carbonFootprint < 6) {
      return "You're on the right track! To make a larger impact, consider increasing your recycling habits, using energy-efficient appliances, and adopting a plant-based diet.";
    } else if (carbonFootprint < 7) {
      return "You're doing okay, but there’s room for improvement. Consider reducing your use of single-use plastics, improving waste management practices, and investing in energy-saving solutions for your home.";
    } else if (carbonFootprint < 8) {
      return "Good effort! You might reduce your footprint by adopting a plant-based diet, improving waste management practices, and decreasing your car usage.";
    } else if (carbonFootprint < 9) {
      return "You can make a big impact by reducing vehicle usage, conserving energy at home, and recycling more frequently. Additionally, reduce the amount of flights you take annually.";
    } else if (carbonFootprint < 10) {
      return "You’re generating a considerable amount of carbon emissions. Start by using more energy-efficient appliances, reducing vehicle travel, and considering solar or wind energy sources for your home.";
    } else if (carbonFootprint < 12) {
      return "You're on the high end of carbon emissions. Consider switching to an electric vehicle, cutting down on flights, and using more sustainable energy sources for your home and workplace.";
    } else {
      return "Your carbon footprint is quite high. Focus on making significant lifestyle changes like reducing your energy usage, adopting a plant-based diet, and choosing greener transport options. Every small change counts!";
    }
  };
  

  const labels = [
    'Energy Usage Description',
    'Energy Source Description',
    'Vehicle Type Description',
    'Transportation Habits',
    'Flight Habits',
    'Diet Description',
    'Waste Management Description',
    'Heating Usage Description',
    'Cooling Usage Description',
  ];

  const options = {
    energyUsageDescription: [
      'Low (below average usage)',
      'Moderate (average usage)',
      'High (above average usage)',
    ],
    energySourceDescription: [
      'Grid electricity',
      'Solar energy',
      'Wind energy',
      'Mixed sources',
    ],
    vehicleTypeDescription: [
      'No vehicle',
      'Electric vehicle',
      'Hybrid vehicle',
      'Gasoline vehicle',
    ],
    transportationHabits: [
      'Walking/Cycling',
      'Public transport',
      'Personal vehicle',
      'Ride-sharing',
    ],
    flightHabits: [
      'Never',
      '1-2 times a year',
      '3-5 times a year',
      'More than 5 times a year',
    ],
    dietDescription: [
      'Vegetarian',
      'Vegan',
      'Omnivore',
      'Pescatarian',
    ],
    wasteManagementDescription: [
      'Recycle regularly',
      'Compost regularly',
      'Minimal waste management',
      'No specific waste management',
    ],
    heatingUsageDescription: [
      'No heating',
      'Low heating usage',
      'Moderate heating usage',
      'High heating usage',
    ],
    coolingUsageDescription: [
      'No cooling',
      'Low cooling usage',
      'Moderate cooling usage',
      'High cooling usage',
    ],
  };

  const fields = [
    'energyUsageDescription',
    'energySourceDescription',
    'vehicleTypeDescription',
    'transportationHabits',
    'flightHabits',
    'dietDescription',
    'wasteManagementDescription',
    'heatingUsageDescription',
    'coolingUsageDescription',
  ];

  return (
    <div style={{ backgroundColor: '#121212', height: "100vh", color: "#fff", padding: "20px" }}>
      {submitted ? (
        <div className="result-message" style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          height: '100%', color: '#fff', textAlign: 'center', padding: '30px', backgroundColor: '#333', borderRadius: '10px'
        }}>
          <h2 style={{ fontSize: '2em', color: '#00FFAB' }}>Carbon Footprint Result</h2>
          <p style={{
            fontSize: '1.5em', fontWeight: '600', marginTop: '20px', color: '#FFD700',
            lineHeight: '1.5'
          }}>
            {resultMessage}
          </p>
          <div style={{
            backgroundColor: '#444', borderRadius: '8px', marginTop: '30px', padding: '20px', width: '100%',
            maxWidth: '500px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)'
          }}>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Suggestions:</p>
            <p style={{
              fontSize: '1em', color: '#fff', fontWeight: 'normal', marginTop: '10px',
              lineHeight: '1.6'
            }}>
              {generateSuggestions(resultMessage.match(/[\d.]+/g)?.[0] || 0)}
            </p>
          </div>
          <button onClick={() => window.location.reload()} style={{
            marginTop: '30px', padding: '15px 30px', fontSize: '1.2em', backgroundColor: '#00FFAB', border: 'none',
            borderRadius: '5px', cursor: 'pointer', color: '#121212', transition: 'background-color 0.3s',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)'
          }}>
            Retake Survey
          </button>
        </div>
      ) : (
        <div className="form-container3" style={{ backgroundColor: "transparent" }}>
          <form className='form3' onSubmit={handleSubmit}>
            <div className="form-step">
              <label style={{ color: "aquamarine" }}>{labels[step]}</label>
              <div className="checkbox-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {options[fields[step]].map((option, index) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData[fields[step]].includes(option)}
                      onChange={(e) => handleCheckboxChange(e, fields[step])}
                      style={{ marginRight: '8px' }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-navigation">
              {step > 0 && (
                <button type="button" className="prev-button" onClick={handlePrevious}>
                  Previous
                </button>
              )}
              {step < 8 ? (
                <button type="button" className="next-button" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button type="submit" className="submit-button">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Survey;
