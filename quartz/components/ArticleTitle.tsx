import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  console.log("ArticleTitle.tsx: title", title)
  if (title !== "None") {
    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  } else {
    return <h1 class={classNames(displayClass, "article-title")}></h1>
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
