# M:TG Card Displayer
I've only been playing around with React for the past couple of weeks, so I figured this was a good opportunity to use React to implement the assignment. Given that I'm relatively new to React, I'm probably one of the minority to learn React Hooks before the standard class-based components. On the plus side, easier for me to understand. On the minus, there seems to be a lot of uncharted territory, especially in regards to the way testing hooks are done.

Things I learned during this project
- Custom hooks
- Unit testing around said hooks
- How to bypass CORS stuff locally
- Cancel tokens inside axios
- A whole lot of best practices about Material UI

Tricky things
 - "Use the API to sort the results alphabetically by the card's name" - so, I'm looking through https://docs.magicthegathering.io/ and I can't seem to find any API specific sorting attributes. Maybe I'm missing something here, so in the mean time I've sorted this via the client.
 - For some reason, the MTG API wasn't honoring either the `contains=imageUrl` or the `multiverseid` query parameters that would allow to filter out duplicates from the API level. I needed to filter on the component level instead, which isn't ideal.
 - There are simple smoke tests. It turns out that testing isolated components are really straightforward. Intertwined useEffects with an axios call on top of it, not so much.  
 - When you enter a search term, I thought it would make sense to clear the existing card display, especially since the default view is more of a browsing experience. If I were to spend a little more time on this -- and hey, I might -- I would definitely refine the experience such that if we cleared out search terms and went back to a browsing view.
 - If I had more time to work on this, I probably would have worked on grouping cards next.

Colophon
 - React, via create-react-app
 - [Material UI](https://material-ui.com/)
 - `react-testing-library`, `jest-dom`, `enzyme`
 - Build process through Netlify
