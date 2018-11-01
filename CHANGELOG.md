[How do I make a good changelog?](https://keepachangelog.com/en/1.0.0/#how)
## [3.0.2] - 2018-11-02
### Fixed
- Fixed updateEta: Cannot read property 'format' of undefined

## [3.0.1] - 2018-11-02
### Added
- Vietnam current time & ETA

## [3.0.0-beta.4.9] - 2018-10-24
### Added
- Rollbar logs for paypal events
### Updated
- Update checkout.v4.js with checkout.js.map

## [3.0.0-beta.4.6] - 2018-10-15
### Removed
- remove countries: Cameroon, Ghana, Iran, Lybia, Niger, Nigieria, Senegal
- remove 6 months & 1 year visa (except USA)

## [3.0.0-beta.4.5] - 2018-10-02
### Added
- Review form: add flight number render block
- Step 1: 6 months & 1 year option for US
- Step 2: max departure date
### Fixed
- calculate total fee trigger (step 2 change) & logic (add comments)

## [3.0.0-beta.4.4] - 2018-09-27
### Added
### Updated
- Validate “Passports should have at least six months of validity!”
### Removed
- /fees & /contact typos

## [3.0.0-beta.4.3] - 2018-08-10
### Added
- /apply invalid input styles for date pickers
- humps.decamelizeKeys before JSON.stringify
### Updated
- /apply: set status "paid" to paid orders
### Removed
- companny address

## [3.0.0-beta.4.2] - 2018-08-01
### Added
- /apply with id URL query param
- /apply: add info icon for tooltip
### Updated
- /apply: use input type="date" for date input
### Removed
- yarn remove semantic-ui-calendar-react
- remove Viet Nam from country list

## [3.0.0-beta.4.1] - 2018-07-17
### Updated
- /thank-you: update text with green tick icon
- /payment-failed: update text

## [3.0.0-beta.4] - 2018-07-17
### Added
- /apply: steps navigation: validate before switching steps
- /apply: show the first error message if any
### Changed
- /apply: process logic for fastTrack service & processingTime of "emergency"
### Removed
- Unused actions: resetStepTwo, updatePaymentStatus

## [3.0.0-beta.3] - 2018-07-16
### Added
- /faq questions and answers
- Override some semantic-ui-css styles 
### Changed
- <meta> tags
### Fixed
- StepTwo: Fix syncPropsToState set countryId from stepOne only when countryId is not set

## [3.0.0-beta.2.2] - 2018-07-14
### Added
- /thank-you & /payment-failed
- Facebook page url
### Changed
- Update /terms & /privacy
- fontSizes: -2 on tablet, -4 on mobile
### Fixed
- Responsive layout for mobile
- Header: click on a menu to hide menus
### Removed
- <style jsx global>

## [3.0.0-beta.2] - 2018-07-13
### Added
- Viewport for mobile view
- Fee constants
- sitemap.xml, robots.txt & favicon.ico
### Changed
- package.json package versions
- Update countries.json with flag
### Fixed
- Undefined css strings from generateCommonProps
- next/link with prefetch for mailto: & tel: href
### Removed
- Unused package.json packages
- Some static css files

## [3.0.0-beta.1] - 2018-07-09
### Changed
- Update packages
- Re-design whole application UI & content
- Add comments for components
### Fixed
- Undefined css strings from generateCommonProps
- Simplify custom components
### Removed
- /about, /feedback, /how, /login, /news, /partners & /register pages
- Total clean up of the project

## [2.5.4] - 2018-06-26
### Added
- Enable rollbar & crisp only on production

## [2.5.3] - 2018-06-25
### Changed
- Change processing_time from 2 days to 1 day

## [2.5.2] - 2018-06-05
### Changed
- Add & format date & time
- Hide "6 months multiple" & "1 year multiple" for tourist visa 

## [2.5.1] 2018-05-31
### Added
- Update title & meta tags

## [2.5.0] - 2018-05-21
### Changed
- Move paypal button to step 3
### Added
- Enable/Disable paypal button based on terms checkbox & contact information
- Auto apply airport fast track service if processing time is emergency

## [2.4.0] - 2018-05-17
### Fixed
- Fix empty contact bugs
### Changed
- Must pay to finish form

## [2.3.0] - 2018-05-17
### Added
- Add crisp messenger app

## [2.2.0] 2018-05-17
### Added
- Get price from store and set for paypal checkout

## [2.1.0] - 2018-05-16
### Added
- Call `POST /order` to save order to database

## [2.0.1] - 2018-04-27
### Changed
- Change to paypal business account, hard-code price for 15 usd

## [2.0] - 2018-04-17
### Added
- Add full-flow Apply form: 3 steps with Review form
### Fixed 
- Fix bugs