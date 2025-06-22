function sendUpcomingCalendarPreview() {
  const calendar = CalendarApp.getDefaultCalendar();
  const now = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);

  const events = calendar.getEvents(now, nextWeek);

  let preview = "Weekly Calendar Preview\n\n";
  if (events.length === 0) {
    preview += "No events scheduled in the next 7 days.";
  } else {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (const event of events) {
      const title = event.getTitle();
      const startTime = event.getStartTime();
      const endTime = event.getEndTime();
      const duration = Math.round((endTime - startTime) / (1000 * 60));
      const dayName = days[startTime.getDay()];
      const timeString = Utilities.formatDate(startTime, Session.getScriptTimeZone(), "hh:mm a");

      preview += `• ${dayName} – ${timeString} → ${title} (${duration} min)\n`;
    }
  }

  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: "Weekly Calendar Preview",
    body: preview,
  });
}
