export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Leado",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Leado helps small sales teams track leads, set follow-up reminders, and close more deals without spreadsheets.",
    offers: {
      "@type": "Offer",
      price: "599",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
    },
    url: "https://leadoapp.vercel.app",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
