import pandas as pd

# Create timeline data for DPDP implementation
timeline_data = {
    'Phase': [
        'Phase 1: Assessment & Gap Analysis',
        'Phase 2: Policy Development', 
        'Phase 3: Technical Implementation',
        'Phase 4: Training & Documentation',
        'Phase 5: Testing & Audit'
    ],
    'Duration': ['Month 1', 'Month 2-3', 'Month 4-5', 'Month 5-6', 'Month 6'],
    'Key_Activities': [
        'Data mapping, Gap analysis, Legal foundation',
        'Privacy notices, Consent management, Data agreements',
        'Security safeguards, Technical systems, Data rights infrastructure',
        'Staff training, Documentation, Record keeping',
        'Compliance testing, Third-party audit, Certification'
    ],
    'Estimated_Cost_Lakhs': [2, 4, 8, 3, 4],
    'Critical_Success_Factors': [
        'Complete data inventory and compliance gap identification',
        'DPDP-compliant policies and consent mechanisms',
        'Robust technical safeguards and data subject rights systems',
        'Comprehensive staff training and documentation',
        'Validated compliance through independent audit'
    ]
}

timeline_df = pd.DataFrame(timeline_data)
print("DPDP Implementation Timeline:")
print("="*50)
print(timeline_df.to_string(index=False))

# Save as CSV
timeline_df.to_csv('dpdp_implementation_timeline.csv', index=False)
print("\n\nTimeline data saved as CSV file for easy reference.")

# Calculate total estimated costs
total_cost = timeline_df['Estimated_Cost_Lakhs'].sum()
print(f"\nTotal Estimated Implementation Cost: ₹{total_cost} lakhs")
print("Note: Costs vary significantly based on company size, business type, and complexity")

# Create cost breakdown by business type
business_costs = {
    'Business_Type': ['AI/ML Startup', 'Climate-tech', 'E-commerce', 'SaaS/Software', 'Fintech', 'Other'],
    'Base_Cost_Lakhs': [5, 5, 5, 5, 5, 5],
    'Multiplier': [1.4, 1.3, 1.5, 1.35, 1.6, 1.0],
    'Final_Cost_Lakhs': [7.0, 6.5, 7.5, 6.75, 8.0, 5.0],
    'Startup_Relief_Cost_Lakhs': [4.9, 4.55, 5.25, 4.73, 5.6, 3.5]
}

cost_df = pd.DataFrame(business_costs)
print("\n\nDPDP Compliance Costs by Business Type:")
print("="*50)
print(cost_df.to_string(index=False))

cost_df.to_csv('dpdp_costs_by_business_type.csv', index=False)
print("\n\nCost breakdown saved as CSV file.")