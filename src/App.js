import React, { useState } from "react";
import "./App.css";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);

    const [categories, setCategories] = useState([
        "Enterpreneurship",
        "Culture",
        "Photography",
        "Data Science",
    ]);
    const [tags, setTags] = useState(["Elon Musk", "CEO", "SEO"]);
    const [posts, setPosts] = useState([{
            id: 1,
            title: "Blog Post 1",
            category: "Enterpreneurship",
            tags: ["Elon Musk", "CEO"],
            content: "the activity of setting up a business or businesses, taking on financial risks in the hope of profit.",
            comments: [{
                    id: 1,
                    text: "It is not the only app we are addicted to.. we are driven by an uncontrollable urge to use social media and devoting so much time and effort to social media that it impairs other important life areas.",
                },
                { id: 2, text: "Good one" },
            ],
        },
        {
            id: 2,
            title: "Blog Post 2",
            category: "Culture",
            tags: ["SEO tips", "Culture Shock"],
            content: "Texas Proves We Live in a Culture of Toxic Individualism.",
            comments: [],
        },
        {
            id: 3,
            title: "Blog Post 3",
            category: "Travel",
            tags: ["Photography", "Life Lessons"],
            content: "Traveling can be stressful for your body. Changing time zones, weird sleep schedules, unusual food, questionable hygiene, and the AC on the plane can all lead to unpleasant health problems.",
            comments: [],
        },
    ]);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterCategories(term);
    };
    const filterCategories = (term) => {
        const filtered = categories.filter((category) =>
            category.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleComment = (postId, commentText) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                const updatedComments = [
                    ...post.comments,
                    { id: Date.now(), text: commentText },
                ];
                return {...post, comments: updatedComments };
            }
            return post;
        });

        setPosts(updatedPosts);
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return ( <
        div className = { `app ${darkMode ? "dark" : ""}` } >
        <
        header className = "header" >
        <
        h1 > Blog Tour < /h1>{" "} <
        div className = "search-bar" >
        <
        input type = "text"
        placeholder = "Search..."
        value = { searchTerm }
        onChange = { handleSearchChange }
        />{" "} <
        ul > {
            filteredCategories.map((category, index) => ( <
                li key = { index } > { category } < /li>
            ))
        } <
        /ul> <
        /
        div > { " " } <
        /header> <
        div className = "content" >
        <
        div className = "main" > { " " } {
            filteredPosts.map((post) => ( <
                div className = "post"
                key = { post.id } >
                <
                h2 style = {
                    { color: "black" }
                } > { post.title } < /h2>{" "} <
                p > { post.content } < /p>{" "} <
                div className = "post-info" >
                <
                span > Category: { post.category } < /span>{" "} <
                div className = "tags" > { " " } {
                    post.tags.map((tag) => ( <
                        span className = "tag"
                        key = { tag } > { " " } { tag } { " " } <
                        /span>
                    ))
                } { " " } <
                /div>{" "} < /
                div > { " " } <
                div className = "comments" > { " " } {
                    post.comments.map((comment) => ( <
                        div className = "comment"
                        key = { comment.id } > { " " } { comment.text } { " " } <
                        /div>
                    ))
                } { " " } <
                /div>{" "} <
                CommentForm postId = { post.id }
                onComment = { handleComment }
                />{" "} < /
                div >
            ))
        } { " " } <
        /div> <
        div className = "sidebar" >
        <
        div className = "card" >
        <
        h2 style = {
            { color: "black" }
        } > Categories < /h2>{" "} <
        ul style = {
            { color: 'grey' }
        } > { " " } {
            categories.map((category) => ( <
                li key = { category } >
                <
                li > { category } < /li> < /
                li >
            ))
        } { " " } <
        /ul>{" "} < /
        div > { " " } <
        div className = "card" >
        <
        h2 style = {
            { color: "black" }
        } > Tags < /h2>{" "} <
        div className = "tags" > { " " } {
            tags.map((tag) => ( <
                span className = "tag"
                key = { tag } > { " " } { tag } { " " } <
                /span>
            ))
        } { " " } <
        /div>{" "} < /
        div > { " " } <
        /div>{" "} < /
        div > <
        footer className = "footer" >
        <
        p > Blog Clone - All rights reserved < /p>{" "} < /
        footer > <
        button className = { `dark-mode-toggle ${darkMode ? "dark" : ""}` }
        onClick = { toggleDarkMode } > { " " } { darkMode ? "Light Mode" : "Dark Mode" } { " " } <
        /button>{" "} < /
        div >
    );
};

const CommentForm = ({ postId, onComment }) => {
    const [commentText, setCommentText] = useState("");

    const handleCommentTextChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        onComment(postId, commentText);
        setCommentText("");
    };

    return ( <
        form className = "comment-form"
        onSubmit = { handleCommentSubmit } >
        <
        input type = "text"
        placeholder = "Write a comment..."
        value = { commentText }
        onChange = { handleCommentTextChange }
        />{" "} <
        button type = "submit" > Submit < /button>{" "} < /
        form >
    );
};

export default App;