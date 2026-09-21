Footnote (GitHub Flavored Markdown):

Here's a claim that needs a source.[^1]

[^1]: This is the footnote text, rendered at the bottom of the page.

Collapsible section using raw HTML (works in GFM renderers like GitHub):

<details>
<summary>Click to expand</summary>

Hidden content goes here - can include lists, code blocks, anything.

</details>

Escaping special characters - prefix with a backslash so they render literally:

\*not italic\*, \# not a heading, \[not a link\]

A GitHub-style alert callout:

> [!NOTE]
> Useful information the reader should know, even when skimming.
