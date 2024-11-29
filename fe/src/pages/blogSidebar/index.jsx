import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { categories, recentPosts } from '../../mock';

const BlogSidebar = () => {
    return (
        <div className="sidebar-blog">
            <div className="search-bar">
                <div className="input-group">
                    <input type="text" placeholder="Search" />
                    <button className="search-button">
                        <img src={require('../../assets/img/search.png')} alt="Search Icon" />
                    </button>
                </div>
            </div>
            <div className="recent-posts">
                <h3>Recent Posts</h3>
                <ul>
                    {recentPosts.map((post, index) => (
                        <li key={index}>
                            <div className="post-item">
                                <img src={post.image} alt={post.title} className="post-image" />
                                <div>
                                    <p className="post-date">{post.date}</p>
                                    <Link to="#" className="post-title">{post.title}</Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="categories">
                <h3>Categories</h3>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link to="#" className="category-item">
                                {category.name}
                                <span className="badge">{category.count}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogSidebar;
