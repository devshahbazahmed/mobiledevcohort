SafeDrive – Driver Distraction & Harsh Driving Detection System
Mobile Development Cohort

React Native

Instructions
Build a mobile application that uses device sensors to analyze driving behavior and generate a driving safety score.

The goal of this assignment is to understand how mobile sensors can be used to detect real-world events such as harsh braking, sharp turns, excessive phone movement, and phone usage while driving. Similar concepts are used in insurance telematics, fleet management, and driver safety systems.

Your app should include:

Start Drive and End Drive functionality

Sensor data collection during a driving session

Accelerometer integration

Gyroscope integration

Device Motion integration

Magnetometer integration (optional)

Real-time event detection

Driving score calculation

Driving session summary

Dashboard showing detected events and score

The application should detect:

Harsh Braking

Harsh Acceleration

Sharp Turns

Aggressive Steering Movements

Excessive Device Movement

Possible Phone Handling During Driving

You should define reasonable thresholds for event detection and clearly document them.

The driving score should:

Start at 100

Deduct points based on detected events

Display a final score and safety rating at the end of the drive

Example:

Harsh Brake → -5

Harsh Acceleration → -5

Sharp Turn → -3

Phone Handling → -10

Your dashboard should display:

Drive Duration

Total Events

Event Breakdown

Driving Score

Safety Rating

Stretch goals:

Route Replay

Event Timeline

Event Heatmap

AI-generated driving feedback

Historical drive comparison

Focus on:

sensor handling

event detection logic

performance

battery efficiency

data visualization

clean code structure

Submission Instructions
Your submission must include:

Public GitHub repository link

Demo video link

README file

The demo video should show:

Starting a driving session

Sensor readings being captured

Event detection working

Score calculation

Dashboard and analytics

Explanation of thresholds used

Code walkthrough of sensor handling logic

README should include:

Project overview

Tech stack used

Sensors used

Event detection strategy

Threshold values chosen

Driving score calculation logic

How to run locally

Assumptions made

Screenshots if possible

Evaluation Parameters
1. Sensor Integration (20 Marks)
Accelerometer integrated correctly

Gyroscope integrated correctly

Device Motion handled correctly

Sensor lifecycle managed properly

Sensor permissions handled correctly

2. Event Detection Logic (20 Marks)
Harsh braking detection works

Harsh acceleration detection works

Sharp turn detection works

Phone movement detection works

Threshold logic is reasonable and documented

3. Driving Score System (15 Marks)
Score calculation is implemented correctly

Penalties are applied consistently

Final safety rating is meaningful

Score updates reflect detected events

4. Dashboard and Analytics (15 Marks)
Drive statistics are displayed clearly

Event counts are visible

Session summary is useful

Data presentation is understandable

5. Real-Time Processing (10 Marks)
Events are processed while driving

UI updates correctly

No obvious lag or blocking issues

Sensor data is handled efficiently

6. Mobile Performance (10 Marks)
App remains responsive

Battery usage considerations are visible

Unnecessary re-renders are avoided

Sensor subscriptions are cleaned up properly

7. Code Quality (10 Marks)
Project structure is clean

Logic is organized properly

Naming conventions are good

Error handling exists

8. README and Documentation (10 Marks)
README is complete

Detection strategy is explained

Setup steps work

Assumptions are documented

9. Demo Video (10 Marks)
Features are demonstrated properly

Detection flow is explained

Score calculation is shown

Student explains implementation clearly

10. Overall Understanding (10 Marks)
Student understands sensor-based systems

Event detection choices are explainable

Implementation reflects concepts taught in class

Project feels thoughtful and practical
