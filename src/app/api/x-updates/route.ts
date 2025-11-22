// Cron email (Resend free)
if (req.headers.get('x-vercel-cron')) {  // Only on cron run
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'updates@dontpanic.guide',
    to: 'robert.berer@icloud.com',
    subject: 'Daily SpaceX X Digest',
    html: `<p>New posts: ${latestPosts.length}<br>${latestPosts.map(p => `<b>${p.date}</b>: ${p.content.slice(0, 100)}...`).join('<br>')}</p>`
  });
}