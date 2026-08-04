Streaks Habit Tracker with Notifications
Mobile Development Cohort

React Native

Instructions
Build a mobile habit tracker app where users can create habits such as Drink Water, Code 1 Hour, Read, or Workout.

Each habit should be able to schedule local reminders on the user’s device. Along with this, the app should also support push notifications from a server for streak nudges, announcements, or habit reminders.

The main goal of this project is to prove that you understand:

when to use local notifications

when to use push notifications

how permissions affect notification behavior

how notification tap handling works

how deep linking works from both local and push notifications

how to persist scheduled notification IDs

how to cancel and reschedule notifications correctly

Before starting, read the Expo Notifications documentation carefully:

https://docs.expo.dev/versions/v55.0.0/sdk/notifications/

Important rules:

Push notifications do not work in Expo Go.

You must create a development build using EAS for push notification testing.

Notification logic should be reactive to permissions.

If permission is denied, the app should not crash.

Show a proper denied-permission state with an option to open system settings.

Keep notification side effects out of components.

Put notification-related logic inside src/lib/notifications/.

Expose notification behavior through hooks.

Reuse the existing project structure.

The repo already has setup.ts, push.ts, and the Push tab. Reuse them instead of rewriting everything.

Core Requirements
Your app must allow users to create and manage habits.

Each habit should include:

habit name

emoji or icon

reminder time

frequency

streak count

last completed date

scheduled notification IDs

The frequency should support:

daily reminders

weekly reminders on selected weekdays

When a habit is saved:

local reminders should be scheduled

returned notification IDs should be stored

habits and notification IDs should survive app kill or restart using AsyncStorage or SQLite

When a habit is edited:

old scheduled notifications should be cancelled

new reminders should be scheduled

new notification IDs should be stored

When a habit is deleted:

only that habit’s notifications should be cancelled

do not cancel all scheduled notifications

The app should also support marking a habit as done for the day.

Streak logic should work like this:

completing the habit for today should increase or maintain the streak

missing a day should reset the streak

the current streak should be visible to the user

Local notification reminders should deep link to the habit detail screen when tapped.

Use notification data payload for this.

Example data contract:

data: {
  screen: '/habit',
  habitId: habit.id
}
This same deep-link handling should work for both:

local notifications

push notifications

You must use a foreground notification handler so reminders are visible even when the app is open.

On Android, create a custom high-importance notification channel for reminders. In your writeup, explain why the Android channel must exist before requesting notification permission.

Push Notification Requirements
Push notification support must be tested using a development build.

Your app should:

register for push notifications

display the Expo Push Token

allow the user to copy the Expo Push Token

support receiving a push notification from expo.dev/notifications, cURL, or a small Node script

support a push notification whose data payload deep links to a habit detail screen

reuse the same notification tap handler used for local notifications

demonstrate push behavior when the app is open

demonstrate push behavior when the app is closed or in background

You should clearly explain the difference between foreground and background push notification behavior.

Push sending should not be hardcoded directly inside the app. Sending push notifications is a server-side responsibility.

Suggested Architecture
You can adapt the structure, but try to keep the project clean.

src/
  app/
    index.tsx
    habit/[id].tsx
    new.tsx
    settings.tsx

  lib/
    habits/
      storage.ts
      types.ts

    notifications/
      setup.ts
      schedule.ts
      push.ts

  hooks/
    use-habits.ts
    use-push-notifications.ts
Expected file responsibilities:

index.tsx

today’s habits list

done buttons

streak display

habit/[id].tsx

habit detail screen

deep-link target for local and push notifications

new.tsx

create and edit habit form
settings.tsx

permission status

push token display

copy token button

quiet hours if implemented

storage.ts

habit CRUD

persistence using AsyncStorage or SQLite

types.ts

Habit and Frequency types
setup.ts

notification handler

Android channel

permission helper

schedule.ts

schedule habit reminders

cancel habit reminders

reschedule on edit

push.ts

push registration

token handling

Data Model Hint
You can use this model or improve it based on your implementation.

type Frequency =
  | { kind: 'daily'; hour: number; minute: number }
  | { kind: 'weekly'; weekdays: number[]; hour: number; minute: number };

type Habit = {
  id: string;
  name: string;
  emoji: string;
  frequency: Frequency;
  notificationIds: string[];
  streak: number;
  lastCompletedISO: string | null;
};
The notification payload should carry enough data to open the correct habit.

Example:

content: {
  title: 'Time to drink water 💧',
  body: 'Tap to log it.',
  data: {
    screen: '/habit',
    habitId: habit.id
  }
}
Stretch Goals
These are optional, but can improve your score.

You can implement:

Snooze action

iOS action buttons such as Done and Snooze 10 min

App badge showing today’s pending habits

Image push notification

Tiny Node push server using expo-server-sdk

Push receipts handling

Dropping invalid tokens when DeviceNotRegistered is received

Quiet hours or do-not-disturb window

Daily summary push

Habit analytics

Calendar-style streak view

Submission Instructions
Public GitHub repository link

Demo video link

Short writeup about your work

Screenshots (or) Screen recording evidence

Development build APK/link (optional, if available)

Evaluation Parameters
1. Habit CRUD and Persistence (15 Marks)
User can create habits

User can edit habits

User can delete habits

Habit data persists after app restart

Scheduled notification IDs are stored correctly

2. Local Notification Scheduling (15 Marks)
Reminders are scheduled when a habit is saved

Daily reminders work

Weekly reminders work

Editing a habit cancels old notification IDs and schedules new ones

Deleting a habit cancels only that habit’s reminders

3. Streak Logic (10 Marks)
User can mark a habit as done

Streak increases correctly

Missing a day resets the streak

Last completed date is handled properly

Streak is visible in the UI

4. Deep Linking from Notifications (15 Marks)
Local notification tap opens the correct habit detail screen

Push notification tap opens the correct habit detail screen

Same handler is reused for local and push notification taps

Data payload is used correctly

Invalid or missing habit data is handled gracefully

5. Permission Flow and Foreground Handling (10 Marks)
Notification permission is requested properly

Denied permission state is handled

App does not crash if permission is denied

User can open system settings from the denied state

Foreground notification handler is implemented

6. Android Notification Channel (5 Marks)
Custom high-importance Android channel is created

Channel is used for reminders

Student explains why the channel must exist before permission request

Android behavior is handled thoughtfully

7. Push Notification Implementation (15 Marks)
App registers for push notifications

Expo Push Token is shown

Token can be copied

Real push notification is sent and received

Push notification includes data for deep linking

Foreground and background behavior is demonstrated

8. Code Quality and Architecture (10 Marks)
Notification side effects are not kept inside UI components

Logic is organized inside src/lib/notifications/

Hooks are used cleanly

Habit storage logic is separated

App handles errors and denied permissions properly

9. Writeup and Conceptual Understanding (15 Marks)
Local vs push notification difference is explained

Push ticket vs receipt is explained

DeviceNotRegistered is explained correctly

Expo Go limitation is explained

Android channel behavior is explained

Answers are clear and connected to the app

10. Demo and Submission Quality (10 Marks)
Demo video or evidence is clear

Required flows are shown

GitHub repo is public and organized

README is complete

Submission links are valid
