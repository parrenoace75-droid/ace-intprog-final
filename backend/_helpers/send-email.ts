export default async function sendEmail({ to, subject, html }: any) {
    console.log('Sending email to:', to);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY!,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            sender: { email: 'lapisranzjunnel@gmail.com', name: 'INTPROG System' },
            to: [{ email: to }],
            subject,
            htmlContent: html
        })
    });

    const data: any = await response.json();

    if (!response.ok) {
        console.error('Email error:', data);
        throw new Error(data.message || 'Email sending failed');
    }

    console.log('Email sent successfully:', data.messageId);
}