import * as React from "react"
import {graphql, Link} from "gatsby";
import {FC} from "react";
import styled from "styled-components";
import {MarkdownNode} from "../types";
import {Helmet} from "react-helmet";
import MDEditor from '@uiw/react-md-editor';


const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

interface Props {
    data: {
        allMarkdownRemark: {
            nodes: MarkdownNode[]
        }
    }
}


// markup
const IndexPage: FC<Props> = ({data}) => {
    const {nodes} = data.allMarkdownRemark
    const [value, setValue] = React.useState("**Hello world!!!**");

    return (
        <>
            <Helmet title={"Main page"}/>
            <div className="container">
                <MDEditor
                    value={value}
                    onChange={setValue}
                />
                <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
            </div>
            <LinkWrapper>
                {nodes.map((node) => {
                    const {url, title} = node.frontmatter
                    return (<Link to={`/${url}`} key={node.id}>
                        {title}
                    </Link>)
                })}
            </LinkWrapper>
        </>
    )
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/posts/"}}
    sort: {fields: frontmatter___title}
  ) {
    nodes {
      html
      frontmatter {
        title
        url
      }
      id
    }
  }
  }
`
