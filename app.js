// Application data
const complianceData = {
  costs: {
    startup: { min: 200000, max: 500000 },
    medium: { min: 500000, max: 1500000 },
    large: { min: 2500000, max: 5000000 }
  },
  businessMultipliers: {
    "AI/ML Startup": 1.4,
    "Climate-tech": 1.3,
    "E-commerce": 1.5,
    "SaaS/Software": 1.35,
    "Fintech": 1.6,
    "Other": 1.0
  },
  dataVolumeMultipliers: {
    "Under 1 lakh users": 1.0,
    "1-10 lakh users": 1.2,
    "10 lakh-1 crore users": 1.5,
    "1+ crore users": 2.0
  },
  preparationMultipliers: {
    "No preparation": 1.5,
    "Basic awareness": 1.2,
    "Some measures": 1.1,
    "Advanced preparation": 1.0
  },
  startupRelief: {
    turnoverThreshold: "under40",
    userThreshold: "Under 1 lakh users",
    discount: 0.3
  },
  additionalCosts: {
    childrenData: 3000000
  },
  penalties: {
    majorViolation: 25000000000,
    consentViolation: 5000000000,
    breachFailure: 20000000000
  },
  implementationPhases: [
    {
      phase: "Assessment & Gap Analysis",
      duration: "Month 1",
      tasks: ["Data mapping", "Current state assessment", "Gap identification"]
    },
    {
      phase: "Policy Development",
      duration: "Month 2-3",
      tasks: ["Privacy policy creation", "Consent management setup", "Data processing agreements"]
    },
    {
      phase: "System Implementation",
      duration: "Month 4-5",
      tasks: ["Technical safeguards", "Staff training", "Process documentation"]
    },
    {
      phase: "Testing & Audit",
      duration: "Month 6",
      tasks: ["Compliance testing", "Third-party audit", "Final preparations"]
    }
  ],
  costBreakdown: [
    { category: "Legal Consultation", percentage: 25 },
    { category: "Technology Infrastructure", percentage: 30 },
    { category: "Staff Training", percentage: 15 },
    { category: "Compliance Monitoring", percentage: 20 },
    { category: "Audit & Assessment", percentage: 10 }
  ]
};

