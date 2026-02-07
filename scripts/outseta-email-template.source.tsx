import { generalConfig } from "@/config/general-config";

export const generateEmailTemplate = (): string => {
  const siteUrl = generalConfig.siteUrl.replace(/\/$/, "");
  const siteUrlDomain = siteUrl.replace(/^https?:\/\//, "");
  const projectName = generalConfig.name;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ CompanyName }}</title>
    <style>
    body {
      margin: 0;
      padding: 0;
      background: var(--chakra-colors-bg-subtle);
      color: var(--chakra-colors-fg);
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
      font-family:
        -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif;
      font-size: 16px;
      line-height: 1.4;
      letter-spacing: -0.125px;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      border: 0;
      display: block;
      line-height: 100%;
    }
    p {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }
    a:hover {
      text-decoration: underline !important;
    }
    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
    }
    img {
      max-width: 100%;
    }

    p + p,
    p + em,
    em + p {
      margin-top: 20px;
    }

    @media only screen and (min-width: 664px) {
      .page-padding {
        padding: 32px;
      }
    }

    /* Button Hover = 10% #000 on top */
    .ease {
      transition: background-color 0.1s linear 0s;
    }
    .btn-neutral-200:hover {
      background-color: var(--chakra-colors-white) !important;
      text-decoration: none !important;
    }
    .btn-neutral-400:hover {
      background-color: var(--chakra-colors-bg-emphasized) !important;
      text-decoration: none !important;
    }
    .btn-neutral-800:hover {
      background-color: var(--chakra-colors-black) !important;
      text-decoration: none !important;
    }
    .btn-purple:hover {
      background-color: var(--chakra-colors-primary-600) !important;
      text-decoration: none !important;
    }
    .btn-coral:hover {
      background-color: var(--chakra-colors-primary-700) !important;
      text-decoration: none !important;
    }
    .btn-electric:hover {
      background-color: var(--chakra-colors-primary-500) !important;
      text-decoration: none !important;
    }
    </style>
  </head>
  <body>
    <!-- Background -->
    <table
      role="presentation"
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background:var(--chakra-colors-bg-subtle); color: var(--chakra-colors-fg); min-width: 320px;"
    >
      <tr>
        <td class="page-padding" align="center">
          <!-- Header -->
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            valign="middle"
            width="600"
            style="width:100%; max-width:600px; background:var(--chakra-colors-bg-panel); border-bottom: 1px solid var(--chakra-colors-border); border-radius: 4px 4px 0px 0px;"
          >
            <tr>
              <td
                align="left"
                style="padding:32px 28px; vertical-align: middle;"
              >
                <a
                  href="${siteUrl}?utm_source=transactional-email&utm_medium=email&utm_campaign=base&utm_content=header-logo"
                  target="_blank"
                >
                  <img
                    src="${siteUrl}/static/logo.png"
                    width="583"
                    height="129"
                    style="width: 112px; height: auto;"
                    alt="Logo ${projectName}"
                  >
                </a>
              </td>
              <td
                align="right"
                style="padding:24px 32px; font-family: monospace; text-transform: uppercase; font-size: 12px; color:var(--chakra-colors-fg); vertical-align: middle;"
              >
                <a
                  href="${siteUrl}?utm_source=transactional-email&utm_medium=email&utm_campaign=base&utm_content=header-website-link"
                  target="_blank"
                  style="color:var(--chakra-colors-fg-subtle); text-decoration:none;"
                >
                  <span style="font-size: 12px; color:var(--chakra-colors-fg-subtle);"
                    >${siteUrlDomain}</span
                  >
                </a>
              </td>
            </tr>
          </table>

          <!-- Body -->
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="width:100%; max-width:600px; background:var(--chakra-colors-bg-panel);"
          >
            <tr>
              <td>
              {{ Body }}
            </td>
            </tr>
          </table>

          <!-- Buttons -->
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="width:100%; max-width:600px; background:var(--chakra-colors-bg-panel); border-top: 1px solid var(--chakra-colors-border);"
          >
            <tr>
              <td align="center" style="padding: 32px 16px 72px 16px;">
                <a
                  class="btn-neutral-800 ease"
                  href="${siteUrl}?utm_source=transactional-email&utm_medium=email&utm_campaign=base&utm_content=footer-button-website"
                  target="_blank"
                  style="display: inline-block; font-family: -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; color:var(--chakra-colors-white); font-size:17px; letter-spacing: -0.125px; background-color: var(--chakra-colors-fg); line-height: 17px; padding: 14px 20px 15px 20px; border-radius: 3px; text-decoration:none; border:0; mso-line-height-rule:exactly; text-align:center;"
                  >Website</a
                >
                <a
                  class="btn-coral ease"
                  href="${siteUrl}/login?utm_source=transactional-email&utm_medium=email&utm_campaign=base&utm_content=footer-button-login"
                  target="_blank"
                  style="display: inline-block; font-family: -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; color:var(--chakra-colors-white); font-size:17px; letter-spacing: -0.125px; background-color: var(--chakra-colors-primary-600); line-height: 17px; padding: 14px 20px 15px 20px; border-radius: 100px; text-decoration:none; border:0; mso-line-height-rule:exactly; text-align:center; "
                  >Login</a
                >
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            valign="middle"
            width="600"
            style="width:100%; max-width:600px; background:var(--chakra-colors-bg-panel); border-radius: 0px 0px 4px 4px;"
          >
            <tr>
              <!-- Column 1 -->
              <td
                align="left"
                style="width: 120px; padding: 32px; font-family: monospace; text-transform: uppercase; font-size: 12px; color:var(--chakra-colors-fg);"
              >
                <p
                  style="color:var(--chakra-colors-fg-subtle); text-decoration:none; white-space: nowrap;"
                >
                  {{ CompanyName }}
                </p>
              </td>

              <!-- Column 2 -->
              <td align="center" style="width: 56px; padding: 16px;">
                <a
                  href="${siteUrl}?utm_source=transactional-email&utm_medium=email&utm_campaign=base&utm_content=footer-icon"
                  target="_blank"
                  style="display: inline-block;"
                >
                  <img
                    src="${siteUrl}/static/logo.png"
                    width="24"
                    height="24"
                    alt="Icon ${projectName}"
                  >
                </a>
              </td>

              <!-- Column 3 -->
              <td
                align="right"
                style="width: 120px; padding:32px; font-family: monospace; text-transform: uppercase; font-size: 12px; color:var(--chakra-colors-fg);"
              >
                <p
                  style="color:var(--chakra-colors-fg-subtle); text-decoration:none; white-space: nowrap;"
                >
                  {{ CompanyName }}
                </p>
              </td>
            </tr>
          </table>{ % if UnsubscribeLink != nil and UnsubscribeLink != '' %}
          <!-- Unsubscribe -->
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            valign="middle"
            width="600"
            style="width:100%; max-width:600px;"
          >
            <tr>
              <td align="center" style="padding: 24px; font-family: -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; color:var(--chakra-colors-fg-subtle); font-size:14px; line-height:1.4; letter-spacing: -0.125px;">
              {{ UnsubscribeLink }}
            </td>
            </tr>
          </table>{ % endif %}
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
