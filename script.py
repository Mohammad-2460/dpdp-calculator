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
    'Key Activities': [
        'Data mapping, Gap analysis, Legal foundation',
        'Privacy notices, Consent management, Data agreements',
        'Security safeguards, Technical systems, Data rights infrastructure',
        'Staff training, Documentation, Record keeping',
        'Compliance testing, Third-party audit, Certification'
    ],
    'Estimated Cost (₹ Lakhs)': [2, 4, 8, 3, 4],
    'Critical Success Factors': [
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
total_cost = timeline_df['Estimated Cost (₹ Lakhs)'].sum()
print(f"\nTotal Estimated Implementation Cost: ₹{total_cost} lakhs")
print("Note: Costs vary significantly based on company size, business type, and complexity")