// Business-specific recommendations
const businessRecommendations = {
  "AI/ML Startup": {
    title: "AI/ML Compliance Requirements",
    content: `
      <div class="recommendation-content">
        <p><strong>Key Challenges:</strong> AI governance, algorithmic transparency, consent for automated decision-making</p>
        <ul>
          <li>Implement explainable AI practices for data processing decisions</li>
          <li>Establish clear consent mechanisms for AI-driven personalization</li>
          <li>Document AI model training data sources and processing purposes</li>
          <li>Consider additional safeguards for sensitive inference algorithms</li>
        </ul>
        <p><strong>Cost drivers:</strong> +40% due to specialized AI governance requirements and algorithmic auditing needs.</p>
      </div>
    `
  },
  "Climate-tech": {
    title: "Climate-tech Data Compliance",
    content: `
      <div class="recommendation-content">
        <p><strong>Key Challenges:</strong> Environmental data complexity, sensor data processing, cross-border data sharing</p>
        <ul>
          <li>Map all environmental and IoT sensor data collection points</li>
          <li>Establish data sharing agreements for climate research partnerships</li>
          <li>Implement secure data anonymization for research purposes</li>
          <li>Consider data localization requirements for sensitive environmental data</li>
        </ul>
        <p><strong>Cost drivers:</strong> +30% due to complex environmental data processing and research collaboration requirements.</p>
      </div>
    `
  },
  "E-commerce": {
    title: "E-commerce Platform Compliance",
    content: `
      <div class="recommendation-content">
        <p><strong>Key Challenges:</strong> High transaction volumes, payment data security, customer profiling</p>
        <ul>
          <li>Implement granular consent for marketing and personalization</li>
          <li>Secure payment processing and financial data handling</li>
          <li>Establish clear data retention policies for transaction records</li>
          <li>Consider cross-border data transfer requirements for international sales</li>
        </ul>
        <p><strong>Cost drivers:</strong> +50% due to high data volumes, payment processing, and customer analytics complexity.</p>
      </div>
    `
  },
  "SaaS/Software": {
    title: "SaaS Platform Requirements",
    content: `
      <div class="recommendation-content">
        <p><strong>Key Challenges:</strong> Multi-tenant data isolation, cross-border transfers, API data sharing</p>
        <ul>
          <li>Implement robust data isolation between customer tenants</li>
          <li>Establish clear data processing agreements with customers</li>
          <li>Document all API data sharing and third-party integrations</li>
          <li>Consider data localization options for enterprise customers</li>
        </ul>
        <p><strong>Cost drivers:</strong> +35% due to multi-tenant architecture complexity and cross-border transfer requirements.</p>
      </div>
    `
  },
  "Fintech": {
    title: "Fintech Compliance Framework",
    content: `
      <div class="recommendation-content">
        <p><strong>Key Challenges:</strong> Financial regulations overlap, KYC data handling, transaction monitoring</p>
        <ul>
          <li>Align DPDP requirements with existing RBI and SEBI regulations</li>
          <li>Implement enhanced security for financial and KYC data</li>
          <li>Establish clear consent for credit scoring and risk assessment</li>
          <li>Consider additional safeguards for sensitive financial analytics</li>
        </ul>
        <p><strong>Cost drivers:</strong> +60% due to overlapping financial regulations and enhanced security requirements.</p>
      </div>
    `
  },
  "Other": {
    title: "General Compliance Framework",
    content: `
      <div class="recommendation-content">
        <p><strong>Key Focus Areas:</strong> Core DPDP compliance essentials</p>
        <ul>
          <li>Conduct comprehensive data mapping and classification</li>
          <li>Implement clear consent management processes</li>
          <li>Establish data subject rights fulfillment procedures</li>
          <li>Set up incident response and breach notification systems</li>
        </ul>
        <p><strong>Cost drivers:</strong> Standard compliance requirements without industry-specific complexities.</p>
      </div>
    `
  }
};

// Global variables
let costChart = null;
let currentFormData = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeForm();
  renderImplementationTimeline();
  setupEventListeners();
  
  // Set default values and calculate immediately to show something
  setDefaultValues();
  calculateCompliance();
});

// Set default values for immediate display
function setDefaultValues() {
  document.getElementById('companySize').value = 'startup';
  document.getElementById('turnover').value = 'under40';
  document.getElementById('businessType').value = 'SaaS/Software';
  document.getElementById('dataVolume').value = 'Under 1 lakh users';
  document.getElementById('complianceLevel').value = 'Basic awareness';
}

// Initialize form and set up event listeners
function initializeForm() {
  const form = document.getElementById('complianceForm');
  const inputs = form.querySelectorAll('select, input[type="checkbox"]');
  
  inputs.forEach(input => {
    input.addEventListener('change', handleFormChange);
  });
}

// Handle form changes
function handleFormChange(event) {
  calculateCompliance();
  updateRecommendations();
}

// Update form data object
function updateFormData() {
  currentFormData = {
    companySize: document.getElementById('companySize').value,
    turnover: document.getElementById('turnover').value,
    businessType: document.getElementById('businessType').value,
    dataVolume: document.getElementById('dataVolume').value,
    complianceLevel: document.getElementById('complianceLevel').value,
    childrenData: document.getElementById('childrenData').checked
  };
}

// Main compliance calculation function
function calculateCompliance() {
  updateFormData();
  
  // Always calculate even with partial data, use defaults for missing values
  const baseCost = getBaseCost();
  if (baseCost === 0) {
    resetResults();
    return;
  }
  
  const totalCost = calculateTotalCost(baseCost);
  const isEligibleForRelief = checkStartupRelief();
  const finalCost = isEligibleForRelief ? totalCost * (1 - complianceData.startupRelief.discount) : totalCost;
  
  updateCostDisplay(finalCost, isEligibleForRelief);
  updateCostBreakdown(finalCost);
  updateTimeline();
  updateRiskAssessment();
}

