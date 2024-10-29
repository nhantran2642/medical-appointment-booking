import React from "react";
import "./style.scss";
import { ScheduleOutlined } from "@ant-design/icons";

const BlogPage = () => {
    const posts = [
        {
            icon: <ScheduleOutlined />,
            date: "Monday 05, September 2024",
            author: "By Author",
            views: 231,
            likes: 86,
            title: "A passion for putting patients first",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare...",
            image: "https://www.strunkmedia.com/wp-content/uploads/2017/07/doctors-nurses.jpg", // Use the imported image directly
        },
        {
            icon: <ScheduleOutlined />,
            date: "Monday 05, September 2024",
            author: "By Author",
            views: 278,
            likes: 96,
            title: "A passion for putting patients first",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare...",
            image: "https://www.strunkmedia.com/wp-content/uploads/2017/07/doctors-nurses.jpg", // Replace with actual image paths or import them
        },
        {
            icon: <ScheduleOutlined />,
            date: "Monday 05, September 2024",
            author: "By Author",
            views: 542,
            likes: 186,
            title: "A passion for putting patients first",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare...",
            image: "https://www.strunkmedia.com/wp-content/uploads/2017/07/doctors-nurses.jpg", // Replace with actual image paths or import them
        },
    ];

    return (
        <div className="blog-page">
            <div className="blog-posts">
                {posts.map((post, index) => (
                    <div key={index} className="post">
                        <img src={post.image} alt={post.title} className="post-image" />
                        <div className="post-info">
                            <p>{post.icon} {post.date} • {post.author} • {post.views} 👁️ • {post.likes} ❤️</p>
                            <h2>{post.title}</h2>
                            <p>{post.excerpt}</p>
                            <button className="read-more">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="sidebar">
                <div className="search">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="recent-posts">
                    <h3>Recent Posts</h3>
                    {posts.slice(0, 3).map((post, index) => (
                        <div key={index} className="recent-post">
                            <img src={post.image} alt={post.title} className="recent-post-image" />
                            <div>
                                <p>{post.date}</p>
                                <h4>{post.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="categories">
                    <h3>Categories</h3>
                    <ul>
                        <li>Surgery</li>
                        <li>Health Care</li>
                        <li>Medical</li>
                        <li>Professional</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
