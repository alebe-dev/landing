import {GatsbyNode} from "gatsby";
import path from "node:path";


export const createPages: GatsbyNode['createPages'] = async ({
                                                                 actions,
                                                                 graphql,
                                                             }) => {
    const {createPage} = actions;

    const allMarkdown: {
        errors?: any;
        data?: { allMarkdownRemark: { nodes: { frontmatter: { url?: string } }[] } };
    } = await graphql(`
             query Posts {
                    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts/"}}) {
                        nodes {
                            frontmatter {
                                url
                            }
                        }
                     }
              }
  `);

    allMarkdown.data?.allMarkdownRemark.nodes.forEach(node => {
        const {url} = node.frontmatter;
        if (!url) return;

        createPage({
            path: url,
            component: path.resolve(__dirname, './src/templates/post.tsx'),
            context: {
                url,
            },
        });
    });
};
