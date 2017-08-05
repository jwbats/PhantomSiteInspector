# PhantomSiteInspector
A PhantomJS script that renders screenshots of a list of URLs.

# Summary
This script was created to visually inspect sites in bulk. You can use it to check if your sites are hacked, offline, or anything else is wrong.

The script loads every URL and waits for 4 seconds in order to catch any hacked redirects on a page. Then it renders screenshots of the URLs in a date/time-stamped directory when run.

The screenshots PhantomJS renders aren't exactly 1-to-1 with the sites as they appear in a modern day browser. However, if it's close, your site is probably fine.

# Usage

1. Download and unzip PhantomJS.exe from http://phantomjs.org/download.html.

2. Add PhantomJS to the environment path, or place the PhantomJS.exe file in the same directory as the script.

3. Run run.bat.
