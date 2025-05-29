// Application data
const costData = {
  baseCosts: {
    startup: {min: 200000, max: 500000},
    medium: {min: 500000, max: 1500000},
    large: {min: 2500000, max: 5000000}
  },
  businessMultipliers: {
    "AI/ML": 1.4,
    "Fintech": 1.6,
    "E-commerce": 1.5,
    "SaaS/Software": 1.2,
    "Climate-tech": 1.3,
    "Other": 1.0
  },
  dataVolumeMultipliers: {
    "Under 1 lakh": 1.0,
    "1-10 lakh": 1.2,
    "10 lakh-1 crore": 1.5,
    "1+ crore": 2.0
  },
  complianceLevelReductions: {
    "No preparation": 0,
    "Basic": 0.15,
    "Intermediate": 0.25,
    "Advanced": 0.4
  },
  childrenDataCost: 1000000,
  startupRelief: 0.3
};

const timelineData = {
  baseTimelines: {
    startup: 5,
    medium: 7,
    large: 10
  },
  businessAdjustments: {
    "AI/ML": 1,
    "Fintech": 2,
    "E-commerce": 1,
    "SaaS/Software": 0,
    "Climate-tech": 1,
    "Other": 0
  },
  childrenDataWeeks: 6
};

const roadmapTemplates = {
  "AI/ML": {
    phase1: {
      title: "Foundation & AI-Specific Assessment",
      weeks: "1-4",
      tasks: ["AI model inventory and training data audit", "Basic consent framework design for AI applications", "Algorithmic accountability framework planning"],
      deliverable: "AI data governance baseline report"
    },
    phase2: {
      title: "AI Policy Development",
      weeks: "5-8",
      tasks: ["Training data governance policies", "Privacy policies with AI-specific disclosures", "Bias detection and mitigation protocols"],
      deliverable: "AI-compliant privacy framework"
    },
    phase3: {
      title: "Technical Implementation",
      weeks: "9-12",
      tasks: ["Algorithmic accountability documentation", "Model bias detection setup", "Explainability framework implementation"],
      deliverable: "AI ethics compliance system"
    },
    phase4: {
      title: "Integration & Testing",
      weeks: "13-16",
      tasks: ["Security safeguards for AI systems", "Data subject rights integration", "Automated bias testing"],
      deliverable: "Technical compliance verification"
    },
    phase5: {
      title: "Validation & Launch",
      weeks: "17-20",
      tasks: ["AI bias testing and validation", "Final compliance audit", "Staff training on AI ethics"],
      deliverable: "AI DPDP compliance certificate"
    }
  },
  "Fintech": {
    phase1: {
      title: "Financial Regulatory Alignment",
      weeks: "1-4",
      tasks: ["RBI compliance coordination", "KYC and customer data mapping", "Payment processor data flows"],
      deliverable: "Financial compliance baseline"
    },
    phase2: {
      title: "Enhanced Consent Management",
      weeks: "5-10",
      tasks: ["Multi-layered consent for financial services", "Transaction data consent frameworks", "Cross-selling consent protocols"],
      deliverable: "Fintech consent architecture"
    },
    phase3: {
      title: "Technical Implementation Phase 1",
      weeks: "11-16",
      tasks: ["Secure payment data processing", "Customer profiling safeguards", "Automated fraud detection compliance"],
      deliverable: "Core fintech compliance system"
    },
    phase4: {
      title: "Technical Implementation Phase 2",
      weeks: "17-22",
      tasks: ["Cross-border payment compliance", "Loan processing data protection", "Investment advisory data protocols"],
      deliverable: "Advanced fintech safeguards"
    },
    phase5: {
      title: "Audit & Certification",
      weeks: "23-28",
      tasks: ["Independent financial audit", "RBI coordination", "Continuous monitoring setup"],
      deliverable: "Fintech DPDP certification"
    }
  },
  "E-commerce": {
    phase1: {
      title: "Customer Data Mapping",
      weeks: "1-4",
      tasks: ["Customer journey data audit", "Marketing consent frameworks", "Vendor data sharing agreements"],
      deliverable: "E-commerce data baseline"
    },
    phase2: {
      title: "Consent & Privacy Policies",
      weeks: "5-8",
      tasks: ["Multi-layered consent for personalization", "Privacy policy updates", "Cookie consent management"],
      deliverable: "Customer consent framework"
    },
    phase3: {
      title: "Technical Implementation",
      weeks: "9-12",
      tasks: ["Customer rights portal", "Data deletion automation", "Marketing automation compliance"],
      deliverable: "E-commerce compliance system"
    },
    phase4: {
      title: "Testing & Validation",
      weeks: "13-16",
      tasks: ["Customer experience testing", "Vendor compliance verification", "Payment processor coordination"],
      deliverable: "System validation report"
    }
  },
  "SaaS/Software": {
    phase1: {
      title: "Platform Assessment",
      weeks: "1-4",
      tasks: ["Multi-tenant data segregation audit", "API data flow mapping", "Customer data processing inventory"],
      deliverable: "SaaS compliance baseline"
    },
    phase2: {
      title: "Policy & Contracts",
      weeks: "5-8",
      tasks: ["Data Processing Agreements with customers", "Privacy policy for SaaS platforms", "Subprocessor management"],
      deliverable: "SaaS privacy framework"
    },
    phase3: {
      title: "Technical Implementation",
      weeks: "9-12",
      tasks: ["Customer data controls", "Automated data deletion", "Audit logging systems"],
      deliverable: "SaaS compliance platform"
    },
    phase4: {
      title: "Customer Enablement",
      weeks: "13-16",
      tasks: ["Customer compliance tools", "Documentation and training", "Ongoing monitoring setup"],
      deliverable: "Customer compliance package"
    }
  },
  "Climate-tech": {
    phase1: {
      title: "Environmental Data Assessment",
      weeks: "1-4",
      tasks: ["Environmental sensor data mapping", "Research data governance", "Stakeholder data processing"],
      deliverable: "Climate-tech data baseline"
    },
    phase2: {
      title: "Research & Policy Framework",
      weeks: "5-8",
      tasks: ["Research consent protocols", "Environmental data sharing policies", "Public data usage guidelines"],
      deliverable: "Climate research compliance framework"
    },
    phase3: {
      title: "Technical Implementation",
      weeks: "9-12",
      tasks: ["Environmental data platform security", "Research data controls", "Stakeholder portal development"],
      deliverable: "Climate-tech compliance system"
    },
    phase4: {
      title: "Validation & Certification",
      weeks: "13-16",
      tasks: ["Environmental impact validation", "Research ethics review", "Certification preparation"],
      deliverable: "Climate-tech compliance certification"
    }
  },
  "Other": {
    phase1: {
      title: "Data Assessment & Planning",
      weeks: "1-4",
      tasks: ["Comprehensive data mapping", "Stakeholder identification", "Risk assessment"],
      deliverable: "Data governance baseline"
    },
    phase2: {
      title: "Policy Development",
      weeks: "5-8",
      tasks: ["Privacy policy creation", "Consent management planning", "Vendor agreements"],
      deliverable: "Privacy compliance framework"
    },
    phase3: {
      title: "Technical Implementation",
      weeks: "9-12",
      tasks: ["Data subject rights portal", "Security implementation", "Process automation"],
      deliverable: "Compliance management system"
    },
    phase4: {
      title: "Testing & Launch",
      weeks: "13-16",
      tasks: ["System testing", "Staff training", "Compliance audit preparation"],
      deliverable: "Full compliance certification"
    }
  }
};