// Reset results when form is invalid
function resetResults() {
  document.getElementById('totalCost').textContent = '0';
  document.getElementById('startupRelief').classList.add('hidden');
  if (costChart) {
    costChart.destroy();
    costChart = null;
  }
}

// Get base cost based on company size
function getBaseCost() {
  const size = currentFormData.companySize || 'startup';
  const costRange = complianceData.costs[size];
  if (!costRange) return 350000; // fallback
  
  return (costRange.min + costRange.max) / 2;
}

// Calculate total cost with all multipliers
function calculateTotalCost(baseCost) {
  let total = baseCost;
  
  // Apply business type multiplier
  const businessMultiplier = complianceData.businessMultipliers[currentFormData.businessType] || 1;
  total *= businessMultiplier;
  
  // Apply data volume multiplier
  const volumeMultiplier = complianceData.dataVolumeMultipliers[currentFormData.dataVolume] || 1;
  total *= volumeMultiplier;
  
  // Apply preparation level multiplier
  const prepMultiplier = complianceData.preparationMultipliers[currentFormData.complianceLevel] || 1;
  total *= prepMultiplier;
  
  // Add children's data processing costs
  if (currentFormData.childrenData) {
    total += complianceData.additionalCosts.childrenData;
  }
  
  return Math.round(total);
}

// Check if eligible for startup relief
function checkStartupRelief() {
  return currentFormData.turnover === 'under40' && 
         currentFormData.dataVolume === 'Under 1 lakh users';
}

// Update cost display
function updateCostDisplay(cost, hasRelief) {
  const costElement = document.getElementById('totalCost');
  const reliefElement = document.getElementById('startupRelief');
  
  costElement.textContent = formatCurrency(cost);
  
  if (hasRelief) {
    reliefElement.classList.remove('hidden');
  } else {
    reliefElement.classList.add('hidden');
  }
}

// Format currency for Indian rupees
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(amount);
}

