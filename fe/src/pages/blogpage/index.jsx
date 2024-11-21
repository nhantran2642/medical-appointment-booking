import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import BlogSidebar from '../blogSidebar';
import { mockBlogPosts } from '../../mock';



const BlogPage = () => {
    const blogPosts = mockBlogPosts;
    return (
        <div className="blog-posts">
            <div className="blog-header" style={{ backgroundImage: `url(${require('../../assets/img/SubHead-news.png')})` }}>
                <div className="title-head">
                    <Link to="/">Trang chủ</Link> / <Link to="/blogspage">Tin tức</Link>
                </div>
                <h2>Tin tức</h2>
            </div>
            <div className="blog-content">
                <div className="posts">
                    {blogPosts.map((post) => (
                        <div className="post-card" key={post.id}>
                            <div className="post-img">
                                <img src={post.image} alt={post.title} />
                            </div>
                            <div className="post-content">
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <Link to={`/blogspage/${post.id}`} className="read-more">Xem chi tiết</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <BlogSidebar />
            </div>
        </div>
    );
};

export default BlogPage;