// Global variables
let costChart = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  calculateCosts();
  generateRoadmap();
});

function setupEventListeners() {
  // Company size radio buttons
  document.querySelectorAll('input[name="companySize"]').forEach(radio => {
    radio.addEventListener('change', () => {
      calculateCosts();
      generateRoadmap();
    });
  });

  // Annual turnover input
  document.getElementById('turnover').addEventListener('input', (e) => {
    updateThresholdIndicator(e.target.value);
    calculateCosts();
    generateRoadmap();
  });

  // Business type dropdown
  document.getElementById('businessType').addEventListener('change', () => {
    calculateCosts();
    generateRoadmap();
  });

  // Data volume dropdown
  document.getElementById('dataVolume').addEventListener('change', () => {
    calculateCosts();
    generateRoadmap();
  });

  // Compliance level radio buttons
  document.querySelectorAll('input[name="complianceLevel"]').forEach(radio => {
    radio.addEventListener('change', () => {
      calculateCosts();
      generateRoadmap();
    });
  });

  // Children's data radio buttons
  document.querySelectorAll('input[name="childrenData"]').forEach(radio => {
    radio.addEventListener('change', () => {
      calculateCosts();
      generateRoadmap();
    });
  });

  // Lead form submission
  document.getElementById('leadForm').addEventListener('submit', handleLeadSubmission);
}

function getFormData() {
  return {
    companySize: document.querySelector('input[name="companySize"]:checked').value,
    turnover: parseFloat(document.getElementById('turnover').value) || 0,
    businessType: document.getElementById('businessType').value,
    dataVolume: document.getElementById('dataVolume').value,
    complianceLevel: document.querySelector('input[name="complianceLevel"]:checked').value,
    childrenData: document.querySelector('input[name="childrenData"]:checked').value === 'yes'
  };
}

