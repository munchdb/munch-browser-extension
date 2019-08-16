# MunchDB Browser Extension

Display restaurant food hygiene ratings on your favourite UK takeaway websites.

---

**NOTICE OF DEPRECATION**

MunchDB has been turned off as its goal was met: most of the sites in question now list food hygeine ratings alongside the restaurant data. This repository will remain here to showcase how to build a cross browser extension with ES6. Thanks for your support, it was a fun project.

---

Current released version: 0.10.4

This extension uses the service provided by us at [MunchDB.com][MunchDB] to display ratings from the [Food Standards Agency][FSA] on the following domains:

* JUSTEAT > [just-eat.co.uk][JUSTEAT]
* Hungryhouse > [hungryhouse.co.uk][Hungryhouse]
* Deliveroo > [deliveroo.co.uk][Deliveroo]

It can run within the following desktop browsers:

* [Google Chrome][Chrome]
* [Mozilla Firefox][Firefox]
* [Opera][Opera]


# Installation instructions

## Google Chrome

* Download and install from the [Chrome Web Store][Chrome].

## Mozilla Firefox

* Download and install from the [Firefox Add-ons Store][Firefox] (awaiting approval from FF).

## Opera

* Download and install from the [Opera Add-ons Store][Opera].


# Distribution instructions

To create a new package that can be uploaded to the Chrome store:

1. Bump the project version: use `bumpversion patch` for fixes and `bumpversion major` for major releases.
2. Run `gulp dist` to create a dist ready .zip file, it will be located in `dist/chrome.zip`
3. Upload the new `chrome.zip` in the [Chrome developer dasboard](https://chrome.google.com/webstore/developer/)


# License

This code is free to use under a 3-clause BSD License, see [LICENSE][LICENSE].


[MunchDB]: https://munchdb.com "Food Hygiene ratings for JUSTEAT & Hungryhouse takeway websites"
[FSA]: http://fsa.gov.uk "The UK's Food Standards Agency"

[JUSTEAT]: http://www.just-eat.co.uk
[Hungryhouse]: https://hungryhouse.co.uk
[Deliveroo]: https://deliveroo.co.uk/

[Chrome]: https://chrome.google.com/webstore/detail/munchdb-food-hygiene-rati/diocoabnonklkkkmhchegbfjmekfjfpm
[Firefox]: https://addons.mozilla.org/en-US/firefox/addon/munchdb/
[Opera]: https://addons.opera.com/extensions/details/munchdb-food-hygiene-ratings-for-takeaways/

[LICENSE]: https://github.com/munchdb/munch-browser-extension/blob/master/LICENSE
