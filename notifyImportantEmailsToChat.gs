/**
 * Function to check new filtered emails in Gmail and send real-time notifications to Google Chat.
 *
 * This script is designed to scan the Gmail inbox for unread emails under a specific label,
 * and then send those emails as notifications to a specified Google Chat room using a webhook.
 *
 * The script runs only on weekdays and during office hours (8 AM - 6 PM),
 * ensuring that you don't get notifications outside working hours.
 *
 * How it helps:
 * - Ideal for those who receive a high volume of corporate emails and only need to be notified about relevant emails.
 * - Automatically notifies important emails in real-time without overwhelming you with constant notifications.
 */

function notifyImportantEmailsToChat() {
  // Get the current date and time to determine if it's a weekday and within working hours
  var now = new Date();
  var currentHour = now.getHours();
  var currentDay = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

  // Check if the current day is a weekday (Monday to Friday) and the current time is between 8 AM and 6 PM
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 8 && currentHour <= 18) {

    // The Gmail label to search for (you can change this to any custom Gmail label that you use for filtering important emails)
    var label = 'generic-label';  // Replace with your actual label name
    // The search query will look for unread emails with the specific label and exclude those already processed ('sentToChat')
    var searchQuery = `label:${label} is:unread -label:sentToChat`;

    // Perform the search based on the query
    var threads = GmailApp.search(searchQuery);

    // Limit the processing to the latest 10 email threads for performance
    var latestThreads = threads.slice(0, 10);

    // Check if there are any threads that match the search criteria
    if (latestThreads.length > 0) {
      // Webhook URL for the Google Chat room where notifications will be sent
      // IMPORTANT: Replace this with your actual webhook URL for Google Chat
      var webhookUrl = 'YOUR_WEBHOOK_URL';

      // Label that will be applied to emails after they've been processed and sent to Chat
      var sentToChatLabel = GmailApp.getUserLabelByName('sentToChat');
      if (!sentToChatLabel) {
        // If the label doesn't exist, create it
        sentToChatLabel = GmailApp.createLabel('sentToChat');
      }

      // Process each email thread (conversation)
      latestThreads.forEach(function(thread) {
        var messages = thread.getMessages();

        // Process each individual message in the thread
        messages.forEach(function(message) {
          // If the message has already been read, skip it
          if (!message.isUnread()) {
            return;
          }

          // Get the email subject and a snippet of the body (first 500 characters)
          var emailSubject = message.getSubject();
          var emailSnippet = message.getPlainBody().substring(0, 500); // Only get the first 500 characters of the email body

          // Create the message that will be sent to Google Chat
          var chatMessage = {
            text: `📧 **New Email Alert**:\n*Subject*: ${emailSubject}\n*Snippet*: ${emailSnippet}`
          };

          // Send the message to Google Chat via the webhook
          var options = {
            method: 'post',
            contentType: 'application/json',
            payload: JSON.stringify(chatMessage)
          };

          // Trigger the URL fetch (sending the message to Google Chat)
          UrlFetchApp.fetch(webhookUrl, options);
        });

        // After processing the thread, add the 'sentToChat' label to avoid reprocessing the same emails
        thread.addLabel(sentToChatLabel);
      });
    }
  } else {
    // If it's outside working hours or on a weekend, log that no processing was done
    Logger.log("It's either not a weekday or not between 8 AM and 6 PM. Skipping email processing.");
  }
}