function calculateCosts() {
  const data = getFormData();
  
  // Base cost calculation
  const baseCost = costData.baseCosts[data.companySize];
  let totalCost = (baseCost.min + baseCost.max) / 2;

  // Apply business type multiplier
  totalCost *= costData.businessMultipliers[data.businessType];

  // Apply data volume multiplier
  totalCost *= costData.dataVolumeMultipliers[data.dataVolume];

  // Apply compliance level reduction
  totalCost *= (1 - costData.complianceLevelReductions[data.complianceLevel]);

  // Add children's data cost
  if (data.childrenData) {
    totalCost += costData.childrenDataCost;
  }

  // Apply startup relief if eligible
  const isStartupReliefEligible = data.turnover < 40;
  if (isStartupReliefEligible) {
    totalCost *= (1 - costData.startupRelief);
  }

  // Update UI
  updateCostDisplay(totalCost, isStartupReliefEligible);
  updateRiskAssessment(data);
  updateCostChart(totalCost, data);
  updateTimeline(data);
}

function updateCostDisplay(cost, startupRelief) {
  document.getElementById('totalCost').textContent = formatCurrency(cost);
  
  const reliefElement = document.getElementById('startupRelief');
  if (startupRelief) {
    reliefElement.style.display = 'block';
  } else {
    reliefElement.style.display = 'none';
  }
}

function updateThresholdIndicator(turnover) {
  const indicator = document.getElementById('thresholdIndicator');
  const statusElement = indicator.querySelector('.status');
  
  if (turnover && parseFloat(turnover) >= 40) {
    statusElement.className = 'status status--warning';
    statusElement.textContent = 'Above ₹40 crore threshold - Full penalty exposure';
  } else {
    statusElement.className = 'status status--info';
    statusElement.textContent = 'Below ₹40 crore threshold - Startup relief applicable';
  }
}

function updateRiskAssessment(data) {
  const riskFill = document.getElementById('riskFill');
  const riskLabel = document.getElementById('riskLabel');
  const riskDescription = document.getElementById('riskDescription');

  let riskLevel = 0.3; // Base risk

  // Increase risk based on data volume
  if (data.dataVolume === '1+ crore') riskLevel += 0.4;
  else if (data.dataVolume === '10 lakh-1 crore') riskLevel += 0.3;
  else if (data.dataVolume === '1-10 lakh') riskLevel += 0.2;

  // Increase risk for high-risk business types
  if (data.businessType === 'Fintech') riskLevel += 0.3;
  else if (data.businessType === 'AI/ML') riskLevel += 0.25;
  else if (data.businessType === 'E-commerce') riskLevel += 0.2;

  // Reduce risk based on compliance level
  riskLevel -= costData.complianceLevelReductions[data.complianceLevel] * 0.5;

  // Increase risk for children's data
  if (data.childrenData) riskLevel += 0.3;

  // Cap at 1.0
  riskLevel = Math.min(riskLevel, 1.0);

  // Update UI
  riskFill.style.width = `${riskLevel * 100}%`;

  if (riskLevel < 0.4) {
    riskLabel.textContent = 'Low Risk';
    riskDescription.textContent = 'Good compliance foundation with manageable penalty exposure';
  } else if (riskLevel < 0.7) {
    riskLabel.textContent = 'Moderate Risk';
    riskDescription.textContent = 'Significant penalty exposure - prioritize compliance implementation';
  } else {
    riskLabel.textContent = 'High Risk';
    riskDescription.textContent = 'Maximum penalty exposure: ₹250 crores - immediate action required';
  }
}

