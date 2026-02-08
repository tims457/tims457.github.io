+++
title = "Tufte Theme Style Guide"
date = 2026-02-07
draft = true
category = "posts"
layout = "post"
tags = ["tufte", "style guide"]
description = "A reference for the Tufte theme shortcodes and typographic features available on this site."
katex = true
showTableOfContents = true
+++

{{< epigraph "The purpose of visualization is insight, not pictures." "Ben Shneiderman" >}}

{{< newthought "This article" >}} is a living reference for every typographic feature available in the Tufte theme. Each section demonstrates one feature with the shortcode syntax shown alongside it. The article itself is set as `draft = true` so it won't appear in production builds -- run `hugo server -D` to preview it.

## New Thought

A new thought uses small caps to open a section. It signals a shift in topic without a full heading.

```
{{</* newthought "This sentence" */>}} begins with small caps.
```

{{< newthought "This sentence" >}} begins with small caps, drawing the reader's eye to the start of a new idea. Use it sparingly -- one per section is usually enough.

## Epigraph

An epigraph is a short quotation set before the body of a section. It can include an author and an optional source title.

```
{{</* epigraph "Quote text" "Author" "Source Title" */>}}
```

{{< epigraph "A computer lets you make more mistakes faster than any other invention in human history, with the possible exception of handguns and tequila." "Mitch Ratcliffe" >}}

The third parameter (source) is optional and will be rendered in italics when provided:

{{< epigraph "The art of programming is the art of organizing complexity." "Edsger W. Dijkstra" "Notes on Structured Programming" >}}

## Sidenotes

Sidenotes are numbered notes in the margin.{{< sidenote "sn-example" >}}This is a sidenote. On mobile, tap the superscript number to reveal it.{{< /sidenote >}} They replace traditional footnotes and keep the reader's eye close to the relevant text.

```
Some text.{{</* sidenote "unique-id" */>}}Note content.{{</* /sidenote */>}}
```

Each sidenote needs a unique ID (the first parameter). The content between the opening and closing tags supports **markdown** formatting, including [links](https://edwardtufte.github.io/tufte-css/).

## Margin Notes

Margin notes are un-numbered annotations in the margin.{{< marginnote "mn-example" >}}This is a margin note. It has no number -- just a toggle symbol on mobile.{{< /marginnote >}} Use them for supplementary context that doesn't warrant a numbered reference.

```
Some text.{{</* marginnote "unique-id" */>}}Note content.{{</* /marginnote */>}}
```

Like sidenotes, the content supports markdown. The distinction is purely visual: margin notes have no superscript number, only the &#8853; toggle on narrow screens.

## Figures

### Main Column Figure

A figure that sits in the main text column:

```
{{</* maincolumn-img "/path/to/image.png" "Caption text" */>}}
```

{{< maincolumn-img "example.png" "Monte Carlo tree search diagram" >}}

The caption is optional. If omitted, no `<figcaption>` is rendered.

### Margin Figure

A small figure in the margin, alongside body text:

```
{{</* marginfigure "unique-id" "/path/to/image.png" "Caption text" */>}}
```

Like margin notes, margin figures collapse behind a toggle on mobile.{{< marginfigure "mf-example" "example.png" "Monte Carlo tree search diagram" >}} Place the shortcode inline within a paragraph so the CSS percentages resolve against the paragraph's 55% width rather than the full section width.

### Full-Width Figure

A figure that spans the full page width (main column plus margin):

```
{{</* fullwidth-img "/path/to/image.png" "Caption text" */>}}
```

## Blockquotes

Standard markdown blockquotes work as expected:

> It is not enough to do your best; you must know what to do, and then do your best.
>
> -- W. Edwards Deming

```
> It is not enough to do your best; you must know what to do,
> and then do your best.
>
> -- W. Edwards Deming
```

For attributed quotations at the top of a section, prefer the `epigraph` shortcode instead.

## Code

Inline code uses backticks: `fmt.Println("hello")`.

Fenced code blocks get syntax highlighting via Hugo's Chroma, with separate light and dark color schemes:

```go
func main() {
    ch := make(chan int, 1)
    go func() {
        ch <- 42
    }()
    fmt.Println(<-ch)
}
```

```python
def fibonacci(n: int) -> list[int]:
    a, b = 0, 1
    seq = []
    for _ in range(n):
        seq.append(a)
        a, b = b, a + b
    return seq
```

## Math

With `katex = true` in the front matter, inline math like $e^{i\pi} + 1 = 0$ and display math both work.{{< sidenote "sn-katex" >}}KaTeX is loaded from a CDN only on pages that set `katex = true`, so it doesn't slow down other pages.{{< /sidenote >}}

Display equations use double dollar signs:

$$
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}
$$

Subscripts and superscripts inside math are protected from Goldmark's emphasis parsing by the `passthrough` extension:

$$
\hat{A}_{t} = \sum_{l=0}^{\infty} (\gamma \lambda)^{l} \delta_{t+l}
$$

## Tables

Standard markdown tables are supported:

| Feature        | Shortcode          | Numbered |
| :------------- | :----------------- | :------: |
| Sidenote       | `sidenote`         |   Yes    |
| Margin note    | `marginnote`       |    No    |
| Margin figure  | `marginfigure`     |    No    |
| Main figure    | `maincolumn-img`   |    --    |
| Full-width fig | `fullwidth-img`    |    --    |
| New thought    | `newthought`       |    --    |
| Epigraph       | `epigraph`         |    --    |

## Combining Features

These features compose naturally. For example, a paragraph can contain both a sidenote{{< sidenote "sn-combo1" >}}First note providing context.{{< /sidenote >}} and a margin note{{< marginnote "mn-combo1" >}}A second, un-numbered annotation alongside the first.{{< /marginnote >}} at the same time, and they will stack vertically in the margin.

{{< newthought "In practice," >}} you'll most often use new thoughts to open sections, sidenotes for citations and asides, and margin notes for definitions or tangential context. Epigraphs work best at the top of a piece or major section. Full-width figures are for the rare image that truly needs the space.
