
# Gmail to Google Chat: Real-Time Email Notifications via Webhook

![GitHub stars](https://img.shields.io/github/stars/charithjayasanka/Gmail2GoogleChat?style=social)
![GitHub forks](https://img.shields.io/github/forks/charithjayasanka/Gmail2GoogleChat?style=social)
![GitHub issues](https://img.shields.io/github/issues/charithjayasanka/Gmail2GoogleChat)
![GitHub license](https://img.shields.io/github/license/charithjayasanka/Gmail2GoogleChat)
![GitHub pull requests](https://img.shields.io/github/issues-pr/charithjayasanka/Gmail2GoogleChat)
![GitHub last commit](https://img.shields.io/github/last-commit/charithjayasanka/Gmail2GoogleChat)

## Table of Contents

- [Problem](#problem)
- [The Solution](#the-solution)
- [Features](#features)
- [How It Works](#how-it-works)
- [Setup Instructions](#setup-instructions)
- [Example Use Case](#example-use-case)
- [Important Notes](#important-notes)
- [Contributing](#contributing)
- [License](#license)

---

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

1. **Checking Weekdays and Time**: The script only runs during weekdays and business hours (8 AM - 6 PM) to prevent unnecessary notifications outside of working hours.

```javascript
var now = new Date();
var currentHour = now.getHours();
var currentDay = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

if (currentDay >= 1 && currentDay <= 5 && currentHour >= 8 && currentHour <= 18) {
  // Continue processing emails
} else {
  Logger.log("It's either not a weekday or not between 8 AM and 6 PM. Skipping email processing.");
}
```

2. **Filtering Emails Using Gmail Labels**: The script searches for unread emails under the specified Gmail label and excludes those already processed.

```javascript
var label = 'generic-label'; // Replace this with your Gmail label
var searchQuery = `label:${label} is:unread -label:sentToChat`;
var threads = GmailApp.search(searchQuery);
```

3. **Processing and Sending Notifications to Google Chat**: The script sends a message with the subject and snippet of the email to the configured Google Chat room using a webhook.

```javascript
var emailSubject = message.getSubject();
var emailSnippet = message.getPlainBody().substring(0, 500); // First 500 characters of the email body
var chatMessage = {
  text: `📧 **New Email Alert**:
*Subject*: ${emailSubject}
*Snippet*: ${emailSnippet}`
};

var options = {
  method: 'post',
  contentType: 'application/json',
  payload: JSON.stringify(chatMessage)
};

UrlFetchApp.fetch(webhookUrl, options);
```

4. **Marking Emails as Processed**: Once an email has been sent to Google Chat, it is marked with the `sentToChat` label to avoid reprocessing.

```javascript
thread.addLabel(sentToChatLabel);
```

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

## Contributing:

Contributions are welcome! If you'd like to contribute to this project, you can do so in the following ways:

1. **Fork the Repository**: Click on the "Fork" button at the top-right corner of the repository page to create your own copy. You can clone your fork locally, make your changes, and submit a pull request (PR) to propose your improvements.

2. **Raise an Issue**: If you encounter any bugs, have suggestions, or would like to request a new feature, please raise an issue by navigating to the "Issues" tab and clicking "New Issue." Provide a detailed description so we can help address it quickly.

3. **Pull Requests**: To submit a PR:
    - Fork this repository.
    - Create a branch in your fork with a descriptive name for the feature you're adding (e.g., `add-feature-x`).
    - Make your changes and commit them with a meaningful message.
    - Push the changes to your forked repository and open a PR against this repository's `main` branch.

We appreciate your contributions to improve the functionality of this script!

---

## License:

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