function updateCostChart(totalCost, data) {
  const ctx = document.getElementById('costChart').getContext('2d');
  
  // Calculate breakdown
  const breakdown = {
    'Assessment & Gap Analysis': totalCost * 0.25,
    'Policy Development': totalCost * 0.20,
    'Technical Implementation': totalCost * 0.35,
    'Training & Documentation': totalCost * 0.15,
    'Testing & Audit': totalCost * 0.05
  };

  if (costChart) {
    costChart.destroy();
  }

  costChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(breakdown),
      datasets: [{
        data: Object.values(breakdown),
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
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = formatCurrency(context.parsed);
              const percentage = ((context.parsed / totalCost) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

function updateTimeline(data) {
  let months = timelineData.baseTimelines[data.companySize];
  
  // Add business-specific adjustments
  months += timelineData.businessAdjustments[data.businessType];
  
  // Add time for children's data
  if (data.childrenData) {
    months += Math.ceil(timelineData.childrenDataWeeks / 4);
  }

  // Reduce time based on compliance level
  if (data.complianceLevel === 'Advanced') months -= 2;
  else if (data.complianceLevel === 'Intermediate') months -= 1;

  const timelineText = months <= 6 ? `${months} months` : `${months} months`;
  document.getElementById('timelineDuration').textContent = timelineText;
}

function generateRoadmap() {
  const data = getFormData();
  const businessType = data.businessType;
  
  // Update roadmap header
  updateRoadmapHeader(data);
  
  // Generate roadmap content
  generateRoadmapPhases(data);
  
  // Generate special considerations
  generateConsiderations(data);
}

function updateRoadmapHeader(data) {
  const title = document.getElementById('roadmapTitle');
  const subtitle = document.getElementById('roadmapSubtitle');
  
  title.textContent = 'Your Personalized Implementation Action Plan';
  
  const sizeText = data.companySize === 'startup' ? 'startup' : 
                   data.companySize === 'medium' ? 'medium company' : 'large enterprise';
  subtitle.textContent = `Tailored specifically for ${data.businessType} ${sizeText}`;
}

function generateRoadmapPhases(data) {
  const content = document.getElementById('roadmapContent');
  const template = roadmapTemplates[data.businessType] || roadmapTemplates['Other'];
  
  content.innerHTML = '';
  
  Object.values(template).forEach((phase, index) => {
    const phaseElement = createPhaseElement(phase, index + 1);
    content.appendChild(phaseElement);
  });
}

function createPhaseElement(phase, phaseNumber) {
  const phaseDiv = document.createElement('div');
  phaseDiv.className = 'roadmap-phase';
  
  phaseDiv.innerHTML = `
    <div class="roadmap-phase__header">
      <h4 class="roadmap-phase__title">Month ${phaseNumber}: ${phase.title}</h4>
      <span class="roadmap-phase__weeks">Weeks ${phase.weeks}</span>
    </div>
    <ul class="roadmap-phase__tasks">
      ${phase.tasks.map(task => `<li class="roadmap-phase__task">${task}</li>`).join('')}
    </ul>
    <div class="roadmap-phase__deliverable">
      ${phase.deliverable}
    </div>
  `;
  
  return phaseDiv;
}

function generateConsiderations(data) {
  const considerationsDiv = document.getElementById('roadmapConsiderations');
  const considerations = [];
  
  // Startup relief consideration
  if (data.turnover < 40) {
    considerations.push('Leverage startup relief (₹40Cr threshold) for 30% cost reduction');
  } else {
    considerations.push('No startup relief eligibility (>₹40Cr turnover) - full penalty exposure');
  }
  
  // Business-specific considerations
  if (data.businessType === 'AI/ML') {
    considerations.push('Focus on AI governance intersection with DPDP requirements');
    considerations.push('Implement algorithmic accountability and bias detection systems');
  } else if (data.businessType === 'Fintech') {
    considerations.push('Coordinate with RBI regulations and existing financial compliance');
    considerations.push('Enhanced focus on transaction data and customer profiling safeguards');
  } else if (data.businessType === 'E-commerce') {
    considerations.push('Implement robust consent management for marketing and personalization');
    considerations.push('Coordinate with payment processors and vendor ecosystem');
  }
  
  // Children's data consideration
  if (data.childrenData) {
    considerations.push('Enhanced protections required for children\'s data processing (+₹10 lakh minimum cost)');
  }
  
  // Budget considerations
  const budgetRange = getBudgetRange(data);
  considerations.push(`Budget allocation: ${budgetRange}`);
  
  // Company size considerations
  if (data.companySize === 'large') {
    considerations.push('Dedicated compliance team required for enterprise implementation');
  }
  
  considerationsDiv.innerHTML = `
    <h4 class="considerations-title">Special Considerations</h4>
    <ul class="considerations-list">
      ${considerations.map(item => `<li class="considerations-item">${item}</li>`).join('')}
    </ul>
  `;
}

function getBudgetRange(data) {
  const baseCost = costData.baseCosts[data.companySize];
  let min = baseCost.min * costData.businessMultipliers[data.businessType];
  let max = baseCost.max * costData.businessMultipliers[data.businessType];
  
  if (data.childrenData) {
    min += costData.childrenDataCost;
    max += costData.childrenDataCost;
  }
  
  if (data.turnover < 40) {
    min *= (1 - costData.startupRelief);
    max *= (1 - costData.startupRelief);
  }
  
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
}

function handleLeadSubmission(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
  const company = formData.get('company') || e.target.querySelector('input[type="text"]').value;
  
  // Simulate form submission
  alert(`Thank you! Your personalized DPDP implementation checklist will be sent to ${email} within 24 hours.`);
  
  // Reset form
  e.target.reset();
}

function formatCurrency(amount) {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(1)} crore`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(1)} lakh`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}