// Update cost breakdown chart
function updateCostBreakdown(totalCost) {
  const ctx = document.getElementById('costChart');
  if (!ctx) return;
  
  // Destroy existing chart
  if (costChart) {
    costChart.destroy();
  }
  
  const breakdownData = complianceData.costBreakdown.map(item => ({
    ...item,
    amount: Math.round(totalCost * item.percentage / 100)
  }));
  
  costChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: breakdownData.map(item => item.category),
      datasets: [{
        data: breakdownData.map(item => item.amount),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 11
            },
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const amount = formatCurrency(context.parsed);
              const percentage = Math.round((context.parsed / totalCost) * 100);
              return `${context.label}: ₹${amount} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Update timeline
function updateTimeline() {
  const timelineElement = document.getElementById('timelinePhases');
  const monthsElement = document.getElementById('timelineMonths');
  
  // Determine timeline based on company size and preparation level
  let months = 4; // default
  if (currentFormData.companySize === 'large' || currentFormData.complianceLevel === 'No preparation') {
    months = 6;
  } else if (currentFormData.complianceLevel === 'Advanced preparation') {
    months = 3;
  }
  
  monthsElement.textContent = `${months}`;
  
  // Render timeline phases
  timelineElement.innerHTML = complianceData.implementationPhases.map(phase => `
    <div class="timeline-phase">
      <h4>${phase.phase}</h4>
      <div class="duration">${phase.duration}</div>
      <ul>
        ${phase.tasks.map(task => `<li>${task}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// Update risk assessment
function updateRiskAssessment() {
  const riskFill = document.getElementById('riskLevel');
  const maxPenaltyElement = document.getElementById('maxPenalty');
  
  let riskLevel = 'medium';
  let maxPenalty = complianceData.penalties.majorViolation;
  
  // Determine risk level based on data volume and business type
  if (currentFormData.dataVolume === '1+ crore users' || 
      currentFormData.businessType === 'Fintech' ||
      currentFormData.businessType === 'E-commerce') {
    riskLevel = 'high';
  } else if (currentFormData.dataVolume === 'Under 1 lakh users' && 
             currentFormData.complianceLevel === 'Advanced preparation') {
    riskLevel = 'low';
    maxPenalty = complianceData.penalties.consentViolation;
  }
  
  riskFill.className = `risk-fill ${riskLevel}`;
  maxPenaltyElement.textContent = `₹${Math.round(maxPenalty / 10000000)} crore`;
}

// Update business-specific recommendations
function updateRecommendations() {
  const recommendationsElement = document.getElementById('businessRecommendations');
  const businessType = currentFormData.businessType;
  
  if (businessType && businessRecommendations[businessType]) {
    const recommendation = businessRecommendations[businessType];
    recommendationsElement.innerHTML = `
      <h3>${recommendation.title}</h3>
      ${recommendation.content}
    `;
  } else {
    recommendationsElement.innerHTML = '<p>Select your business type above to see personalized recommendations.</p>';
  }
}

// Render implementation timeline
function renderImplementationTimeline() {
  const timelineElement = document.getElementById('implementationTimeline');
  
  timelineElement.innerHTML = complianceData.implementationPhases.map((phase, index) => `
    <div class="implementation-phase">
      <h3>${phase.phase}</h3>
      <div class="phase-duration">${phase.duration}</div>
      <ul>
        ${phase.tasks.map(task => `<li>${task}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// Setup additional event listeners
function setupEventListeners() {
  // Lead form submission
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', handleLeadFormSubmission);
  }
  
  // Add hover explanations for form fields
  addHoverExplanations();
}

// Handle lead form submission
function handleLeadFormSubmission(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  if (!email) return;
  
  // Simulate form submission
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    submitButton.textContent = 'Download Sent!';
    submitButton.style.backgroundColor = '#10b981';
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'status status--success';
    successMessage.textContent = `Checklist sent to ${email}. Check your inbox!`;
    successMessage.style.marginTop = '1rem';
    
    leadForm.appendChild(successMessage);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      leadForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.style.backgroundColor = '';
      if (successMessage.parentNode) {
        successMessage.remove();
      }
    }, 3000);
  }, 1500);
}

// Add hover explanations for form fields
function addHoverExplanations() {
  const explanations = {
    companySize: 'Company size determines base compliance costs and regulatory obligations',
    turnover: 'Annual turnover affects startup relief eligibility under DPDP Act',
    businessType: 'Different business models have varying compliance complexity',
    dataVolume: 'Higher data volumes increase compliance costs and regulatory scrutiny',
    complianceLevel: 'Current preparation level affects implementation timeline and costs',
    childrenData: 'Processing children\'s data requires additional parental consent mechanisms'
  };
  
  Object.keys(explanations).forEach(fieldId => {
    const field = document.getElementById(fieldId);
    const label = document.querySelector(`label[for="${fieldId}"]`);
    
    if (label) {
      label.title = explanations[fieldId];
      label.style.cursor = 'help';
    }
  });
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(event) {
  if (event.target.matches('a[href^="#"]')) {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Add some interactivity to CTA buttons
document.addEventListener('click', function(event) {
  if (event.target.matches('a[href="#consultation"]')) {
    event.preventDefault();
    alert('Contact us at hello@frontlineintel.in for a personalized DPDP compliance consultation.');
  }
  
  if (event.target.matches('a[href="#newsletter"]')) {
    event.preventDefault();
    alert('Visit frontlineintel.in to subscribe to our policy intelligence newsletter.');
  }
});

// Form validation feedback
document.addEventListener('change', function(event) {
  if (event.target.matches('.form-control')) {
    const field = event.target;
    if (field.value) {
      field.style.borderColor = '#10b981';
    } else {
      field.style.borderColor = '';
    }
  }
});