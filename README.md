# Page-a-Day
Automated daily publication of book page(s) on nostr. Zappable by readers. Zaps go to book author. FOSS.

## Overview
Adam Curry introduced the podcasting 2.0 where listeners can stream sats to their favorite podcasters as they receive value (value for value). 

Currently, there is no way to stream sats to your book author. 

Enter Page-a-Day! 

Page-a-Day is a nostr bot that publishes a daily note with one page (or more pages) from a book. This note is zappable by readers. Zaps go directly to book author via NIP-57 zap markers approach. The author can elect to split a portion of zaps with the dev maintainer of the bot.

## Page-a-Day needs a dev!
As a product person I can provide user stories, product specs, and mock-ups. Page-a-day requires a dev to build!

### User Stories
I) As a book author who is looking for additional distribution for my book, I would like a way to automagically publish zappable book pages to nostr daily, so that I can reach new book purchasers, and provide an opportunity to receive zaps from interested readers.

  _Acceptance Criteria_
  1. Page-a-Day admin can upload a digital form of a book
  2. App automatically detects new pages from digital copy
  3. App automatically publishes a new page each day to nostr
  4. Page-a-Day admin can configure app to share X number of pages, or chapters each day. For instance 1 page, 2 pages, 1 chapter etc.
  5. Page-a-Day admin can turn on, or pause publishing at any time via a setting
  6. Notes are zappable
  7. Admin can configure zap address


II) As a book author who has set up a Page-a-Day bot, I would like an easy to way to configure zap splits, so that I can send zaps to the dev maintainer of the bot, or other parties that have helped with the book and/or bot.

  _Acceptance Criteria_
  1. Page-a-Day admin _can_ configure zap splits via NIP-57 to for one or more LN addresses to receive anywhere from 0-100% of the zap.

III) As an author utilizing Page-a-Day, I would like to see stats of the most zapped pages/chapters/page ranges, so that I know which sections readers appreciate the most.

  _Acceptance Criteria_
  1. There is a way for anyone to view the most zapped pages. For instance, this could be a histogram view sorted from most to least zapped pages (see zaplife.lol most zapped notes, and most frequently zapped notes methoodologies)

Origin: https://iris.to/note14u3fkqu8dafzl45zwud4mua7u2w3emtaml4f78k5qc0myxhyc9zqd24ste
