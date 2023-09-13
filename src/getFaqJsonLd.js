const ID = "faq";

// Retrieve the target ID, and based on the values of 'dt' and 'dd', 
// return the JSON for generating JSON-LD.
const getFaqJson = (id) => {
  const targetElement = document.getElementById(id);
  const dtElements = targetElement.querySelectorAll("dt");
  const ddElements = targetElement.querySelectorAll("dd");

  const jsonData = { "faqlist": [] };

  for (let i = 0; i < dtElements.length; i++) {
    const question = dtElements[i].textContent;
    const answer = ddElements[i].textContent;

    const faqItem = {
      [`faq${i + 1}`]: {
        "q": question,
        "a": answer
      }
    };

    jsonData.faqlist.push(faqItem);
  }

  return jsonData;
}

// Convert JSON to JSON-LD format
const getJsonLd = (jsonData) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": jsonData.faqlist.map((faqItem, index) => {
      const faqKey = `faq${index + 1}`;
      const faq = faqItem[faqKey];
      return {
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      };
    })
  };
};

// Function to embed JSON-LD
const embedJsonLd = (jsonLd) => {
  const jsonLdScript = document.createElement("script");
  jsonLdScript.type = "application/ld+json";
  jsonLdScript.textContent = JSON.stringify(jsonLd);
  document.body.appendChild(jsonLdScript);
};

window.addEventListener("DOMContentLoaded", () => {
  const jsonData = getFaqJson(ID);
  const jsonLd = getJsonLd(jsonData);
  embedJsonLd(jsonLd);
});