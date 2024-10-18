
# Gmail to Google Chat: Real-Time Email Notifications via Webhook

## Problem:

In a fast-paced corporate environment, it's easy to miss critical emails amidst the flood of daily messages. You may have already set up filters to capture important emails, but enabling notifications for every message isn't feasible — the noise would be overwhelming. As a result, important emails often slip through the cracks.

### The Solution:

This script provides a seamless way to integrate Gmail and Google Chat to ensure you never miss an important email again. It automatically scans your inbox for new, unread messages in a specific Gmail label and sends notifications for them to a Google Chat room via a webhook.

---

## Features:

- **Targeted Notifications**: The script notifies you only for emails filtered under your specified Gmail label.
- **Automated Processing**: It automatically checks your inbox, processes unread emails, and sends them to Google Chat.
- **Real-Time Alerts**: Receive email notifications in Google Chat as soon as they arrive, making sure you're always in the loop for important communications.
- **Working Hours Control**: Notifications are sent only during weekdays (Monday to Friday) and between 8 AM and 6 PM, ensuring you’re not disturbed outside of work hours.
- **Customizable**: You can easily adjust the Gmail label, webhook URL, and other parameters to fit your needs.

---

## How It Works:

1. **Gmail Label**: The script filters emails based on a Gmail label that you specify. This allows you to notify only on the emails that matter to you, rather than the entire inbox.

2. **Webhook**: Emails are sent to a Google Chat room using a webhook. You can configure the Google Chat room to receive instant alerts for emails that meet your filter criteria.

3. **Working Hours**: The script runs only during weekdays and business hours, ensuring that you're only alerted when you're at work.

4. **Automatic Labeling**: After processing an email, the script adds a custom label (`sentToChat`) to the email to ensure the same email is not processed and sent to Google Chat multiple times.

---

## Setup Instructions:

### 1. Copy the Script to Google Apps Script:
- Go to [Google Apps Script](https://script.google.com/).
- Create a new project and copy the script from this repository into the project.
- To follow the official documentation on Apps Script, visit [Google Apps Script Documentation](https://developers.google.com/apps-script).

### 2. Create Your Gmail Label:
- Follow the official Gmail support documentation to create a Gmail label: [Create a Gmail Label](https://support.google.com/mail/answer/118708?hl=en&co=GENIE.Platform%3DDesktop).
- Use this label in the script to filter important emails.

### 3. Create Your Google Chat Webhook:
- Follow the official Google Chat documentation to create a webhook in your Google Chat room: [Create a Webhook](https://developers.google.com/workspace/chat/quickstart/webhooks#create_a_webhook).
- After creating the webhook, copy the URL provided.
- Replace `YOUR_WEBHOOK_URL` in the script with the webhook URL you generated.

### 4. Configure Gmail Label:
- Update the script to use your preferred Gmail label for filtering important emails. Replace `'generic-label'` in the script with the actual label name you're using.

### 5. Set Up a Time-Driven Trigger:
- In Google Apps Script, click on the clock icon (Triggers) in the left sidebar.
- Click on **"Add Trigger"** and configure:
  - **Choose which function to run:** Select the function (e.g., `sendFilteredEmailsToGoogleChat`).
  - **Select event source:** Choose **"Time-driven"**.
  - **Type of time-based trigger:** Set the interval (e.g., every 10 minutes, hourly) based on your preference.

The script will now automatically check for new emails at your defined intervals and send real-time notifications to Google Chat.

---

## Example Use Case:

- You're a corporate professional receiving tons of emails daily, but only a select few are mission-critical.
- You’ve created a Gmail filter to capture these important emails, but you can't enable notifications for all.
- This script allows you to stay on top of key communications in real-time via Google Chat, without being drowned in email alerts.

---

## Important Notes:
- Keep your webhook URL secure and avoid exposing it in public repositories.
- The script processes up to 10 email threads at a time to ensure efficiency.
- Processed emails are labeled with `sentToChat` to avoid duplicates.

---

## License:

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
