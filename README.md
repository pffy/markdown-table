# markdown-table
Google Sheets editor add-on that exports Markdown tables

# ICON

![icon120]

# INSTALL

### Google Workspace Marketplace

  * [Install Cotton Markdown Tables][g_cotton] from the Google Workspace Marketplace
  * [https://workspace.google.com/marketplace/app/cotton_markdown_tables/734474805574][g_cotton]
  * **Recommended.**
    * Apps and add-ons are actively [monitored and curated by Google][g_safety]. 
    * Better add-on management (install, remove, auto-update).
    + New updates and critical fixes are available immediately.


<a target="_blank" href="https://workspace.google.com/marketplace/app/cotton_markdown_tables/734474805574?pann=b&utm_source=github_pffy" target="_blank" aria-label="Get it from the Google Workspace Marketplace">
  <img alt="Google Workspace Marketplace badge" alt-text="Get it from the Google Workspace Marketplace" src="https://workspace.google.com/static/img/marketplace/en/gwmBadge.svg?" style="height: 68px">
</a>
    
### Copy spreadsheet document
  
  + [**Make a copy**][copy] of the Cotton Markdown Tables add-on.
    + **The add-on is only available for that specific spreadsheet file.**
    + You can preview the Apps Script file before copying the file.
    + You get your own personal copy of Cotton Markdown Tables.
    + Distributed, decentralized copies of the add-on prevent external factors from breaking your spreadsheet or data workflow.
    + This may be your only option, depending on how your Google account domain is managed.
    + Only updated for new features and/or critical fixes. (You will need to ***re-copy*** the file each time.)
    + Not reviewed or curated by Google.
      + You must still grant authorization to ***yourself*** to use the special [permissions](#permissions). 

### G Suite administrator

  * Ask your G Suite administrator to add Cotton Markdown Tables to an add-on whitelist.
  * You can (alternatively) also ask your administrator to simply install Cotton Markdown Tables automatically.
  * **Preferred by organizations with Chromebook management and acceptable use policies.**
  * Important things to tell your administrator:
    * "Cotton Markdown Tables add-on is free and open-source."
    * "Cotton Markdown Tables add-on only provides stable features with each deployment."
    * "Thank you for keeping my Chromebook safe, secure and fully operational."
    * "Cotton Markdown Tables add-on does not phone home."
  * Important things to show your administrator:
    * See [PERMISSIONS](#permissions) section.
    * See [COMPLIANCE](#compliance) section.

### Manual install

> **NOTE:** for developers and power users.
  
  * Add each file in the `src` folder to your Google Apps Script editor.
    * Create the file. Copy/paste the contents of the file.
    * In the Google Apps Script Editor `Project Settings` tab, be sure the box that says `Show "appsscript.json" manifest file in editor` before you copy/paste the contents into that file.
    + You must still grant authorization to ***yourself*** to use the special [permissions](#permissions). 


### Command-line install with `clasp`

> **NOTE:** for developers and power users.

  + You can use `clasp` to work with these files from the command-line:
    + Learn more: https://developers.google.com/apps-script/guides/clasp

# PERMISSIONS

In order to provide useful features, this add-on requires permissions from you. The following describes the purpose of permissions for this add-on:

### **Google Drive** 
  + *"See, edit, create, and delete all of your Google Drive files"*
    + This permssion allows the add-on to create a `Cotton Markdown Tables` folder and save Markdown table documents on your Google Drive. Additionally, this feature allows the add-on to jump directly to the saved Markdown file or download the Markdown file to your desktop. No user data sent to pffy-cloud.

### **Google Sheets**
  + *"View and manage spreadsheets that this application has been installed in"*
    + This permssion allows the add-on to only read the content of the spreadsheet that is currently open. Reading this information helps the add-on determine how to convert betweeen spreadsheet formatting and Markdown syntaxes. No user data sent to pffy-cloud.
 
### **Script UI**
  + *"Display and run third-party web content in prompts and sidebars inside Google applications"*
    + This permssion allows the add-on to provide user interaction for better usability. HTML, CSS, JavaScript and frameworks (e.g., jQuery) are implemented in the sidebar to help the add-on copy text to your clipboard, view saved files in your Google Drive, or download saved files to your desktop. No user data sent to pffy-cloud.

### OAuth scopes
  + See the [SCOPES](#scopes) section.

### Remove permissions

Permissions [can be removed][revoke] at any time from your Google Account.

# COMPATIBILITY

  + TBD

# FEATURES

### Export options

You have six options for exporting data from Google Sheets to Markdown tables:

  1. **Export active range:** The most basic selection in a spreadsheet.
  2. **Export all active ranges:** This allows you to multi-select seperate ranges and export all the converted tables into a single Markdown table document.
  3. **Export entire sheet:** This method includes all the data within a sheet without user selection.
  4. **Export all sheets:** This method exports each sheet in the spreadsheet and places them into a single document.
  5. **Export selected named ranges:** Choose which predefined named ranges you want and save all the generated Markdown tables in a single Markdown document.
  6. **Export all named ranges:** Combine all the named ranges in a spreadsheet into a single Markdown document.


![cotton_menu]

### Deliverables

After you export Markdown tables with Cotton, you have three choices for deliverables.

You can:

  + Copy the Markdown text to clipboard
  + View the Markdown file in Google Drive
  + Download the Markdown file to your desktop

You can watch the <a target="_blank" href="https://www.youtube.com/watch?v=WXVFfqUkGys">deliverable options video</a> on YouTube.

![cotton_prompt]

# YOUTUBE CHANNEL

  + <a target="_blank" href="https://www.youtube.com/channel/UCl7X-xNklgG6Eg5X91TNn2Q?utm_source=github_pffy">Cotton Markdown Tables on YouTube</a>


# SCOPES

The following [OAuth scopes][g_scopes] were used for granting this add-on [PERMISSIONS](#permissions).

### Non-sensitive scopes
```
https://www.googleapis.com/auth/spreadsheets.currentonly
```

### Sensitive scopes
```
https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/script.container.ui
```

### Restricted scopes

There are no restricted scopes used in this add-on.

# COMPLIANCE

This section is for compliance departments within companies, agencies or organizations that must provide documentation of licensing for internal or external audit processes.

The Cotton Markdown Tables spreadsheet editor add-on is free, libre, and open source software. Printing this web page (either as paper for PDF) and retaining a copy for your records is sufficient documentation for your organization’s site license or domain license.

# PRIVACY POLICY

This add-on complies with the [Google API Services User Data Policy][g_userdata]. Additionally, we are committed to exceeding these requirements while delivering wonderful user experiences, without collecting any personally-identifying information about you. These efforts are described with greater detail in our privacy policy:

  * https://a.pffy.dev/about/privacy

# TERMS OF SERVICE

  * https://a.pffy.dev/about/terms

# DISCLAIMERS

Google Sheets, Google Drive, and other Google software or features are trademarks of Google, an Alphabet company. jQuery belongs to the OpenJS Foundation and jQuery contributors. GitHub belongs to Microsoft.

# LICENSE

  + https://unlicense.org/

[g_scopes]: https://developers.google.com/identity/protocols/oauth2/scopes
[copy]: https://docs.google.com/spreadsheets/d/1UGDkKWGyheNhW23nlffiC9arht4dtVDFt-OWa8Iu10c/copy
[yt_options]: https://www.youtube.com/watch?v=WXVFfqUkGys
[yt_cotton]: https://www.youtube.com/channel/UCl7X-xNklgG6Eg5X91TNn2Q?utm_source=github_pffy
[cotton_menu]: https://github.com/pffy/b/blob/main/png/cotton-menu.png
[cotton_prompt]: https://github.com/pffy/b/blob/main/png/cotton-prompt.png
[icon120]: https://github.com/pffy/b/raw/main/png/cotton-icon-120.png
[g_userdata]: https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes
[g_cotton]: https://workspace.google.com/marketplace/app/cotton_markdown_tables/734474805574?utm_source=github_pffy
[g_safety]: https://developers.google.com/workspace/marketplace/terms/policies
[terms]: https://a.pffy.dev/about/terms
[privacy]: https://a.pffy.dev/about/privacy
[revoke]: https://myaccount.google.com/permissions

