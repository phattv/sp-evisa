[How do I make a good changelog?](https://keepachangelog.com/en/1.0.0/#how)
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