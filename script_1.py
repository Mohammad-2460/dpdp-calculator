import pandas as pd

# Create data for cost comparison chart
cost_data = {
    'Business_Type': ['AI/ML', 'Fintech', 'E-commerce', 'SaaS/Software', 'Climate-tech', 'Other'],
    'Startup_Cost_Lakh': [2.8, 3.2, 3.0, 2.4, 2.6, 2.0],
    'Medium_Cost_Lakh': [7.0, 8.0, 7.5, 6.0, 6.5, 5.0],
    'Large_Cost_Lakh': [35.0, 40.0, 37.5, 30.0, 32.5, 25.0]
}

df = pd.DataFrame(cost_data)
print("DPDP Compliance Cost Comparison by Business Type and Company Size:")
print(df)

# Create timeline comparison data
timeline_data = {
    'Business_Type': ['AI/ML', 'Fintech', 'E-commerce', 'SaaS/Software', 'Climate-tech', 'Other'],
    'Startup_Months': [6, 7, 6, 5, 6, 5],
    'Medium_Months': [8, 9, 8, 7, 8, 7],
    'Large_Months': [11, 12, 11, 10, 11, 10]
}

timeline_df = pd.DataFrame(timeline_data)
print("\n\nDPDP Implementation Timeline by Business Type and Company Size:")
print(timeline_df)