export interface MarkdownNode {
    html: string;
    frontmatter: {
        title: string;
        url: string;
    };
    id: string;
}