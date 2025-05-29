print("Testing Python execution...")

# Simple data structures first
cost_data = {
    'AI/ML': {'startup': 2.8, 'medium': 7.0, 'large': 35.0},
    'Fintech': {'startup': 3.2, 'medium': 8.0, 'large': 40.0},
    'E-commerce': {'startup': 3.0, 'medium': 7.5, 'large': 37.5},
    'SaaS/Software': {'startup': 2.4, 'medium': 6.0, 'large': 30.0},
    'Climate-tech': {'startup': 2.6, 'medium': 6.5, 'large': 32.5},
    'Other': {'startup': 2.0, 'medium': 5.0, 'large': 25.0}
}

print("DPDP Compliance Cost Estimates (in ₹ lakh):")
print("Business Type\t\tStartup\t\tMedium\t\tLarge")
print("-" * 60)
for business_type, costs in cost_data.items():
    print(f"{business_type:<15}\t{costs['startup']:<10}\t{costs['medium']:<10}\t{costs['large']}")

print("\n\nTimeline Estimates (in months):")
timeline_data = {
    'AI/ML': {'startup': 6, 'medium': 8, 'large': 11},
    'Fintech': {'startup': 7, 'medium': 9, 'large': 12},
    'E-commerce': {'startup': 6, 'medium': 8, 'large': 11},
    'SaaS/Software': {'startup': 5, 'medium': 7, 'large': 10},
    'Climate-tech': {'startup': 6, 'medium': 8, 'large': 11},
    'Other': {'startup': 5, 'medium': 7, 'large': 10}
}

print("Business Type\t\tStartup\t\tMedium\t\tLarge")
print("-" * 60)
for business_type, timeline in timeline_data.items():
    print(f"{business_type:<15}\t{timeline['startup']:<10}\t{timeline['medium']:<10}\t{timeline['large']}")

print("\n\nKey Enhancement Features:")
enhancements = [
    "✓ Dynamic roadmap generation based on user inputs",
    "✓ Business-specific compliance requirements",
    "✓ Intelligent timeline adjustment (5-12 months vs static 6 months)",
    "✓ Startup relief calculation (30% cost reduction)",
    "✓ Children's data processing complexity (+₹10 lakh, +6 weeks)",
    "✓ Sector-specific premiums (AI +40%, Fintech +60%, E-commerce +50%)",
    "✓ Real-time risk assessment with penalty exposure",
    "✓ Personalized milestone tracking and deliverables"
]

for enhancement in enhancements:
    print(enhancement)