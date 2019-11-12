# highspot-homework

Design Details
Here are the basic design parameters for this exercise:

 - [x] Display the results in a "card" format, where the cards flow from left to right across the width of the screen and then down to the next row creating as many rows as necessary.
 - [x] Each card should display: image, name, artist, set name, and original type. You may also display additional fields.
 - [x] The card's image should be displayed prominently. How and when the other data is displayed is up to you.
 - [x] Use a responsive design. The cards should reflow as-needed based on the size of the browser window. You may limit the maximum display area but may not use a fixed width.
 - [x] As the user scrolls down the page, additional cards should be loaded and appended. (This method of displaying results is often referred to as "infinite scroll.")
 - [x] Include a page header. You may also include additional layout elements at your discretion.
 - [x] Display a loading indicator when communicating with the API.
 - Once your basic design is working, add these additional features (you get to decide all the details):
   - [x] Search (at a minimum, by the card's name)
   - [ ] Sort (card name, set, artist, etc.)

Implementation Requirements
Please be sure to handle the following requirements in your implementation:

 - [x] For this exercise, only display cards that are of type "creature".
 - [x] Initially, display the first 20 results returned by the API.
 - [ ] Use the API to sort the results alphabetically by the card's name.
 - [ ] Retrieve additional pages of results as-needed to fill the window, but do not load more than 50 with each request.
 - [x] Do not preload all results.

Above & Beyond
Is this all too easy, or not sufficient to show off your dev skills? No problem! Complete the requirements and then keep going. We’d love to see you take this a step further to showcase your creativity and talents. Here are some suggestions, but feel free to come up with some of your own!

 - Filter cards (feel free to exceed the type restriction as long as it defaults to "creature")
 - Display number of cards loaded
 - Group by set (and/or other fields)
 - Show related cards (e.g., cards of the same type, cards in the same set)
 - Add cards to a list or collection (e.g., build a deck)




Things I learned during this project
- Custom hooks
- Unit testing around said hooks
- How to bypass CORS stuff

```
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

Tricky things

 - For some reason, the MTG API is not honoring either the `contains=imageUrl` or the `multiverseid` query parameters that would allow to filter out duplicates from the API level. I'll need to filter on the component level instead, which isn't ideal.
 - There are simple smoke tests. It turns out that testing isolated components are really straightforward. Intertwined useEffects with an axios call on top of it, not so much.  

Colophon:
React, via create-react-app
[Material UI](https://material-ui.com/)
`react-testing-library`, `jest-dom`, `enzyme`
