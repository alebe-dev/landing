import React, {FC} from 'react';
import {Link, graphql} from "gatsby";
import {MarkdownNode} from "../types";
import { Helmet } from "react-helmet"

interface Props {
    data: {
        markdownRemark: MarkdownNode
    }
}

const Post:FC<Props> = ({data}) => {
    const {html} = data.markdownRemark
    const {title} = data.markdownRemark.frontmatter

    return (
        <>
            <Helmet title={title}/>
            <div>
                <Link to={"/"}>Return</Link>
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </div>
        </>
    );
};

export default Post;

export const query = graphql`
    query PostQuery($url : String) {
      markdownRemark(frontmatter: {url: {eq: $url}}) {
        html
        frontmatter {
          title
          url
        }
      }
    }
`