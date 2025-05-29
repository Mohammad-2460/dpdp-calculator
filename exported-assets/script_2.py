import pandas as pd

# Create DPDP implementation timeline
phases = ['Assessment & Gap Analysis', 'Policy Development', 'Technical Implementation', 'Training & Documentation', 'Testing & Audit']
months = ['Month 1', 'Month 2-3', 'Month 4-5', 'Month 5-6', 'Month 6']
costs = [2, 4, 8, 3, 4]

df = pd.DataFrame({
    'Phase': phases,
    'Timeline': months,
    'Cost_Lakhs': costs
})

print("DPDP Implementation Timeline & Costs:")
print(df)

total_cost = sum(costs)
print(f"\nTotal Implementation Cost: ₹{total_cost} lakhs")

# Save to CSV
df.to_csv('dpdp_timeline.csv', index=False)
print("Timeline saved to dpdp_timeline.csv")

# Show penalty structure
penalties = {
    'Violation_Type': ['Data breach without notification', 'Processing without consent', 'Children data violations', 'Cross-border transfer violations'],
    'Maximum_Penalty_Crores': [250, 50, 200, 150]
}

penalty_df = pd.DataFrame(penalties)
print("\n\nDPDP Penalty Structure:")
print(penalty_df)

penalty_df.to_csv('dpdp_penalties.csv', index=False)
print("Penalty structure saved to dpdp_penalties.csv")