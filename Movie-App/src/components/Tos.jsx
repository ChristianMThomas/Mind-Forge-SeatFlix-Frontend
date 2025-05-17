import React from 'react';

function Tos() {
  const fileContents = `
1. Acceptance of Terms
By accessing or using mind-forge-cthomas.com, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.

2. Use of Services
You agree to use our services only for lawful purposes and in accordance with these terms. You must not misuse our services or attempt to disrupt them.

3. Content
We do not store media or files on our server, only links to the media which is hosted on 3rd party services.

4. Limitation of Liability
We are not responsible for any damages or losses resulting from your use of our services, except as required by law.

5. Changes to Terms
We reserve the right to update these Terms of Service at any time. Continued use of our services after changes are made constitutes acceptance of the new terms.

6. Contact Information
If you have questions about these terms, please contact us at:
1-478-365-9153
ct1783@mind-forge-cthomas.com
  `;

  const createDownloadLink = () => {
    const file = new Blob([fileContents], { type: 'text/plain' });
    return URL.createObjectURL(file);
  };

  return (
    <a
      href={createDownloadLink()}
      download="terms_of_service.txt"
      className="hover:text-gray-400"
    >
      Terms of Service
    </a>
  );
}

export default Tos;