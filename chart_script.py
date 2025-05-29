import plotly.graph_objects as go
import pandas as pd

# Load the data
data_json = [
  {"Business_Type": "AI/ML", "Startup": 2.8, "Medium": 7.0, "Large": 35.0},
  {"Business_Type": "Fintech", "Startup": 3.2, "Medium": 8.0, "Large": 40.0},
  {"Business_Type": "E-commerce", "Startup": 3.0, "Medium": 7.5, "Large": 37.5},
  {"Business_Type": "SaaS/Software", "Startup": 2.4, "Medium": 6.0, "Large": 30.0},
  {"Business_Type": "Climate-tech", "Startup": 2.6, "Medium": 6.5, "Large": 32.5},
  {"Business_Type": "Other", "Startup": 2.0, "Medium": 5.0, "Large": 25.0}
]

# Convert to DataFrame
df = pd.DataFrame(data_json)

# Define distinct colors from the approved palette (blues and greens)
colors = ['#1FB8CD', '#5D878F', '#13343B']  # Light blue, medium teal, dark teal

# Create the grouped bar chart
fig = go.Figure()

# Add bars for each company size
company_sizes = ['Startup', 'Medium', 'Large']
business_types = df['Business_Type'].tolist()

for i, size in enumerate(company_sizes):
    values = df[size].tolist()
    fig.add_trace(go.Bar(
        name=size,
        x=business_types,
        y=values,
        marker_color=colors[i],
        text=[f'₹{v} lakh' for v in values],
        textposition='outside',
        textfont=dict(size=11)
    ))

# Update layout
fig.update_layout(
    title='DPDP Costs by Business Type & Size',  # Under 40 characters
    xaxis_title='Business Type',  # Under 15 characters
    yaxis_title='Cost (₹ lakh)',  # Under 15 characters
    barmode='group',
    legend=dict(
        orientation='h', 
        yanchor='bottom', 
        y=1.01, 
        xanchor='center', 
        x=0.5
    ),
    template="perplexity"
)

# Update y-axis with better formatting
fig.update_yaxes(
    title='Cost (₹ lakh)',
    dtick=5,  # Show ticks every 5 units
    range=[0, 42],  # Set appropriate range
    tickformat='.0f'
)

fig.update_xaxes(title='Business Type')

# Save the chart
fig.write_image('dpdp_compliance_costs.png')