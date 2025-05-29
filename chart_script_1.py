import plotly.graph_objects as go
import plotly.io as pio
import json

# Data provided
data = [
  {"Business_Type": "AI/ML", "Startup": 6, "Medium": 8, "Large": 11},
  {"Business_Type": "Fintech", "Startup": 7, "Medium": 9, "Large": 12},
  {"Business_Type": "E-commerce", "Startup": 6, "Medium": 8, "Large": 11},
  {"Business_Type": "SaaS/Software", "Startup": 5, "Medium": 7, "Large": 10},
  {"Business_Type": "Climate-tech", "Startup": 6, "Medium": 8, "Large": 11},
  {"Business_Type": "Other", "Startup": 5, "Medium": 7, "Large": 10}
]

# Extract data for plotting
business_types = [item["Business_Type"] for item in data]
startup_values = [item["Startup"] for item in data]
medium_values = [item["Medium"] for item in data]
large_values = [item["Large"] for item in data]

# Create the grouped bar chart
fig = go.Figure()

# Add bars for each company size with specified colors
fig.add_trace(go.Bar(
    name='Startup',
    x=business_types,
    y=startup_values,
    marker_color='#1FB8CD',  # Light blue
    text=startup_values,
    textposition='outside'
))

fig.add_trace(go.Bar(
    name='Medium',
    x=business_types,
    y=medium_values,
    marker_color='#5D878F',  # Teal
    text=medium_values,
    textposition='outside'
))

fig.add_trace(go.Bar(
    name='Large',
    x=business_types,
    y=large_values,
    marker_color='#13343B',  # Dark blue
    text=large_values,
    textposition='outside'
))

# Update layout with title under 40 characters and axis labels under 15 characters
fig.update_layout(
    title='DPDP Timeline by Biz Type & Size',  # Under 40 characters
    xaxis_title='Business Type',  # Under 15 characters
    yaxis_title='Months',  # Under 15 characters
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.01, xanchor='center', x=0.5)  # Centered legend under title
)

# Update y-axis to show integer values
fig.update_yaxes(dtick=1)

# Save the chart
fig.write_image("dpdp_timeline_chart.png")