---
title: Meta-news
date: 2021-09-28
category: posts
layout: post
tags: [machine learning, natural language processing (NLP)]
description: Using natural language processing to visualize news coverage. 
toc: true
---

# Background

Examining how news coverage changes can be as interesting as the events themselves. There is a massive amount of information published by the media every day (not to mention blogs, social media, podcasts, etc.), making it challenging to measure the shifting discussion around a topic or event. It can even be difficult to realize that the conversation has changed. However, modern natural language processing can help visualize the debate.

Machine learning models for language such as GPT-3, BERT, and others have become extremely proficient at a variety of language tasks. They enable the rapid processing of extremely large amounts of text otherwise requiring teams of people to analyze. Companies like [Primer](https://primer.ai/) offer advanced solutions for a variety of tasks such as topic modeling or classification. (You can check out their [COVID-19 dashboard](https://covid19primer.com/dashboard) to see an example applied to scientific publications and keep up to date on the latest research.)

However, it's not hard to implement some of these techniques yourself. The biggest obstacle is a high-quality dataset, in this case, news articles. Most publicly available APIs are either prohibitively expensive for a hobbyist or of poor quality, but you can still make something useful. The one I'm using here isn't great, at least not the free version, but it'll do.

This graph shows the articles matching a search for "COVID-19" in the past week. After removing duplicates (multiple outlets may run the same story), the articles are assigned a node in this graph. Articles that are similar to each other get connected with an edge. Then they can be grouped into communities based on topic with each topic receiving a unique color. For example, articles about case counts and deaths have one color while articles primarily about the CDC and vaccines get another. Sometimes the discussion is disjointed with loosely connected groups. At other times, articles are more consolidated.

<iframe src="/assets/embeds/covid-19.html" height="620px" width="100%" style="border:none;"></iframe>

I'm not the first person to write about these techniques. Ben Hunt calls his analysis the [Narrative Machine](https://www.epsilontheory.com/the-narrative-machine/). Ben discusses how you can use these tools to watch how the narrative around a topic shifts over time, which ones fade, and which ones take hold to become the prevailing conversation.

# Streamlit app

I'd like to try and see this for myself, and since I don't have the financial resources to pay a Primer or similar company, I made my own version. The app, built with [Streamlit](https://streamlit.io/), collects the latest news on a few relevant topics displaying graphs with the last week's content. I'm using free services so the amount of news I can sift through, store, and display is limited, but I'll try and keep it relevant. Expect some tweaks and occasional topic changes. Also, I'm sure it will only handle so much traffic so if it appears to be down, come back later.

~~[Here's the link.](https://meta-news-graph.herokuapp.com/) Sorry for the load time.~~ (Now offline).

Enjoy and let me know if you have comments or ideas. Thanks for reading.




