import pandas as pd
import json

# Create data for cost comparison chart
cost_data = {
    'Business Type': ['AI/ML', 'Fintech', 'E-commerce', 'SaaS/Software', 'Climate-tech', 'Other'],
    'Startup (₹ lakh)': [2.8, 3.2, 3.0, 2.4, 2.6, 2.0],
    'Medium (₹ lakh)': [7.0, 8.0, 7.5, 6.0, 6.5, 5.0],
    'Large (₹ lakh)': [35.0, 40.0, 37.5, 30.0, 32.5, 25.0]
}

df = pd.DataFrame(cost_data)
print("DPDP Compliance Cost Comparison by Business Type and Company Size:")
print(df.to_string(index=False))

# Create timeline comparison data
timeline_data = {
    'Business Type': ['AI/ML', 'Fintech', 'E-commerce', 'SaaS/Software', 'Climate-tech', 'Other'],
    'Startup (months)': [6, 7, 6, 5, 6, 5],
    'Medium (months)': [8, 9, 8, 7, 8, 7],
    'Large (months)': [11, 12, 11, 10, 11, 10]
}

timeline_df = pd.DataFrame(timeline_data)
print("\n\nDPDP Implementation Timeline by Business Type and Company Size:")
print(timeline_df.to_string(index=False))

# Export data for chart creation
df.to_csv('dpdp_cost_comparison.csv', index=False)
timeline_df.to_csv('dpdp_timeline_comparison.csv', index=False)

# Create feature comparison of old vs new calculator
feature_comparison = {
    'Feature': [
        'Implementation Roadmap',
        'Cost Calculation',
        'Timeline Estimation',
        'Business-Specific Requirements',
        'Company Size Considerations',
        'Startup Relief Integration',
        'Children\'s Data Compliance',
        'Risk Assessment',
        'Sector Premiums',
        'Personalized Milestones',
        'Dynamic Content Generation',
        'Lead Generation Integration'
    ],
    'Old Calculator': [
        'Static 6-month timeline for all users',
        'Basic cost estimation',
        'Fixed timeline regardless of inputs',
        'Generic requirements',
        'Limited consideration',
        'Not included',
        'Basic mention only',
        'Static risk information',
        'Not factored in',
        'None',
        'No',
        'Yes'
    ],
    'Enhanced Calculator': [
        'Dynamic, personalized roadmaps',
        'Sophisticated multi-factor calculation',
        'Intelligent timeline adjustment',
        'Sector-specific compliance requirements',
        'Detailed size-based adjustments',
        'Automatic 30% cost reduction calculation',
        'Comprehensive children\'s data framework',
        'Real-time risk assessment meter',
        'AI +40%, Fintech +60%, E-commerce +50%',
        'Business-specific deliverables',
        'Yes - JavaScript-powered',
        'Enhanced with personalized checklists'
    ]
}

feature_df = pd.DataFrame(feature_comparison)
print("\n\nFeature Comparison: Old vs Enhanced Calculator:")
print(feature_df.to_string(index=False))

feature_df.to_csv('calculator_feature_comparison.csv', index=False)